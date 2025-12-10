/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Dropdown, { OptionItem } from './Dropdown';
import Text from './Text';

// 🎨 [색상 정의]
const COLORS = {
  default: {
    bg: 'white',
    border: '#ccc',
    text: '#333',
    label: '#333',
    arrow: '#999', 
  },
  placeholder: {
    bg: 'white',
    border: '#ccc',
    text: '#999',
    label: '#333',
    arrow: '#999',
  },
  hover: {
    bg: '#fafafa',
    border: '#63b3ed', 
    text: '#333',
    label: '#333',
    arrow: '#63b3ed', // 🔥 호버 시 바뀔 화살표 색상 (파란색)
  },
  open: {
    bg: 'white',
    border: '#63b3ed',
    text: '#333',
    label: '#333',
    arrow: '#333',   
  },
  disabled: {
    bg: '#f7fafc',
    border: '#e2e8f0',
    text: '#a0aec0',
    label: '#a0aec0',
    arrow: '#cbd5e0', 
  }
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
}

const Wrapper = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  width: ${(props) => props.width || '100%'};
`;

// TriggerButton: 이제 복잡한 CSS 없이 배경과 테두리만 담당합니다.
const TriggerButton = styled.div<{ isOpen: boolean; isDisabled: boolean; isPlaceholder: boolean }>`
  padding: 3px 10px;
  border-radius: 6px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.2s;
  overflow: hidden;
  height: 40px;

  /* 배경색 */
  background-color: ${(props) => 
    props.isDisabled ? COLORS.disabled.bg 
    : props.isOpen ? COLORS.open.bg 
    : props.isPlaceholder ? COLORS.placeholder.bg 
    : COLORS.default.bg
  };

  /* 테두리색 */
  border: 1px solid ${(props) => 
    props.isDisabled ? COLORS.disabled.border 
    : props.isOpen ? COLORS.open.border 
    : props.isPlaceholder ? COLORS.placeholder.border
    : COLORS.default.border
  };

  cursor: ${(props) => (props.isDisabled ? 'not-allowed' : 'pointer')};

  /* 호버 시 배경/테두리 변경 */
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

function Select({ label, options, value, onChange, width, menuWidth, disabled = false }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  
  // ✅ [핵심 1] 마우스가 올라갔는지를 감시하는 변수(State)를 만듭니다.
  const [isHovered, setIsHovered] = useState<boolean>(false); 
  
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const isPlaceholder = !selectedOption;
  const displayValue = selectedOption ? selectedOption.label : '선택하세요';

  const toggleOpen = () => {
    if (disabled) return;
    setIsOpen(!isOpen);
  };

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

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

  // ✅ [핵심 2] 현재 상태(Disabled / Open / Hover)에 따라 '색상 코드'를 계산해서 돌려주는 함수
  const getArrowColor = () => {
    if (disabled) return COLORS.disabled.arrow;
    if (isOpen) return COLORS.open.arrow;
    if (isHovered) return COLORS.hover.arrow; // 마우스가 올라가면 이 색을 씁니다!
    return COLORS.default.arrow;
  };

  return (
    <Wrapper ref={containerRef} width={width}>
      <Text as="label" variant="label" color={getLabelColor()} style={{ fontWeight: 'bold' }}>
        {label}
      </Text>

      <TriggerButton 
        isOpen={isOpen} 
        isDisabled={disabled}
        isPlaceholder={isPlaceholder}
        onClick={toggleOpen}
        
        // ✅ [핵심 3] 마우스가 들어오고 나갈 때 상태를 변경합니다.
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        <SelectedValueWrapper>
          <Text 
            variant="bodyMedium" 
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

        {/* ✅ [핵심 4] 사용자님이 찾으신 stroke 부분에 계산된 색상(getArrowColor)을 꽂아넣습니다! */}
        <svg
          width="16"
          height="16"
          viewBox="0 0 24 24"
          fill="none"
          stroke={getArrowColor()}  /* 여기가 마법이 일어나는 곳입니다 */
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{
            transform: isOpen ? 'rotate(180deg)' : 'rotate(0deg)',
            transition: 'transform 0.2s, stroke 0.2s', // 색상도 부드럽게 변하게 설정
            flexShrink: 0
          }}
        >
          <path d="m6 9 6 6 6-6" />
        </svg>

      </TriggerButton>

      {!disabled && (
        <Dropdown isOpen={isOpen} width={menuWidth}>
          {options.map((option) => (
            <OptionItem
              key={option.value}
              isSelected={option.value === value}
              onClick={() => handleOptionClick(option.value)}
            >
              <Text 
                variant="bodyMedium" 
                color={option.value === value ? '#68d391' : '#333'}
                style={{ fontWeight: option.value === value ? 'bold' : 'normal' }}
              >
                {option.label}
              </Text>
            </OptionItem>
          ))}
        </Dropdown>
      )}
    </Wrapper>
  );
}

export default Select;