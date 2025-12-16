/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// ✅ [수정 1] Default Import로 변경 (중괄호 제거)
import InputTextField from './components/InputTextField';
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

// 🔥 [Style Updated] 시맨틱 컬러 가이드용 스타일 컴포넌트
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

// ✅ [수정됨] 투명도 체크무늬 패턴 적용 (SelectTest와 동일)
const Swatch = styled.div<{ color: string; hasBorder?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: ${({ hasBorder, theme }) => hasBorder ? `1px solid ${theme.colors.coolgray[200]}` : 'none'};
  flex-shrink: 0;

  /* 1. 배경 베이스: 흰색 */
  background-color: #ffffff;
  
  /* 2. 다중 배경 이미지 적용 (순서: 맨 위 -> 맨 아래) 
     - Layer 1: 실제 컬러 (color props). linear-gradient로 처리하여 이미지처럼 사용
     - Layer 2~5: 체크무늬 패턴 (투명한 회색 사각형들)
  */
  background-image: 
    linear-gradient(${({ color }) => color}, ${({ color }) => color}),
    linear-gradient(45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(-45deg, #e5e7eb 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #e5e7eb 75%),
    linear-gradient(-45deg, transparent 75%, #e5e7eb 75%);
    
  background-size: 
    100% 100%, /* Color Layer Size */
    16px 16px, /* Checker Pattern Size */
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

const SubHeader = styled.div`
    margin-top: 30px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${({theme}) => theme.colors.coolgray[200]};
`;

// -------------------------------------------------------------------------
// 2. 메인 컴포넌트
// -------------------------------------------------------------------------

export default function InputTextFieldTest() {
  const theme = useTheme();

  // Basic Usage State
  const [basicValue, setBasicValue] = useState('');
  
  // Light Mode States
  const [lightVal1, setLightVal1] = useState('');
  const [lightVal2, setLightVal2] = useState('텍스트 입력됨');

  // Dark Mode States
  const [darkVal1, setDarkVal1] = useState('');
  const [darkVal2, setDarkVal2] = useState('다크모드 텍스트');

  // Transparent Mode States
  const [transVal1, setTransVal1] = useState('');
  const [transVal2, setTransVal2] = useState('투명모드 텍스트');

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

  // ✅ [수정 2] 공통 핸들러 타입 정의
  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <Container>
      <Header>
        <Text as="h1" variant="900-48" style={{ marginBottom: '10px', fontSize: 'clamp(32px, 5vw, 48px)' }}>
          InputTextField Component
        </Text>
        <Text variant="400-18" color={theme.colors.coolgray[500]}>
          Text Input Fields & States Guide
        </Text>
      </Header>

      {/* 1. Quick Start & Props */}
      <Section>
        <SectionHeader title="1. Quick Start & Props" />
        <Text variant="400-14" color={theme.colors.coolgray[600]}>
          아래 코드는 InputTextField 컴포넌트가 지원하는 <b>모든 옵션(Props)</b>을 포함한 예시입니다.
        </Text>
        <CodeBox>
          <Pre>
{`const [value, setValue] = useState('');

<InputTextField 
  // [Optional] 기본 항목
  label="이메일" 
  placeholder="example@email.com"
  value={value}
  onChange={(e) => setValue(e.target.value)}

  // [Optional] 스타일 및 상태
  width="100%"
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
              { name: 'label', desc: '입력창 상단 라벨 텍스트' },
              { name: 'placeholder', desc: '값이 없을 때 표시되는 힌트 텍스트' },
              { name: 'value', desc: '입력된 값 (Controlled Component)' },
              { name: 'onChange', desc: '값이 변경될 때 실행되는 핸들러 (e: React.ChangeEvent)' },
              { name: 'width', desc: '입력창 너비 (기본값: 100%)' },
              { name: 'disabled', desc: '비활성화 여부 (기본값: false)' },
              { name: 'mode', desc: <span><b>'light'</b> | <b>'dark'</b> | <b>'transparent'</b> (기본값: light)</span> },
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
        <div style={{ maxWidth: '100%' }}>
          <InputTextField 
            label="기본 입력창" 
            placeholder="내용을 입력하세요"
            value={basicValue} 
            onChange={handleChange(setBasicValue)} 
            width="100%" 
            mode="light"
          />
        </div>
      </Section>

      {/* 3. Light Mode Guide (Tokens & Usage) */}
      <Section>
        <SectionHeader title="3. Light Mode Guide" />
        
        {/* 3-1. Light Mode Tokens */}
        <Text variant="700-16">Semantic Color Tokens (Light)</Text>
        <div style={{  marginBottom: 10, padding: 30, background: '#fff', borderRadius: 12, border: `1px dashed ${theme.colors.coolgray[200]}` }}>
            <ColorGrid>
                <ColorCard><Swatch color={theme.components.input.light.bg.default} hasBorder /><div><Text variant="700-14">Bg (Def)</Text><Text variant="400-12" color="#666">coolgray[50]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.light.bg.hover} hasBorder /><div><Text variant="700-14">Bg (Hov)</Text><Text variant="400-12" color="#666">coolgray[75]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.light.bg.active} hasBorder /><div><Text variant="700-14">Bg (Act)</Text><Text variant="400-12" color="#666">white</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.light.bg.disabled} hasBorder /><div><Text variant="700-14">Bg (Dis)</Text><Text variant="400-12" color="#666">coolgray[75]</Text></div></ColorCard>
                
                <ColorCard><Swatch color={theme.components.input.light.border.default} hasBorder /><div><Text variant="700-14">Border (Def)</Text><Text variant="400-12" color="#666">transparent</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.light.border.hover}  /><div><Text variant="700-14">Border (Hov)</Text><Text variant="400-12" color="#666">coolgray[200]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.light.border.active}  /><div><Text variant="700-14">Border (Act)</Text><Text variant="400-12" color="#666">coolgray[200]</Text></div></ColorCard>

                <ColorCard><Swatch color={theme.components.input.light.text.default}  /><div><Text variant="700-14">Text (Def)</Text><Text variant="400-12" color="#666">coolgray[900]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.light.text.placeholder}  /><div><Text variant="700-14">Text (Place)</Text><Text variant="400-12" color="#666">coolgray[400]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.light.text.disabled}  /><div><Text variant="700-14">Text (Dis)</Text><Text variant="400-12" color="#666">coolgray[300]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.light.label.default}  /><div><Text variant="700-14">Label (Def)</Text><Text variant="400-12" color="#666">coolgray[800]</Text></div></ColorCard>

                <ColorCard><Swatch color={theme.components.input.light.icon.default}  /><div><Text variant="700-14">Icon (Def)</Text><Text variant="400-12" color="#666">coolgray[300]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.light.icon.active}  /><div><Text variant="700-14">Icon (Act)</Text><Text variant="400-12" color="#666">coolgray[900]</Text></div></ColorCard>
            </ColorGrid>
        </div>

        {/* 3-2. Light Mode States */}
        <Text variant="700-16">Component States</Text>
        <div style={{ padding: '30px', backgroundColor: theme.colors.white, border: `1px dashed ${theme.colors.coolgray[200]}`, borderRadius: '12px' }}>
          <GridContainer>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Default (Empty)</Text>
              <InputTextField 
                label="라벨" 
                placeholder="플레이스홀더" 
                value={lightVal1} 
                onChange={handleChange(setLightVal1)} 
                mode="light" 
              />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Filled</Text>
              <InputTextField 
                label="라벨" 
                placeholder="플레이스홀더" 
                value={lightVal2} 
                onChange={handleChange(setLightVal2)} 
                mode="light" 
              />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled</Text>
              <InputTextField 
                label="비활성화" 
                placeholder="입력 불가" 
                disabled={true} 
                mode="light" 
              />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
              <InputTextField 
                label="비활성화 (값 있음)" 
                value="수정 불가 데이터" 
                disabled={true} 
                mode="light" 
              />
            </div>
          </GridContainer>
        </div>
      </Section>

      {/* 4. Dark Mode Guide (Tokens & Usage) */}
      <Section>
        <SectionHeader title="4. Dark Mode Guide" />
        
        {/* 4-1. Dark Mode Tokens */}
        <Text variant="700-16">Semantic Color Tokens (Dark)</Text>
        <div style={{ marginBottom: 10, padding: 30, background: '#111827', borderRadius: 12 }}>
            <ColorGrid>
                <ColorCard><Swatch color={theme.components.input.dark.bg.default} hasBorder/><div><Text variant="700-14">Bg (Def)</Text><Text variant="400-12" color="#666">white 8%</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.dark.bg.hover} hasBorder/><div><Text variant="700-14">Bg (Hov)</Text><Text variant="400-12" color="#666">white 12%</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.dark.bg.active} hasBorder/><div><Text variant="700-14">Bg (Act)</Text><Text variant="400-12" color="#666">white 0%</Text></div></ColorCard>
                
                <ColorCard><Swatch color={theme.components.input.dark.border.default} hasBorder/><div><Text variant="700-14">Border (Def)</Text><Text variant="400-12" color="#666">transparent</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.dark.border.hover} /><div><Text variant="700-14">Border (Hov)</Text><Text variant="400-12" color="#666">coolgray[600]</Text></div></ColorCard>

                <ColorCard><Swatch color={theme.components.input.dark.text.default} hasBorder/><div><Text variant="700-14">Text (Def)</Text><Text variant="400-12" color="#666">white</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.dark.text.placeholder} /><div><Text variant="700-14">Text (Place)</Text><Text variant="400-12" color="#666">coolgray[200]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.dark.label.default} /><div><Text variant="700-14">Label (Def)</Text><Text variant="400-12" color="#666">coolgray[300]</Text></div></ColorCard>

                <ColorCard><Swatch color={theme.components.input.dark.icon.default} /><div><Text variant="700-14">Icon (Def)</Text><Text variant="400-12" color="#666">coolgray[400]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.dark.icon.active} hasBorder/><div><Text variant="700-14">Icon (Act)</Text><Text variant="400-12" color="#666">white</Text></div></ColorCard>
            </ColorGrid>
        </div>

        {/* 4-2. Dark Mode States */}
        <Text variant="700-16">Component States</Text>
        <div style={{ padding: '30px', backgroundColor: theme.colors.coolgray[900], borderRadius: '12px' }}>
           <GridContainer>
            <div>
              <Text as="h4" variant="700-14" color={theme.colors.white} style={{ marginBottom: '8px' }}>Default</Text>
              <InputTextField label="다크 라벨" placeholder="다크 플레이스홀더" value={darkVal1} onChange={handleChange(setDarkVal1)} mode="dark" />
            </div>
            <div>
              <Text as="h4" variant="700-14" color={theme.colors.white} style={{ marginBottom: '8px' }}>Filled</Text>
              <InputTextField label="다크 라벨" value={darkVal2} onChange={handleChange(setDarkVal2)} mode="dark" />
            </div>
            <div>
              <Text as="h4" variant="700-14" color={theme.colors.white} style={{ marginBottom: '8px' }}>Disabled</Text>
              <InputTextField label="다크 비활성화" placeholder="입력 불가" disabled={true} mode="dark" />
            </div>
            <div>
              <Text as="h4" variant="700-14" color={theme.colors.white} style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
              <InputTextField label="다크 비활성화" value="수정 불가" disabled={true} mode="dark" />
            </div>
          </GridContainer>
        </div>
      </Section>

      {/* 5. Transparent Mode Guide (Tokens & Usage) */}
      <Section>
        <SectionHeader title="5. Transparent Mode Guide" />

        {/* 5-1. Transparent Mode Tokens */}
        <Text variant="700-16">Semantic Color Tokens (Transparent)</Text>
        <div style={{ marginBottom: 10, padding: 30, background: '#F3F4F6', borderRadius: 12, border: `1px dashed ${theme.colors.coolgray[200]}` }}>
            <ColorGrid>
                <ColorCard><Swatch color={theme.components.input.transparent.bg.default} hasBorder /><div><Text variant="700-14">Bg (Def)</Text><Text variant="400-12" color="#666">Transparent</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.transparent.bg.hover} hasBorder /><div><Text variant="700-14">Bg (Hov)</Text><Text variant="400-12" color="#666">Black 4%</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.transparent.bg.active} hasBorder /><div><Text variant="700-14">Bg (Act)</Text><Text variant="400-12" color="#666">Black 4%</Text></div></ColorCard>

                <ColorCard><Swatch color={theme.components.input.transparent.border.default} hasBorder /><div><Text variant="700-14">Border (All)</Text><Text variant="400-12" color="#666">Transparent</Text></div></ColorCard>

                <ColorCard><Swatch color={theme.components.input.transparent.text.default}  /><div><Text variant="700-14">Text (Def)</Text><Text variant="400-12" color="#666">coolgray[900]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.transparent.text.placeholder}  /><div><Text variant="700-14">Text (Place)</Text><Text variant="400-12" color="#666">coolgray[400]</Text></div></ColorCard>
                
                <ColorCard><Swatch color={theme.components.input.transparent.icon.default}  /><div><Text variant="700-14">Icon (Def)</Text><Text variant="400-12" color="#666">coolgray[300]</Text></div></ColorCard>
                <ColorCard><Swatch color={theme.components.input.transparent.icon.active}  /><div><Text variant="700-14">Icon (Act)</Text><Text variant="400-12" color="#666">coolgray[900]</Text></div></ColorCard>
            </ColorGrid>
        </div>

        {/* 5-2. Transparent Mode States */}
        <Text variant="700-16">Component States</Text>
        <div style={{ padding: '30px', backgroundColor: theme.colors.coolgray[50], border: `1px dashed ${theme.colors.coolgray[200]}`, borderRadius: '12px' }}>
          <GridContainer>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Default</Text>
              <InputTextField label="투명 라벨" placeholder="배경 투명" value={transVal1} onChange={handleChange(setTransVal1)} mode="transparent" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Filled</Text>
              <InputTextField label="투명 라벨" value={transVal2} onChange={handleChange(setTransVal2)} mode="transparent" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled</Text>
              <InputTextField label="투명 비활성화" placeholder="입력 불가" disabled={true} mode="transparent" />
            </div>
            <div>
              <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
              <InputTextField label="투명 비활성화" value="수정 불가" disabled={true} mode="transparent" />
            </div>
          </GridContainer>
        </div>
      </Section>

    </Container>
  );
}