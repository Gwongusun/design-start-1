/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';

// ✅ 1. CSS 파일 import
import './styles/typography.css'; 

// ✅ 2. 컴포넌트 import
import Select, { OptionType } from './components/Select';
import Text from './components/Text'; 

// -------------------------------------------------------------------------
// 스타일링
// -------------------------------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  max-width: 800px; 
  margin: 0 auto;
  /* 바닥 테스트를 위해 강제로 스크롤 생성 */
  min-height: 160vh; 
  padding-bottom: 150px;
`;

const SelectWrapper = styled.div`
  margin-bottom: 10px;
`;

const Section = styled.div`
  margin-top: 60px;
  padding: 30px;
  border: 1px dashed #e2e8f0;
  border-radius: 12px;
  background-color: #f8fafc;
`;

const Divider = styled.hr`
  margin: 60px 0;
  border: 0;
  border-top: 2px solid #e2e8f0;
`;

const FlexRight = styled.div`
  display: flex;
  justify-content: flex-end; /* 오른쪽 정렬 */
`;

// -------------------------------------------------------------------------
// 메인 App
// -------------------------------------------------------------------------

export default function App() {
  // [기존 상태]
  const [framework, setFramework] = useState('');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('react');

  // [신규 테스트용 상태]
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
      <Text 
        as="h1" 
        variant="displayLarge" 
        color="#213547"
        style={{ marginBottom: '40px' }}
      >
        TypeScript + Emotion Select
      </Text>

      {/* ================================================================== */}
      {/* PART 1. 기존 예제 (Basic Features)                                   */}
      {/* ================================================================== */}
      
      <Text as="h2" variant="h1" style={{ marginBottom: '20px' }}>
        PART 1. 기본 기능 확인
      </Text>

      <SelectWrapper>
        <Select
          label="프레임워크 선택"
          options={options}
          value={framework}
          onChange={(value) => setFramework(value)}
          width="300px"      
          menuWidth="500px"  
        />
      </SelectWrapper>

      <Text variant="bodyLarge" color="#555" style={{ marginBottom: '40px' }}>
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

      {/* 상세 상태 예제들 */}
      <div style={{ display: 'grid', gap: '30px', gridTemplateColumns: '1fr 1fr' }}>
        <div>
          <Text as="h4" variant="h2" style={{ marginBottom: '10px' }}>1. Default</Text>
          <Select label="기본" options={options} value={val1} onChange={setVal1} />
        </div>
        <div>
          <Text as="h4" variant="h2" style={{ marginBottom: '10px' }}>2. Active</Text>
          <Select label="선택됨" options={options} value={val2} onChange={setVal2} />
        </div>
        <div>
          <Text as="h4" variant="h2" style={{ marginBottom: '10px' }}>3. Disabled</Text>
          <Select label="불가" options={options} value="" onChange={() => {}} disabled />
        </div>
        <div>
          <Text as="h4" variant="h2" style={{ marginBottom: '10px' }}>4. Disabled (Val)</Text>
          <Select label="불가(값)" options={options} value="react" onChange={() => {}} disabled />
        </div>
      </div>

      <Divider />

      {/* ================================================================== */}
      {/* PART 2. 위치 감지 테스트 (Auto Placement)                            */}
      {/* ================================================================== */}

      <Text as="h2" variant="h1" style={{ marginBottom: '10px' }}>
        PART 2. 위치 자동 감지 테스트
      </Text>
      <Text variant="bodyLarge" color="#666" style={{ marginBottom: '30px' }}>
        화면의 가장자리에서 메뉴가 잘리지 않는지 확인합니다.
      </Text>

      {/* 1. 오른쪽 구석 테스트 */}
      <Section>
        <Text as="h3" variant="h2" style={{ marginBottom: '10px' }}>
          CASE A. 오른쪽 끝 (Right Edge)
        </Text>
        <Text variant="bodyLarge" color="#666" style={{ marginBottom: '20px' }}>
          오른쪽 공간이 부족하면 메뉴가 <b>왼쪽 방향</b>으로 열려야 합니다.
        </Text>
        
        <FlexRight>
          <Select 
            label="오른쪽 끝 Select" 
            options={options} 
            value={testRight} 
            onChange={setTestRight} 
            width="250px"      
            menuWidth="500px" /* 일부러 넓게 설정 */
          />
        </FlexRight>
      </Section>

      {/* 스크롤 유도 문구 */}
      <div style={{ height: '200px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#999' }}>
        ↓ 스크롤을 끝까지 내려보세요 ↓
      </div>

      {/* 2. 바닥 테스트 */}
      <Section style={{ marginTop: 'auto' }}>
        <Text as="h3" variant="h2" style={{ marginBottom: '10px' }}>
          CASE B. 바닥 끝 (Bottom Edge)
        </Text>
        <Text variant="bodyLarge" color="#666" style={{ marginBottom: '20px' }}>
          아래 공간이 부족하면 메뉴가 <b>위쪽 방향</b>으로 열려야 합니다.
        </Text>
        
        <Select 
          label="바닥 Select" 
          options={options} 
          value={testBottom} 
          onChange={setTestBottom} 
          width="100%"      
          menuWidth="100%"
        />
      </Section>
      
       {/* 3. 구석 테스트 */}
       <Section>
        <Text as="h3" variant="h2" style={{ marginBottom: '10px' }}>
          CASE C. 바닥 + 오른쪽 (Corner)
        </Text>
        <Text variant="bodyLarge" color="#666" style={{ marginBottom: '20px' }}>
          <b>위쪽 + 왼쪽 방향</b>으로 동시에 보정되어야 합니다. <br/>
          (maxHeight를 300px로 늘려서 테스트)
        </Text>
        
        <FlexRight>
          <Select 
            label="구석탱이 Select" 
            options={options} 
            value={testCorner} 
            onChange={setTestCorner} 
            width="200px"      
            menuWidth="400px"
            maxHeight={100} /* ✅ 여기서 높이를 300으로 지정했습니다! */
          />
        </FlexRight>
      </Section>

    </Container>
  );
}