/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { HTMLAttributes, ElementType } from 'react';
import { typo } from '../styles/typography';

type TypographyVariant = keyof typeof typo;

// ✨ [핵심 수정] HTMLAttributes를 상속받아야 'style'을 쓸 수 있습니다!
interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  as?: ElementType;
  color?: string;
  align?: 'left' | 'center' | 'right';
}

const StyledText = styled.div<{ 
  variant: TypographyVariant; 
  color?: string; 
  align?: string 
}>`
  ${({ variant }) => typo[variant]}
  color: ${({ color }) => color || 'inherit'};
  text-align: ${({ align }) => align || 'left'};
  margin: 0;
`;

const Text = ({ 
  variant = 'bodyMedium', 
  as = 'p', 
  color, 
  align, 
  children, 
  ...props // ✨ style 같은 나머지 속성들을 받아서 
}: TextProps) => {
  return (
    <StyledText 
      as={as} 
      variant={variant} 
      color={color} 
      align={align} 
      {...props} // ✨ 여기에 전달해줍니다
    >
      {children}
    </StyledText>
  );
};

export default Text;