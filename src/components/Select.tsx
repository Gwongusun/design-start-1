/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useEffect, useLayoutEffect, useMemo, useRef, useState } from 'react';
import { useTheme } from '@emotion/react';
import type { Theme } from '@emotion/react';

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
const PLACEHOLDER = '선택하세요';

const computeTriggerColors = (args: {
  theme: Theme;
  mode: SelectMode;
  disabled: boolean;
  isOpen: boolean;
  isPlaceholder: boolean;
  isHovered: boolean;
}): TriggerColors => {
  const { theme, mode, disabled, isOpen, isPlaceholder, isHovered } = args;

  // Disabled
  if (disabled) {
    if (mode === 'transparent') {
      return {
        label: theme.colors.coolgray[250],
        background: 'transparent',
        border: 'transparent',
        text: theme.colors.coolgray[300],
        icon: theme.colors.coolgray[200],
        cursor: 'not-allowed',
      };
    }
    if (mode === 'dark') {
      return {
        label: theme.colors.coolgray[250],
        background: `${theme.colors.white}0F`,
        border: 'transparent',
        text: `${theme.colors.white}40`,
        icon: theme.colors.coolgray[400],
        cursor: 'not-allowed',
      };
    }
    return {
      label: theme.colors.coolgray[250],
      background: theme.colors.coolgray[75],
      border: 'transparent',
      text: theme.colors.coolgray[200],
      icon: theme.colors.coolgray[200],
      cursor: 'not-allowed',
    };
  }

  // Transparent
  if (mode === 'transparent') {
    return {
      label: theme.colors.coolgray[800],
      background: isHovered ? `${theme.colors.black}0A` : 'transparent',
      border: 'transparent',
      text: isPlaceholder ? theme.colors.coolgray[300] : theme.colors.coolgray[900],
      icon: isHovered || isOpen ? theme.colors.coolgray[900] : theme.colors.coolgray[300],
      cursor: 'pointer',
    };
  }

  // Dark
  if (mode === 'dark') {
    return {
      label: theme.colors.coolgray[300],
      background: isOpen ? `${theme.colors.white}00` : `${theme.colors.white}14`,
      border: isOpen ? theme.colors.coolgray[700] : isHovered ? theme.colors.coolgray[600] : 'transparent',
      text: isPlaceholder ? `${theme.colors.white}80` : theme.colors.white,
      icon: isHovered || isOpen ? theme.colors.white : theme.colors.coolgray[400],
      cursor: 'pointer',
    };
  }

  // Light (default)
  return {
    label: theme.colors.coolgray[800],
    background: isOpen ? theme.colors.white : isHovered ? `${theme.colors.black}0A` : theme.colors.coolgray[50],
    border: isOpen ? theme.colors.coolgray[200] : isHovered ? theme.colors.coolgray[300] : 'transparent',
    text: isPlaceholder ? theme.colors.coolgray[300] : theme.colors.coolgray[900],
    icon: isHovered || isOpen ? theme.colors.coolgray[900] : theme.colors.coolgray[300],
    cursor: 'pointer',
  };
};

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

const ChevronIcon = styled.svg<{ $isOpen: boolean }>`
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
  const theme = useTheme() as Theme;

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

  const colors = useMemo(
    () =>
      computeTriggerColors({
        theme,
        mode,
        disabled,
        isOpen,
        isPlaceholder,
        isHovered,
      }),
    [theme, mode, disabled, isOpen, isPlaceholder, isHovered]
  );

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

          <ChevronIcon
            $isOpen={isOpen}
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={colors.icon}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
          >
            <path d="m6 9 6 6 6-6" />
          </ChevronIcon>
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