/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import type { Theme } from '@emotion/react';

import { ChevronDown } from 'lucide-react';
import Dropdown, { OptionItem } from './Dropdown';
import Text from './Text';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export interface OptionType {
  label: string;
  value: string;
}

export type SelectMode = 'light' | 'dark' | 'transparent';

export interface SelectProps {
  label: string;
  options: OptionType[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
  menuWidth?: string;
  disabled?: boolean;
  maxHeight?: number;
  mode?: SelectMode;
}

interface TriggerColors {
  label: string;
  background: string;
  border: string;
  text: string;
  icon: string;
  cursor: string;
}

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
const PLACEHOLDER = '선택하세요';

// ------------------------------------------------------------------
// Styled Components
// ------------------------------------------------------------------
const WrapperRoot = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  width: ${({ $width }) => $width || '100%'};
`;

const InputArea = styled.div`
  position: relative;
  width: 100%;
`;

const TriggerButton = styled.button<{ $colors: TriggerColors }>`
  width: 100%;
  height: 32px;
  padding: 4px 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  box-sizing: border-box;
  overflow: hidden;
  border-width: 1px;
  border-style: solid;

  background-color: ${({ $colors }) => $colors.background};
  border-color: ${({ $colors }) => $colors.border};
  cursor: ${({ $colors }) => $colors.cursor};

  /* button reset */
  appearance: none;
  text-align: left;
`;

const SelectedValueWrapper = styled.div`
  flex: 1;
  min-width: 0;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

const ValueText = styled(Text)`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 100%;
  display: block;
`;

const StyledChevronDown = styled(ChevronDown) <{ $isOpen: boolean }>`
  flex-shrink: 0;
  transition: transform 0.2s ease-in-out;
  transform: rotate(${({ $isOpen }) => ($isOpen ? '180deg' : '0deg')});
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
function Select({
  label,
  options,
  value,
  onChange,
  width,
  menuWidth,
  disabled = false,
  maxHeight = 200,
  mode = 'light',
}: SelectProps) {
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [dropdownPos, setDropdownPos] = useState<{ vertical: 'top' | 'bottom'; align: 'left' | 'right' }>({
    vertical: 'bottom',
    align: 'left',
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;
  const displayValue = selectedOption ? selectedOption.label : PLACEHOLDER;

  const colors = useMemo(() => {
    // 1. Get token group based on mode (default: light)
    const selectTheme = (theme.components as any).select?.[mode] || (theme.components as any).select?.light;

    if (!selectTheme) {
      // Fallback if theme is missing
      return {
        label: '#000',
        background: '#fff',
        border: '#ccc',
        text: '#000',
        icon: '#ccc',
        cursor: 'pointer',
      } as TriggerColors;
    }

    // 2. Determine state
    let state = 'default';
    if (disabled) state = 'disabled';
    else if (isOpen) state = 'active'; // open state acts as active
    else if (isHovered) state = 'hover';

    // 3. Map tokens
    // Note: Some tokens might not have specific state keys if not defined in theme, so fallbacks are managed by theme logical structure
    // But our theme structure has flat keys for states inside each property (bg, border, etc.)

    // Helper to get token value safely
    const getToken = (prop: string, stateKey: string, fallbackState: string = 'default') => {
      const propGroup = selectTheme[prop];
      return propGroup[stateKey] || propGroup[fallbackState];
    };

    return {
      label: getToken('label', disabled ? 'disabled' : 'default'), // Label uses disabled or default
      background: getToken('bg', state),
      border: getToken('border', state),
      text: getToken('text', disabled ? 'disabled' : isPlaceholder ? 'placeholder' : 'default'),
      icon: getToken('icon', disabled ? 'disabled' : isOpen || isHovered ? 'active' : 'default'),
      cursor: disabled ? 'not-allowed' : 'pointer',
    } as TriggerColors;
  }, [theme, mode, disabled, isOpen, isPlaceholder, isHovered]);

  useLayoutEffect(() => {
    if (!isOpen || !containerRef.current) return;

    const rect = containerRef.current.getBoundingClientRect();
    const spaceBelow = window.innerHeight - rect.bottom;
    const vertical = spaceBelow < maxHeight + 40 ? 'top' : 'bottom';

    setDropdownPos({ vertical, align: 'left' });
  }, [isOpen, maxHeight]);

  useEffect(() => {
    if (!isOpen) return;

    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (containerRef.current?.contains(target)) return;
      if (dropdownRef.current?.contains(target)) return;
      setIsOpen(false);
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  const open = () => {
    if (disabled) return;
    setIsOpen(true);
  };

  const toggle = () => {
    if (disabled) return;
    setIsOpen((prev) => !prev);
  };

  return (
    <WrapperRoot ref={containerRef} $width={width}>
      <Text as="label" variant="700-14" color={colors.label}>
        {label}
      </Text>

      <InputArea>
        <TriggerButton
          type="button"
          $colors={colors}
          onClick={toggle}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onKeyDown={(e) => {
            if (e.key === 'Escape') setIsOpen(false);
            if (e.key === 'ArrowDown' && !isOpen) open();
          }}
          aria-haspopup="listbox"
          aria-expanded={isOpen}
          aria-disabled={disabled}
        >
          <SelectedValueWrapper>
            <ValueText variant="400-14" color={colors.text}>
              {displayValue}
            </ValueText>
          </SelectedValueWrapper>

          <StyledChevronDown
            $isOpen={isOpen}
            size={16}
            strokeWidth={2}
            color={colors.icon}
          />
        </TriggerButton>

        {!disabled && isOpen && (
          <Dropdown
            ref={dropdownRef}
            isOpen={isOpen}
            width={menuWidth}
            verticalPos={dropdownPos.vertical}
            alignPos={dropdownPos.align}
            maxHeight={maxHeight}
            mode={mode}
            disabled={disabled}
          >
            {options.map((option) => {
              const isSelected = option.value === value;
              return (
                <OptionItem
                  key={option.value}
                  isSelected={isSelected}
                  mode={mode}
                  onClick={() => {
                    onChange(option.value);
                    setIsOpen(false);
                  }}
                  role="option"
                  aria-selected={isSelected}
                >
                  <Text variant={isSelected ? '700-14' : '400-14'}>{option.label}</Text>
                </OptionItem>
              );
            })}
          </Dropdown>
        )}
      </InputArea>
    </WrapperRoot>
  );
}

export default Select;