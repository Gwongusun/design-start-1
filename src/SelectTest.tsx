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
  background-color: #F9FAFB;

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
  border-bottom: 1px dashed ${({ theme }) => theme.colors.coolgray[200]};

  &:first-of-type {
    border-top: 1px dashed ${({ theme }) => theme.colors.coolgray[200]};
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
  background-color: ${({ theme }) => theme.colors.indigo[50]};
  color: ${({ theme }) => theme.colors.indigo[600]};
  padding: 6px 12px;
  border-radius: 4px;
  font-weight: 700;
  font-family: monospace;
  font-size: 14px;
  min-width: 100px;
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

// 🔥 [Style] 시맨틱 컬러 가이드용 스타일
const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
  gap: 16px;
`;

const ColorCard = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px;
  border-radius: 8px;
  background: ${({ theme }) => theme.colors.white};
  border: 1px solid ${({ theme }) => theme.colors.coolgray[100]};
`;

// ✅ [투명도 체크무늬 패턴 적용]
const Swatch = styled.div<{ color: string; hasBorder?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: ${({ hasBorder, theme }) => hasBorder ? `1px solid ${theme.colors.coolgray[200]}` : 'none'};
  flex-shrink: 0;

  background-color: #ffffff;
  background-image:
    linear-gradient(${({ color }) => color}, ${({ color }) => color}),
    linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
    linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);

  background-size:
    100% 100%,
    16px 16px,
    16px 16px,
    16px 16px,
    16px 16px;

  background-position:
    0 0,
    0 0,
    0 8px,
    8px -8px,
    -8px 0px;
`;

// 🔥 [NEW] 섹션 내부 구분용 헤더
const SubHeader = styled.div`
    margin-top: 30px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
`;

// -------------------------------------------------------------------------
// 2. 메인 컴포넌트
// -------------------------------------------------------------------------

export default function SelectTest() {
  const theme = useTheme() as any;

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
            {`import Select, { OptionType } from './components/Select';            
            
const [value, setValue] = useState('');

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

      {/* 2. Basic Usage */}
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

      {/* 3. Light Mode Guide (Tokens & Usage) */}
      <Section>
        <SectionHeader title="3. Light Mode Guide" />

        {/* 3-2. Light Mode States */}
        <Text variant="700-16">Component States</Text>
        <div style={{ marginBottom: 10, padding: 30, backgroundColor: theme.colors.white, border: `1px dashed ${theme.colors.coolgray[200]}`, borderRadius: '12px' }}>
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
              {/* ✅ [수정] placeholder 제거, options 추가, onChange 추가 */}
              <Select label="선택 불가" options={options} value="" onChange={() => { }} width="100%" disabled={true} mode="light" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
              <Select label="값 있음" options={options} value="react" onChange={() => { }} width="100%" disabled={true} mode="light" />
            </div>
          </GridContainer>
        </div>


        {/* 3-1. Light Mode Tokens */}
        <Text variant="700-16">Semantic Color Tokens </Text>
        <div style={{ background: '#fff', borderRadius: 12, border: `1px dashed ${theme.colors.coolgray[200]}` }}>
          <ColorGrid>
            <ColorCard><Swatch color={theme.components.input.light.bg.default} hasBorder /><div><Text variant="700-14">Bg (Def)</Text><Text variant="400-12" color="#666">coolgray[50]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.light.bg.hover} hasBorder /><div><Text variant="700-14">Bg (Hov)</Text><Text variant="400-12" color="#666">coolgray[75]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.light.bg.active} hasBorder /><div><Text variant="700-14">Bg (Act)</Text><Text variant="400-12" color="#666">white</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.light.bg.disabled} hasBorder /><div><Text variant="700-14">Bg (Dis)</Text><Text variant="400-12" color="#666">coolgray[75]</Text></div></ColorCard>

            <ColorCard><Swatch color={theme.components.input.light.border.default} hasBorder /><div><Text variant="700-14">Border (Def)</Text><Text variant="400-12" color="#666">transparent</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.light.border.hover} /><div><Text variant="700-14">Border (Hov)</Text><Text variant="400-12" color="#666">coolgray[200]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.light.border.active} /><div><Text variant="700-14">Border (Act)</Text><Text variant="400-12" color="#666">coolgray[200]</Text></div></ColorCard>

            <ColorCard><Swatch color={theme.components.input.light.text.default} /><div><Text variant="700-14">Text (Def)</Text><Text variant="400-12" color="#666">coolgray[900]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.light.text.placeholder} /><div><Text variant="700-14">Text (Place)</Text><Text variant="400-12" color="#666">coolgray[400]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.light.text.disabled} /><div><Text variant="700-14">Text (Dis)</Text><Text variant="400-12" color="#666">coolgray[300]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.light.label.default} /><div><Text variant="700-14">Label (Def)</Text><Text variant="400-12" color="#666">coolgray[800]</Text></div></ColorCard>

            <ColorCard><Swatch color={theme.components.input.light.icon.default} /><div><Text variant="700-14">Icon (Def)</Text><Text variant="400-12" color="#666">coolgray[300]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.light.icon.active} /><div><Text variant="700-14">Icon (Act)</Text><Text variant="400-12" color="#666">coolgray[900]</Text></div></ColorCard>
          </ColorGrid>
        </div>
      </Section>

      {/* 4. Dark Mode Guide (Tokens & Usage) */}
      <Section>
        <SectionHeader title="4. Dark Mode Guide" />

        {/* 4-2. Dark Mode States */}
        <Text variant="700-16">Component States</Text>
        <div style={{ marginBottom: 10, padding: 30, backgroundColor: theme.colors.coolgray[900], borderRadius: '12px' }}>
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
              {/* ✅ [수정] placeholder 제거, options 추가, onChange 추가 */}
              <Select label="선택 불가" options={options} value="" onChange={() => { }} width="100%" disabled={true} mode="dark" />
            </div>
            <div>
              <Text as="h4" variant="700-14" color={theme.colors.white} style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
              <Select label="값 있음" options={options} value="react" onChange={() => { }} width="100%" disabled={true} mode="dark" />
            </div>
          </GridContainer>
        </div>

        {/* 4-1. Dark Mode Tokens */}
        <Text variant="700-16">Semantic Color Tokens </Text>
        <div style={{ padding: 30, background: '#111827', borderRadius: 12 }}>
          <ColorGrid>
            <ColorCard><Swatch color={theme.components.input.dark.bg.default} hasBorder /><div><Text variant="700-14">Bg (Def)</Text><Text variant="400-12" color="#666">white 8%</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.dark.bg.hover} hasBorder /><div><Text variant="700-14">Bg (Hov)</Text><Text variant="400-12" color="#666">white 12%</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.dark.bg.active} hasBorder /><div><Text variant="700-14">Bg (Act)</Text><Text variant="400-12" color="#666">white 0%</Text></div></ColorCard>

            <ColorCard><Swatch color={theme.components.input.dark.border.default} hasBorder /><div><Text variant="700-14">Border (Def)</Text><Text variant="400-12" color="#666">transparent</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.dark.border.hover} /><div><Text variant="700-14">Border (Hov)</Text><Text variant="400-12" color="#666">coolgray[600]</Text></div></ColorCard>

            <ColorCard><Swatch color={theme.components.input.dark.text.default} hasBorder /><div><Text variant="700-14">Text (Def)</Text><Text variant="400-12" color="#666">white</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.dark.text.placeholder} /><div><Text variant="700-14">Text (Place)</Text><Text variant="400-12" color="#666">coolgray[200]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.dark.label.default} /><div><Text variant="700-14">Label (Def)</Text><Text variant="400-12" color="#666">coolgray[300]</Text></div></ColorCard>

            <ColorCard><Swatch color={theme.components.input.dark.icon.default} /><div><Text variant="700-14">Icon (Def)</Text><Text variant="400-12" color="#666">coolgray[400]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.dark.icon.active} hasBorder /><div><Text variant="700-14">Icon (Act)</Text><Text variant="400-12" color="#666">white</Text></div></ColorCard>
          </ColorGrid>
        </div>

      </Section>

      {/* 5. Transparent Mode Guide (Tokens & Usage) */}
      <Section>
        <SectionHeader title="5. Transparent Mode Guide" />

        {/* 5-2. Transparent Mode States */}
        <Text variant="700-16">Component States</Text>
        <div style={{ marginBottom: 10, padding: 30, backgroundColor: theme.colors.coolgray[50], border: `1px dashed ${theme.colors.coolgray[200]}`, borderRadius: '12px' }}>
          <GridContainer>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Default</Text>
              {/* ✅ [수정] placeholder 제거 */}
              <Select label="선택해주세요" options={options} value={transVal1} onChange={setTransVal1} width="100%" mode="transparent" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Filled</Text>
              <Select label="프레임워크" options={options} value={transVal2} onChange={setTransVal2} width="100%" mode="transparent" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled</Text>
              {/* ✅ [수정] placeholder 제거, options 추가, onChange 추가 */}
              <Select label="선택 불가" options={options} value="" onChange={() => { }} width="100%" disabled={true} mode="transparent" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
              <Select label="값 있음" options={options} value="react" onChange={() => { }} width="100%" disabled={true} mode="transparent" />
            </div>
          </GridContainer>
        </div>

        {/* 5-1. Transparent Mode Tokens */}
        <Text variant="700-16">Semantic Color Tokens </Text>
        <div style={{ padding: 30, background: '#F3F4F6', borderRadius: 12, border: `1px dashed ${theme.colors.coolgray[200]}` }}>
          <ColorGrid>
            <ColorCard><Swatch color={theme.components.input.transparent.bg.default} hasBorder /><div><Text variant="700-14">Bg (Def)</Text><Text variant="400-12" color="#666">Transparent</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.transparent.bg.hover} hasBorder /><div><Text variant="700-14">Bg (Hov)</Text><Text variant="400-12" color="#666">Black 4%</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.transparent.bg.active} hasBorder /><div><Text variant="700-14">Bg (Act)</Text><Text variant="400-12" color="#666">Black 4%</Text></div></ColorCard>

            <ColorCard><Swatch color={theme.components.input.transparent.border.default} hasBorder /><div><Text variant="700-14">Border (All)</Text><Text variant="400-12" color="#666">Transparent</Text></div></ColorCard>

            <ColorCard><Swatch color={theme.components.input.transparent.text.default} /><div><Text variant="700-14">Text (Def)</Text><Text variant="400-12" color="#666">coolgray[900]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.transparent.text.placeholder} /><div><Text variant="700-14">Text (Place)</Text><Text variant="400-12" color="#666">coolgray[400]</Text></div></ColorCard>

            <ColorCard><Swatch color={theme.components.input.transparent.icon.default} /><div><Text variant="700-14">Icon (Def)</Text><Text variant="400-12" color="#666">coolgray[300]</Text></div></ColorCard>
            <ColorCard><Swatch color={theme.components.input.transparent.icon.active} /><div><Text variant="700-14">Icon (Act)</Text><Text variant="400-12" color="#666">coolgray[900]</Text></div></ColorCard>
          </ColorGrid>
        </div>


      </Section>

      {/* 6. Auto Positioning */}
      <Section>
        <SectionHeader title="7. Auto Positioning" />
        <PositionGrid>
          <CaseWrapper>
            <div><Text variant="700-16">CASE A. Right Edge</Text></div>
            <PositionBox align="right">
              <Select label="Right Edge" options={options} value={testRight} onChange={setTestRight} width="240px" menuWidth="300px" mode="light" />
            </PositionBox>
          </CaseWrapper>
          <CaseWrapper>
            <div><Text variant="700-16">CASE B. Bottom Edge</Text></div>
            <PositionBox align="bottom">
              <Select label="Bottom Edge" options={options} value={testBottom} onChange={setTestBottom} width="100%" mode="light" />
            </PositionBox>
          </CaseWrapper>
          <CaseWrapper>
            <div><Text variant="700-16">CASE C. Corner</Text></div>
            <PositionBox align="right" style={{ justifyContent: 'flex-end' }}>
              <Select label="Corner" options={options} value={testCorner} onChange={setTestCorner} width="250px" menuWidth="1000px" mode="light" />
            </PositionBox>
          </CaseWrapper>
        </PositionGrid>
      </Section>

    </Container>
  );
}
