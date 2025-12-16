/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react'; 

import { 
    Button, 
    ButtonColor, 
    ButtonVariant, 
    ButtonMode, 
    ButtonSize 
} from './components/Button'; 
import Text from './components/Text';

// -------------------------------------------------------------------------
// 0. Mock Icons
// -------------------------------------------------------------------------
const IconCheck = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="20 6 9 17 4 12" />
  </svg>
);
const IconTrash = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
  </svg>
);

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

const ColorGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(180px, 1fr)); 
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

const Swatch = styled.div<{ color: string; hasBorder?: boolean }>`
  width: 40px;
  height: 40px;
  border-radius: 8px;
  border: ${({ hasBorder, theme }) => hasBorder ? `1px solid ${theme.colors.coolgray[200]}` : 'none'};
  flex-shrink: 0;
  background-color: ${({ color }) => color};
`;

const SubHeader = styled.div`
    margin-top: 30px;
    margin-bottom: 16px;
    padding-bottom: 8px;
    border-bottom: 1px solid ${({theme}) => theme.colors.coolgray[200]};
`;

const ColorRow = styled.div`
  display: contents; 
  
  /* Row Label (Color Name) */
  & > *:nth-of-type(1) {
    font-weight: 700;
    font-size: 14px;
    display: flex;
    align-items: center;
  }
`;

// -------------------------------------------------------------------------
// 2. Helper Components 
// -------------------------------------------------------------------------

const SectionHeader = ({ title }: { title: string }) => {
  const theme = useTheme();
  return (
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
};


// -------------------------------------------------------------------------
// 3. Button Test Component
// -------------------------------------------------------------------------

export default function ButtonTest() {
  const theme = useTheme(); 

  // 테스트할 색상 목록 및 상태
  const colors: ButtonColor[] = ['gray', 'blue', 'green', 'red'];
  // Variant 체계를 Disabled 상태까지 포함하여 나열
  const variants: ButtonVariant[] = [
    'filled', 'filled-disabled',
    'outlined', 'outlined-disabled',
    'transparent', 'transparent-disabled',
    'ghost', 'ghost-disabled',
  ]; 
  const sizes: ButtonSize[] = ['small', 'medium', 'large'];

  const mode: ButtonMode = 'light'; 
  
  // Variant 이름을 깔끔하게 표시하기 위한 맵
  const variantDisplayMap: Record<ButtonVariant, string> = {
    'filled': 'Filled',
    'filled-disabled': 'Filled-disabled',
    'outlined': 'Outlined',
    'outlined-disabled': 'Outlined-disabled',
    'transparent': 'Transparent',
    'transparent-disabled': 'Transparent-disabled',
    'ghost': 'Ghost',
    'ghost-disabled': 'Ghost-disabled',
  };

  // 버튼 상태 조합 생성
  const renderButtonMatrix = () => (
    <GridContainer style={{ 
        // 9 컬럼 (Label + 8 Variants)
        gridTemplateColumns: `repeat(${variants.length + 1}, 1fr)`,
        gap: '20px 30px' 
    }}>
      {/* Header Row */}
      <div/> 
      {variants.map(v => (
        <Text key={v} variant="700-14" color={theme.colors.coolgray[600]} style={{ textTransform: 'capitalize', textAlign: 'center' }}>
          {variantDisplayMap[v]}
        </Text>
      ))}
      
      {/* Rows per Color */}
      {colors.map((color) => (
        <ColorRow key={color}>
          {/* 1. Color Label (Grid Column 1) */}
          <Text key={`label-${color}`} color={theme.colors.coolgray[900]} style={{ textTransform: 'capitalize' }}>
            {color}
          </Text>

          {/* 2. Filled */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mode={mode} color={color} variant="filled" size="medium" width="auto">
              Filled
            </Button>
          </div>
          {/* 3. Filled Disabled */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mode={mode} color={color} variant="filled-disabled" size="medium" width="auto">
              Disabled
            </Button>
          </div>
          
          {/* 4. Outlined */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mode={mode} color={color} variant="outlined" size="medium" width="auto">
              Outlined
            </Button>
          </div>
          {/* 5. Outlined Disabled */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mode={mode} color={color} variant="outlined-disabled" size="medium" width="auto">
              Disabled
            </Button>
          </div>

          {/* 6. Transparent */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mode={mode} color={color} variant="transparent" size="medium" width="auto">
              Transparent
            </Button>
          </div>
          {/* 7. Transparent Disabled */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mode={mode} color={color} variant="transparent-disabled" size="medium" width="auto">
              Disabled
            </Button>
          </div>
          
          {/* 8. Ghost Variant */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mode={mode} color={color} variant="ghost" size="medium" width="auto">
              Ghost
            </Button>
          </div>
          {/* 9. Ghost Disabled */}
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mode={mode} color={color} variant="ghost-disabled" size="medium" width="auto">
              Disabled
            </Button>
          </div>
        </ColorRow>
      ))}
    </GridContainer>
  );

  const renderTokenGrid = () => {
    // ⚠️ tokens.disabled 경로가 추가되었으므로, renderTokenGrid도 업데이트가 필요합니다.
    const tokens = theme.components.button.light;
    
    const allTokens: { name: string, value: string }[] = [];

    colors.forEach(color => {
      const tokenSet = tokens[color];
      allTokens.push({ name: `${color} Bg (Def)`, value: tokenSet.bg.default });
      allTokens.push({ name: `${color} Bg (Hov)`, value: tokenSet.bg.hover });
      allTokens.push({ name: `${color} Bg (Act)`, value: tokenSet.bg.active });
      
      // Disabled Filled Background
      const disabledFilledBg = tokens.disabled?.['filled-disabled']?.[color]?.bg;
      allTokens.push({ name: `${color} Bg (Filled Dis)`, value: disabledFilledBg || 'N/A' });
      
      // Disabled Outlined Border
      const disabledOutlinedBorder = tokens.disabled?.['outlined-disabled']?.[color]?.border;
      allTokens.push({ name: `${color} Border (Outlined Dis)`, value: disabledOutlinedBorder || 'N/A' });
    });
    
    // Text Token (Enabled)
    const textTokens = tokens.text || {}; 
    allTokens.push({ name: `Text (Gray Def)`, value: textTokens.gray?.default || 'N/A' }); 
    // Text Token (Disabled)
    allTokens.push({ name: `Text (Gray Dis)`, value: tokens.disabled?.['filled-disabled']?.gray?.text || 'N/A' });

    return (
      <ColorGrid>
        {allTokens.map(token => (
          <ColorCard key={token.name}>
            <Swatch 
              color={token.value} 
              hasBorder={token.value.toLowerCase().includes('#ffffff') || token.value.toLowerCase().includes('rgba') || token.name.includes('Border')} 
            />
            <div>
              <Text variant="700-14">{token.name.replace('gray', 'Gray')}</Text>
              <Text variant="400-12" color={theme.colors.coolgray[600]}>
                {token.value}
              </Text>
            </div>
          </ColorCard>
        ))}
      </ColorGrid>
    );
  };

  return (
    <Container>
      <Header>
        <Text as="h1" variant="900-48" style={{ marginBottom: '10px', fontSize: 'clamp(32px, 5vw, 48px)' }}>
          Button Component
        </Text>
        <Text variant="400-18" color={theme.colors.coolgray[500]}>
          Light Mode Color, Variant, and Size Guide.
        </Text>
      </Header>

      {/* 1. Quick Start & Props */}
      <Section>
        <SectionHeader title="1. Quick Start & Props" />
        <Text variant="400-14" color={theme.colors.coolgray[600]}>
          아래 코드는 Button 컴포넌트가 지원하는 <b>주요 옵션(Props)</b>을 포함한 예시입니다.
        </Text>
        <CodeBox>
          <Pre>
{`<Button 
  // [Required] 필수 항목 (color와 variant는 'gray' | 'blue' | 'green' | 'red')
  color="blue"
  variant="filled"  // 'filled' | 'filled-disabled' | 'outlined' | 'outlined-disabled' | 'transparent' | 'transparent-disabled' | 'ghost' | 'ghost-disabled'
  
  // [Optional] 선택 항목
  mode="light"      // 'light' | 'dark' | 'transparent'
  size="medium"     // 'small' | 'medium' | 'large'
  width="100%"      // 버튼 너비 (CSS width 값)
  disabled={false}  // 비활성화 여부 (Disabled Variant를 사용하면 무시됨)
  leftIcon={<Icon />} // 좌측 아이콘
  rightIcon={<Icon />} // 우측 아이콘
  onClick={() => console.log('clicked')} // 클릭 이벤트 핸들러
>
  버튼 텍스트
</Button>`}
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
              { name: 'color', desc: <span>버튼의 메인 색상: <b>'gray'</b> | <b>'blue'</b> | <b>'green'</b> | <b>'red'</b> (기본값: gray)</span> },
              { name: 'variant', desc: <span>버튼 스타일: <b>'filled'</b>, <b>'outlined'</b>, <b>'transparent'</b>, <b>'ghost'</b> 및 각 Disabled 상태 (예: <b>'filled-disabled'</b>)</span> },
              { name: 'mode', desc: <span>테마 모드: <b>'light'</b>만 지원 (기본값: light)</span> },
              { name: 'size', desc: <span>크기: <b>'small'</b> (24px) | <b>'medium'</b> (32px) | <b>'large'</b> (40px) (기본값: medium)</span> },
              { name: 'width', desc: '버튼 너비 (CSS width 값: 예: "100%", "200px")' },
              { name: 'disabled', desc: '비활성화 여부 (true일 경우 일반 Variant에 Disabled CSS를 적용. Disabled Variant를 사용할 경우 무시됨)' },
              { name: 'leftIcon / rightIcon', desc: '아이콘 컴포넌트 (SVG/ReactNode)' },
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

      {/* 2. Light Mode - Color & Variant Matrix */}
      <Section>
        <SectionHeader title="2. Light Mode: Color & Variant Matrix" />
        <Text variant="400-14" color={theme.colors.coolgray[600]}>
          Filled, Outlined, Transparent, Ghost 및 각 Disabled 스타일을 확인하세요.
        </Text>
        <div style={{ padding: '20px', overflowX: 'auto' }}>
          {renderButtonMatrix()}
        </div>
      </Section>
      
      {/* 3. Light Mode - Semantic Tokens */}
      <Section>
        <SectionHeader title="3. Light Mode: Semantic Color Tokens" />
        <Text variant="400-14" color={theme.colors.coolgray[600]}>
          `theme.components.button.light`에 정의된 색상 토큰 목록입니다.
        </Text>
        <div style={{ marginBottom: 10, padding: 30, background: '#fff', borderRadius: 12, border: `1px dashed ${theme.colors.coolgray[200]}` }}>
            {renderTokenGrid()}
        </div>
      </Section>

      {/* 4. Sizes & Layouts */}
      <Section>
        <SectionHeader title="4. Sizes & Layouts" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: 30 }}>
          
          <SubHeader>
            <Text variant="700-16" color={theme.colors.coolgray[900]}>Sizes</Text>
          </SubHeader>
          <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
            {sizes.map(size => (
              <Button 
                key={size} 
                size={size} 
                color="blue" 
                mode={mode}
                variant="filled" 
                width="auto" 
                disabled={false} 
              >
                {size} ({size === 'small' ? '24px' : size === 'medium' ? '32px' : '40px'})
              </Button>
            ))}
          </div>

          <SubHeader>
             <Text variant="700-16" color={theme.colors.coolgray[900]}>Full Width & Icon Only</Text>
          </SubHeader>
          <GridContainer style={{ gap: 20 }}>
            <div>
              <Text variant="700-14" color={theme.colors.coolgray[700]}>Full Width</Text>
              <div style={{ maxWidth: '400px', padding: 15, border: '1px dashed #ccc', borderRadius: 8 }}>
                <Button 
                  width="100%" 
                  color="green" 
                  mode={mode} 
                  leftIcon={<IconCheck />}
                  variant="filled"
                  size="medium"
                  disabled={false}
                >
                  Payment Confirm
                </Button>
              </div>
            </div>
            <div>
              <Text variant="700-14" color={theme.colors.coolgray[700]}>Icon Only & Variants</Text>
              <div style={{ display: 'flex', gap: 8, alignItems: 'center' }}>
                <Button variant="ghost" color="gray" size="small" mode={mode} width="auto" disabled={false}><IconTrash /></Button>
                <Button variant="outlined" color="red" size="medium" mode={mode} width="auto" disabled={false}><IconTrash /></Button>
                <Button variant="filled" color="blue" size="large" mode={mode} width="auto" disabled={false}><IconCheck /></Button>
              </div>
            </div>
          </GridContainer>

          <SubHeader>
             <Text variant="700-16" color={theme.colors.coolgray[900]}>Icon & Text Combinations</Text>
          </SubHeader>
          <GridContainer style={{ gap: 20 }}>
            <div>
                <Text variant="700-14" color={theme.colors.coolgray[700]} style={{ marginBottom: 8 }}>Left Icon</Text>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Button 
                      color="blue" mode={mode} size="medium" leftIcon={<IconCheck />}
                      variant="filled" width="auto" disabled={false}
                    >
                        확인
                    </Button>
                    <Button 
                      color="green" mode={mode} size="large" variant="outlined" leftIcon={<IconCheck />}
                      width="auto" disabled={false}
                    >
                        Save Draft
                    </Button>
                </div>
            </div>
            <div>
                <Text variant="700-14" color={theme.colors.coolgray[700]} style={{ marginBottom: 8 }}>Right Icon</Text>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                    <Button 
                      color="red" mode={mode} size="medium" width="auto" variant="filled" rightIcon={<IconTrash />}
                      disabled={false}
                    >
                        Delete Item
                    </Button>
                    <Button 
                      color="gray" mode={mode} size="large" variant="ghost" rightIcon={<IconCheck />}
                      width="auto" disabled={false}
                    >
                        Next Step
                    </Button>
                </div>
            </div>
            <div style={{ gridColumn: 'span 2' }}> 
                <Text variant="700-14" color={theme.colors.coolgray[700]} style={{ marginBottom: 8 }}>Both Icons & Different Sizes</Text>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, flexWrap: 'wrap' }}>
                    <Button color="blue" mode={mode} size="small" leftIcon={<IconCheck />} rightIcon={<IconTrash />} variant="filled" width="auto" disabled={false}>
                        Both Icons
                    </Button>
                    <Button color="green" mode={mode} size="medium" variant="outlined" leftIcon={<IconCheck />} rightIcon={<IconTrash />} width="auto" disabled={false}>
                        Submit & Delete
                    </Button>
                    <Button color="red" mode={mode} size="large" variant="filled" leftIcon={<IconCheck />} rightIcon={<IconTrash />} width="auto" disabled={false}>
                        Confirm Delete
                    </Button>
                    <Button color="gray" mode={mode} size="medium" variant="ghost" leftIcon={<IconCheck />} rightIcon={<IconTrash />} disabled={true} width="auto">
                        Disabled Both
                    </Button>
                </div>
            </div>
          </GridContainer>

        </div>
      </Section>
      
      {/* 5. Semantic Text Links 섹션은 제거되었으므로, 이제 Text Link 기능은 'text' variant가 대체합니다. */}

    </Container>
  );
}