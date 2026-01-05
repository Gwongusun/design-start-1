/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import type { HTMLAttributes, ReactNode } from 'react';
import { forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import type { Theme } from '@emotion/react';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export type DropdownMode = 'light' | 'dark' | 'transparent';

export interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
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
const getDropdownPalette = (theme: Theme, mode: DropdownMode = 'light') => {
  if (mode === 'dark') {
    return {
      menuBg: theme.colors.coolgray[800],
      menuBorder: theme.colors.coolgray[700],
      text: theme.colors.coolgray[100],
      textSelected: theme.colors.green[400],
      itemBgSelected: theme.colors.coolgray[700],
      itemBgHover: theme.colors.coolgray[700],
      scrollbar: theme.colors.coolgray[600],
      scrollbarHover: theme.colors.coolgray[500],
    };
  }

  // light + transparent는 동일 팔레트(배경/보더만 컴포넌트에서 조정 필요 시 분기)
  return {
    menuBg: theme.colors.white,
    menuBorder: theme.colors.coolgray[150],
    text: theme.colors.coolgray[800],
    textSelected: theme.colors.green[600],
    itemBgSelected: theme.colors.green[50],
    itemBgHover: theme.colors.coolgray[50],
    scrollbar: theme.colors.coolgray[200],
    scrollbarHover: theme.colors.coolgray[300],
  };
};

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
    const palette = getDropdownPalette(theme, $mode);
    return `
      background-color: ${$isSelected ? palette.itemBgSelected : 'transparent'};
      color: ${$isSelected ? palette.textSelected : palette.text};

      /* 자식(<Text>)이 반드시 부모 색상을 따르도록 강제 */
      & > * { color: inherit !important; }

      &:hover {
        background-color: ${$isSelected ? palette.itemBgSelected : palette.itemBgHover};
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
    const palette = getDropdownPalette(theme, $mode);
    return `
      background-color: ${palette.menuBg};
      border: 1px solid ${palette.menuBorder};
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
    const palette = getDropdownPalette(theme, $mode);
    return `
      background-color: ${palette.scrollbar};
      &:hover { background-color: ${palette.scrollbarHover}; }
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
    if (!isOpen || disabled) return null;

    return (
      <MenuContainerRoot
        ref={ref}
        $width={width}
        $verticalPos={verticalPos}
        $alignPos={alignPos}
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
          <ListWrapper>{children}</ListWrapper>
        </Scrollbars>
      </MenuContainerRoot>
    );
  }
);

Dropdown.displayName = 'Dropdown';

export default Dropdown;