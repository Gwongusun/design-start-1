/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ElementType, HTMLAttributes } from 'react';
import { TypographyVariant, FontWeight, FontSize } from '../styles/typography';

interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TypographyVariant;
  color?: string;
  align?: 'left' | 'center' | 'right';
  children: React.ReactNode;
  // ▼▼▼ [추가] a 태그 사용 시 에러 방지를 위해 속성 추가 ▼▼▼
  href?: string;
  target?: string;
}

const StyledText = styled.p<{ 
  variant: TypographyVariant; 
  color?: string; 
  align?: string;
}>`
  margin: 0;
  padding: 0;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;

  ${({ theme, variant }) => {
    // 안전하게 타입 분리
    const [weight, size] = variant.split('-') as [FontWeight, FontSize];
    
    // theme.ts가 올바르게 로드되었다면 여기서 값을 가져옵니다.
    const { fontSize, lineHeight, letterSpacing } = theme.typo.sizes[size];

    return css`
      font-weight: ${theme.typo.weights[weight]};
      font-size: ${fontSize};
      line-height: ${lineHeight};
      letter-spacing: ${letterSpacing};
    `;
  }}

  color: ${({ color, theme }) => color || theme.colors.black};
  text-align: ${({ align }) => align || 'left'};
  text-decoration: none;
`;

const Text = ({ 
  as = 'p', 
  variant = '400-16', 
  color, 
  align, 
  children, 
  ...props 
}: TextProps) => {
  return (
    <StyledText 
      as={as} 
      variant={variant} 
      color={color} 
      align={align} 
      {...props} 
    >
      {children}
    </StyledText>
  );
};

export default Text;