/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import type { HTMLAttributes, ReactNode, MouseEvent } from 'react';
import { forwardRef, useState, useLayoutEffect, useRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import type { Theme } from '@emotion/react';

import Text from './Text';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export type DropdownMode = 'light' | 'dark' | 'transparent';

export interface DropdownOption {
  label: string;
  value: string;
  onClick?: (value: string, e: MouseEvent<HTMLDivElement>) => void;
}

export interface DropdownProps extends Omit<HTMLAttributes<HTMLDivElement>, 'onSelect'> {
  children?: ReactNode;
  options?: DropdownOption[];
  onSelect?: (value: string) => void;
  selectedValue?: string;
  isOpen: boolean;
  width?: string;
  verticalPos?: 'top' | 'bottom';
  alignPos?: 'left' | 'right';
  maxHeight?: number;
  mode?: DropdownMode;
  disabled?: boolean;
}

export interface OptionItemProps extends HTMLAttributes<HTMLDivElement> {
  isSelected: boolean;
  mode?: DropdownMode;
}

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Styled Components (Root)
// ------------------------------------------------------------------
const OptionItemRoot = styled.div<{ $isSelected: boolean; $mode: DropdownMode }>`
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  ${({ theme, $mode, $isSelected }) => {
    // 1. Get token group based on mode (default: light)
    // Safe access with fallback since we are updating live
    const tokens = (theme.components as any).dropdown?.[$mode] || (theme.components as any).dropdown?.light;

    if (!tokens) return '';

    return `
      background-color: ${$isSelected ? tokens.item.selected : 'transparent'};
      color: ${$isSelected ? tokens.text.selected : tokens.text.default};

      /* 자식(<Text>)이 반드시 부모 색상을 따르도록 강제 */
      & > * { color: inherit !important; }

      &:hover {
        background-color: ${$isSelected ? tokens.item.selected : tokens.item.hover};
      }
    `;
  }}
`;

export const OptionItem = ({ isSelected, mode = 'light', ...props }: OptionItemProps) => {
  return <OptionItemRoot $isSelected={isSelected} $mode={mode} {...props} />;
};

const MenuContainerRoot = styled.div<{
  $width?: string;
  $verticalPos: 'top' | 'bottom';
  $alignPos: 'left' | 'right';
  $mode: DropdownMode;
}>`
  position: absolute;
  top: ${({ $verticalPos }) => ($verticalPos === 'bottom' ? '100%' : 'auto')};
  bottom: ${({ $verticalPos }) => ($verticalPos === 'top' ? '100%' : 'auto')};
  left: ${({ $alignPos }) => ($alignPos === 'left' ? '0' : 'auto')};
  right: ${({ $alignPos }) => ($alignPos === 'right' ? '0' : 'auto')};
  margin-top: ${({ $verticalPos }) => ($verticalPos === 'bottom' ? '8px' : '0')};
  margin-bottom: ${({ $verticalPos }) => ($verticalPos === 'top' ? '8px' : '0')};

  width: ${({ $width }) => $width || '100%'};
  border-radius: 6px;

  ${({ theme, $mode }) => {
    const tokens = (theme.components as any).dropdown?.[$mode] || (theme.components as any).dropdown?.light;
    if (!tokens) return '';
    return `
      background-color: ${tokens.bg};
      border: 1px solid ${tokens.border};
    `;
  }}

  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 0;
  overflow: hidden;
  overscroll-behavior: contain;
`;

const ThumbRoot = styled.div<{ $mode: DropdownMode }>`
  border-radius: 4px;
  cursor: pointer;
  border-inline: 0px solid transparent;
  background-clip: content-box;

  ${({ theme, $mode }) => {
    const tokens = (theme.components as any).dropdown?.[$mode] || (theme.components as any).dropdown?.light;
    if (!tokens) return '';
    return `
      background-color: ${tokens.scrollbar.default};
      &:hover { background-color: ${tokens.scrollbar.hover}; }
    `;
  }}
`;

const ListWrapper = styled.div`
  padding: 0 8px;
  &::before { content: ""; display: block; height: 8px; }
  &::after { content: ""; display: block; height: 8px; }
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  (
    {
      children,
      options,
      onSelect,
      selectedValue,
      isOpen,
      width,
      verticalPos = 'bottom',
      alignPos = 'left',
      maxHeight = 200,
      mode = 'light',
      disabled = false,
      onWheel,
      ...props
    },
    ref
  ) => {
    // Internal state for resolved positions
    const [adjustedVerticalPos, setAdjustedVerticalPos] = useState<'top' | 'bottom'>(verticalPos);
    const [adjustedAlignPos, setAdjustedAlignPos] = useState<'left' | 'right'>(alignPos);

    // Internal ref for measurement
    const internalRef = useRef<HTMLDivElement>(null);

    // Sync state with props when closed (reset)
    useLayoutEffect(() => {
      if (!isOpen) {
        setAdjustedVerticalPos(verticalPos);
        setAdjustedAlignPos(alignPos);
      }
    }, [isOpen, verticalPos, alignPos]);

    // Auto-positioning logic
    useLayoutEffect(() => {
      if (!isOpen || !internalRef.current) return;

      const dropdown = internalRef.current;
      const parent = dropdown.offsetParent as HTMLElement;
      if (!parent) return;

      const parentRect = parent.getBoundingClientRect();
      const dropdownRect = dropdown.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const viewportWidth = window.innerWidth;

      // 1. Vertical Auto-Positioning
      // Check space below
      const spaceBelow = viewportHeight - parentRect.bottom;
      // Check space above
      const spaceAbove = parentRect.top;

      let newVert = verticalPos;

      // If bottom is default but not enough space, and top HAS space -> Flip to top
      if (verticalPos === 'bottom' && spaceBelow < dropdownRect.height && spaceAbove > dropdownRect.height) {
        newVert = 'top';
      }
      // If top is default but not enough space, and bottom HAS space -> Flip to bottom
      else if (verticalPos === 'top' && spaceAbove < dropdownRect.height && spaceBelow > dropdownRect.height) {
        newVert = 'bottom';
      }

      // 2. Horizontal Auto-Positioning
      let newAlign = alignPos;

      // If aligning left (default)
      if (alignPos === 'left') {
        // Check if right side goes off-screen
        const rightEdge = parentRect.left + dropdownRect.width;
        if (rightEdge > viewportWidth) {
          newAlign = 'right';
        }
      }
      // If aligning right
      else if (alignPos === 'right') {
        // Check if left side goes off-screen (parentRect.right - dropdownWidth)
        const leftEdge = parentRect.right - dropdownRect.width;
        if (leftEdge < 0) {
          newAlign = 'left';
        }
      }

      // 3. Special Case: Force left if dropdown is wider than viewport
      if (viewportWidth < dropdownRect.width) {
        newAlign = 'left';
      }

      setAdjustedVerticalPos(newVert);
      setAdjustedAlignPos(newAlign);

    }, [isOpen, verticalPos, alignPos, maxHeight, width]); // Recalc if these change logic

    if (!isOpen || disabled) return null;

    // Combine refs function
    const setRefs = (element: HTMLDivElement | null) => {
      internalRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref) {
        (ref as any).current = element;
      }
    };

    return (
      <MenuContainerRoot
        ref={setRefs}
        $width={width}
        $verticalPos={adjustedVerticalPos}
        $alignPos={adjustedAlignPos}
        $mode={mode}
        {...props}
        onWheel={(e) => {
          e.stopPropagation();
          onWheel?.(e);
        }}
      >
        <Scrollbars
          autoHeight
          autoHeightMax={maxHeight}
          renderThumbVertical={(thumbProps: any) => <ThumbRoot {...thumbProps} $mode={mode} />}
        >
          <ListWrapper>
            {options ? (
              options.map((option) => (
                <OptionItem
                  key={option.value}
                  isSelected={selectedValue === option.value}
                  mode={mode}
                  onClick={(e) => {
                    option.onClick?.(option.value, e);
                    onSelect?.(option.value);
                  }}
                >
                  <Text variant="400-14">{option.label}</Text>
                </OptionItem>
              ))
            ) : (
              children
            )}
          </ListWrapper>
        </Scrollbars>
      </MenuContainerRoot>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;