/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect, useLayoutEffect, useMemo } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react'; 
import Dropdown, { OptionItem } from './Dropdown'; 
import Text from './Text';

export interface OptionType {
  label: string;
  value: string;
}

// theme.ts에 정의된 input 모드 키값과 일치시킴
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

// ✅ Theme Token Mapping Logic
const useTriggerColors = ({
  theme,
  mode,
  disabled,
  isOpen,
  isPlaceholder,
  isHovered
}: {
  theme: any; 
  mode: SelectMode;
  disabled: boolean;
  isOpen: boolean;
  isPlaceholder: boolean;
  isHovered: boolean;
}) => {
  return useMemo(() => {
    // 1. 테마에서 현재 모드(light/dark/transparent)에 맞는 토큰 가져오기
    const token = theme.components.input[mode];

    // 2. 상태별 스타일 반환
    
    // Disabled (비활성화)
    if (disabled) {
      return {
        label: token.label.disabled,
        background: token.bg.disabled,
        border: 'transparent',
        text: token.text.disabled,
        icon: token.icon.disabled,
        cursor: 'not-allowed',
      };
    }

    // Active (열림 상태)
    if (isOpen) {
      return {
        label: token.label.default,
        background: token.bg.active,
        border: token.border.active,
        text: isPlaceholder ? token.text.placeholder : token.text.default,
        icon: token.icon.active,
        cursor: 'pointer',
      };
    }

    // Hover (마우스 올림)
    if (isHovered) {
      return {
        label: token.label.default,
        background: token.bg.hover,
        border: token.border.hover,
        text: isPlaceholder ? token.text.placeholder : token.text.default,
        icon: token.icon.active, // Hover시 아이콘도 진하게
        cursor: 'pointer',
      };
    }

    // Default (기본)
    return {
      label: token.label.default,
      background: token.bg.default,
      border: token.border.default,
      text: isPlaceholder ? token.text.placeholder : token.text.default,
      icon: token.icon.default,
      cursor: 'pointer',
    };
  }, [theme, mode, disabled, isOpen, isPlaceholder, isHovered]);
};

// ... (스타일 컴포넌트 Wrapper, InputArea 등은 기존과 동일하므로 생략하거나 그대로 유지) ...
const Wrapper = styled.div<{ width?: string }>`
  display: flex; flex-direction: column; gap: 8px; text-align: left; width: ${(props) => props.width || '100%'};
`;
const InputArea = styled.div` position: relative; width: 100%; `;
const TriggerButton = styled.div`
  padding: 4px 10px; border-radius: 6px; height : 32px; display: flex;
  justify-content: space-between; align-items: center; transition: all 0.2s;
  box-sizing: border-box; overflow: hidden; border-width: 1px; border-style: solid;
`;
const SelectedValueWrapper = styled.div` flex: 1; min-width: 0; margin-right: 10px; display: flex; align-items: center; `;

function Select({ 
  label, options, value, onChange, width, menuWidth, 
  disabled = false, maxHeight = 200, mode = 'light' 
}: SelectProps) {
  
  const theme = useTheme(); // Emotion Theme Hook
  const [isOpen, setIsOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false); 
  const [dropdownPos, setDropdownPos] = useState<{ vertical: 'top' | 'bottom', align: 'left' | 'right' }>({
    vertical: 'bottom', align: 'left'
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;
  const displayValue = selectedOption ? selectedOption.label : '선택하세요';

  // ✅ 훅 사용
  const colors = useTriggerColors({
    theme, mode, disabled, isOpen, isPlaceholder, isHovered
  });

  // ... (Dropdown 위치 계산 로직 기존 동일) ...
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
          <Dropdown 
            ref={dropdownRef} 
            isOpen={isOpen} 
            width={menuWidth}
            verticalPos={dropdownPos.vertical}
            alignPos={dropdownPos.align}
            maxHeight={maxHeight}
            mode={mode} // Dropdown 내부에서 mode에 따라 배경색 처리 필요
          >
            {options.map((option) => (
              <OptionItem
                key={option.value}
                isSelected={option.value === value}
                mode={mode}
                onClick={() => { onChange(option.value); setIsOpen(false); }}
              >
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