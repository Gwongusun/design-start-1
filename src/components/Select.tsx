/** @jsxImportSource @emotion/react */
import { useState, useRef, useEffect } from 'react';
import styled from '@emotion/styled';
import Dropdown from './Dropdown';

// 데이터 타입 정의
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
  padding: 12px 16px;
  border: 1px solid ${(props) => (props.isOpen ? '#63b3ed' : '#ccc')};
  border-radius: 12px;
  font-size: 16px;
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

const SelectedValue = styled.span`
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  flex: 1;
  margin-right: 10px;
`;

const Arrow = styled.span`
  flex-shrink: 0;
  font-size: 12px;
  color: #999;
`;

const OptionItem = styled.div<{ isSelected: boolean }>`
  padding: 14px 20px;
  font-size: 16px;
  color: ${(props) => (props.isSelected ? '#68d391' : '#333')};
  background-color: ${(props) => (props.isSelected ? '#f0fff4' : 'transparent')};
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
  cursor: pointer;
  transition: all 0.2s;

  &:hover {
    background-color: #f7f7f7;
  }
`;

function Select({ label, options, value, onChange, width, menuWidth }: SelectProps) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const containerRef = useRef<HTMLDivElement>(null);

  const selectedOption = options.find((option) => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '선택해주세요';

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
        <SelectedValue>{displayValue}</SelectedValue>
        <Arrow>▼</Arrow>
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