/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Dropdown, { OptionItem } from './Dropdown';

// 데이터 타입 정의
export interface OptionType {
  label: string;
  value: string;
}

interface SelectProps {
  label: string;
  options: OptionType[];
  value: string; // 부모에서 빈 문자열("")을 넘겨주면 선택 안 된 상태가 됩니다.
  onChange: (value: string) => void;
  width?: string;
  menuWidth?: string;
}

const Wrapper = styled.div<{ width?: string }>`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  width: ${(props) => props.width || '100%'};
`;

const Label = styled.label`
  font-size: 14px;
  font-weight: bold;
  color: #333;
`;

const TriggerButton = styled.div<{ isOpen: boolean }>`
  padding: 6px 8px;
  border: 1px solid ${(props) => (props.isOpen ? '#63b3ed' : '#ccc')};
  border-radius: 6px;
  font-size: 14px;
  background-color: white;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: border-color 0.2s;
  overflow: hidden;

  &:hover {
    border-color: #63b3ed;
  }
`;

// ✅ [수정] isPlaceholder prop을 받아 색상을 다르게 처리합니다.
const SelectedValue = styled.span<{ isPlaceholder: boolean }>`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 10px;
  color: ${(props) => (props.isPlaceholder ? '#999' : '#333')}; /* 선택 안됐을 땐 회색 */
`;

const Arrow = styled.span`
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  background-image: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23999999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="m6 9 6 6 6-6"/></svg>');
  background-repeat: no-repeat;
  background-position: center;
`;

function Select({ label, options, value, onChange, width, menuWidth }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  // 현재 선택된 옵션 찾기
  const selectedOption = options.find((option) => option.value === value);
  
  // ✅ [수정] 선택된 값이 없으면 true
  const isPlaceholder = !selectedOption;
  
  // ✅ [수정] 선택된 값이 없으면 "선택하세요" 출력
  const displayValue = selectedOption ? selectedOption.label : '선택하세요';

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <Wrapper ref={containerRef} width={width}>
      <Label>{label}</Label>
      <TriggerButton isOpen={isOpen} onClick={toggleOpen}>
        {/* ✅ [수정] isPlaceholder prop 전달 */}
        <SelectedValue isPlaceholder={isPlaceholder}>
          {displayValue}
        </SelectedValue>
        <Arrow></Arrow>
      </TriggerButton>

      <Dropdown isOpen={isOpen} width={menuWidth}>
        {options.map((option) => (
          <OptionItem
            key={option.value}
            isSelected={option.value === value}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </OptionItem>
        ))}
      </Dropdown>
    </Wrapper>
  );
}

export default Select;