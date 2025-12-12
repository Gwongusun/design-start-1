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
  gap: 50px; /* 섹션 간 간격 */
  min-height: 150vh;

  /* [Mobile] 전체 패딩 및 간격 축소 */
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
  /* 그림자 효과 추가 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);

  /* [Mobile] 섹션 내부 패딩 축소 */
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

  /* [Mobile] 코드박스 패딩 축소 */
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

// Props 리스트 스타일
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

  /* [Mobile] 좁은 화면에서 라벨과 설명을 상하로 배치 */
  @media (max-width: 600px) {
    flex-direction: column;
    align-items: flex-start;
    gap: 8px;
  }
`;

// 속성명 배지 스타일
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
  min-width: 80px;
`;

const GridContainer = styled.div`
  display: grid; 
  gap: 30px; 
  grid-template-columns: 1fr 1fr;

  /* [Mobile] 1단 컬럼으로 변경 */
  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
`;

// 위치 감지 테스트용 그리드
const PositionGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 30px; /* 간격 넓힘 */
  
  /* 3번째 아이템(Corner)은 가로로 길게 배치 */
  & > div:nth-of-type(3) {
    grid-column: span 2;
  }

  /* [Mobile] 1단 컬럼 변경 및 Span 해제 */
  @media (max-width: 900px) {
    grid-template-columns: 1fr;
    
    & > div:nth-of-type(3) {
      grid-column: span 1;
    }
  }
`;

// 텍스트와 박스를 묶어줄 래퍼
const CaseWrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px; /* 텍스트와 박스 사이 간격 */
`;

// PositionBox: 내부 라벨 제거 및 단순화
const PositionBox = styled.div<{ align?: 'right' | 'bottom' }>`
  position: relative;
  display: flex;
  flex-direction: column;
  
  /* 아이템 배치 로직 (Select 위치 잡기용) */
  justify-content: ${({ align }) => (align === 'bottom' ? 'flex-end' : 'flex-start')};
  align-items: ${({ align }) => (align === 'right' ? 'flex-end' : 'flex-start')};
  
  height: 320px;
  padding: 30px;
  background-color: ${({ theme }) => theme.colors.coolgray[50]};
  border: 1px dashed ${({ theme }) => theme.colors.coolgray[300]};
  border-radius: 12px;

  /* [Mobile] 패딩 축소 */
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
  const [val1, setVal1] = useState('');
  const [val2, setVal2] = useState('react');
  
  const [testRight, setTestRight] = useState('');
  const [testBottom, setTestBottom] = useState('');
  const [testCorner, setTestCorner] = useState('');

  const options: OptionType[] = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'angular', label: 'Angular' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'next', label: 'Next.js' },
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

      {/* 0. Quick Start & Props */}
      <Section>
        <SectionHeader title="0. Quick Start & Props" />
        
        <Text variant="400-14" color={theme.colors.coolgray[600]}>
          Select 컴포넌트의 모든 옵션(Props)을 적용한 기본 사용 예시입니다.
        </Text>

        <CodeBox>
          <Pre>
{`const [value, setValue] = useState('');

<Select 
  label="프레임워크 선택" 
  options={[
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' }
  ]}
  value={value}
  onChange={setValue}
  width="320px"
  menuWidth="400px"
  maxHeight={250}
  disabled={false}
/>`}
          </Pre>
        </CodeBox>

        <div>
          <Text 
            as="h3" 
            variant="700-16" 
            color={theme.colors.coolgray[900]}
            style={{ marginBottom: '16px' }}
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
              { name: 'menuWidth', desc: '메뉴 너비 (기본값: width와 동일)' },
              { name: 'maxHeight', desc: '메뉴 최대 높이 (기본값: 250px)' },
              { name: 'disabled', desc: '비활성화 여부' },
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

      {/* 1. Basic Usage */}
      <Section>
        <SectionHeader title="1. Basic Usage" />
        
        <Text variant="400-14" color={theme.colors.coolgray[600]}>
          가장 기본적인 사용 형태입니다.
        </Text>

        <div style={{ padding: '30px', border: `1px solid ${theme.colors.coolgray[200]}`, borderRadius: '12px' }}>
          {/* [Responsive] width="320px" 대신 "100%"를 사용하여 부모 컨테이너에 맞춤 */}
          <Select 
            label="프레임워크 선택" 
            options={options} 
            value={framework} 
            onChange={setFramework} 
            width="100%" 
            menuWidth="100%" 
            maxHeight={120}
          />

          <div style={{ marginTop: '20px', padding: '16px', background: theme.colors.coolgray[50], borderRadius: '8px' }}>
            <Text variant="400-14" color={theme.colors.coolgray[600]}>
              Current Value: 
              <Text as="span" variant="700-14" color={theme.colors.blue[600]} style={{ marginLeft: '8px' }}>
                {framework || '-'}
              </Text>
            </Text>
          </div>
        </div>
      </Section>

      {/* 2. States */}
      <Section>
        <SectionHeader title="2. States" />
        
        <GridContainer>
          <div>
            <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Default</Text>
            <Select label="선택해주세요" options={options} value={val1} onChange={setVal1} width="100%" maxHeight={120} />
          </div>
          <div>
            <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Selected</Text>
            <Select label="프레임워크" options={options} value={val2} onChange={setVal2} width="100%" maxHeight={120} />
          </div>
          <div>
            <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled</Text>
            <Select label="선택 불가" options={options} value="" onChange={() => {}} width="100%" disabled />
          </div>
          <div>
            <Text as="h4" variant="700-14" style={{ marginBottom: '8px' }}>Disabled (Value)</Text>
            <Select label="값 있음" options={options} value="react" onChange={() => {}} width="100%" disabled />
          </div>
        </GridContainer>
      </Section>

      {/* 3. Auto Positioning */}
      <Section>
        <SectionHeader title="3. Auto Positioning" />
        
        <Text variant="400-14" color={theme.colors.coolgray[600]}>
          뷰포트 경계에 근접했을 때 메뉴가 열리는 방향(Direction)이 자동으로 보정되어야 합니다.
        </Text>

        <PositionGrid>
          {/* CASE A */}
          <CaseWrapper>
            <div>
              <Text variant="700-16" color={theme.colors.coolgray[800]}>CASE A. Right Edge</Text>
              <Text variant="400-14" color={theme.colors.coolgray[500]} style={{ marginTop: '4px' }}>
                오른쪽 공간 부족 → 왼쪽 정렬
              </Text>
            </div>
            <PositionBox align="right">
              <Select 
                label="오른쪽 끝 Select" 
                options={options} 
                value={testRight} 
                onChange={setTestRight} 
                width="240px"      
                menuWidth="300px" 
                maxHeight={120}
              />
            </PositionBox>
          </CaseWrapper>

          {/* CASE B */}
          <CaseWrapper>
            <div>
              <Text variant="700-16" color={theme.colors.coolgray[800]}>CASE B. Bottom Edge</Text>
              <Text variant="400-14" color={theme.colors.coolgray[500]} style={{ marginTop: '4px' }}>
                아래 공간 부족 → 위쪽 열림
              </Text>
            </div>
            <PositionBox align="bottom">
              <Select 
                label="바닥 Select" 
                options={options} 
                value={testBottom} 
                onChange={setTestBottom} 
                width="100%"      
                menuWidth="100%"
                maxHeight={120}
              />
            </PositionBox>
          </CaseWrapper>

          {/* CASE C */}
          <CaseWrapper>
            <div>
              <Text variant="700-16" color={theme.colors.coolgray[800]}>CASE C. Corner</Text>
              <Text variant="400-14" color={theme.colors.coolgray[500]} style={{ marginTop: '4px' }}>
                오른쪽+아래 공간 부족 → 왼쪽 정렬 & 위쪽 열림
              </Text>
            </div>
            {/* Corner 케이스는 align="right" + justifyContent: 'flex-end'로 우측 하단 배치 */}
            <PositionBox align="right" style={{ justifyContent: 'flex-end' }}>
              <Select 
                label="구석탱이 Select" 
                options={options} 
                value={testCorner} 
                onChange={setTestCorner} 
                width="240px"      
                menuWidth="300px"
                maxHeight={120} 
              />
            </PositionBox>
          </CaseWrapper>
        </PositionGrid>
      </Section>
    </Container>
  );
}