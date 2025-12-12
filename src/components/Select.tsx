/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react'; 
import Dropdown, { OptionItem } from './Dropdown';
import Text from './Text';

export interface OptionType {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: OptionType[];
  value: string;
  onChange: (value: string) => void;
  width?: string;
  menuWidth?: string;
  disabled?: boolean;
  maxHeight?: number; 
}

const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  width: ${(props) => props.width || '100%'};
`;

const InputArea = styled.div`
  position: relative;
  width: 100%;
`;

const TriggerButton = styled.div<{ isOpen: boolean; isDisabled: boolean; isPlaceholder: boolean }>`
  padding: 4px 10px;
  border-radius: 6px;
  height : 32px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  box-sizing: border-box;
  overflow: hidden;

  /* 🎨 배경색 */
  background-color: ${(props) => {
    if (props.isDisabled) return props.theme.colors.coolgray[50];
    return props.theme.colors.white;
  }};

  /* 🎨 테두리색 */
  border: 1px solid ${(props) => {
    if (props.isDisabled) return props.theme.colors.coolgray[100];
    if (props.isOpen) return props.theme.colors.coolgray[500];
    return props.theme.colors.coolgray[200];
  }};

  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  /* 🎨 호버 효과 */
  &:hover {
    background-color: ${(props) => !props.isDisabled && props.theme.colors.coolgray[50]};
    border-color: ${(props) => !props.isDisabled && props.theme.colors.coolgray[400]};
  }
`;

const SelectedValueWrapper = styled.div`
  flex: 1;
  min-width: 0;
  margin-right: 10px;
  display: flex;
  align-items: center;
`;

function Select({ 
  label, 
  options, 
  value, 
  onChange, 
  width, 
  menuWidth, 
  disabled = false,
  maxHeight = 200 
}: SelectProps) {
  
  const theme = useTheme();

  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false); 
  
  const [dropdownPos, setDropdownPos] = useState<{ vertical: 'top' | 'bottom', align: 'left' | 'right' }>({
    vertical: 'bottom',
    align: 'left'
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;
  const displayValue = selectedOption ? selectedOption.label : '선택하세요';

  // [위치 자동 계산]
  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowWidth = document.documentElement.clientWidth; 
      const windowHeight = window.innerHeight;
      
      const DROPDOWN_HEIGHT = maxHeight + 40; 
      const spaceBelow = windowHeight - rect.bottom;
      
      const vertical = spaceBelow < (DROPDOWN_HEIGHT) ? 'top' : 'bottom'; 
      
      const dropdownWidthParsed = menuWidth ? parseInt(menuWidth, 10) : rect.width;
      const GAP_BUFFER = 10;
      const spaceRight = windowWidth - rect.left;
      const isOverflowRight = spaceRight < (dropdownWidthParsed + GAP_BUFFER);
      const isOverflowLeft = (rect.right - dropdownWidthParsed) < GAP_BUFFER;
      
      const align = (isOverflowRight && !isOverflowLeft) ? 'right' : 'left';

      setDropdownPos({ vertical, align });
    }
  }, [isOpen, menuWidth, maxHeight]);

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  // [외부 클릭 감지]
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && containerRef.current.contains(event.target as Node)) return;
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) return;
      setIsOpen(false);
    };

    const handleResize = () => setIsOpen(false);

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      window.addEventListener('resize', handleResize);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      window.removeEventListener('resize', handleResize);
    };
  }, [isOpen]);

  // 🎨 색상 반환 함수
  const getLabelColor = () => { 
    if (disabled) return theme.colors.coolgray[250];
    if (isOpen) return theme.colors.coolgray[800];
    return theme.colors.coolgray[800];
  };

  const getTextColor = () => { 
    if (disabled) return theme.colors.coolgray[300];
    if (isOpen) return theme.colors.coolgray[900];
    if (isPlaceholder) return theme.colors.coolgray[300]; 
    return theme.colors.coolgray[900]; 
  };

  const getArrowColor = () => { 
    if (disabled) return theme.colors.coolgray[200];
    if (isOpen) return theme.colors.coolgray[900];
    if (isHovered) return theme.colors.coolgray[900];
    return theme.colors.coolgray[300]; 
  };

  return (
    <Wrapper ref={containerRef} width={width}>
      {/* ✅ [수정 1] 상단 라벨 
          기존: variant="label"
          변경: variant="700-14" (Bold 14px)
          설명: variant에 이미 font-weight: 700이 포함되므로 style 속성은 제거해도 되지만, 안전을 위해 둠.
      */}
      <Text as="label" variant="700-14" color={getLabelColor()}>
        {label}
      </Text>

      <InputArea>
        <TriggerButton 
          isOpen={isOpen} 
          isDisabled={disabled} 
          isPlaceholder={isPlaceholder}
          onClick={toggleOpen}
          onMouseEnter={() => !disabled && setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
        >
          <SelectedValueWrapper>
            {/* ✅ [수정 2] 선택된 값 표시
                기존: variant="label"
                변경: variant="400-14" (Regular 14px)
            */}
            <Text 
              variant="400-14" 
              color={getTextColor()}
              style={{ 
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
                width: '100%',
                display: 'block'
              }}
            >
              {displayValue}
            </Text>
          </SelectedValueWrapper>

          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            stroke={getArrowColor()} 
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            style={{
              transform: isOpen 
                ? (dropdownPos.vertical === 'top' ? 'rotate(0deg)' : 'rotate(180deg)') 
                : 'rotate(0deg)',
              transition: 'transform 0.2s, stroke 0.2s', 
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
          >
            {options.map((option) => (
              <OptionItem
                key={option.value}
                isSelected={option.value === value}
                onClick={() => handleOptionClick(option.value)}
              >
                {/* ✅ [수정 3] 드롭다운 리스트 아이템
                    기존: variant="label"
                    변경: variant="400-14" (기본값)
                    설명: 선택 시 볼드 처리는 아래 style에서 제어하므로 기본은 400-14로 설정
                */}
                <Text 
                  variant="400-14" 
                  color={option.value === value ? theme.colors.green[600] : theme.colors.coolgray[800]}
                  style={{ fontWeight: option.value === value ? 'bold' : 'normal' }}
                >
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