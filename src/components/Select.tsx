/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { useTheme, Theme } from '@emotion/react'; 
import Dropdown, { OptionItem } from './Dropdown'; // DropdownMode 타입 필요 시 import
import Text from './Text';

export interface OptionType {
  label: string;
  value: string;
}

export type SelectMode = 'light' | 'dark' | 'transparent';

interface SelectProps {
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

// ✅ [간소화] Trigger(버튼)와 Label 색상만 계산
const useTriggerColors = ({
  theme,
  mode,
  disabled,
  isOpen,
  isPlaceholder,
  isHovered
}: {
  theme: Theme;
  mode: SelectMode;
  disabled: boolean;
  isOpen: boolean;
  isPlaceholder: boolean;
  isHovered: boolean;
}) => {
  return useMemo(() => {
    // 1. 비활성화 (Disabled)
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
      return { // Light Disabled
        label: theme.colors.coolgray[250],
        background: theme.colors.coolgray[75],
        border: 'transparent',
        text: theme.colors.coolgray[200],
        icon: theme.colors.coolgray[200],
        cursor: 'not-allowed',
      };
    }

    // 2. 투명 모드
    if (mode === 'transparent') {
      return {
        label: theme.colors.coolgray[800],
        background: isHovered ? `${theme.colors.black}0A` : 'transparent',
        border: isHovered ? 'transparent' : 'transparent',
        text: isPlaceholder ? theme.colors.coolgray[300] : theme.colors.coolgray[900],
        icon: isHovered || isOpen ? theme.colors.coolgray[900] : theme.colors.coolgray[300],
        cursor: 'pointer',
      };
    }

    // 3. 다크 모드
    if (mode === 'dark') {
      return {
        label: theme.colors.coolgray[300],
        background: isOpen 
          ? `${theme.colors.white}00` 
          : (isHovered ? `${theme.colors.white}14` : `${theme.colors.white}14`),
        border: isOpen 
          ? theme.colors.coolgray[700] 
          : (isHovered ? theme.colors.coolgray[600] : 'transparent'),
        text: isPlaceholder ? `${theme.colors.white}80` : theme.colors.white,
        icon: isHovered || isOpen ? theme.colors.white : theme.colors.coolgray[400],
        cursor: 'pointer',
      };
    }

    // 4. 라이트 모드 (Default)
    return {
      label: theme.colors.coolgray[800],
      background: isOpen 
        ? theme.colors.white 
        : (isHovered ? `${theme.colors.black}0A` : theme.colors.coolgray[50]),
      border: isOpen 
        ? theme.colors.coolgray[200] 
        : (isHovered ? theme.colors.coolgray[300] : 'transparent'),
      text: isPlaceholder ? theme.colors.coolgray[300] : theme.colors.coolgray[900],
      icon: isHovered || isOpen ? theme.colors.coolgray[900] : theme.colors.coolgray[300],
      cursor: 'pointer',
    };
  }, [theme, mode, disabled, isOpen, isPlaceholder, isHovered]);
};

// ... (Wrapper, InputArea, TriggerButton, SelectedValueWrapper 스타일은 그대로 유지) ...
const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  width: ${(props) => props.width || '100%'};
`;
const InputArea = styled.div` position: relative; width: 100%; `;
const TriggerButton = styled.div`
  padding: 4px 10px; border-radius: 6px; height : 32px; display: flex;
  justify-content: space-between; align-items: center; transition: all 0.2s;
  box-sizing: border-box; overflow: hidden; border-width: 1px; border-style: solid;
`;
const SelectedValueWrapper = styled.div` flex: 1; min-width: 0; margin-right: 10px; display: flex; align-items: center; `;


function Select({ 
  label, 
  options, 
  value, 
  onChange, 
  width, 
  menuWidth, 
  disabled = false,
  maxHeight = 200,
  mode = 'light' 
}: SelectProps) {
  
  const theme = useTheme();
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false); 
  const [dropdownPos, setDropdownPos] = useState<{ vertical: 'top' | 'bottom', align: 'left' | 'right' }>({
    vertical: 'bottom', align: 'left'
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;
  const displayValue = selectedOption ? selectedOption.label : '선택하세요';

  // ✅ 훅 이름 변경 (의도에 맞게)
  const colors = useTriggerColors({
    theme, mode, disabled, isOpen, isPlaceholder, isHovered
  });

  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      const spaceBelow = windowHeight - rect.bottom;
      const vertical = spaceBelow < (maxHeight + 40) ? 'top' : 'bottom'; 
      setDropdownPos({ vertical, align: 'left' });
    }
  }, [isOpen, maxHeight]);

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && containerRef.current.contains(event.target as Node)) return;
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };
    if (isOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isOpen]);

  return (
    <Wrapper ref={containerRef} width={width}>
      <Text as="label" variant="700-14" color={colors.label}>
        {label}
      </Text>

      <InputArea>
        <TriggerButton 
          onClick={toggleOpen}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          style={{
            backgroundColor: colors.background,
            borderColor: colors.border,
            cursor: colors.cursor
          }}
        >
          <SelectedValueWrapper>
            <Text 
              variant="400-14" 
              color={colors.text}
              style={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', width: '100%', display: 'block' }}
            >
              {displayValue}
            </Text>
          </SelectedValueWrapper>

          <svg 
            width="16" height="16" viewBox="0 0 24 24" fill="none" 
            stroke={colors.icon} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
            style={{
              transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: 'transform 0.2s ease-in-out',
              flexShrink: 0
            }}
          >
            <path d="m6 9 6 6 6-6" />
          </svg>
        </TriggerButton>

        {!disabled && isOpen && (
          // ✅ Dropdown에는 이제 mode만 넘겨줍니다. (하드코딩 스타일 제거됨)
          <Dropdown 
            ref={dropdownRef} 
            isOpen={isOpen} 
            width={menuWidth}
            verticalPos={dropdownPos.vertical}
            alignPos={dropdownPos.align}
            maxHeight={maxHeight}
            mode={mode} // 모드 전달
          >
            {options.map((option) => (
              <OptionItem
                key={option.value}
                isSelected={option.value === value}
                mode={mode} // OptionItem에도 모드 전달
                onClick={() => { onChange(option.value); setIsOpen(false); }}
              >
                {/* ✅ Text에서는 color 속성을 제거합니다. */}
                {/* OptionItem에서 color를 CSS로 제어하므로 자동으로 상속받습니다. */}
                <Text variant={option.value === value ? "700-14" : "400-14"}>
                  {option.label}
                </Text>
              </OptionItem>
            ))}
          </Dropdown>
        )}
      </InputArea>
    </Wrapper>
  );
}

export default Select;