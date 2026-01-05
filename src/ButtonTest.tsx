/** @jsxImportSource @emotion/react */
import React from 'react';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// Lucide Icons import
import { CircleChevronLeft, CircleChevronRight, ChevronLeft, ChevronRight } from 'lucide-react';

import {
    Button,
    ButtonColor,
    ButtonVariant,
    ButtonMode
} from './components/Button';
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
  @media (max-width: 768px) { padding: 20px; gap: 30px; }
`;

const Header = styled.div` margin-bottom: 20px; `;

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 20px;
  padding: 40px;
  border: 1px solid ${({ theme }) => theme.colors.coolgray[200]};
  border-radius: 16px;
  background-color: ${({ theme }) => theme.colors.white};
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.03);
  @media (max-width: 768px) { padding: 24px; }
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
  @media (max-width: 768px) { padding: 20px; }
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
  &:first-of-type { border-top: 1px dotted ${({ theme }) => theme.colors.coolgray[200]}; }
  @media (max-width: 600px) { flex-direction: column; align-items: flex-start; gap: 8px; }
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
  flex-shrink: 0;
  position: relative;
  overflow: hidden;

  border: ${({ hasBorder, theme }) => hasBorder ? `1px solid ${theme.colors.coolgray[200]}` : 'none'};

  background-color: white;
  background-image:
    linear-gradient(45deg, #E5E7EB 25%, transparent 25%),
    linear-gradient(-45deg, #E5E7EB 25%, transparent 25%),
    linear-gradient(45deg, transparent 75%, #E5E7EB 75%),
    linear-gradient(-45deg, transparent 75%, #E5E7EB 75%);
  background-size: 10px 10px;
  background-position: 0 0, 0 5px, 5px -5px, -5px 0px;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background-color: ${({ color }) => color};
  }
`;

const SubHeader = styled.div`
    margin-top: 0px;
    margin-bottom: 0px;
    padding-bottom: 0px;
`;

const ColorGroupHeader = styled.div`
    display: flex;
    align-items: center;
    gap: 8px;
    margin-bottom: 12px;
`;

const SectionHeader = ({ title }: { title: string }) => {
  const theme = useTheme();
  return (
    <SectionTitleWrapper>
      <Text as="h2" variant="700-24" color={theme.colors.coolgray[900]} style={{ wordBreak: 'keep-all' }}>
        {title}
      </Text>
    </SectionTitleWrapper>
  );
};

const MatrixGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  gap: 20px 30px;
  & > div { display: flex; justify-content: center; align-items: center; }
  & > div:nth-of-type(4n+1) { justify-content: flex-start; }
`;

const TokenSectionBox = styled.div`
    margin-bottom: 10px;
    padding: 30px;
    background: #fff;
    border-radius: 12px;
    border: 1px dashed ${({ theme }) => theme.colors.coolgray[200]};
`;

// -------------------------------------------------------------------------
// 3. Button Test Component
// -------------------------------------------------------------------------

export default function ButtonTest() {
  const theme = useTheme();

  const colors: ButtonColor[] = ['gray', 'indigo', 'green', 'red'];
  const colorMap: Record<ButtonColor, string> = {
    'gray': 'Gray', 'indigo': 'Indigo', 'green': 'Green', 'red': 'Red'
  };

  const capitalize = (s: string) => s.charAt(0).toUpperCase() + s.slice(1);

  // 토큰 그리드 렌더링 함수
  const renderTokenGrid = (variant: string) => {
    const buttonTokens = (theme.components?.button?.light as any);
    if (!buttonTokens) return null;

    const variantTokens = buttonTokens[variant] || {};
    const disabledTokens = buttonTokens.disabled?.[variant] || {};

    return (
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {colors.map((color) => {
          const tokenSet = variantTokens[color];
          if (!tokenSet) return null;

          const disabledTokenSet = disabledTokens[color] || {};
          const localTokens: { name: string, value: string }[] = [];
          const colorName = capitalize(color);

          if (tokenSet.bg) {
            localTokens.push({ name: `Default ${colorName} Bg`, value: tokenSet.bg });
          }
          if (tokenSet.hover?.bg) {
            localTokens.push({ name: `Hover Bg`, value: tokenSet.hover.bg });
          }
          if (tokenSet.active?.bg) {
            localTokens.push({ name: `Active Bg`, value: tokenSet.active.bg });
          }
          if (tokenSet.border && tokenSet.border !== 'transparent') {
             localTokens.push({ name: `Default Border`, value: tokenSet.border });
          }
          if (tokenSet.text) {
             localTokens.push({ name: `Default Text`, value: tokenSet.text });
          }
           if (disabledTokenSet.text) {
             localTokens.push({ name: `Disabled Text`, value: disabledTokenSet.text });
          }
          if (disabledTokenSet.bg) {
            localTokens.push({ name: `Disabled Bg`, value: disabledTokenSet.bg });
          }

          if (localTokens.length === 0) return null;

          return (
            <div key={color}>
              <ColorGroupHeader>
                 <Text variant="700-14" color={theme.colors.coolgray[500]}>{colorName} Series</Text>
              </ColorGroupHeader>
              <ColorGrid>
                {localTokens.map((token, idx) => (
                  <ColorCard key={`${color}-${token.name}-${idx}`}>
                    <Swatch
                      color={token.value}
                      hasBorder={
                        token.value === 'transparent' ||
                        token.value?.toLowerCase().includes('#ffffff') ||
                        token.value?.toLowerCase().includes('rgba')
                      }
                    />
                    <div>
                      <Text variant="700-14">{token.name}</Text>
                      <Text variant="400-12" color={theme.colors.coolgray[600]}>
                        {token.value}
                      </Text>
                    </div>
                  </ColorCard>
                ))}
              </ColorGrid>
            </div>
          );
        })}
      </div>
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
  color="indigo"
  variant="filled"
  mode="light"
  size="medium"
  width="100%"
  disabled={false}
  isLoading={false}
  leftIcon={<Icon />}
  rightIcon={<Icon />}
  onClick={() => console.log('clicked')}
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
              { name: 'color', desc: <span>버튼의 메인 색상: <b>gray, indigo, green, red</b></span> },
              { name: 'variant', desc: <span>버튼 스타일: <b>filled, outlined, transparent, ghost</b></span> },
              { name: 'mode', desc: <span>테마 모드: <b>light</b></span> },
              { name: 'size', desc: <span>크기: <b>small, medium, large</b></span> },
              { name: 'width', desc: '버튼 너비 (CSS width)' },
              { name: 'disabled', desc: '비활성화 여부' },
              { name: 'isLoading', desc: '로딩 상태 여부' },
              { name: 'leftIcon / rightIcon', desc: '아이콘 컴포넌트' },
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

      {/* -------------------------------------------------------------------------
          2. Filled Matrix
      ------------------------------------------------------------------------- */}
      <Section>
        <SectionHeader title="2. Filled Matrix" />
        <SubHeader>
          <Text variant="700-16" color={theme.colors.coolgray[900]}>Component States</Text>
        </SubHeader>
        <TokenSectionBox style={{ overflowX: 'auto' }}>
          <MatrixGrid>
            <div/>
            <Text variant="700-14" color={theme.colors.coolgray[600]} style={{ textAlign: 'center' }}>Default</Text>
            <Text variant="700-14" color={theme.colors.coolgray[600]} style={{ textAlign: 'center' }}>Loading</Text>
            <Text variant="700-14" color={theme.colors.coolgray[600]} style={{ textAlign: 'center' }}>Disabled</Text>

            {colors.map((color) => (
              <React.Fragment key={color}>
                <Text color={theme.colors.coolgray[900]}>{colorMap[color]}</Text>

                <Button mode="light" color={color} variant="filled" size="medium">
                  확인
                </Button>

                <Button mode="light" color={color} variant="filled" size="medium" isLoading={true}>
                 확인
                </Button>

                <Button mode="light" color={color} variant="filled-disabled" size="medium" disabled={true}>
                  확인
                </Button>
              </React.Fragment>
            ))}
          </MatrixGrid>
        </TokenSectionBox>

        <SubHeader style={{ marginTop: 0 }}>
          <Text variant="700-16" color={theme.colors.coolgray[900]}>Semantic Color Tokens</Text>
        </SubHeader>
        <TokenSectionBox>
          {renderTokenGrid('filled')}
        </TokenSectionBox>
      </Section>

      {/* -------------------------------------------------------------------------
          3. Outlined Matrix
      ------------------------------------------------------------------------- */}
      <Section>
        <SectionHeader title="3. Outlined Matrix" />
        <SubHeader>
          <Text variant="700-16" color={theme.colors.coolgray[900]}>Component States</Text>
        </SubHeader>
        <TokenSectionBox style={{ overflowX: 'auto' }}>
          <MatrixGrid>
            <div/>
            <Text variant="700-14" color={theme.colors.coolgray[600]} style={{ textAlign: 'center' }}>Default</Text>
            <Text variant="700-14" color={theme.colors.coolgray[600]} style={{ textAlign: 'center' }}>Loading</Text>
            <Text variant="700-14" color={theme.colors.coolgray[600]} style={{ textAlign: 'center' }}>Disabled</Text>

            {colors.map((color) => (
              <React.Fragment key={color}>
                <Text color={theme.colors.coolgray[900]}>{colorMap[color]}</Text>

                <Button mode="light" color={color} variant="outlined" size="medium">
                  확인
                </Button>

                <Button mode="light" color={color} variant="outlined" size="medium" isLoading={true}>
                  확인
                </Button>

                <Button mode="light" color={color} variant="outlined-disabled" size="medium" disabled={true}>
                  확인
                </Button>
              </React.Fragment>
            ))}
          </MatrixGrid>
        </TokenSectionBox>
        <SubHeader style={{ marginTop: 0 }}>
          <Text variant="700-16" color={theme.colors.coolgray[900]}>Semantic Color Tokens</Text>
        </SubHeader>
        <TokenSectionBox>
          {renderTokenGrid('outlined')}
        </TokenSectionBox>
      </Section>

      {/* -------------------------------------------------------------------------
          4. Transparent Matrix
      ------------------------------------------------------------------------- */}
      <Section>
        <SectionHeader title="4. Transparent Matrix" />

        <SubHeader>
          <Text variant="700-16" color={theme.colors.coolgray[900]}>Component States</Text>
        </SubHeader>
        <TokenSectionBox style={{ overflowX: 'auto' }}>
          <MatrixGrid>
            <div/>
            <Text variant="700-14" color={theme.colors.coolgray[600]} style={{ textAlign: 'center' }}>Default</Text>
            <Text variant="700-14" color={theme.colors.coolgray[600]} style={{ textAlign: 'center' }}>Loading</Text>
            <Text variant="700-14" color={theme.colors.coolgray[600]} style={{ textAlign: 'center' }}>Disabled</Text>

            {colors.map((color) => (
              <React.Fragment key={color}>
                <Text color={theme.colors.coolgray[900]}>{colorMap[color]}</Text>

                <Button mode="light" color={color} variant="transparent" size="medium">
                  확인
                </Button>

                <Button mode="light" color={color} variant="transparent" size="medium" isLoading={true}>
                  확인
                </Button>

                <Button mode="light" color={color} variant="transparent-disabled" size="medium" disabled={true}>
                 확인
                </Button>
              </React.Fragment>
            ))}
          </MatrixGrid>
        </TokenSectionBox>

        <SubHeader style={{ marginTop: 0 }}>
          <Text variant="700-16" color={theme.colors.coolgray[900]}>Semantic Color Tokens</Text>
        </SubHeader>
        <TokenSectionBox>
          {renderTokenGrid('transparent')}
        </TokenSectionBox>
      </Section>
{/* 5. Sizes & Layouts (Unified Matrix - Dotted Separator) */}
<Section>
  <SectionHeader title="5. Sizes & Layouts" />

  <TokenSectionBox style={{ overflowX: 'auto' }}>
    <div
      style={{
        display: 'grid',
        // 라벨 컬럼(150px) + 5개의 콘텐츠 컬럼
        gridTemplateColumns: '150px repeat(5, minmax(110px, 1fr))',
        gap: '20px 12px',
        alignItems: 'center',
      }}
    >
      {/* --- Table Header --- */}
      <div /> {/* Empty Corner */}
      <div>
        <Text variant="500-12" color={theme.colors.coolgray[600]} style={{ textAlign: 'center', display: 'block' }}>
          Text Only
        </Text>
      </div>
      <div>
        <Text variant="500-12" color={theme.colors.coolgray[600]} style={{ textAlign: 'center', display: 'block' }}>
          Left Icon
        </Text>
      </div>
      <div>
        <Text variant="500-12" color={theme.colors.coolgray[600]} style={{ textAlign: 'center', display: 'block' }}>
          Right Icon
        </Text>
      </div>
      <div>
        <Text variant="500-12" color={theme.colors.coolgray[600]} style={{ textAlign: 'center', display: 'block' }}>
          Both Icons
        </Text>
      </div>
      <div>
        <Text variant="500-12" color={theme.colors.coolgray[600]} style={{ textAlign: 'center', display: 'block' }}>
          Icon Only
        </Text>
      </div>

      {/* --- 1. Filled Variant --- */}
      {['small', 'medium', 'large'].map((size) => {
        const leftIcon = size === 'small' ? <ChevronLeft /> : <CircleChevronLeft />;
        const rightIcon = size === 'small' ? <ChevronRight /> : <CircleChevronRight />;

        return (
          <React.Fragment key={`filled-${size}`}>
            {/* Row Label */}
            <div>
              <Text variant="500-12" color={theme.colors.coolgray[900]}>
                Filled ({size})
              </Text>
            </div>
            {/* Text Only */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="filled" color="gray" mode="light" size={size as any}>
                확인
              </Button>
            </div>
            {/* Left Icon */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="filled" color="gray" mode="light" size={size as any} leftIcon={leftIcon}>
                확인
              </Button>
            </div>
            {/* Right Icon */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="filled" color="gray" mode="light" size={size as any} rightIcon={rightIcon}>
                확인
              </Button>
            </div>
            {/* Both Icons */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="filled"
                color="gray"
                mode="light"
                size={size as any}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
              >
                확인
              </Button>
            </div>
            {/* Icon Only */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="filled"
                color="gray"
                mode="light"
                size={size as any}
                leftIcon={leftIcon}
                children=""
              />
            </div>
          </React.Fragment>
        );
      })}

      {/* 구분선 (도트선으로 수정됨) */}
      <div
        style={{
          gridColumn: '1 / -1',
          borderTop: `1px dotted ${theme.colors.coolgray[200]}`,
          margin: '12px 0'
        }}
      />

      {/* --- 2. Outlined Variant --- */}
      {['small', 'medium', 'large'].map((size) => {
        const leftIcon = size === 'small' ? <ChevronLeft /> : <CircleChevronLeft />;
        const rightIcon = size === 'small' ? <ChevronRight /> : <CircleChevronRight />;

        return (
          <React.Fragment key={`outlined-${size}`}>
            {/* Row Label */}
            <div>
              <Text variant="500-12" color={theme.colors.coolgray[900]}>
                Outlined ({size})
              </Text>
            </div>
            {/* Text Only */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" color="gray" mode="light" size={size as any}>
                확인
              </Button>
            </div>
            {/* Left Icon */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" color="gray" mode="light" size={size as any} leftIcon={leftIcon}>
                확인
              </Button>
            </div>
            {/* Right Icon */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="outlined" color="gray" mode="light" size={size as any} rightIcon={rightIcon}>
                확인
              </Button>
            </div>
            {/* Both Icons */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                color="gray"
                mode="light"
                size={size as any}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
              >
                확인
              </Button>
            </div>
            {/* Icon Only */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="outlined"
                color="gray"
                mode="light"
                size={size as any}
                leftIcon={leftIcon}
                children=""
              />
            </div>
          </React.Fragment>
        );
      })}

      {/* 구분선 (도트선으로 수정됨) */}
      <div
        style={{
          gridColumn: '1 / -1',
          borderTop: `1px dotted ${theme.colors.coolgray[200]}`,
          margin: '12px 0'
        }}
      />

      {/* --- 3. Transparent Variant --- */}
      {['small', 'medium', 'large'].map((size) => {
        const leftIcon = size === 'small' ? <ChevronLeft /> : <CircleChevronLeft />;
        const rightIcon = size === 'small' ? <ChevronRight /> : <CircleChevronRight />;

        return (
          <React.Fragment key={`transparent-${size}`}>
            {/* Row Label */}
            <div>
              <Text variant="500-12" color={theme.colors.coolgray[900]}>
                Transparent ({size})
              </Text>
            </div>
            {/* Text Only */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="transparent" color="gray" mode="light" size={size as any}>
                확인
              </Button>
            </div>
            {/* Left Icon */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="transparent" color="gray" mode="light" size={size as any} leftIcon={leftIcon}>
                확인
              </Button>
            </div>
            {/* Right Icon */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button variant="transparent" color="gray" mode="light" size={size as any} rightIcon={rightIcon}>
                확인
              </Button>
            </div>

            {/* Both Icons */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="transparent"
                color="gray"
                mode="light"
                size={size as any}
                leftIcon={leftIcon}
                rightIcon={rightIcon}
              >
                확인
              </Button>
            </div>
            {/* Icon Only */}
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="transparent"
                color="gray"
                mode="light"
                size={size as any}
                leftIcon={leftIcon}
                children=""
              />
            </div>
          </React.Fragment>
        );
      })}
    </div>
  </TokenSectionBox>
</Section>
    </Container>
  );
}
