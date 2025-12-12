/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Text from './components/Text'; 

// 🎨 레이아웃 스타일
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  max-width: 800px;
  margin: 0 auto;
  gap: 50px;
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 30px;
  border-radius: 12px;
  border: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.02);
`;

const SectionTitleWrapper = styled.div`
  margin-bottom: 20px;
  padding-bottom: 15px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.coolgray[100]};
`;

const Row = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 5px;
`;

// 코드 하이라이팅 박스
const CodeBox = styled.div`
  background-color: ${({ theme }) => theme.colors.coolgray[900]};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 10px;
  overflow-x: auto;
`;

// 코드 텍스트
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
  min-width: 80px;
  text-align: center;
`;

export default function TextTest() {
  const theme = useTheme();

  const DescriptionText = ({ children }: { children: React.ReactNode }) => (
    <Text 
      variant="caption" 
      color={theme.colors.coolgray[400]} 
      style={{ marginLeft: '8px' }}
    >
      {children}
    </Text>
  );

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

  return (
    <Container>
      <Header>
        {/* as -> variant 순서 준수 */}
        <Text 
          as="h1" 
          variant="displayLarge" 
          style={{ marginBottom: '10px' }}
        >
          Text Component
        </Text>
        <Text 
          variant="bodyLarge" 
          color={theme.colors.coolgray[500]}
        >
          디자인 시스템의 모든 텍스트 스타일(Variant)과 색상(Theme Color) 예시입니다.
        </Text>
      </Header>

      {/* ✨ 0. Quick Start */}
      <Section>
        <SectionHeader title="0. Quick Start (사용 예시)" />
        
        <Text variant="bodyMedium" color={theme.colors.coolgray[600]}>
          Text 컴포넌트는 아래와 같이 <b>as, variant, color, align, style</b> 속성을 조합하여 사용합니다.
        </Text>

        <CodeBox>
          <Pre>
{`<Text 
  as="h1" 
  variant="displayMedium" 
  color={theme.colors.blue[500]}
  align="center"
  style={{ fontStyle: 'italic' }}
>
  Hello Design System!
</Text>`}
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
          <PropItem>
            <PropName>as</PropName>
            <Text variant="bodyMedium">
              렌더링할 HTML 태그를 결정합니다. (예: h1, p, span, div, a)
            </Text>
          </PropItem>
          <PropItem>
            <PropName>variant</PropName>
            <Text variant="bodyMedium">
              미리 정의된 폰트 크기와 스타일을 적용합니다. (예: displayLarge, bodyMedium)
            </Text>
          </PropItem>
          <PropItem>
            <PropName>color</PropName>
            <Text variant="bodyMedium">
              텍스트 색상을 지정합니다. <b>theme.colors</b> 객체 사용을 권장합니다.
            </Text>
          </PropItem>
          <PropItem>
            <PropName>align</PropName>
            <Text variant="bodyMedium">
              텍스트 정렬을 지정합니다. (left, center, right)
            </Text>
          </PropItem>
          <PropItem>
            <PropName>style</PropName>
            <Text variant="bodyMedium">
              기본 스타일을 덮어쓰거나 추가 CSS를 인라인으로 적용할 때 사용합니다.
            </Text>
          </PropItem>
        </PropList>
      </Section>

      {/* 1. Typography Variants */}
      <Section>
        <SectionHeader title="1. Typography Variants (크기)" />
        
        <Row>
          <Text variant="displayLarge">Display Large</Text>
          <DescriptionText>(64px, Bold)</DescriptionText>
        </Row>
        
        <Row>
          <Text variant="displayMedium">Display Medium</Text>
          <DescriptionText>(48px, Bold)</DescriptionText>
        </Row>
        
        <Row>
          <Text variant="h1">Heading 1</Text>
          <DescriptionText>(32px, Bold)</DescriptionText>
        </Row>
        
        <Row>
          <Text variant="h2">Heading 2</Text>
          <DescriptionText>(24px, Bold)</DescriptionText>
        </Row>
        
        <Row>
          <Text variant="bodyLarge">Body Large</Text>
          <DescriptionText>(18px, Regular)</DescriptionText>
        </Row>
        
        <Row>
          <Text variant="bodyMedium">Body Medium</Text>
          <DescriptionText>(16px, Regular - 기본값)</DescriptionText>
        </Row>
        
        <Row>
          <Text variant="label">Label Text</Text>
          <DescriptionText>(14px, Medium)</DescriptionText>
        </Row>
        
        <Row>
          <Text variant="caption">Caption Text</Text>
          <DescriptionText>(12px, Medium)</DescriptionText>
        </Row>
      </Section>

      {/* 2. Colors */}
      <Section>
        <SectionHeader title="2. Colors (테마 색상)" />
        
        <Text variant="h2" color={theme.colors.blue[500]}>
          Primary Blue (Brand Color)
        </Text>
        <Text variant="h2" color={theme.colors.red[500]}>
          Error Red (System Color)
        </Text>
        <Text variant="h2" color={theme.colors.green[600]}>
          Success Green (System Color)
        </Text>
        <Text variant="bodyLarge" color={theme.colors.coolgray[400]}>
          Coolgray 400 (Disabled Text)
        </Text>
        
        <div style={{ background: theme.colors.coolgray[900], padding: '10px', borderRadius: '4px' }}>
          <Text variant="bodyLarge" color={theme.colors.white}>
            White Text on Dark Background
          </Text>
        </div>
      </Section>

      {/* 3. Alignment */}
      <Section>
        <SectionHeader title="3. Text Alignment (정렬)" />
        
        <div style={{ background: theme.colors.coolgray[50], padding: '10px', borderRadius: '8px' }}>
          <Text 
            variant="bodyMedium" 
            align="left" 
            style={{ marginBottom: '8px', border: `1px dashed ${theme.colors.coolgray[300]}` }}
          >
            Left Aligned (Default)
          </Text>
          <Text 
            variant="bodyMedium" 
            align="center" 
            style={{ marginBottom: '8px', border: `1px dashed ${theme.colors.coolgray[300]}` }}
          >
            Center Aligned
          </Text>
          <Text 
            variant="bodyMedium" 
            align="right" 
            style={{ border: `1px dashed ${theme.colors.coolgray[300]}` }}
          >
            Right Aligned
          </Text>
        </div>
      </Section>

      {/* 4. Polymorphism & Links */}
      <Section>
        <SectionHeader title="4. Polymorphism & Links (태그 변환)" />
        
        <Text variant="bodyLarge" color={theme.colors.coolgray[600]}>
          아래 텍스트들은 겉보기엔 비슷해 보이지만, 실제 HTML 태그는 다릅니다. (SEO 최적화)
        </Text>

        <ul style={{ paddingLeft: '20px', margin: 0 }}>
          <li>
            {/* as -> variant 순서 준수 */}
            <Text 
              as="h3" 
              variant="bodyLarge" 
              style={{ fontWeight: 'bold' }}
            >
              이것은 실제 h3 태그입니다.
            </Text>
          </li>
          <li>
            {/* as -> variant 순서 준수 */}
            <Text as="span" variant="bodyLarge">
              이것은 span 태그입니다 (줄바꿈 안 됨).
            </Text>
            <Text 
              as="span" 
              variant="bodyLarge" 
              color={theme.colors.blue[500]} 
              style={{ marginLeft: '5px' }}
            >
               옆에 붙은 span입니다.
            </Text>
          </li>
          <li style={{ marginTop: '10px' }}>
            {/* as -> variant 순서 준수 */}
            <Text 
              as="a" 
              variant="bodyLarge" 
              color={theme.colors.indigo[600]}
              href="https://google.com" 
              target="_blank"
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              🔗 Google로 이동하기 (a 태그, 새 탭)
            </Text>
          </li>
        </ul>
      </Section>

      {/* 5. Custom Styles */}
      <Section>
        <SectionHeader title="5. Custom Styles (스타일 커스텀)" />
        
        <Text variant="bodyLarge">
          기본 스타일에 <b style={{ color: theme.colors.red[500] }}>style 속성</b>을 추가하여 마음대로 꾸밀 수 있습니다.
        </Text>

        <div style={{ display: 'flex', gap: '10px', marginTop: '10px' }}>
          <Text 
            variant="bodyMedium" 
            color={theme.colors.coolgray[400]} 
            style={{ textDecoration: 'line-through' }}
          >
            취소선 텍스트
          </Text>
          
          <Text 
            variant="bodyMedium" 
            style={{ textDecoration: 'underline' }}
          >
            밑줄 텍스트
          </Text>
          
          <Text 
            variant="bodyMedium" 
            color={theme.colors.violet[600]} 
            style={{ fontStyle: 'italic' }}
          >
            이탤릭체 + 보라색
          </Text>
          
          <Text 
            variant="bodyMedium" 
            style={{ letterSpacing: '5px' }}
          >
            자간넓음
          </Text>
        </div>
      </Section>

    </Container>
  );
}