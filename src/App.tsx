/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react'; // ✅ useTheme 훅 추가 (컴포넌트 내부에서 쓰기 위해)

// 1. CSS 파일 import (Typography)
import './styles/typography.css'; 

// 2. 컴포넌트 import
import Select, { OptionType } from './components/Select';
import Text from './components/Text'; 

// -------------------------------------------------------------------------
// 스타일링 (Emotion Theme 적용)
// -------------------------------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  max-width: 800px; 
  margin: 0 auto;
  min-height: 160vh; 
  padding-bottom: 150px;
  
  /* 배경색 (White) */
  background-color: ${({ theme }) => theme.colors.white};
`;

const SelectWrapper = styled.div`
  margin-bottom: 10px;
`;

// 섹션 박스 스타일
const Section = styled.div`
  margin-top: 60px;
  padding: 30px;
  border-radius: 12px;

  /* 🎨 [테마 적용] 테두리 (Coolgray 100) 및 배경색 (Coolgray 50) */
  border: 1px dashed ${({ theme }) => theme.colors.coolgray[100]}; 
  background-color: ${({ theme }) => theme.colors.coolgray[50]};
`;

// 구분선 스타일
const Divider = styled.hr`
  margin: 60px 0;
  border: 0;
  
  /* 🎨 [테마 적용] 구분선 색상 (Coolgray 100) */
  border-top: 2px solid ${({ theme }) => theme.colors.coolgray[100]};
`;

const FlexRight = styled.div`
  display: flex;
  justify-content: flex-end; 
`;

const GridContainer = styled.div`
  display: grid; 
  gap: 30px; 
  grid-template-columns: 1fr 1fr;
`;

// 스크롤 유도 영역
const ScrollGuide = styled.div`
  height: 200px; 
  display: flex; 
  align-items: center; 
  justify-content: center; 
  
  /* 🎨 [테마 적용] 텍스트 색상 (Coolgray 300) */
  color: ${({ theme }) => theme.colors.coolgray[300]};
`;

// -------------------------------------------------------------------------
// 메인 App
// -------------------------------------------------------------------------

export default function App() {
  // ✅ [Hook] 컴포넌트 로직 안에서 색상 토큰을 쓰기 위해 theme 불러오기
  const theme = useTheme();

  const [framework, setFramework] = useState('');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('react');

  const [testRight, setTestRight] = useState('');
  const [testBottom, setTestBottom] = useState('');
  const [testCorner, setTestCorner] = useState('');

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
      {/* 🎨 Title Color: Coolgray 900 (기본값) */}
      <Text 
        as="h1" 
        variant="displayLarge" 
        style={{ marginBottom: '40px' }}
      >
        TypeScript + Emotion Select
      </Text>

      {/* PART 1 */}
      <Text as="h1" variant="h1" style={{ marginBottom: '20px' }}>
        PART 1. 기본 기능 확인
      </Text>

      <SelectWrapper>
        <Select 
          label="프레임워크 선택" 
          options={options} 
          value={framework} 
          onChange={setFramework} 
          width="300px" 
          menuWidth="500px" 
          maxHeight={200}
        />
      </SelectWrapper>

      {/* 🎨 Description Color: Coolgray 500 */}
      <Text 
        variant="bodyLarge" 
        color={theme.colors.coolgray[500]} 
        style={{ marginBottom: '40px' }}
      >
        현재 선택된 값: 
        {/* 🎨 Highlight Color: Blue 500 (Brand Color) */}
        <Text 
          as="span" 
          variant="bodyLarge" 
          color={theme.colors.blue[500]} 
          style={{ fontWeight: 600, marginLeft: '8px' }} 
        >
          {framework === '' ? '없음' : framework}
        </Text>
      </Text>

      {/* 상세 상태 예제들 */}
      <GridContainer>
        <div>
          <Text as="h4" variant="h2" style={{ marginBottom: '10px' }}>1. Default</Text>
          <Select label="기본" options={options} value={val1} onChange={setVal1} width="300px" menuWidth="300px" maxHeight={200}/>
        </div>
        <div>
          <Text as="h4" variant="h2" style={{ marginBottom: '10px' }}>2. Active</Text>
          <Select label="선택됨" options={options} value={val2} onChange={setVal2} width="300px" menuWidth="300px" maxHeight={200}/>
        </div>
        <div>
          <Text as="h4" variant="h2" style={{ marginBottom: '10px' }}>3. Disabled</Text>
          <Select label="불가" options={options} value="" onChange={() => {}} disabled width="300px" menuWidth="300px" maxHeight={200}/>
        </div>
        <div>
          <Text as="h4" variant="h2" style={{ marginBottom: '10px' }}>4. Disabled (Val)</Text>
          <Select label="불가(값)" options={options} value="react" onChange={() => {}} disabled width="300px" menuWidth="300px" maxHeight={200}/>
        </div>
      </GridContainer>

      <Divider />

      {/* PART 2 */}
      <Text as="h1" variant="h1" style={{ marginBottom: '10px' }}>
        PART 2. 위치 자동 감지 테스트
      </Text>
      
      {/* 🎨 Info Color: Coolgray 500 */}
      <Text 
        variant="bodyLarge" 
        color={theme.colors.coolgray[500]} 
        style={{ marginBottom: '30px' }}
      >
        화면의 가장자리에서 메뉴가 잘리지 않는지 확인합니다.
      </Text>

      {/* Case A */}
      <Section>
        <Text as="h3" variant="h2" style={{ marginBottom: '10px' }}>
          CASE A. 오른쪽 끝 (Right Edge)
        </Text>
        <Text 
          variant="bodyLarge" 
          color={theme.colors.coolgray[500]} 
          style={{ marginBottom: '20px' }}
        >
          오른쪽 공간이 부족하면 메뉴가 <b>왼쪽 방향</b>으로 열려야 합니다.
        </Text>
        
        <FlexRight>
          <Select 
            label="오른쪽 끝 Select" 
            options={options} 
            value={testRight} 
            onChange={setTestRight} 
            width="250px"      
            menuWidth="500px" 
            maxHeight={200}
          />
        </FlexRight>
      </Section>

      <ScrollGuide>
        ↓ 스크롤을 끝까지 내려보세요 ↓
      </ScrollGuide>

      {/* Case B */}
      <Section style={{ marginTop: 'auto' }}>
        <Text as="h2" variant="h2" style={{ marginBottom: '10px' }}>
          CASE B. 바닥 끝 (Bottom Edge)
        </Text>
        <Text 
          variant="bodyLarge" 
          color={theme.colors.coolgray[500]} 
          style={{ marginBottom: '20px' }}
        >
          아래 공간이 부족하면 메뉴가 <b>위쪽 방향</b>으로 열려야 합니다.
        </Text>
        
        <Select 
          label="바닥 Select" 
          options={options} 
          value={testBottom} 
          onChange={setTestBottom} 
          width="100%"      
          menuWidth="100%"
          maxHeight={200}
        />
      </Section>
      
       {/* Case C */}
       <Section>
        <Text as="h2" variant="h2" style={{ marginBottom: '10px' }}>
          CASE C. 바닥 + 오른쪽 (Corner)
        </Text>
        <Text 
          variant="bodyLarge" 
          color={theme.colors.coolgray[500]} 
          style={{ marginBottom: '20px' }}
        >
          <b>위쪽 + 왼쪽 방향</b>으로 동시에 보정되어야 합니다. <br/>
          (maxHeight를 400px로 늘려서 테스트)
        </Text>
        
        <FlexRight>
          <Select 
            label="구석탱이 Select" 
            options={options} 
            value={testCorner} 
            onChange={setTestCorner} 
            width="200px"      
            menuWidth="400px"
            maxHeight={400} 
          />
        </FlexRight>
      </Section>

    </Container>
  );
}