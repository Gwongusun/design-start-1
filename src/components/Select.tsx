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

// 버튼과 드롭다운만 감싸는 영역 (위치 기준점)
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

// Dropdown 위치 및 간격 제어를 위한 래퍼
const DropdownRefWrapper = styled.div<{ isTop: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  pointer-events: none;
  z-index: 1000;

  & > * {
    pointer-events: auto;

    /* 1. 위로 열릴 때 (isTop === true) -> 버튼 위 간격 */
    ${(props) => props.isTop && `
      margin-bottom: 6px !important; 
    `}

    /* 2. 아래로 열릴 때 (isTop === false) -> 버튼 아래 간격 */
    ${(props) => !props.isTop && `
      margin-top: 6px !important; 
    `}
  }
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
  
  const [dropdownPos, setDropdownPos] = useState<{ vertical: 'top' | 'bottom', align: 'left' | 'right' }>({
    vertical: 'bottom',
    align: 'left'
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;
  const displayValue = selectedOption ? selectedOption.label : '선택하세요';

  // [위치 계산 로직]
useLayoutEffect(() => {
    if (isOpen && containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const windowWidth = document.documentElement.clientWidth; 
      const windowHeight = window.innerHeight;
      
      // 높이 계산 (기존과 동일)
      const DROPDOWN_HEIGHT = maxHeight + 40; 
      const spaceBelow = windowHeight - rect.bottom;
      const vertical = spaceBelow < (DROPDOWN_HEIGHT) ? 'top' : 'bottom'; 
      
      // 너비 및 좌우 계산 (수정된 부분)
      const dropdownWidthParsed = menuWidth ? parseInt(menuWidth, 10) : rect.width;
      const GAP_BUFFER = 10; // 여유 공간 (기존 50은 너무 넓을 수 있어 10 정도로 줄임, 원하시면 50 유지)

      // 1. 오른쪽 공간이 부족한지 확인 (기존 로직)
      // (화면 전체 폭 - 버튼 왼쪽 위치)가 (드롭다운 폭 + 여유공간)보다 작으면 오른쪽이 좁은 것
      const spaceRight = windowWidth - rect.left;
      const isOverflowRight = spaceRight < (dropdownWidthParsed + GAP_BUFFER);

      // 2. 왼쪽 공간이 부족한지 확인 (새로 추가된 로직)
      // (버튼 오른쪽 끝 위치 - 드롭다운 폭)이 0보다 작으면, 
      // 오른쪽 정렬(align: right)을 했을 때 드롭다운이 화면 왼쪽 밖으로 튀어나감
      const isOverflowLeft = (rect.right - dropdownWidthParsed) < GAP_BUFFER;

      // [최종 결정]
      // 오른쪽이 부족하면(isOverflowRight) 보통 'right' 정렬을 해야 하지만,
      // 왼쪽 공간마저 부족하다면(isOverflowLeft) -> 사용자 요청대로 'left'로 강제
      // 즉, "오른쪽이 좁은데 + 왼쪽은 안 좁을 때"만 'right'를 씁니다.
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

  // [수정됨: 스크롤 이벤트 리스너 제거]
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // 1. 컨테이너(버튼) 클릭 시 무시 (toggleOpen이 처리)
      if (containerRef.current && containerRef.current.contains(event.target as Node)) {
        return;
      }
      // 2. 드롭다운 내부 클릭 시 무시
      if (dropdownRef.current && dropdownRef.current.contains(event.target as Node)) {
        return;
      }
      // 그 외 영역 클릭 시 닫기
      setIsOpen(false);
    };

    // 윈도우 리사이즈 시에는 닫는 것이 안전하므로 유지
    const handleResize = () => setIsOpen(false);

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      // window.addEventListener('scroll', ...); <--- 스크롤 감지 로직 제거됨
      window.addEventListener('resize', handleResize);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      // window.removeEventListener('scroll', ...); <--- 제거됨
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
          <DropdownRefWrapper 
            ref={dropdownRef} 
            isTop={dropdownPos.vertical === 'top'} 
          >
            <Dropdown 
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
          </DropdownRefWrapper>
        )}
      </InputArea>
    </Wrapper>
  );
}

export default Select;