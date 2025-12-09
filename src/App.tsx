/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import Select, { OptionType } from './components/Select';
import Text from './components/Text'; /* 컴포넌트 불러오기 */

// 1. 레이아웃 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 100px 20px;
  max-width: 1280px;
  margin: 0 auto;
`;

const SelectWrapper = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  margin-bottom: 100px;
`;

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
    <Container>
      <Text 
        as="h1" 
        variant="displayLarge" 
        color="#213547" 
        style={{ marginBottom: '60px' }}
      >
        TypeScript + Emotion Select
      </Text>
      
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

      <Text variant="bodyLarge" color="#555">
        현재 선택된 값: 
        <Text as="span" variant="bodyLarge" color="#646cff" style={{ fontWeight: 700, marginLeft: '8px' }}
        >{framework}
        </Text>
      </Text>

    </Container>
  );
}

export default App;