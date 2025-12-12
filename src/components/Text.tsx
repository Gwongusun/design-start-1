/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ElementType, HTMLAttributes } from 'react';
import { typo } from '../styles/typography';

type TypographyVariant = keyof typeof typo;

// ✨ [핵심] a 태그 속성(href 등)을 받을 수 있도록 정의
interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: ElementType;
  color?: string;
  align?: 'left' | 'center' | 'right';
  href?: string;
  target?: string;
}

// ✨ StyledText도 href를 모르면 에러가 날 수 있어서 타입을 추가해줍니다.
const StyledText = styled.div<{ 
  variant: TypographyVariant; 
  color?: string; 
  align?: string;
  href?: string;   // 👈 추가됨
  target?: string; // 👈 추가됨
}>`
  ${({ variant }) => typo[variant]}
  color: ${({ color }) => color || 'inherit'};
  text-align: ${({ align }) => align || 'left'};
  margin: 0;
  text-decoration: none; /* 링크일 때 밑줄 제거 기본값 */
`;

const Text = ({ 
  variant = 'bodyMedium', 
  as = 'p', 
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