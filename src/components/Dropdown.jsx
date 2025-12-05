// src/components/Dropdown.jsx

function Dropdown({ children, isOpen, width, style }) {
  // 열리지 않았으면 아예 그리지 않음
  if (!isOpen) return null;

  return (
    <div 
      className="dropdown-menu" 
      style={{ 
        width: width,  // 외부에서 지정한 너비 적용
        ...style       // 추가적인 스타일이 있다면 적용 (예: 위치 조정)
      }}
    >
      {children}
    </div>
  );
}

export default Dropdown;