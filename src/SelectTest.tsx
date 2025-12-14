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
  padding: 50px;
  max-width: 100%;
  margin: 0 auto;
  gap: 50px;
  min-height: 150vh;

  @media (max-width: 768px) {
    padding: 20px;
    gap: 30px;
  }
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  @media (max-width: 768px) {
    padding: 24px;
  }
`;

const SectionTitleWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.coolgray[900]};
`;

const CodeBox = styled.div`
  background-color: ${({ theme }) => theme.colors.coolgray[900]};
  border-radius: 8px;
  padding: 30px;
  overflow-x: auto;
  font-family: 'Menlo', 'Monaco', monospace;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

const Pre = styled.pre`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-size: 14px;
  line-height: 1.6;
`;

const PropList = styled.ul`
  display: flex;
  flex-direction: column;
  padding: 0;
  margin: 0;
  list-style: none;
`;

const PropItem = styled.li`
  display: flex;
  align-items: center; 
  gap: 20px;
  padding: 20px 0;
  border-bottom: 1px dotted ${({ theme }) => theme.colors.coolgray[200]};

  &:first-of-type {
    border-top: 1px dotted ${({ theme }) => theme.colors.coolgray[200]};
  }

  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

const PropBadge = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  background-color: ${({ theme }) => theme.colors.blue[50]};
  color: ${({ theme }) => theme.colors.blue[600]};
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 700;
  font-family: monospace;
  font-size: 14px;
  min-width: 100px; /* 뱃지 너비 확보 */
`;

const GridContainer = styled.div`
  display: grid; 
  gap: 30px; 
  grid-template-columns: 1fr 1fr;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

const PositionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px;
  
  & > div:nth-of-type(3) {
    grid-column: span 2;
  }

  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    & > div:nth-of-type(3) {
      grid-column: span 1;
    }
  }
`;

const CaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`;

const PositionBox = styled.div<{ align?: 'right' | 'bottom' }>`
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: ${({ align }) => (align === 'bottom' ? 'flex-end' : 'flex-start')};
  align-items: ${({ align }) => (align === 'right' ? 'flex-end' : 'flex-start')};
  height: 320px;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.white};
  border: 1px dashed ${({ theme }) => theme.colors.coolgray[200]};
  border-radius: 12px;

  @media (max-width: 768px) {
    padding: 20px;
  }
`;

// -------------------------------------------------------------------------
// 2. 메인 컴포넌트
// -------------------------------------------------------------------------

export default function SelectTest() {
  const theme = useTheme();

  const [framework, setFramework] = useState('');
  
  // Light Mode States
  const [lightVal1, setLightVal1] = useState('');
  const [lightVal2, setLightVal2] = useState('react');

  // Dark Mode States
  const [darkVal1, setDarkVal1] = useState('');
  const [darkVal2, setDarkVal2] = useState('react');

  // Transparent Mode States
  const [transVal1, setTransVal1] = useState('');
  const [transVal2, setTransVal2] = useState('react');
  
  const [testRight, setTestRight] = useState('');
  const [testBottom, setTestBottom] = useState('');
  const [testCorner, setTestCorner] = useState('');

  const options: OptionType[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' },
    { value: 'remix', label: 'Remix' },
    { value: 'gatsby', label: 'Gatsby' },
  ];

  const SectionHeader = ({ title }: { title: string }) => (
    <SectionTitleWrapper>
      <Text 
        as="h2" 
        variant="700-24" 
        color={theme.colors.coolgray[900]}
        style={{ wordBreak: 'keep-all' }}
      >
        {title}
      </Text>
    </SectionTitleWrapper>
  );

  return (
    <Container>
      <Header>
        <Text as="h1" variant="900-48" style={{ marginBottom: '10px', fontSize: 'clamp(32px, 5vw, 48px)' }}>
          Select Component
        </Text>
        <Text variant="400-18" color={theme.colors.coolgray[500]}>
          Dropdown States & Auto-Positioning Test Guide
        </Text>
      </Header>

      {/* 1. Quick Start & Props */}
      <Section>
        <SectionHeader title="1. Quick Start & Props" />
        <Text variant="400-14" color={theme.colors.coolgray[600]}>
          아래 코드는 Select 컴포넌트가 지원하는 <b>모든 옵션(Props)</b>을 포함한 예시입니다.
        </Text>
        <CodeBox>
          <Pre>
{`const [value, setValue] = useState('');

<Select 
  // [Required] 필수 항목
  label="프레임워크 선택" 
  options={[{ value: 'react', label: 'React' }]}
  value={value}
  onChange={setValue}

  // [Optional] 선택 항목
  width="100%"
  menuWidth="100%"
  maxHeight={250}
  disabled={false}
  mode="light" // 'light' | 'dark' | 'transparent'
/>`}
          </Pre>
        </CodeBox>
        
        {/* ✅ 복구된 PropList (속성 가이드) */}
        <div>
           <Text 
            as="h3" 
            variant="700-16" 
            color={theme.colors.coolgray[900]}
            style={{ marginBottom: '16px', marginTop: '20px' }}
          >
            Props Guide
          </Text>

          <PropList>
            {[
              { name: 'label', desc: '플레이스홀더 텍스트 (선택값 없을 때 표시)' },
              { name: 'options', desc: '{ value, label } 형태의 객체 배열' },
              { name: 'value', desc: '현재 선택된 값 (Controlled Component)' },
              { name: 'onChange', desc: '값이 변경될 때 실행되는 핸들러' },
              { name: 'width', desc: '버튼 너비 (기본값: 100%)' },
              { name: 'menuWidth', desc: '드롭다운 메뉴 너비 (기본값: width와 동일)' },
              { name: 'maxHeight', desc: '드롭다운 메뉴 최대 높이 (기본값: 200px)' },
              { name: 'disabled', desc: '비활성화 여부 (기본값: false)' },
              { name: 'mode', desc: <span><b>'light'</b> | <b>'dark'</b> | <b>'transparent'</b> 테마 모드 (기본값: light)</span> },
            ].map((prop) => (
              <PropItem key={prop.name}>
                <PropBadge>{prop.name}</PropBadge>
                <Text variant="400-14" color={theme.colors.coolgray[700]}>
                  {prop.desc}
                </Text>
              </PropItem>
            ))}
          </PropList>
        </div>
      </Section>

      {/* 2. Basic Usage (Light Mode) */}
      <Section>
        <SectionHeader title="2. Basic Usage (Light)" />
        <div>
          <Select 
            label="프레임워크 선택" 
            options={options} 
            value={framework} 
            onChange={setFramework} 
            width="100%" 
            menuWidth="100%" 
            maxHeight={200}
            disabled={false}
            mode="light"
          />
        </div>
      </Section>

      {/* 3. Auto Positioning */}
      <Section>
        <SectionHeader title="3. Auto Positioning" />
        <PositionGrid>
          <CaseWrapper>
            <div><Text variant="700-16">CASE A. Right Edge</Text></div>
            <PositionBox align="right">
              <Select label="오른쪽 끝" options={options} value={testRight} onChange={setTestRight} width="240px" menuWidth="300px" mode="light" />
            </PositionBox>
          </CaseWrapper>
          <CaseWrapper>
            <div><Text variant="700-16">CASE B. Bottom Edge</Text></div>
            <PositionBox align="bottom">
              <Select label="바닥" options={options} value={testBottom} onChange={setTestBottom} width="100%" mode="light" />
            </PositionBox>
          </CaseWrapper>
          <CaseWrapper>
            <div><Text variant="700-16">CASE C. Corner</Text></div>
            <PositionBox align="right" style={{ justifyContent: 'flex-end' }}>
              <Select label="구석탱이" options={options} value={testCorner} onChange={setTestCorner} width="240px" menuWidth="300px" mode="light" />
            </PositionBox>
          </CaseWrapper>
        </PositionGrid>
      </Section>

      {/* 4. States (Light Mode) - ✅ 4개 상태 모두 표시 */}
      <Section>
        <SectionHeader title="4. Light Mode States" />
        <div style={{ padding: '30px', backgroundColor: theme.colors.white, border: `1px solid ${theme.colors.coolgray[200]}`, borderRadius: '12px' }}>
          <GridContainer>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Default</Text>
              <Select label="선택해주세요" options={options} value={lightVal1} onChange={setLightVal1} width="100%" mode="light" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Selected</Text>
              <Select label="프레임워크" options={options} value={lightVal2} onChange={setLightVal2} width="100%" mode="light" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled</Text>
              <Select label="선택 불가" options={options} value="" onChange={() => {}} width="100%" disabled={true} mode="light" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
              <Select label="값 있음" options={options} value="react" onChange={() => {}} width="100%" disabled={true} mode="light" />
            </div>
          </GridContainer>
        </div>
      </Section>

      {/* 5. Dark Mode States - ✅ 4개 상태 모두 표시 */}
      <Section>
        <SectionHeader title="5. Dark Mode States" />
        <div style={{
          padding: '40px',
          backgroundColor: theme.colors.coolgray[900], // 다크 모드 배경
          borderRadius: '12px',
        }}>
           <GridContainer>
            <div>
              <Text as="h4" variant="700-14" color={theme.colors.white} style={{ marginBottom: '8px' }}>Default</Text>
              <Select label="선택해주세요" options={options} value={darkVal1} onChange={setDarkVal1} width="100%" mode="dark" />
            </div>
            <div>
              <Text as="h4" variant="700-14" color={theme.colors.white} style={{ marginBottom: '8px' }}>Selected</Text>
              <Select label="프레임워크" options={options} value={darkVal2} onChange={setDarkVal2} width="100%" mode="dark" />
            </div>
            <div>
              <Text as="h4" variant="700-14" color={theme.colors.white} style={{ marginBottom: '8px' }}>Disabled</Text>
              <Select label="선택 불가" options={options} value="" onChange={() => {}} width="100%" disabled={true} mode="dark" />
            </div>
            <div>
              <Text as="h4" variant="700-14" color={theme.colors.white} style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
              <Select label="값 있음" options={options} value="react" onChange={() => {}} width="100%" disabled={true} mode="dark" />
            </div>
          </GridContainer>
        </div>
      </Section>

      {/* 6. Transparent Mode States - ✅ 4개 상태 모두 표시 */}
      <Section>
        <SectionHeader title="6. Transparent Mode States" />

        {/* 투명성을 확인하기 위해 옅은 배경색 추가 */}
        <div style={{ padding: '30px', backgroundColor: theme.colors.coolgray[50], borderRadius: '12px' }}>
          <GridContainer>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Default</Text>
              <Select label="선택해주세요" options={options} value={transVal1} onChange={setTransVal1} width="100%" mode="transparent" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Selected</Text>
              <Select label="프레임워크" options={options} value={transVal2} onChange={setTransVal2} width="100%" mode="transparent" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled</Text>
              <Select label="선택 불가" options={options} value="" onChange={() => {}} width="100%" disabled={true} mode="transparent" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
              <Select label="값 있음" options={options} value="react" onChange={() => {}} width="100%" disabled={true} mode="transparent" />
            </div>
          </GridContainer>
        </div>
      </Section>

    </Container>
  );
}