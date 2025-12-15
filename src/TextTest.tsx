/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';
import Text from './components/Text'; 

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
  min-width: 1640px; 
`;

/* Tr 정의 */
const Tr = styled.tr`
  border-bottom: 1px dashed ${({ theme }) => theme.colors.coolgray[100]};
  /* 오류 원인 제거: Hover 배경색 전환 효과 잠시 제거하거나 단순화 */
  transition: background-color 0.2s;
  
  &:hover {
    background-color: ${({ theme }) => theme.colors.blue[50]};
  }

  &:last-child {
    border-bottom: none;
  }
`;

const Th = styled.th`
  width: 390px;
  padding: 16px;
  background-color: ${({ theme }) => theme.colors.coolgray[50]};
  border-bottom: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
  text-align: center;
  
  /* [Sticky Column] Size 헤더 */
  &:first-of-type {
    position: sticky;
    left: 0;
    z-index: 2;
    background-color: ${({ theme }) => theme.colors.coolgray[50]};
    box-shadow: 2px 0 5px rgba(0,0,0,0.05);
    width: 80px; 
    border-top-left-radius: 8px;
    border-bottom-left-radius: 8px;
    text-align: center; 
    padding-right: 0;
  }
  
  &:last-of-type {
    border-top-right-radius: 8px;
    border-bottom-right-radius: 8px;
  }

  @media (max-width: 768px) {
    padding: 10px 4px;
  }
`;

const Td = styled.td`
  padding: 20px 10px;
  vertical-align: middle;
  text-align: center;

  /* [Sticky Column] Size 데이터 셀 */
  &:first-of-type {
    position: sticky;
    left: 0;
    z-index: 1;
    background-color: ${({ theme }) => theme.colors.white};
    box-shadow: 2px 0 5px rgba(0,0,0,0.05);
    border-right: 1px solid ${({ theme }) => theme.colors.coolgray[100]};
    text-align: center;
    padding-right: 0;
  }

  /* 🚨 [삭제함] 에러의 주범인 Hover 연동 코드를 삭제했습니다. 
     이제 화면이 하얗게 되는 일은 없을 것입니다. */
`;

const CodeBox = styled.div`
  background-color: ${({ theme }) => theme.colors.coolgray[900]};
  border-radius: 8px;
  padding: 24px;
  margin-bottom: 10px;
  overflow-x: auto;
  @media (max-width: 768px) { padding: 16px; }
`;
const Pre = styled.pre` margin: 0; color: ${({ theme }) => theme.colors.white}; font-family: 'Menlo', 'Monaco', 'Courier New', monospace; font-size: 14px; line-height: 1.6; `;
const PropList = styled.ul` display: flex; flex-direction: column; padding: 0; margin: 0; list-style: none; `;
const PropItem = styled.li` display: flex; align-items: center; gap: 20px; padding: 20px 0; border-bottom: 1px dotted ${({ theme }) => theme.colors.coolgray[200]}; &:first-of-type { border-top: 1px dotted ${({ theme }) => theme.colors.coolgray[200]}; } @media (max-width: 600px) { flex-direction: column; align-items: flex-start; gap: 8px; } `;
const PropBadge = styled.span` display: inline-flex; align-items: center; justify-content: center; background-color: ${({ theme }) => theme.colors.blue[50]}; color: ${({ theme }) => theme.colors.blue[600]}; padding: 6px 12px; border-radius: 4px; font-weight: 700; font-family: monospace; font-size: 14px; min-width: 80px; `;

export default function TextTest() {
  const theme = useTheme();

  const SectionHeader = ({ title }: { title: string }) => (
    <SectionTitleWrapper>
      <Text as="h2" variant="700-24" color={theme.colors.coolgray[900]} >
        {title}
      </Text>
    </SectionTitleWrapper>
  );

  return (
    <Container>
      <Header>
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

        <div style={{ overflowX: 'auto', WebkitOverflowScrolling: 'touch' }}>
          <StyledTable>
            <thead>
              <Tr>
                <Th><Text align="center" variant="700-14" color={theme.colors.coolgray[600]}>Size</Text></Th>
                <Th><Text align="center" variant="700-14" color={theme.colors.coolgray[600]}>Regular (400)</Text></Th>
                <Th><Text align="center" variant="700-14" color={theme.colors.coolgray[600]}>Medium (500)</Text></Th>
                <Th><Text align="center" variant="700-14" color={theme.colors.coolgray[600]}>Bold (700)</Text></Th>
                <Th><Text align="center" variant="700-14" color={theme.colors.coolgray[600]}>Black (900)</Text></Th>
              </Tr>
            </thead>
            <tbody>
              {/* 64px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>64px</Text></Td>
                <Td><Text align="center" variant="400-64" color={theme.colors.coolgray[900]}>Ag 400-64</Text></Td>
                <Td><Text align="center" variant="500-64" color={theme.colors.coolgray[900]}>Ag 500-64</Text></Td>
                <Td><Text align="center" variant="700-64" color={theme.colors.coolgray[900]}>Ag 700-64</Text></Td>
                <Td><Text align="center" variant="900-64" color={theme.colors.coolgray[900]}>Ag 900-64</Text></Td>
              </Tr>

              {/* 56px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>56px</Text></Td>
                <Td><Text align="center" variant="400-56" color={theme.colors.coolgray[900]}>Ag 400-56</Text></Td>
                <Td><Text align="center" variant="500-56" color={theme.colors.coolgray[900]}>Ag 500-56</Text></Td>
                <Td><Text align="center" variant="700-56" color={theme.colors.coolgray[900]}>Ag 700-56</Text></Td>
                <Td><Text align="center" variant="900-56" color={theme.colors.coolgray[900]}>Ag 900-56</Text></Td>
              </Tr>

              {/* 48px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>48px</Text></Td>
                <Td><Text align="center" variant="400-48" color={theme.colors.coolgray[900]}>Ag 400-48</Text></Td>
                <Td><Text align="center" variant="500-48" color={theme.colors.coolgray[900]}>Ag 500-48</Text></Td>
                <Td><Text align="center" variant="700-48" color={theme.colors.coolgray[900]}>Ag 700-48</Text></Td>
                <Td><Text align="center" variant="900-48" color={theme.colors.coolgray[900]}>Ag 900-48</Text></Td>
              </Tr>

              {/* 40px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>40px</Text></Td>
                <Td><Text align="center" variant="400-40" color={theme.colors.coolgray[900]}>Ag 400-40</Text></Td>
                <Td><Text align="center" variant="500-40" color={theme.colors.coolgray[900]}>Ag 500-40</Text></Td>
                <Td><Text align="center" variant="700-40" color={theme.colors.coolgray[900]}>Ag 700-40</Text></Td>
                <Td><Text align="center" variant="900-40" color={theme.colors.coolgray[900]}>Ag 900-40</Text></Td>
              </Tr>

              {/* 36px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>36px</Text></Td>
                <Td><Text align="center" variant="400-36" color={theme.colors.coolgray[900]}>Ag 400-36</Text></Td>
                <Td><Text align="center" variant="500-36" color={theme.colors.coolgray[900]}>Ag 500-36</Text></Td>
                <Td><Text align="center" variant="700-36" color={theme.colors.coolgray[900]}>Ag 700-36</Text></Td>
                <Td><Text align="center" variant="900-36" color={theme.colors.coolgray[900]}>Ag 900-36</Text></Td>
              </Tr>

              {/* 32px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>32px</Text></Td>
                <Td><Text align="center" variant="400-32" color={theme.colors.coolgray[900]}>Ag 400-32</Text></Td>
                <Td><Text align="center" variant="500-32" color={theme.colors.coolgray[900]}>Ag 500-32</Text></Td>
                <Td><Text align="center" variant="700-32" color={theme.colors.coolgray[900]}>Ag 700-32</Text></Td>
                <Td><Text align="center" variant="900-32" color={theme.colors.coolgray[900]}>Ag 900-32</Text></Td>
              </Tr>

              {/* 28px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>28px</Text></Td>
                <Td><Text align="center" variant="400-28" color={theme.colors.coolgray[900]}>Ag 400-28</Text></Td>
                <Td><Text align="center" variant="500-28" color={theme.colors.coolgray[900]}>Ag 500-28</Text></Td>
                <Td><Text align="center" variant="700-28" color={theme.colors.coolgray[900]}>Ag 700-28</Text></Td>
                <Td><Text align="center" variant="900-28" color={theme.colors.coolgray[900]}>Ag 900-28</Text></Td>
              </Tr>

              {/* 24px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>24px</Text></Td>
                <Td><Text align="center" variant="400-24" color={theme.colors.coolgray[900]}>Ag 400-24</Text></Td>
                <Td><Text align="center" variant="500-24" color={theme.colors.coolgray[900]}>Ag 500-24</Text></Td>
                <Td><Text align="center" variant="700-24" color={theme.colors.coolgray[900]}>Ag 700-24</Text></Td>
                <Td><Text align="center" variant="900-24" color={theme.colors.coolgray[900]}>Ag 900-24</Text></Td>
              </Tr>

              {/* 20px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>20px</Text></Td>
                <Td><Text align="center" variant="400-20" color={theme.colors.coolgray[900]}>Ag 400-20</Text></Td>
                <Td><Text align="center" variant="500-20" color={theme.colors.coolgray[900]}>Ag 500-20</Text></Td>
                <Td><Text align="center" variant="700-20" color={theme.colors.coolgray[900]}>Ag 700-20</Text></Td>
                <Td><Text align="center" variant="900-20" color={theme.colors.coolgray[900]}>Ag 900-20</Text></Td>
              </Tr>

              {/* 18px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>18px</Text></Td>
                <Td><Text align="center" variant="400-18" color={theme.colors.coolgray[900]}>Ag 400-18</Text></Td>
                <Td><Text align="center" variant="500-18" color={theme.colors.coolgray[900]}>Ag 500-18</Text></Td>
                <Td><Text align="center" variant="700-18" color={theme.colors.coolgray[900]}>Ag 700-18</Text></Td>
                <Td><Text align="center" variant="900-18" color={theme.colors.coolgray[900]}>Ag 900-18</Text></Td>
              </Tr>

              {/* 16px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>16px</Text></Td>
                <Td><Text align="center" variant="400-16" color={theme.colors.coolgray[900]}>Ag 400-16</Text></Td>
                <Td><Text align="center" variant="500-16" color={theme.colors.coolgray[900]}>Ag 500-16</Text></Td>
                <Td><Text align="center" variant="700-16" color={theme.colors.coolgray[900]}>Ag 700-16</Text></Td>
                <Td><Text align="center" variant="900-16" color={theme.colors.coolgray[900]}>Ag 900-16</Text></Td>
              </Tr>

              {/* 14px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>14px</Text></Td>
                <Td><Text align="center" variant="400-14" color={theme.colors.coolgray[900]}>Ag 400-14</Text></Td>
                <Td><Text align="center" variant="500-14" color={theme.colors.coolgray[900]}>Ag 500-14</Text></Td>
                <Td><Text align="center" variant="700-14" color={theme.colors.coolgray[900]}>Ag 700-14</Text></Td>
                <Td><Text align="center" variant="900-14" color={theme.colors.coolgray[900]}>Ag 900-14</Text></Td>
              </Tr>

              {/* 13px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>13px</Text></Td>
                <Td><Text align="center" variant="400-13" color={theme.colors.coolgray[900]}>Ag 400-13</Text></Td>
                <Td><Text align="center" variant="500-13" color={theme.colors.coolgray[900]}>Ag 500-13</Text></Td>
                <Td><Text align="center" variant="700-13" color={theme.colors.coolgray[900]}>Ag 700-13</Text></Td>
                <Td><Text align="center" variant="900-13" color={theme.colors.coolgray[900]}>Ag 900-13</Text></Td>
              </Tr>

              {/* 12px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>12px</Text></Td>
                <Td><Text align="center" variant="400-12" color={theme.colors.coolgray[900]}>Ag 400-12</Text></Td>
                <Td><Text align="center" variant="500-12" color={theme.colors.coolgray[900]}>Ag 500-12</Text></Td>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[900]}>Ag 700-12</Text></Td>
                <Td><Text align="center" variant="900-12" color={theme.colors.coolgray[900]}>Ag 900-12</Text></Td>
              </Tr>

              {/* 11px */}
              <Tr>
                <Td><Text align="center" variant="700-12" color={theme.colors.coolgray[400]}>11px</Text></Td>
                <Td><Text align="center" variant="400-11" color={theme.colors.coolgray[900]}>Ag 400-11</Text></Td>
                <Td><Text align="center" variant="500-11" color={theme.colors.coolgray[900]}>Ag 500-11</Text></Td>
                <Td><Text align="center" variant="700-11" color={theme.colors.coolgray[900]}>Ag 700-11</Text></Td>
                <Td><Text align="center" variant="900-11" color={theme.colors.coolgray[900]}>Ag 900-11</Text></Td>
              </Tr>
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