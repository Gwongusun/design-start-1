/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// 🔥 [수정됨] 중괄호 {} 제거 (Default Import)
import InputTextField from './components/InputTextField';
import Text from './components/Text';

// ... (스타일 정의 코드는 기존과 동일하므로 생략, 아래 컴포넌트 부분만 교체하세요) ...

const Container = styled.div`
  display: flex; flex-direction: column; padding: 50px;
  max-width: 100%; margin: 0 auto; gap: 50px; min-height: 150vh;
  background-color: #F9FAFB;
  @media (max-width: 768px) { padding: 20px; gap: 30px; }
`;
const Header = styled.div` margin-bottom: 20px; `;
const Section = styled.section`
  display: flex; flex-direction: column; gap: 20px; padding: 40px;
  border: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
  border-radius: 16px; background-color: ${({ theme }) => theme.colors.white};
`;
const SectionTitleWrapper = styled.div`
  margin-bottom: 20px; padding-bottom: 20px;
  border-bottom: 2px solid ${({ theme }) => theme.colors.coolgray[900]};
`;
const CodeBox = styled.div`
  background-color: ${({ theme }) => theme.colors.coolgray[900]};
  border-radius: 8px; padding: 30px; overflow-x: auto;
  font-family: 'Menlo', 'Monaco', monospace;
`;
const Pre = styled.pre` margin: 0; color: ${({ theme }) => theme.colors.white}; font-size: 14px; line-height: 1.6; `;
const GridContainer = styled.div` display: grid; gap: 30px; grid-template-columns: 1fr 1fr; `;

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
      <Text as="h2" variant="700-24" color={theme.colors.coolgray[900]}>
        {title}
      </Text>
    </SectionTitleWrapper>
  );

  // 🔥 [수정됨] 이벤트 객체 'e'에 명확한 타입(React.ChangeEvent) 지정
  const handleChange = (setter: React.Dispatch<React.SetStateAction<string>>) => 
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setter(e.target.value);
    };

  return (
    <Container>
      <Header>
        <Text as="h1" variant="900-48" style={{ marginBottom: '10px' }}>
          InputTextField Component
        </Text>
        <Text variant="400-18" color={theme.colors.coolgray[500]}>
          Text Input Fields & States Guide
        </Text>
      </Header>

      {/* 1. Quick Start */}
      <Section>
        <SectionHeader title="1. Quick Start & Props" />
        <CodeBox>
          <Pre>
{`<InputTextField 
  label="이메일" 
  value={value}
  onChange={(e) => setValue(e.target.value)}
  width="100%"
  mode="light"
/>`}
          </Pre>
        </CodeBox>
      </Section>

      {/* 2. Basic Usage */}
      <Section>
        <SectionHeader title="2. Basic Usage (Light)" />
        <div style={{ maxWidth: '400px' }}>
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

      {/* 3. Light Mode States */}
      <Section>
        <SectionHeader title="3. Light Mode States" />
        <div style={{ padding: '30px', backgroundColor: theme.colors.white, border: `1px solid ${theme.colors.coolgray[200]}`, borderRadius: '12px' }}>
          <GridContainer>
            <InputTextField label="Default" placeholder="빈 값" value={lightVal1} onChange={handleChange(setLightVal1)} mode="light" />
            <InputTextField label="Filled" value={lightVal2} onChange={handleChange(setLightVal2)} mode="light" />
            <InputTextField label="Disabled" placeholder="입력 불가" disabled mode="light" />
            <InputTextField label="Disabled (Value)" value="값 있음" disabled mode="light" />
          </GridContainer>
        </div>
      </Section>

      {/* 4. Dark Mode States */}
      <Section>
        <SectionHeader title="4. Dark Mode States" />
        <div style={{ padding: '40px', backgroundColor: theme.colors.coolgray[900], borderRadius: '12px' }}>
           <GridContainer>
            <InputTextField label="Default" placeholder="다크" value={darkVal1} onChange={handleChange(setDarkVal1)} mode="dark" />
            <InputTextField label="Filled" value={darkVal2} onChange={handleChange(setDarkVal2)} mode="dark" />
            <InputTextField label="Disabled" placeholder="입력 불가" disabled mode="dark" />
            <InputTextField label="Disabled (Value)" value="값 있음" disabled mode="dark" />
          </GridContainer>
        </div>
      </Section>

      {/* 5. Transparent Mode States */}
      <Section>
        <SectionHeader title="5. Transparent Mode States" />
        <div style={{ padding: '30px', backgroundColor: theme.colors.coolgray[50], borderRadius: '12px' }}>
          <GridContainer>
            <InputTextField label="Default" placeholder="투명" value={transVal1} onChange={handleChange(setTransVal1)} mode="transparent" />
            <InputTextField label="Filled" value={transVal2} onChange={handleChange(setTransVal2)} mode="transparent" />
            <InputTextField label="Disabled" placeholder="입력 불가" disabled mode="transparent" />
            <InputTextField label="Disabled (Value)" value="값 있음" disabled mode="transparent" />
          </GridContainer>
        </div>
      </Section>

    </Container>
  );
}