/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ElementType, HTMLAttributes } from 'react';
import { TypographyVariant } from '../styles/typography';

interface TextProps extends HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant; // 예: "700-24"
  as?: ElementType;
  color?: string;
  align?: 'left' | 'center' | 'right';
  href?: string;
  target?: string;
}

// ✨ [핵심 수정] 사이즈에 맞는 행간/자간 변수를 같이 매핑합니다.
const getTypographyStyles = (variant: TypographyVariant) => {
  const [weight, size] = variant.split('-');
  
  return `
    font-weight: var(--fw-${weight});
    
    /* 사이즈 세트 적용 */
    font-size: var(--fs-${size});
    line-height: var(--lh-${size});
    letter-spacing: var(--ls-${size});
  `;
};

const StyledText = styled.div<{ 
  variantStr: TypographyVariant; 
  colorStr?: string; 
  alignStr?: string;
}>`
  font-family: var(--font-family-base);
  margin: 0;
  text-decoration: none;
  
  /* 1. 폰트 스타일(크기, 두께, 행간, 자간) 일괄 적용 */
  ${({ variantStr }) => getTypographyStyles(variantStr)}

  /* 2. 컬러 및 정렬 */
  color: ${({ colorStr }) => colorStr || 'inherit'};
  text-align: ${({ alignStr }) => alignStr || 'left'};
`;

const Text = ({ 
  variant = '400-14', // 기본값
  as = 'p', 
  color, 
  align, 
  children, 
  ...props 
}: TextProps) => {
  return (
    <StyledText 
      as={as} 
      variantStr={variant} 
      colorStr={color} 
      alignStr={align} 
      {...props} 
    >
      {children}
    </StyledText>
  );
};

export default Text;