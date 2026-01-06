/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import React, { useMemo, useState } from 'react';
import { useTheme } from '@emotion/react';
import type { Theme } from '@emotion/react';
import type { InputHTMLAttributes } from 'react';

import Text from './Text';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export type InputMode = 'light' | 'dark' | 'transparent';

export interface InputTextFieldProps extends InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  width?: string;
  mode?: InputMode;
}

interface InputColors {
  label: string;
  background: string;
  border: string;
  text: string;
  placeholder: string;
}

// ------------------------------------------------------------------
// Helpers
// ------------------------------------------------------------------
const computeColors = (
  theme: Theme,
  mode: InputMode,
  state: { disabled?: boolean; isFocused: boolean; isHovered: boolean }
): InputColors => {
  const token = theme.components?.input?.[mode] || theme.components?.input?.light;

  // 토큰이 아직 로드되지 않았을 때의 안전한 Fallback
  if (!token) {
    return {
      label: '#000000',
      background: '#FFFFFF',
      border: '#000000',
      text: '#000000',
      placeholder: '#A0A0A0',
    };
  }

  const { disabled, isFocused, isHovered } = state;

  if (disabled) {
    return {
      label: token.label.disabled,
      background: token.bg.disabled,
      border: 'transparent',
      text: token.text.disabled,
      placeholder: token.text.disabled,
    };
  }

  if (isFocused) {
    return {
      label: token.label.default,
      background: token.bg.active,
      border: token.border.active,
      text: token.text.default,
      placeholder: token.text.placeholder,
    };
  }

  if (isHovered) {
    return {
      label: token.label.default,
      background: token.bg.hover,
      border: token.border.hover,
      text: token.text.default,
      placeholder: token.text.placeholder,
    };
  }

  return {
    label: token.label.default,
    background: token.bg.default,
    border: token.border.default,
    text: token.text.default,
    placeholder: token.text.placeholder,
  };
};

// ------------------------------------------------------------------
// Styled Components
// ------------------------------------------------------------------
const WrapperRoot = styled.div<{ $width?: string }>`
  display: flex;
  flex-direction: column;
  gap: 8px;
  text-align: left;
  width: ${({ $width }) => $width || '100%'};
`;

const StyledInputRoot = styled.input<{ $colors: InputColors }>`
  width: 100%;
  height: 32px;
  padding: 4px 10px;
  border-radius: 6px;
  box-sizing: border-box;
  outline: none;
  font-family: Pretendard, -apple-system, BlinkMacSystemFont, system-ui, Roboto, sans-serif;
  font-size: 14px;
  border-width: 1px;
  border-style: solid;
  transition: all 0.2s ease-in-out;

  background-color: ${({ $colors }) => $colors.background};
  border-color: ${({ $colors }) => $colors.border};
  color: ${({ $colors }) => $colors.text};

  &::placeholder {
    color: ${({ $colors }) => $colors.placeholder};
  }
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------
const InputTextField = React.forwardRef<HTMLInputElement, InputTextFieldProps>(({
  label,
  width,
  mode = 'light',
  disabled,
  onFocus,
  onBlur,
  ...props
}, ref) => {
  const theme = useTheme();

  const [isFocused, setIsFocused] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const colors = useMemo(
    () => computeColors(theme, mode, { disabled, isFocused, isHovered }),
    [theme, mode, disabled, isFocused, isHovered]
  );

  return (
    <WrapperRoot $width={width}>
      {label && (
        <Text as="label" variant="700-14" color={colors.label}>
          {label}
        </Text>
      )}

      <StyledInputRoot
        ref={ref}
        disabled={disabled}
        $colors={colors}
        onFocus={(e) => {
          setIsFocused(true);
          onFocus?.(e);
        }}
        onBlur={(e) => {
          setIsFocused(false);
          onBlur?.(e);
        }}
        onMouseEnter={() => !disabled && setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        {...props}
      />
    </WrapperRoot>
  );
});

export default InputTextField;