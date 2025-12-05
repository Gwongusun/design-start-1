// src/components/Select.jsx
import { useState, useRef, useEffect } from 'react';

function Select({ label, options, value, onChange }) {
  const [isOpen, setIsOpen] = useState(false); // 메뉴가 열렸는지 관리하는 상태
  const selectRef = useRef(null); // 외부 클릭 감지를 위한 참조

  // 현재 선택된 값의 라벨(화면에 보여줄 글씨) 찾기
  const selectedOption = options.find(option => option.value === value);
  const displayValue = selectedOption ? selectedOption.label : '선택해주세요';

  // 메뉴 열고 닫기 토글 함수
  const toggleOpen = () => setIsOpen(!isOpen);

  // 옵션 클릭했을 때 실행될 함수
  const handleOptionClick = (optionValue) => {
    onChange(optionValue); // 부모에게 선택된 값 전달
    setIsOpen(false); // 메뉴 닫기
  };

  // 외부 클릭 시 메뉴 닫기 (선택 사항이지만 UX를 위해 좋음)
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (selectRef.current && !selectRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="select-wrapper" ref={selectRef}>
      <label className="select-label">{label}</label>
      
      {/* 셀렉트 박스 (버튼 역할) */}
      <div className={`select-box ${isOpen ? 'open' : ''}`} onClick={toggleOpen}>
        {displayValue}
        <span className="arrow">▼</span>
      </div>

      {/* 드롭다운 메뉴 목록 */}
      {isOpen && (
        <div className="select-menu">
          {options.map((option) => (
            <div
              key={option.value}
              className={`select-option ${option.value === value ? 'selected' : ''}`}
              onClick={() => handleOptionClick(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Select;