/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

import Select, { OptionType } from './components/Select';
import Text from './components/Text'; 

// -------------------------------------------------------------------------
// 1. 레이아웃 & 스타일 정의
// -------------------------------------------------------------------------

const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 60px 20px;
  max-width: 800px;
  margin: 0 auto;
  gap: 50px;
  min-height: 150vh;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
`;

const SectionTitleWrapper = styled.div`
  margin-bottom: 10px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.coolgray[100]};
`;

const CaseBox = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${({ theme }) => theme.colors.coolgray[50]};
  border: 1px dashed ${({ theme }) => theme.colors.coolgray[200]};
  border-radius: 12px;
  padding: 30px;
  gap: 20px;
`;

const GridContainer = styled.div`
  display: grid; 
  gap: 30px; 
  grid-template-columns: 1fr 1fr;
`;

const FlexRight = styled.div`
  display: flex;
  justify-content: flex-end; 
`;

const ScrollGuide = styled.div`
  margin: 40px 0;
  text-align: center;
`;

// 코드 하이라이팅 박스
const CodeBox = styled.div`
  background-color: ${({ theme }) => theme.colors.coolgray[900]};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 10px;
  overflow-x: auto;
`;

const Pre = styled.pre`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
  font-size: 14px;
  line-height: 1.6;
`;

// 속성 설명 리스트
const PropList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PropItem = styled.li`
  display: flex;
  align-items: center;
  gap: 16px;
  font-size: 15px;
  padding: 8px 0;
  border-bottom: 1px dashed ${({ theme }) => theme.colors.coolgray[100]};
  
  &:last-child {
    border-bottom: none;
  }
`;

const PropName = styled.code`
  background-color: ${({ theme }) => theme.colors.blue[50]};
  color: ${({ theme }) => theme.colors.blue[600]};
  padding: 4px 8px;
  border-radius: 4px;
  font-weight: bold;
  font-family: monospace;
  min-width: 100px;
  text-align: center;
`;

// -------------------------------------------------------------------------
// 2. 메인 컴포넌트
// -------------------------------------------------------------------------

export default function SelectTest() {
  const theme = useTheme();

  const [framework, setFramework] = useState('');
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('react');
  const [testRight, setTestRight] = useState('');
  const [testBottom, setTestBottom] = useState('');
  const [testCorner, setTestCorner] = useState('');

  const options: OptionType[] = [
    { value: 'react', label: 'React (UI 라이브러리)' },
    { value: 'vue', label: 'Vue (프레임워크)' },
    { value: 'angular', label: 'Angular (플랫폼)' },
    { value: 'svelte', label: 'Svelte (컴파일러)' },
    { value: 'next', label: 'Next.js (풀스택)' },
    { value: 'jquery', label: 'jQuery (레거시)' },
  ];

  const SectionHeader = ({ title }: { title: string }) => (
    <SectionTitleWrapper>
      <Text 
        as="h2" 
        variant="h2" 
        color={theme.colors.coolgray[900]}
      >
        {title}
      </Text>
    </SectionTitleWrapper>
  );

  const LabelText = ({ children }: { children: string }) => (
    <Text 
      as="h4" 
      variant="label" 
      color={theme.colors.coolgray[600]}
      style={{ marginBottom: '8px' }}
    >
      {children}
    </Text>
  );

  return (
    <Container>
      <Header>
        <Text 
          as="h1" 
          variant="displayMedium" 
          style={{ marginBottom: '10px' }}
        >
          TypeScript + Emotion Select
        </Text>
        <Text 
          variant="bodyLarge" 
          color={theme.colors.coolgray[500]}
        >
          드롭다운의 다양한 상태(State) 및 위치 자동 감지 테스트
        </Text>
      </Header>

      {/* ✨ 0. Quick Start */}
      <Section>
        <SectionHeader title="0. Quick Start (사용 예시)" />
        
        <Text variant="bodyMedium" color={theme.colors.coolgray[600]}>
          기본적인 사용법과 드롭다운 관련 옵션(menuWidth, maxHeight, disabled) 예시입니다.
        </Text>

        <CodeBox>
          <Pre>
{`const [value, setValue] = useState('');

<Select 
  label="프레임워크 선택" 
  options={OPTIONS}
  value={value}
  onChange={setValue}
  width="320px"
  menuWidth="400px"  // 드롭다운 너비
  maxHeight={250}    // 드롭다운 최대 높이
  disabled={false}   // 비활성화 여부
/>`}
          </Pre>
        </CodeBox>

        <Text 
          as="h3" 
          variant="bodyLarge" 
          style={{ marginTop: '10px', marginBottom: '10px', fontWeight: 'bold' }}
        >
          Props Guide
        </Text>

        <PropList>
          {/* 필수 Props */}
          <PropItem>
            <PropName>label</PropName>
            <Text variant="bodyMedium">
              플레이스홀더 텍스트입니다. (선택값이 없을 때 표시)
            </Text>
          </PropItem>
          <PropItem>
            <PropName>options</PropName>
            <Text variant="bodyMedium">
              선택 옵션 배열입니다. <b>{`{ value: string, label: string }[]`}</b>
            </Text>
          </PropItem>
          <PropItem>
            <PropName>value</PropName>
            <Text variant="bodyMedium">
              현재 선택된 값입니다. (제어 컴포넌트 방식)
            </Text>
          </PropItem>
          <PropItem>
            <PropName>onChange</PropName>
            <Text variant="bodyMedium">
              값이 변경될 때 실행되는 함수입니다.
            </Text>
          </PropItem>
          
          {/* 스타일 & 드롭다운 옵션 */}
          <PropItem>
            <PropName>width</PropName>
            <Text variant="bodyMedium">
              Select 버튼의 너비를 지정합니다. (기본값: 100%)
            </Text>
          </PropItem>
          <PropItem>
            <PropName>menuWidth</PropName>
            <Text variant="bodyMedium">
              드롭다운 메뉴의 너비를 별도로 지정합니다. (기본값: width와 동일)
            </Text>
          </PropItem>
          <PropItem>
            <PropName>maxHeight</PropName>
            <Text variant="bodyMedium">
              드롭다운 메뉴의 최대 높이입니다. 넘치면 스크롤됩니다. (기본값: 250px)
            </Text>
          </PropItem>
          <PropItem>
            <PropName>disabled</PropName>
            <Text variant="bodyMedium">
              true로 설정하면 선택할 수 없는 비활성화 상태가 됩니다.
            </Text>
          </PropItem>
        </PropList>
      </Section>

      {/* PART 1. 기본 기능 */}
      <Section>
        <SectionHeader title="1. Basic Usage (기본 기능)" />
        
        <div>
          <Select 
            label="프레임워크 선택" 
            options={options} 
            value={framework} 
            onChange={setFramework} 
            width="320px" 
            menuWidth="100%" 
            maxHeight={200}
          />
        </div>

        <div style={{ padding: '15px', background: theme.colors.coolgray[50], borderRadius: '6px' }}>
          <Text variant="bodyMedium" color={theme.colors.coolgray[600]}>
            현재 선택된 값: 
            <Text 
              as="span" 
              variant="bodyMedium" 
              color={theme.colors.blue[600]} 
              style={{ fontWeight: 'bold', marginLeft: '8px' }}
            >
              {framework === '' ? '선택되지 않음' : framework}
            </Text>
          </Text>
        </div>
      </Section>

      {/* PART 2. 상태별 테스트 */}
      <Section>
        <SectionHeader title="2. States (상태별 확인)" />
        
        <GridContainer>
          <div>
            <LabelText>Default (기본)</LabelText>
            <Select label="선택해주세요" options={options} value={val1} onChange={setVal1} width="100%" />
          </div>
          <div>
            <LabelText>Selected (값 있음)</LabelText>
            <Select label="프레임워크" options={options} value={val2} onChange={setVal2} width="100%" />
          </div>
          <div>
            <LabelText>Disabled (비활성)</LabelText>
            <Select label="선택 불가" options={options} value="" onChange={() => {}} disabled width="100%" />
          </div>
          <div>
            <LabelText>Disabled with Value</LabelText>
            <Select label="값 있고 비활성" options={options} value="react" onChange={() => {}} disabled width="100%" />
          </div>
        </GridContainer>
      </Section>

      {/* PART 3. 위치 감지 테스트 */}
      <Section>
        <SectionHeader title="3. Auto Positioning (위치 감지)" />
        
        <Text variant="bodyMedium" color={theme.colors.coolgray[500]}>
          화면 끝부분에서 메뉴가 잘리지 않고 방향을 자동으로 전환하는지 확인합니다.
        </Text>

        <CaseBox>
          <div>
            <Text as="h3" variant="h2" style={{ marginBottom: '8px' }}>
              CASE A. 오른쪽 끝 (Right Edge)
            </Text>
            <Text variant="bodyMedium" color={theme.colors.coolgray[500]}>
              오른쪽 공간이 부족하면 메뉴가 <b>왼쪽 방향</b>으로 열려야 합니다.
            </Text>
          </div>
          
          <FlexRight>
            <Select 
              label="오른쪽 끝 Select" 
              options={options} 
              value={testRight} 
              onChange={setTestRight} 
              width="240px"      
              menuWidth="400px" 
              maxHeight={200}
            />
          </FlexRight>
        </CaseBox>

        <ScrollGuide>
          <Text variant="caption" color={theme.colors.coolgray[400]}>
            ↓ 스크롤을 끝까지 내려보세요 ↓
          </Text>
        </ScrollGuide>

        <CaseBox>
          <div>
            <Text as="h3" variant="h2" style={{ marginBottom: '8px' }}>
              CASE B. 바닥 끝 (Bottom Edge)
            </Text>
            <Text variant="bodyMedium" color={theme.colors.coolgray[500]}>
              아래 공간이 부족하면 메뉴가 <b>위쪽 방향</b>으로 열려야 합니다.
            </Text>
          </div>

          <Select 
            label="바닥 Select" 
            options={options} 
            value={testBottom} 
            onChange={setTestBottom} 
            width="100%"      
            menuWidth="100%"
            maxHeight={200}
          />
        </CaseBox>

        <CaseBox>
          <div>
            <Text as="h3" variant="h2" style={{ marginBottom: '8px' }}>
              CASE C. 바닥 + 오른쪽 (Corner)
            </Text>
            <Text variant="bodyMedium" color={theme.colors.coolgray[500]}>
              <b>위쪽 + 왼쪽 방향</b>으로 동시에 보정되어야 합니다.
            </Text>
          </div>

          <FlexRight>
            <Select 
              label="구석탱이 Select" 
              options={options} 
              value={testCorner} 
              onChange={setTestCorner} 
              width="200px"      
              menuWidth="300px"
              maxHeight={300} 
            />
          </FlexRight>
        </CaseBox>
      </Section>

    </Container>
  );
}