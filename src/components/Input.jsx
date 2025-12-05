// src/components/Input.jsx
import React from 'react';

// Input 컴포넌트: 라벨(label), 타입(type), 플레이스홀더(placeholder)를 받아서 그립니다.
function Input({ label, type, placeholder }) {
  return (
    <div style={{ marginBottom: '20px' }}>
      <label className="label">{label}</label>
      <input 
        type={type} 
        className="input-field" 
        placeholder={placeholder} 
      />
    </div>
  );
}

export default Input;