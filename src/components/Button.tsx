/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css, useTheme } from '@emotion/react';
import { ButtonHTMLAttributes, ReactNode } from 'react';
import Text from './Text'; 

// 1. 타입 정의
export type ButtonVariant = 'primary' | 'secondary' | 'outline' | 'text';
export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'gray' | 'blue' | 'green' | 'red'; 

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  variant?: ButtonVariant;
  color?: ButtonColor;
  size?: ButtonSize;
  fullWidth?: boolean;
  isLoading?: boolean;
  leftIcon?: ReactNode;
  rightIcon?: ReactNode;
}

// 2. 스타일 유틸리티
const getSizeStyle = (size: ButtonSize, hasLeftIcon: boolean, hasRightIcon: boolean) => {
  const specs = {
    small: { height: 24, padding: 8, radius: 4 },
    medium: { height: 32, padding: 12, radius: 6 },
    large: { height: 40, padding: 16, radius: 8 },
  };

  const { height, padding, radius } = specs[size];
  
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
      width: ${size === 'small' ? 12 : (size === 'large' ? 18 : 14)}px;
      height: ${size === 'small' ? 12 : (size === 'large' ? 18 : 14)}px;
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

  & svg {
    flex-shrink: 0;
    fill: none;
    stroke: currentColor;
    stroke-width: 2px;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.4;
  }

  ${({ fullWidth }) => fullWidth && css`width: 100%;`}

  ${({ size = 'medium', leftIcon, rightIcon }) => 
    getSizeStyle(size, !!leftIcon, !!rightIcon)}

  ${({ theme, variant = 'primary', color = 'gray' }) => {
    // any 타입으로 우회하여 테마 접근 (테마 타입 이슈 방지)
    const currentTheme = theme as any;
    const token = currentTheme.components?.button?.[color] || currentTheme.components?.button?.gray;

    if (!token) return css``; 

    switch (variant) {
      case 'secondary':
        return css`
          background-color: ${token.sub};
          color: ${token.main};
          border: 1px solid transparent;
          &:hover:not(:disabled) {
            filter: brightness(0.96);
          }
        `;
      case 'outline':
        return css`
          background-color: transparent;
          border: 1px solid ${token.main};
          color: ${token.main};
          &:hover:not(:disabled) {
            background-color: ${token.sub};
          }
        `;
      case 'text':
        return css`
          background-color: transparent;
          border: 1px solid transparent;
          color: ${token.main};
          padding-left: 6px !important;
          padding-right: 6px !important;
          &:hover:not(:disabled) {
            background-color: ${token.sub};
          }
        `;
      case 'primary':
      default:
        return css`
          background-color: ${token.main};
          color: ${token.contrast};
          border: 1px solid transparent;
          &:hover:not(:disabled) {
            background-color: ${token.hover};
          }
        `;
    }
  }}
`;

// 4. 컴포넌트 구현
export const Button = ({
  children,
  variant = 'primary',
  color = 'gray',
  size = 'medium',
  fullWidth = false,
  isLoading = false,
  disabled,
  leftIcon,
  rightIcon,
  ...props
}: ButtonProps) => {
  
  // 🔥 [수정됨] 스크린샷 오류 해결: Text 컴포넌트에 존재하는 키값으로 변경
  // Text.tsx에 정의된 키값과 일치해야 합니다. (500-13 삭제 -> 500-14 사용)
  const textVariantMap: Record<ButtonSize, any> = {
    small: '500-12',  
    medium: '500-14', // 기존 500-13에서 변경 (오류 해결)
    large: '500-16'   // 기존 500-13에서 변경 (오류 해결)
  };

  const textVariant = textVariantMap[size] || '500-14';

  return (
    <ButtonBase
      variant={variant}
      color={color}
      size={size}
      fullWidth={fullWidth}
      disabled={disabled || isLoading}
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