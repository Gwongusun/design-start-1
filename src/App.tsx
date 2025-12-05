import { useState } from 'react';
import Select, { OptionType } from './components/Select';

function App() {
  const [framework, setFramework] = useState<string>('react');

  const options: OptionType[] = [
    { value: 'react', label: 'React (Facebook에서 만든 UI 라이브러리)' },
    { value: 'vue', label: 'Vue (진입장벽이 낮고 유연한 프레임워크)' },
    { value: 'angular', label: 'Angular (Google이 만든 완전체 프레임워크)' },
    { value: 'svelte', label: 'Svelte (가상돔 없는 새로운 접근)' },
    { value: 'next', label: 'Next.js (React 기반의 풀스택 프레임워크)' },
    { value: 'nuxt', label: 'Nuxt.js (Vue 기반의 강력한 프레임워크)' },
    { value: 'jquery', label: 'jQuery (전설의 라이브러리, 아직 살아있다)' },
  ];

  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>TypeScript + Emotion Select</h1>
      
      <div style={{ display: 'flex', justifyContent: 'center', marginTop: '50px' }}>
        <Select
          label="프레임워크 선택"
          options={options}
          value={framework}
          onChange={(value) => setFramework(value)}
          width="200px"      
          menuWidth="400px"  
        />
      </div>

      <p style={{ marginTop: '100px' }}>
        현재 선택된 값: <strong>{framework}</strong>
      </p>
    </div>
  );
}

export default App;