/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { forwardRef } from 'react';
import type { ElementType, HTMLAttributes, ReactNode } from 'react';

import type { TypographyVariant, FontWeight, FontSize } from '../styles/typography';

export type TextAlign = 'left' | 'center' | 'right';

export interface TextProps extends HTMLAttributes<HTMLElement> {
  as?: ElementType;
  variant?: TypographyVariant;
  color?: string;
  align?: TextAlign;
  children: ReactNode;
  // a 태그 사용 시 타입 에러 방지
  href?: string;
  target?: string;
}

const StyledText = styled.p<{
  $variant: TypographyVariant;
  $color?: string;
  $align?: TextAlign;
}>`
  margin: 0;
  padding: 0;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;

  ${({ theme, $variant }) => {
    const [weight, size] = $variant.split('-') as [FontWeight, FontSize];
    const { fontSize, lineHeight, letterSpacing } = theme.typo.sizes[size];

    return css`
      font-weight: ${theme.typo.weights[weight]};
      font-size: ${fontSize};
      line-height: ${lineHeight};
      letter-spacing: ${letterSpacing};
    `;
  }}

  color: ${({ $color, theme }) => $color || theme.colors.black};
  text-align: ${({ $align }) => $align || 'left'};
  text-decoration: none;
`;

const Text = forwardRef<any, TextProps>(({
  as = 'p',
  variant = '400-16',
  color,
  align,
  children,
  ...props
}, ref) => {
  return (
    <StyledText ref={ref} as={as} $variant={variant} $color={color} $align={align} {...props}>
      {children}
    </StyledText>
  );
});

export default Text;