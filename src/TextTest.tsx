/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Text from './components/Text'; 
import { FontSize, FontWeight, TypographyVariant } from './styles/typography';

// -------------------------------------------------------------------------
// 데이터 정의
// -------------------------------------------------------------------------
const ALL_SIZES: FontSize[] = [
  '64', '56', '48', '40', '36', '32', '28', '24', '20', '18', '16', '14', '13', '12', '11'
];

const ALL_WEIGHTS: FontWeight[] = ['400', '500', '700', '900'];

const WEIGHT_LABELS: Record<FontWeight, string> = {
  '400': 'Regular (400)',
  '500': 'Medium (500)',
  '700': 'Bold (700)',
  '900': 'Black (900)',
};

// -------------------------------------------------------------------------
// 스타일 정의
// -------------------------------------------------------------------------
const Container = styled.div`
  display: flex;
  flex-direction: column;
  padding: 50px;
  max-width: 100%;
  margin: 0 auto;
  gap: 50px;
  padding-bottom: 100px;

  /* [Mobile] 전체 패딩 및 간격 축소 */
  @media (max-width: 768px) {
    padding: 20px;
    gap: 30px;
  }
`;

const Header = styled.div`
  margin-bottom: 20px;
`;

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  border-radius: 16px;
  border: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
  background-color: ${({ theme }) => theme.colors.white};
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

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  
  /* [Mobile] 테이블 최소 너비 설정 -> 가로 스크롤 유도 */
  min-width: 1680px; 
`;

const Th = styled.th`
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.coolgray[50]};
  color: ${({ theme }) => theme.colors.coolgray[600]};
  font-weight: 600;
  font-size: 14px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
  text-align: center;
  
  &:first-of-type {
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    width: 80px;
    text-align: right; 
    padding-right: 24px;
  }
  &:last-of-type {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  /* [Mobile] 헤더 패딩 축소 */
  @media (max-width: 768px) {
    padding: 10px 4px;
    font-size: 12px;
  }
`;

const Tr = styled.tr`
  border-bottom: 1px dashed ${({ theme }) => theme.colors.coolgray[100]};
  transition: background-color 0.2s;
  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[50]};
  }
  &:last-child {
    border-bottom: none;
  }
`;

const Td = styled.td`
  padding: 20px 10px;
  vertical-align: middle;
  color: ${({ theme }) => theme.colors.coolgray[900]};
  text-align: center;

  &:first-of-type {
    font-family: monospace;
    font-size: 12px;
    color: ${({ theme }) => theme.colors.coolgray[400]};
    text-align: right;
    font-weight: bold;
    border-right: 1px solid ${({ theme }) => theme.colors.coolgray[100]};
    padding-right: 24px;
  }
`;

// [Guide Styles]
const CodeBox = styled.div`
  background-color: ${({ theme }) => theme.colors.coolgray[900]};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 10px;
  overflow-x: auto; /* 코드 스크롤 */

  /* [Mobile] 코드박스 패딩 축소 */
  @media (max-width: 768px) {
    padding: 16px;
  }
`;

const Pre = styled.pre`
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
  font-family: 'Menlo', 'Monaco', 'Courier New', monospace;
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

// [수정] align-items: center 로 변경 (세로 중앙 정렬)
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

export default function TextTest() {
  const theme = useTheme();

  const SectionHeader = ({ title }: { title: string }) => (
    <SectionTitleWrapper>
      <Text as="h2" variant="700-24" color={theme.colors.coolgray[900]}>
        {title}
      </Text>
    </SectionTitleWrapper>
  );

  return (
    <Container>
      <Header>
        {/* [Responsive] 폰트 사이즈 clamp 적용 */}
        <Text as="h1" variant="900-48" style={{ marginBottom: '10px', fontSize: 'clamp(32px, 5vw, 48px)' }}>
          Typography System
        </Text>
        <Text variant="400-18" color={theme.colors.coolgray[500]}>
          Comprehensive Guide & Test Suite
        </Text>
      </Header>

      {/* 1. Typography Matrix Table */}
      <Section>
        <SectionHeader title="1. Full Typography Matrix" />
        <Text variant="400-14" color={theme.colors.coolgray[500]} style={{ marginBottom: '10px' }}>
          모든 사이즈(Size)와 두께(Weight) 조합을 보여주는 매트릭스입니다. (좌우 스크롤 가능)
        </Text>

        {/* 가로 스크롤 컨테이너 */}
        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <StyledTable>
            <thead>
              <tr>
                <Th>Size</Th>
                {ALL_WEIGHTS.map((weight) => (
                  <Th key={weight}>{WEIGHT_LABELS[weight]}</Th>
                ))}
              </tr>
            </thead>
            <tbody>
              {ALL_SIZES.map((size) => (
                <Tr key={size}>
                  <Td>{size}px</Td>
                  {ALL_WEIGHTS.map((weight) => {
                    const variantKey = `${weight}-${size}` as TypographyVariant;
                    return (
                      <Td key={variantKey}>
                        <Text 
                          variant={variantKey} 
                          align="center" 
                          style={{ whiteSpace: 'nowrap' }}
                        >
                          Ag {weight}-{size}
                        </Text>
                      </Td>
                    );
                  })}
                </Tr>
              ))}
            </tbody>
          </StyledTable>
        </div>
      </Section>

      {/* 2. Quick Start & Props Guide */}
      <Section>
        <SectionHeader title="2. Quick Start & Props" />
        
        <Text variant="400-16" color={theme.colors.coolgray[600]}>
          Text 컴포넌트는 <b>"두께-사이즈"</b> 조합의 문자열(String Literal)로 스타일을 지정합니다.
        </Text>

        <CodeBox>
          <Pre>
{`<Text 
  as="h1" 
  variant="900-48"   // 900(Black) + 48px
  color={theme.colors.blue[500]}
  align="center"
  style={{ textDecoration: 'underline' }}
>
  Hello Design System!
</Text>`}
          </Pre>
        </CodeBox>

        <Text as="h3" variant="700-18" style={{ marginTop: '20px', marginBottom: '16px' }}>
          Props Guide
        </Text>

        <PropList>
          <PropItem>
            <PropBadge>as</PropBadge>
            <Text variant="400-14" color={theme.colors.coolgray[700]}>
              렌더링할 HTML 태그를 결정합니다. (예: h1, p, span, div, a)
            </Text>
          </PropItem>
          <PropItem>
            <PropBadge>variant</PropBadge>
            <Text variant="400-14" color={theme.colors.coolgray[700]}>
              <b>"두께-크기"</b> 형태로 입력합니다. (예: 400-16, 700-24, 900-64)
            </Text>
          </PropItem>
          <PropItem>
            <PropBadge>color</PropBadge>
            <Text variant="400-14" color={theme.colors.coolgray[700]}>
              텍스트 색상을 지정합니다. <b>theme.colors</b> 객체 사용을 권장합니다.
            </Text>
          </PropItem>
          <PropItem>
            <PropBadge>align</PropBadge>
            <Text variant="400-14" color={theme.colors.coolgray[700]}>
              텍스트 정렬을 지정합니다. (left, center, right)
            </Text>
          </PropItem>
          <PropItem>
            <PropBadge>style</PropBadge>
            <Text variant="400-14" color={theme.colors.coolgray[700]}>
              기본 스타일을 덮어쓰거나 추가 CSS를 인라인으로 적용할 때 사용합니다.
            </Text>
          </PropItem>
        </PropList>
      </Section>

      {/* 3. Colors */}
      <Section>
        <SectionHeader title="3. Colors (테마 색상)" />
        
        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Text variant="700-24" color={theme.colors.blue[500]}>
            Primary Blue (Brand Color)
          </Text>
          <Text variant="700-24" color={theme.colors.red[500]}>
            Error Red (System Color)
          </Text>
          <Text variant="700-24" color={theme.colors.green[600]}>
            Success Green (System Color)
          </Text>
          <Text variant="400-18" color={theme.colors.coolgray[400]}>
            Coolgray 400 (Disabled Text)
          </Text>
          <div style={{ background: theme.colors.coolgray[900], padding: '16px', borderRadius: '8px', marginTop: '10px' }}>
            <Text variant="400-18" color={theme.colors.white}>
              White Text on Dark Background
            </Text>
          </div>
        </div>
      </Section>

      {/* 4. Alignment */}
      <Section>
        <SectionHeader title="4. Text Alignment (정렬)" />
        
        <div style={{ background: theme.colors.coolgray[50], padding: '20px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <Text 
            variant="400-16" 
            align="left" 
            style={{ border: `1px dashed ${theme.colors.coolgray[300]}`, padding: '5px' }}
          >
            Left Aligned (Default)
          </Text>
          <Text 
            variant="400-16" 
            align="center" 
            style={{ border: `1px dashed ${theme.colors.coolgray[300]}`, padding: '5px' }}
          >
            Center Aligned
          </Text>
          <Text 
            variant="400-16" 
            align="right" 
            style={{ border: `1px dashed ${theme.colors.coolgray[300]}`, padding: '5px' }}
          >
            Right Aligned
          </Text>
        </div>
      </Section>

      {/* 5. Polymorphism & Links */}
      <Section>
        <SectionHeader title="5. Polymorphism & Links (태그 변환)" />
        
        <Text variant="400-16" color={theme.colors.coolgray[600]}>
          아래 텍스트들은 겉보기엔 비슷해 보이지만, 실제 HTML 태그는 다릅니다. (SEO 최적화)
        </Text>

        <ul style={{ paddingLeft: '20px', margin: 0, display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <li>
            <Text as="h3" variant="700-18">
              이것은 실제 h3 태그입니다.
            </Text>
          </li>
          <li>
            <Text as="span" variant="400-18">
              이것은 span 태그입니다 (줄바꿈 안 됨).
            </Text>
            <Text as="span" variant="700-18" color={theme.colors.blue[500]} style={{ marginLeft: '5px' }}>
               옆에 붙은 Bold span입니다.
            </Text>
          </li>
          <li>
            <Text 
              as="a" 
              variant="400-18" 
              color={theme.colors.indigo[600]}
              href="https://google.com" 
              target="_blank"
              style={{ textDecoration: 'underline', cursor: 'pointer' }}
            >
              🔗 Google로 이동하기 (a 태그, href 속성 지원)
            </Text>
          </li>
        </ul>
      </Section>

      {/* 6. Custom Styles */}
      <Section>
        <SectionHeader title="6. Custom Styles (스타일 커스텀)" />
        
        <Text variant="400-16">
          기본 스타일에 <b style={{ color: theme.colors.red[500] }}>style 속성</b>을 추가하여 마음대로 꾸밀 수 있습니다.
        </Text>

        <div style={{ display: 'flex', gap: '20px', marginTop: '10px', flexWrap: 'wrap' }}>
          <Text variant="400-18" color={theme.colors.coolgray[400]} style={{ textDecoration: 'line-through' }}>
            취소선 텍스트
          </Text>
          
          <Text variant="400-18" style={{ textDecoration: 'underline' }}>
            밑줄 텍스트
          </Text>
          
          <Text variant="400-18" color={theme.colors.violet[600]} style={{ fontStyle: 'italic' }}>
            이탤릭체 + 보라색
          </Text>
          
          <Text variant="700-18" style={{ letterSpacing: '5px' }}>
            자간넓음
          </Text>
        </div>
      </Section>

    </Container>
  );
}