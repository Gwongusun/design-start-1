/** @jsxImportSource @emotion/react */
import { useState } from 'react';
import styled from '@emotion/styled';
import { useTheme, Theme } from '@emotion/react'; // Theme 타입 import
import Text from './Text';

export type InputMode = 'light' | 'dark' | 'transparent';

// Props 인터페이스 정의
interface InputTextFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  width?: string;
  mode?: InputMode;
}

// 1. 스타일드 컴포넌트: Props로 계산된 색상 객체(customColors)를 받아서 처리
// 이유: input의 placeholder 색상은 inline style로 변경 불가능하기 때문
const Wrapper = styled.div<{ width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  width: ${(props) => props.width || '100%'};
`;

const StyledInput = styled.input<{ customColors: any }>`
  width: 100%;
  height: 32px;
  padding: 4px 10px;
  border-radius: 6px;
  box-sizing: border-box;
  outline: none;
  font-family: 'Pretendard', sans-serif;
  font-size: 14px;
  border-width: 1px;
  border-style: solid;
  transition: all 0.2s ease-in-out;

  /* ✅ 여기서 색상을 일괄 적용합니다 */
  background-color: ${({ customColors }) => customColors.background};
  border-color: ${({ customColors }) => customColors.border};
  color: ${({ customColors }) => customColors.text};

  /* Placeholder 색상 적용 (핵심) */
  &::placeholder {
    color: ${({ customColors }) => customColors.placeholder};
  }
`;

function InputTextField({ 
  label, 
  width, 
  mode = 'light', 
  disabled, 
  ...props 
}: InputTextFieldProps) {
  // Theme 타입 단언 (만약 theme.ts의 declare module이 안 먹힐 경우를 대비)
  const theme = useTheme() as Theme; 
  
  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // 2. 상태별 색상 계산 로직
  // theme.ts에 정의된 components.input 값을 가져옵니다.
  const getColors = () => {
    // 방어 코드: theme.components가 없을 경우 에러 방지
    const token = theme.components?.input?.[mode] || theme.components?.input?.light;

    if (!token) return {}; // 토큰이 아예 로드 안 됐을 때

    // Disabled
    if (disabled) {
      return {
        label: token.label.disabled,
        background: token.bg.disabled,
        border: 'transparent',
        text: token.text.disabled,
        placeholder: token.text.disabled,
      };
    }

    // Focused (Active)
    if (isFocused) {
      return {
        label: token.label.default,
        background: token.bg.active,
        border: token.border.active,
        text: token.text.default,
        placeholder: token.text.placeholder,
      };
    }

    // Hovered
    if (isHovered) {
      return {
        label: token.label.default,
        background: token.bg.hover,
        border: token.border.hover,
        text: token.text.default,
        placeholder: token.text.placeholder,
      };
    }

    // Default
    return {
      label: token.label.default,
      background: token.bg.default,
      border: token.border.default,
      text: token.text.default,
      placeholder: token.text.placeholder,
    };
  };

  const colors = getColors();

  return (
    <Wrapper width={width}>
      {label && (
        <Text as="label" variant="700-14" color={colors.label}>
          {label}
        </Text>
      )}
      <StyledInput
        disabled={disabled}
        onFocus={(e) => {
          setIsFocused(true);
          props.onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          props.onBlur?.(e);
        }}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        // ✅ 계산된 colors 객체를 통째로 스타일드 컴포넌트에 넘깁니다.
        customColors={colors} 
        {...props}
      />
    </Wrapper>
  );
}

export default InputTextField;