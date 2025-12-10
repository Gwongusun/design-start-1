/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';

// ✅ 1. CSS 파일 import (CSS 변수 로드)
import './styles/typography.css'; 

// ✅ 2. 직접 만드신 컴포넌트 import
import Select, { OptionType } from './components/Select';
import Text from './components/Text'; 

// -------------------------------------------------------------------------
// 스타일링 (레이아웃 관련만 남김)
// -------------------------------------------------------------------------

const SelectWrapper = styled.div`
  margin-bottom: 10px;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  max-width: 600px;
  margin: 0 auto;
`;

// -------------------------------------------------------------------------
// 메인 App 컴포넌트
// -------------------------------------------------------------------------

export default function App() {
  const [framework, setFramework] = useState('');
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
      {/* ✅ Text 컴포넌트 사용 
         - variant: typography.ts 에 정의된 키값 (displayLarge, h1, h2, bodyLarge 등)
         - as: 렌더링될 HTML 태그 (h1, h3, span, p 등)
      */}

      {/* --- [상단] 타이틀 --- */}
      <Text 
        as="h1" 
        variant="displayLarge" 
        color="#213547"
        style={{ marginBottom: '60px' }}
      >
        TypeScript + Emotion Select
      </Text>
      
      {/* --- [상단] 메인 예제 --- */}
      <SelectWrapper>
        <Select
          label="프레임워크 선택"
          options={options}
          value={framework}
          onChange={(value) => setFramework(value)}
          width="600px"      
          menuWidth="600px"  
        />
      </SelectWrapper>

      <Text variant="bodyLarge" color="#555" style={{ marginBottom: '60px' }}>
        현재 선택된 값: 
        <Text 
          as="span" 
          variant="bodyLarge" 
          color="#646cff" 
          style={{ fontWeight: 600, marginLeft: '8px' }}
        >
          {framework === '' ? '없음' : framework}
        </Text>
      </Text>

      {/* --- [하단] 상세 예제 --- */}
      {/* 참고: typography.ts에 'titleMedium'이 없으므로, 
          가장 비슷한 'h2'를 사용하거나 'h1'을 사용했습니다. 
      */}
      
      <Text as="h3" variant="h2" style={{ marginTop: '20px', marginBottom: '12px' }}>
        1. Default & Hover (기본 상태)
      </Text>
      <Select 
        label="디폴트 상태" 
        options={options} 
        value={val1} 
        onChange={setVal1} 
        width="300px"      
        menuWidth="400px"
      />

      <Text as="h3" variant="h2" style={{ marginTop: '40px', marginBottom: '12px' }}>
        2. Active/Pressed (값이 선택된 상태)
      </Text>
      <Select 
        label="선택 완료 상태" 
        options={options} 
        value={val2} 
        onChange={setVal2} 
        width="600px"      
        menuWidth="500px"
      />

      <Text as="h3" variant="h2" style={{ marginTop: '40px', marginBottom: '12px' }}>
        3. Disabled (선택 불가 - 빈 값)
      </Text>
      <Select 
        label="비활성화 (값 없음)" 
        options={options} 
        value="" 
        onChange={() => {}} 
        disabled={true} 
        width="600px"      
        menuWidth="600px"
      />

      <Text as="h3" variant="h2" style={{ marginTop: '40px', marginBottom: '12px' }}>
        4. Disabled with Value (선택 불가 - 값 있음)
      </Text>
      <Select 
        label="비활성화 (값 있음)" 
        options={options} 
        value="react" 
        onChange={() => {}} 
        disabled={true} 
        width="600px"      
        menuWidth="600px"
      />
    </Container>
  );
}