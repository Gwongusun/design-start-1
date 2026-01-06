/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { css, keyframes } from '@emotion/react';
import type { ButtonHTMLAttributes, ReactNode, CSSProperties } from 'react';
import React, { useEffect, useRef, useState } from 'react';

import Text from './Text';
import Dropdown, { DropdownOption, DropdownProps } from './Dropdown';

// -------------------------------------------------------------------------
// Types
// -------------------------------------------------------------------------
export type ButtonVariant =
  | 'filled'
  | 'outlined'
  | 'transparent'
  | 'filled-disabled'
  | 'outlined-disabled'
  | 'transparent-disabled';

export type ButtonSize = 'small' | 'medium' | 'large';
export type ButtonColor = 'gray' | 'indigo' | 'green' | 'red';
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

  // Dropdown Integration
  dropdownOptions?: DropdownOption[];
  onDropdownSelect?: (value: string) => void;
  dropdownProps?: Omit<DropdownProps, 'isOpen' | 'options' | 'onSelect'>;
  menuWidth?: string;
  maxHeight?: number;
  menuMode?: ButtonMode;

  /**
   * Content alignment (useful with width="100%")
   * @default 'center'
   */
  justifyContent?: CSSProperties['justifyContent'];
}

// -------------------------------------------------------------------------
// Constants / Helpers
// -------------------------------------------------------------------------
const DEFAULTS = {
  variant: 'filled' as ButtonVariant,
  color: 'gray' as ButtonColor,
  size: 'medium' as ButtonSize,
  mode: 'light' as ButtonMode,
};

const TEXT_VARIANT_BY_SIZE: Record<ButtonSize, any> = {
  small: '500-12',
  medium: '500-14',
  large: '500-16',
};

const SIZE_SPECS: Record<
  ButtonSize,
  { height: number; padding: number; radius: number; iconSize: number; strokeWidth: number; gapDiff: number }
> = {
  small: { height: 24, padding: 6, radius: 4, iconSize: 12, strokeWidth: 2.4, gapDiff: 4 },
  medium: { height: 32, padding: 10, radius: 6, iconSize: 14, strokeWidth: 2.2, gapDiff: 3 },
  large: { height: 40, padding: 14, radius: 8, iconSize: 18, strokeWidth: 1.8, gapDiff: 2 },
};

const isDisabledVariant = (variant: ButtonVariant) => variant.includes('-disabled');

const getBaseVariant = (variant: ButtonVariant): Exclude<ButtonVariant, `${string}-disabled`> => {
  return (isDisabledVariant(variant) ? variant.replace('-disabled', '') : variant) as any;
};

const isTextLike = (children: ReactNode) => typeof children === 'string' || typeof children === 'number';

const hasMeaningfulText = (children: ReactNode) => {
  if (!isTextLike(children)) return false;
  const text = String(children);
  return text.trim().length > 0;
};

const getSizeStyle = (size: ButtonSize, args: { hasLeftIcon: boolean; hasRightIcon: boolean; isOnlyIcon: boolean }) => {
  const { height, padding, radius, iconSize, strokeWidth, gapDiff } = SIZE_SPECS[size];

  let paddingLeft = padding;
  let paddingRight = padding;

  if (!args.isOnlyIcon) {
    // 아이콘 반대편(텍스트 쪽) 여백을 gapDiff 만큼 늘림
    if (!args.hasLeftIcon && args.hasRightIcon) paddingLeft += gapDiff;
    if (args.hasLeftIcon && !args.hasRightIcon) paddingRight += gapDiff;
  }

  return css`
    height: ${height}px;
    border-radius: ${radius}px;
    padding-left: ${paddingLeft}px;
    padding-right: ${paddingRight}px;

    & svg {
      flex-shrink: 0;
      width: ${iconSize}px;
      height: ${iconSize}px;
      stroke-width: ${strokeWidth}px !important;
    }
  `;
};

// -------------------------------------------------------------------------
// Loading Spinner
// -------------------------------------------------------------------------
const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`;

const Spinner = styled.svg<{ $size: ButtonSize }>`
  animation: ${spin} 0.8s linear infinite;
  width: ${({ $size }) => ($size === 'small' ? 12 : $size === 'large' ? 18 : 14)}px;
  height: ${({ $size }) => ($size === 'small' ? 12 : $size === 'large' ? 18 : 14)}px;
  stroke-width: 2.5px;
  fill: none;
  stroke: currentColor;
`;

const LoadingSpinner = ({ size }: { size: ButtonSize }) => (
  <Spinner $size={size} viewBox="0 0 24 24" aria-hidden="true">
    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeOpacity="0.3" strokeWidth="2" fill="none" />
    <path d="M22 12c0-5.52-4.48-10-10-10" />
  </Spinner>
);

const SpinnerContainer = styled.span`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  align-items: center;
  justify-content: center;
`;

const ContentWrapper = styled.span<{ $isLoading: boolean; $size: ButtonSize; $justifyContent?: CSSProperties['justifyContent'] }>`
  display: inline-flex;
  align-items: center;
  justify-content: ${({ $justifyContent }) => $justifyContent || 'center'};
  width: ${({ $justifyContent }) => ($justifyContent ? '100%' : 'auto')};
  transition: opacity 0.2s;
  opacity: ${({ $isLoading }) => ($isLoading ? 0 : 1)};
  height: 100%;
  gap: ${({ $size }) => ($size === 'small' ? 4 : 6)}px;
`;

// -------------------------------------------------------------------------
// Styled Button
// -------------------------------------------------------------------------
interface ButtonBaseProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  $variant: ButtonVariant;
  $color: ButtonColor;
  $size: ButtonSize;
  $mode: ButtonMode;
  $fullWidth: boolean;
  $width?: string;
  $isLoading: boolean;
  $isOnlyIcon: boolean;
  $hasLeftIcon: boolean;
  $hasRightIcon: boolean;
  $isDisabledState: boolean;
}

const ButtonBase = styled.button<ButtonBaseProps>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  position: relative;
  border-style: solid;
  cursor: pointer;
  transition: all 0.2s cubic-bezier(0.4, 0, 0.2, 1);
  outline: none;
  box-sizing: border-box;
  white-space: nowrap;
  user-select: none;
  width: ${({ $fullWidth, $width }) => ($fullWidth ? '100%' : $width || 'auto')};

  & svg {
    flex-shrink: 0;
    fill: none;
    stroke: currentColor;
    stroke-linecap: round;
    stroke-linejoin: round;
  }

  &:disabled {
    cursor: not-allowed;
  }

  ${({ $size, $hasLeftIcon, $hasRightIcon, $isOnlyIcon }) =>
    getSizeStyle($size, { hasLeftIcon: $hasLeftIcon, hasRightIcon: $hasRightIcon, isOnlyIcon: $isOnlyIcon })}

  ${({ theme, $variant, $color, $mode, $isLoading, $isDisabledState }) => {
    const buttonTheme = (theme as any)?.components?.button?.[$mode];
    if (!buttonTheme) return css``;

    const baseVariant = getBaseVariant($variant);
    const disabledByVariant = isDisabledVariant($variant);

    const tokenGroup = $isLoading
      ? buttonTheme.loading?.[baseVariant]?.[$color]
      : $isDisabledState || disabledByVariant
        ? buttonTheme.disabled?.[baseVariant]?.[$color]
        : buttonTheme[baseVariant]?.[$color];

    if (!tokenGroup) return css``;

    const hoverToken = tokenGroup.hover || tokenGroup;
    const activeToken = tokenGroup.active || tokenGroup;
    const canInteract = !$isDisabledState && !disabledByVariant && !$isLoading;

    return css`
      background-color: ${tokenGroup.bg};
      border: 1px solid ${tokenGroup.border};
      color: ${tokenGroup.text};

      ${canInteract &&
      css`
        &:hover {
          background-color: ${hoverToken.bg};
          border-color: ${hoverToken.border};
          color: ${hoverToken.text};
        }

        &:active {
          background-color: ${activeToken.bg};
          border-color: ${activeToken.border};
          color: ${activeToken.text};
        }
      `}
    `;
  }}
`;

// -------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------
// -------------------------------------------------------------------------
// Component
// -------------------------------------------------------------------------
export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(({
  children,
  variant = DEFAULTS.variant,
  color = DEFAULTS.color,
  size = DEFAULTS.size,
  mode = DEFAULTS.mode,
  width,
  fullWidth = false,
  isLoading = false,
  disabled: propDisabled,
  leftIcon,
  rightIcon,
  dropdownOptions,
  onDropdownSelect,
  dropdownProps,
  menuWidth,
  maxHeight,
  menuMode,
  justifyContent,
  style,
  ...props
}, ref) => {
  const innerRef = useRef<HTMLButtonElement>(null);
  const [measuredWidth, setMeasuredWidth] = useState<number | undefined>(undefined);

  // Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    if (!isDropdownOpen) return;
    const handleClickOutside = (event: MouseEvent) => {
      // Button click is handled by onClick, so we only care about clicks outside both button and dropdown
      if (
        innerRef.current && !innerRef.current.contains(event.target as Node) &&
        dropdownRef.current && !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isDropdownOpen]);


  // Combine refs (simple version)
  useEffect(() => {
    if (!ref) return;
    if (typeof ref === 'function') {
      ref(innerRef.current);
    } else {
      (ref as any).current = innerRef.current;
    }
  }, [ref]);

  const hasIcon = Boolean(leftIcon) || Boolean(rightIcon);
  const hasText = hasMeaningfulText(children);
  const hasNonTextChildren = Boolean(children) && !isTextLike(children);
  const hasContent = hasText || hasNonTextChildren;

  const isOnlyIcon = hasIcon && !hasContent && !isLoading;
  const height = SIZE_SPECS[size].height;

  useEffect(() => {
    // 로딩 전 "기본 너비"를 한 번만 측정 (width/fullWidth 미사용 시)
    if (!innerRef.current) return;
    if (measuredWidth) return;
    if (isLoading) return;
    if (width || fullWidth) return;

    setMeasuredWidth(innerRef.current.getBoundingClientRect().width);
  }, [measuredWidth, isLoading, width, fullWidth]);

  const disabledByVariant = isDisabledVariant(variant);
  const isActuallyDisabled = Boolean(propDisabled) || disabledByVariant || isLoading;

  const dynamicStyle = { ...style } as CSSProperties;

  // 로딩 중 레이아웃 점프 방지: 기존 너비를 유지
  if (isLoading && !width && !fullWidth && measuredWidth) {
    dynamicStyle.width = `${measuredWidth}px`;
    dynamicStyle.minWidth = `${measuredWidth}px`;
  }

  // 아이콘-only 버튼은 height 기반 정사각형으로 고정(요구 시)
  if (isOnlyIcon && !width && !fullWidth) {
    dynamicStyle.width = `${height}px`;
    dynamicStyle.minWidth = `${height}px`;
  }

  const textVariant = TEXT_VARIANT_BY_SIZE[size] || TEXT_VARIANT_BY_SIZE.medium;

  const handleButtonClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (dropdownOptions) {
      setIsDropdownOpen(!isDropdownOpen);
    }
    props.onClick?.(e);
  };

  const buttonContent = (
    <ButtonBase
      ref={innerRef}
      $variant={variant}
      $color={color}
      $size={size}
      $mode={mode}
      $width={width}
      $fullWidth={fullWidth}
      $isLoading={isLoading}
      $isOnlyIcon={isOnlyIcon}
      $hasLeftIcon={Boolean(leftIcon)}
      $hasRightIcon={Boolean(rightIcon)}
      $isDisabledState={isActuallyDisabled}
      disabled={isActuallyDisabled}
      style={dynamicStyle}
      aria-busy={isLoading || undefined}
      {...props}
      onClick={handleButtonClick}
    >
      {isLoading && (
        <SpinnerContainer>
          <LoadingSpinner size={size} />
        </SpinnerContainer>
      )}

      <ContentWrapper $isLoading={isLoading} $size={size} $justifyContent={justifyContent}>
        {leftIcon}

        {hasText ? (
          <Text variant={textVariant} as="span" color="inherit">
            {children}
          </Text>
        ) : hasNonTextChildren ? (
          children
        ) : null}

        {rightIcon}
      </ContentWrapper>
    </ButtonBase>
  );

  if (dropdownOptions) {
    return (
      <div style={{ position: 'relative', display: fullWidth ? 'block' : 'inline-block', width: fullWidth ? '100%' : 'auto' }}>
        {buttonContent}
        <Dropdown
          ref={dropdownRef}
          isOpen={isDropdownOpen}
          options={dropdownOptions}
          onSelect={(value) => {
            onDropdownSelect?.(value);
            setIsDropdownOpen(false);
          }}
          width={menuWidth || dropdownProps?.width || (fullWidth ? '100%' : undefined)}
          maxHeight={maxHeight || dropdownProps?.maxHeight}
          mode={menuMode || dropdownProps?.mode || mode} // Default to button mode, but can be overridden by menuMode or dropdownProps
          {...dropdownProps}
        />
      </div>
    );
  }

  return buttonContent;
});

export default Button;