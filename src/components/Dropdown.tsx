/** @jsxImportSource @emotion/react */
import { forwardRef } from 'react';
import styled from '@emotion/styled';

// ✅ interface에 style 추가
interface DropdownProps {
  isOpen: boolean;
  width?: string;
  menuWidth?: string;
  verticalPos?: 'top' | 'bottom';
  alignPos?: 'left' | 'right';
  maxHeight?: number;
  children: React.ReactNode;
  style?: React.CSSProperties; // style 속성 허용
}

const Container = styled.div<{ 
  width?: string; 
  verticalPos?: 'top' | 'bottom'; 
  alignPos?: 'left' | 'right'; 
  maxHeight?: number;
  isOpen: boolean;
}>`
  position: absolute;
  top: ${({ verticalPos }) => (verticalPos === 'top' ? 'auto' : '100%')};
  bottom: ${({ verticalPos }) => (verticalPos === 'top' ? '100%' : 'auto')};
  left: ${({ alignPos }) => (alignPos === 'left' ? '0' : 'auto')};
  right: ${({ alignPos }) => (alignPos === 'right' ? '0' : 'auto')};
  
  width: ${({ width }) => width || '100%'};
  max-height: ${({ maxHeight }) => maxHeight}px;
  overflow-y: auto;
  
  margin-top: ${({ verticalPos }) => (verticalPos === 'bottom' ? '4px' : '0')};
  margin-bottom: ${({ verticalPos }) => (verticalPos === 'top' ? '4px' : '0')};
  
  background-color: white; 
  border: 1px solid #e5e7eb; 
  border-radius: 8px;
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06);
  z-index: 10;
  
  /* 스크롤바 스타일 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-thumb {
    background-color: #d1d5db;
    border-radius: 4px;
  }
  &::-webkit-scrollbar-track {
    background-color: transparent;
  }
`;

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ isOpen, width, verticalPos = 'bottom', alignPos = 'left', maxHeight = 200, children, style }, ref) => {
    if (!isOpen) return null;

    return (
      <Container
        ref={ref}
        isOpen={isOpen}
        width={width}
        verticalPos={verticalPos}
        alignPos={alignPos}
        maxHeight={maxHeight}
        style={style} // ✅ 전달받은 스타일 적용
      >
        {children}
      </Container>
    );
  }
);

export const OptionItem = styled.div<{ isSelected?: boolean }>`
  padding: 10px 12px;
  cursor: pointer;
  transition: all 0.2s;
  background-color: ${({ isSelected, theme }) => isSelected ? theme.colors.blue[50] : 'transparent'};

  &:hover {
    background-color: ${({ theme }) => theme.colors.coolgray[50]};
  }
  &:first-of-type {
    border-top-left-radius: 8px;
    border-top-right-radius: 8px;
  }
  &:last-of-type {
    border-bottom-left-radius: 8px;
    border-bottom-right-radius: 8px;
  }
`;

export default Dropdown;