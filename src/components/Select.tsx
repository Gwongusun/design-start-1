/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import styled from '@emotion/styled';
import Dropdown, { OptionItem } from './Dropdown';
import Text from './Text';

const COLORS = {
  default: { bg: 'white', border: '#ccc', text: '#333', label: '#333', arrow: '#999' },
  placeholder: { bg: 'white', border: '#ccc', text: '#999', label: '#333', arrow: '#999' },
  hover: { bg: '#fafafa', border: '#63b3ed', text: '#333', label: '#333', arrow: '#63b3ed' },
  open: { bg: 'white', border: '#63b3ed', text: '#333', label: '#333', arrow: '#333' },
  disabled: { bg: '#f7fafc', border: '#e2e8f0', text: '#a0aec0', label: '#a0aec0', arrow: '#cbd5e0' }
};

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

// 버튼과 드롭다운의 기준점이 되는 영역
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

  background-color: ${(props) => 
    props.isDisabled ? COLORS.disabled.bg 
    : props.isOpen ? COLORS.open.bg 
    : props.isPlaceholder ? COLORS.placeholder.bg 
    : COLORS.default.bg
  };

  border: 1px solid ${(props) => 
    props.isDisabled ? COLORS.disabled.border 
    : props.isOpen ? COLORS.open.border 
    : props.isPlaceholder ? COLORS.placeholder.border
    : COLORS.default.border
  };

  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  &:hover {
    background-color: ${(props) => !props.isDisabled && COLORS.hover.bg};
    border-color: ${(props) => !props.isDisabled && COLORS.hover.border};
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
  
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [isHovered, setIsHovered] = useState<boolean>(false); 
  
  // 드롭다운 위치 상태 관리
  const [dropdownPos, setDropdownPos] = useState<{ vertical: 'top' | 'bottom', align: 'left' | 'right' }>({
    vertical: 'bottom',
    align: 'left'
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;
  const displayValue = selectedOption ? selectedOption.label : '선택하세요';

  // [위치 자동 계산 로직]
  useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowWidth = document.documentElement.clientWidth; 
      const windowHeight = window.innerHeight;
      
      const DROPDOWN_HEIGHT = maxHeight + 40; 
      const spaceBelow = windowHeight - rect.bottom;
      
      // 1. 위/아래 결정
      const vertical = spaceBelow < (DROPDOWN_HEIGHT) ? 'top' : 'bottom'; 
      
      // 2. 좌/우 결정
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
      // 버튼 클릭은 무시 (toggleOpen이 처리함)
      if (containerRef.current && containerRef.current.contains(event.target as Node)) {
        return;
      }
      // 드롭다운 내부 클릭 무시 (Dropdown 내부 로직 보호)
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
        return;
      }
      // 그 외 영역 클릭 시 닫기
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

  const getLabelColor = () => { 
    if (disabled) return COLORS.disabled.label;
    if (isOpen) return COLORS.open.label;
    return COLORS.default.label;
  };
  const getTextColor = () => { 
    if (disabled) return COLORS.disabled.text;
    if (isOpen) return COLORS.open.text;
    if (isPlaceholder) return COLORS.placeholder.text;
    return COLORS.default.text;
  };
  const getArrowColor = () => { 
    if (disabled) return COLORS.disabled.arrow;
    if (isOpen) return COLORS.open.arrow;
    if (isHovered) return COLORS.hover.arrow; 
    return COLORS.default.arrow;
  };

  return (
    <Wrapper ref={containerRef} width={width}>
      <Text as="label" variant="label" color={getLabelColor()} style={{ fontWeight: 'bold' }}>
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
            <Text 
              variant="label" 
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

          {/* 화살표 아이콘 */}
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

        {/* ✅ [핵심 변경] DropdownRefWrapper 제거 
           Dropdown 컴포넌트에 직접 ref를 전달하고, 위치 props를 넘깁니다.
        */}
        {!disabled && isOpen && (
          <Dropdown 
            ref={dropdownRef} // forwardRef 덕분에 여기에 직접 ref 연결 가능!
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
                <Text 
                  variant="label" 
                  color={option.value === value ? '#68d391' : '#333'}
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