/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css } from '@emotion/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import Text from './Text'; 
import { useTheme } from '@emotion/react'; 

// 1. 타입 정의
// 🔥 수정: Disabled 상태를 별도의 Variant로 분리
export type ButtonVariant = 'filled' | 'outlined' | 'transparent' | 'ghost' | 
                            'filled-disabled' | 'outlined-disabled' | 'transparent-disabled' | 'ghost-disabled'; 
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'gray' | 'blue' | 'green' | 'red'; 
export type ButtonMode = 'light' | 'dark' | 'transparent';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  mode?: ButtonMode;
  width?: string;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
  // disabled prop은 이제 내부 로직에서 처리하거나, ButtonBase에 직접 전달 (Disabled Variant를 사용하면 무시됨)
}

// 2. 스타일 유틸리티 (사이즈)
const getSizeStyle = (size: ButtonSize, hasLeftIcon: boolean, hasRightIcon: boolean) => {
  const specs = {
    small: { height: 24, padding: 8, radius: 4, iconSize: 12 },
    medium: { height: 32, padding: 12, radius: 6, iconSize: 14 },
    large: { height: 40, padding: 16, radius: 8, iconSize: 18 },
  };

  const { height, padding, radius, iconSize } = specs[size];
  
  let paddingLeft = padding;
  let paddingRight = padding;
  
  if (!hasLeftIcon && hasRightIcon) paddingLeft += 2;
  if (hasLeftIcon && !hasRightIcon) paddingRight += 2;

  return css`
    height: ${height}px;
    padding-left: ${paddingLeft}px;
    padding-right: ${paddingRight}px;
    border-radius: ${radius}px;
    gap: ${size === 'small' ? 4 : 6}px;
    
    & svg {
      width: ${iconSize}px;
      height: ${iconSize}px;
    }
  `;
};

// 3. 스타일드 컴포넌트
const ButtonBase = styled.button<ButtonProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border: none; 
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-sizing: border-box;
  white-space: nowrap;
  user-select: none;

  /* width 처리 (fullWidth 또는 width prop) */
  width: ${({ fullWidth, width }) => fullWidth ? '100%' : width || 'auto'};

  & svg {
    flex-shrink: 0;
    fill: none;
    stroke: currentColor;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  /* 🔴 Disabled prop은 Variant에서 직접 처리하므로, 여기서는 제외 */
  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }

  ${({ size = 'medium', leftIcon, rightIcon }) => 
    getSizeStyle(size, !!leftIcon, !!rightIcon)}

  /* 🔥 [핵심] 테마 및 모드 기반 스타일 적용 */
  ${({ theme, variant = 'filled', color = 'gray', mode = 'light' }) => {
    const currentTheme = theme as any;
    
    // 1. 토큰 경로 설정
    const buttonTheme = currentTheme.components?.button?.[mode];
    const isDisabledVariant = variant.includes('-disabled');
    
    // Disabled가 아닌 경우: 일반 토큰 사용
    const regularVariant = isDisabledVariant ? variant.replace('-disabled', '') as ButtonVariant : variant;
    const bgToken = buttonTheme?.[color]; 
    const textToken = buttonTheme?.text?.[color]; 
    
    // Disabled인 경우: Disabled 토큰 참조
    const disabledTokenSet = isDisabledVariant ? buttonTheme?.disabled?.[variant]?.[color] : null;

    if (!bgToken) return css``; 

    // 🔴 Disabled Variant 스타일 처리
    if (isDisabledVariant && disabledTokenSet) {
      return css`
        cursor: not-allowed;
        opacity: 1; /* opacity 0.6은 ButtonBase 밖에서 설정되거나, 여기서는 1로 강제 */
        background-color: ${disabledTokenSet.bg || 'transparent'};
        border: 1px solid ${disabledTokenSet.border || 'transparent'};
        color: ${disabledTokenSet.text || currentTheme.colors.coolgray[300]};
        
        &:hover {
          /* Disabled 상태는 hover 효과 없음 */
          background-color: ${disabledTokenSet.bg || 'transparent'};
          border-color: ${disabledTokenSet.border || 'transparent'};
          color: ${disabledTokenSet.text || currentTheme.colors.coolgray[300]};
        }
      `;
    }

    // 🔴 일반 Variant 스타일 처리
    switch (regularVariant) {
      case 'outlined':
        const outlinedColor = (mode === 'light') ? bgToken.bg.default : textToken?.default || currentTheme.colors.coolgray[900];

        return css`
          background-color: transparent;
          border: 1px solid ${outlinedColor}; 
          color: ${outlinedColor}; 
          
          &:hover {
            background-color: ${bgToken.sub || 'rgba(0,0,0,0.05)'};
          }
        `;
        
      case 'transparent':
        const transparentColor = (mode === 'light') ? bgToken.bg.default : textToken?.default || currentTheme.colors.coolgray[900];
        
        return css`
          background-color: transparent;
          border: 1px solid transparent;
          color: ${transparentColor};

          &:hover {
            background-color: ${bgToken.sub || 'rgba(0,0,0,0.05)'}; 
          }
        `;

      case 'ghost':
        const ghostColor = (mode === 'light') ? bgToken.bg.default : textToken?.default || currentTheme.colors.coolgray[900];
        
        return css`
          background-color: transparent;
          border: 1px solid transparent;
          color: ${ghostColor};

          &:hover {
            color: ${textToken?.hover || bgToken.bg.hover}; 
          }
        `;

      case 'filled': 
      default:
        const filledTextColor = textToken?.default || currentTheme.colors.white; 
        
        return css`
          background-color: ${bgToken.bg.default};
          color: ${filledTextColor};
          border: 1px solid transparent; 

          &:hover {
            background-color: ${bgToken.bg.hover};
          }

          &:active {
            background-color: ${bgToken.bg.active};
          }
        `;
    }
  }}
`;

// 4. 컴포넌트 구현
export const Button = ({
  children,
  variant = 'filled',
  color = 'gray',     
  size = 'medium',    
  mode = 'light',     
  width,
  fullWidth = false,
  isLoading = false,
  disabled: propDisabled, // propDisabled로 이름 변경
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  
  const textVariantMap: Record<ButtonSize, any> = {
    small: '500-12',  
    medium: '500-14', 
    large: '500-16'   
  };

  const textVariant = textVariantMap[size] || '500-14';
  
  // Variant가 Disabled 상태라면, disabled prop을 무시하고 Variant에 의해 Disabled 스타일이 적용되도록 합니다.
  const isDisabledVariant = variant.includes('-disabled');
  const actualDisabled = isDisabledVariant || propDisabled || isLoading;

  // Disabled Variant의 경우, ButtonBase의 disabled prop을 false로 설정하여, CSS에서 제어하도록 함
  const disabledPropToPass = isDisabledVariant ? false : actualDisabled;


  return (
    <ButtonBase
      variant={variant}
      color={color}
      size={size}
      mode={mode}
      width={width}
      fullWidth={fullWidth}
      disabled={disabledPropToPass}
      leftIcon={leftIcon}
      rightIcon={rightIcon}
      {...props}
    >
      {isLoading ? (
        <Text variant={textVariant} as="span" color="inherit">
          Loading...
        </Text>
      ) : (
        <>
          {leftIcon}
          <Text variant={textVariant} as="span" color="inherit">
            {children}
          </Text>
          {rightIcon}
        </>
      )}
    </ButtonBase>
  );
};

export default Button;