/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';

// ✅ 핵심 수정: components 폴더 안에서 불러오도록 경로 변경
import Select, { OptionType } from './components/Select';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  gap: 30px;
  padding: 50px;
  max-width: 600px;
  margin: 0 auto;
`;

export default function App() {
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('react');

  const options: OptionType[] = [
    { value: 'react', label: 'React (Facebook에서 만든 UI 라이브러리)' },
    { value: 'vue', label: 'Vue (진입장벽이 낮고 유연한 프레임워크)' },
    { value: 'angular', label: 'Angular (Google이 만든 완전체 프레임워크)' },
    { value: 'svelte', label: 'Svelte (가상돔 없는 새로운 접근)' },
    { value: 'next', label: 'Next.js (React 기반의 풀스택 프레임워크)' },
    { value: 'nuxt', label: 'Nuxt.js (Vue 기반의 강력한 프레임워크)' },
    { value: 'jquery', label: 'jQuery (전설의 라이브러리, 아직 살아있다)' },
    { value: 'ember', label: 'Ember.js (야심찼던 초창기 SPA 프레임워크)' },
    { value: 'backbone', label: 'Backbone.js (MVC 패턴의 조상님)' },
    { value: 'meteor', label: 'Meteor.js (풀스택 자바스크립트 플랫폼)' },
  ];

  return (
    <Container>
      <h3>1. Default & Hover (기본 상태)</h3>
      <Select 
        label="디폴트 상태" 
        options={options} 
        value={val1} 
        onChange={setVal1} 
      />

      <h3>2. Active/Pressed (값이 선택된 상태)</h3>
      <Select 
        label="선택 완료 상태" 
        options={options} 
        value={val2} 
        onChange={setVal2} 
      />

      <h3>3. Disabled (선택 불가 - 빈 값)</h3>
      <Select 
        label="비활성화 (값 없음)" 
        options={options} 
        value="" 
        onChange={() => {}} 
        disabled={true} 
      />

      <h3>4. Disabled with Value (선택 불가 - 값 있음)</h3>
      <Select 
        label="비활성화 (값 있음)" 
        options={options} 
        value="react" 
        onChange={() => {}} 
        disabled={true} 
      />
    </Container>
  );
}