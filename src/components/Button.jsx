// src/components/Button.jsx
import React from 'react';

// Button 컴포넌트: variant(색상 종류)와 children(안에 들어갈 글자)을 받아서 그립니다.
function Button({ variant, children }) {
  // `btn-primary` 혹은 `btn-danger` 클래스가 자동으로 만들어집니다.
  const className = `btn btn-${variant}`;
  
  return (
    <button className={className}>
      {children}
    </button>
  );
}

export default Button;