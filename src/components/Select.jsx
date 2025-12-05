// src/components/Select.jsx
import { useState, useRef, useEffect } from 'react';
import Dropdown from './Dropdown'; // 1. 분리한 드롭다운 불러오기

function Select({ label, options, value, onChange, width, menuWidth }) {
  const [isOpen, setIsOpen] = useState(false);
  const containerRef = useRef(null); // 이름 변경: selectRef -> containerRef (더 명확하게)

  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '선택해주세요';

  const toggleOpen = () => setIsOpen(!isOpen);

  const handleOptionClick = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="select-wrapper" ref={containerRef} style={{ width: width }}>
      <label className="select-label">{label}</label>
      
      {/* 클릭하는 버튼 부분 */}
      <div className={`select-box ${isOpen ? 'open' : ''}`} onClick={toggleOpen}>
        <span className="selected-value">{displayValue}</span>
        <span className="arrow">▼</span>
      </div>

      {/* 2. 직접 div를 그리는 대신 Dropdown 컴포넌트 사용 */}
      <Dropdown isOpen={isOpen} width={menuWidth}>
        {/* Dropdown 안에 들어갈 내용은 Select가 결정해서 넣어줌 */}
        {options.map((option) => (
          <div
            key={option.value}
            className={`select-option ${option.value === value ? 'selected' : ''}`}
            onClick={() => handleOptionClick(option.value)}
          >
            {option.label}
          </div>
        ))}
      </Dropdown>
    </div>
  );
}

export default Select;