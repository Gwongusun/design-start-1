// src/App.jsx
import { useState } from 'react';
import './App.css';
import Select from './components/Select'; // 방금 만든 컴포넌트 불러오기

function App() {
  // 선택된 값을 저장할 '상태(State)' 만들기
  const [framework, setFramework] = useState('react');

  // 셀렉트 박스에 들어갈 옵션 목록
  const options = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
  ];

  return (
    <div className="App">
      <h1>Select Component 만들기</h1>
      
      <div style={{ width: '300px', margin: '0 auto' }}>
        <Select
          label="좋아하는 프레임워크 선택"
          options={options}
          value={framework}
          onChange={(e) => setFramework(e.target.value)}
        />
      </div>

      <p>현재 선택된 값: <strong>{framework}</strong></p>
    </div>
  );
}

export default App;