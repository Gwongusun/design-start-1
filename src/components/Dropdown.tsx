/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ReactNode, forwardRef, HTMLAttributes } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';
import { Theme } from '@emotion/react';

// ------------------------------------------------------------------
// Types
// ------------------------------------------------------------------
export type DropdownMode = 'light' | 'dark' | 'transparent';

interface DropdownProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode;
  isOpen: boolean;
  width?: string;
  verticalPos?: 'top' | 'bottom';
  alignPos?: 'left' | 'right';
  maxHeight?: number;
  mode?: DropdownMode;
  disabled?: boolean;
}

// ------------------------------------------------------------------
// Helper: 모드별 색상 매핑 함수
// ------------------------------------------------------------------
const getDropdownStyle = (theme: Theme, mode: DropdownMode = 'light') => {
  // ✅ 1. 다크 모드 (요청하신 색상 적용)
  if (mode === 'dark') {
    return {
      menuBg: theme.colors.coolgray[800],
      menuBorder: theme.colors.coolgray[700],
      
      // 요청하신 값: 텍스트는 밝게(100), 선택된 배경은 진한 회색(200)
      text: theme.colors.coolgray[100],          
      textSelected: theme.colors.green[400],     
      itemBgSelected: theme.colors.coolgray[700],       
      itemBgHover: theme.colors.coolgray[700],
      scrollbar: theme.colors.coolgray[600],
      scrollbarHover: theme.colors.coolgray[500],
    };
  }

  // ✅ 2. 라이트 & 투명 모드 (기본)
  return {
    menuBg: theme.colors.white,
    menuBorder: theme.colors.coolgray[150],
    text: theme.colors.coolgray[800],
    textSelected: theme.colors.green[600],
    itemBgSelected: theme.colors.green[50],
    itemBgHover: theme.colors.coolgray[50],
    scrollbar: theme.colors.coolgray[200],
    scrollbarHover: theme.colors.coolgray[300],
  };
};

// ------------------------------------------------------------------
// Styled Components
// ------------------------------------------------------------------

export const OptionItem = styled.div<{ isSelected: boolean; mode: DropdownMode }>`
  padding: 5px 10px;
  border-radius: 6px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: all 0.2s;

  ${({ theme, mode, isSelected }) => {
    const styles = getDropdownStyle(theme, mode);
    return `
      background-color: ${isSelected ? styles.itemBgSelected : 'transparent'};
      color: ${isSelected ? styles.textSelected : styles.text}; 
      
      /* ✅ [핵심] 자식 요소(<Text>)가 부모(OptionItem)의 색상을 강제로 따르게 함 
         Select.tsx에서 color를 지웠더라도, Text 컴포넌트 자체 기본색이 있을 수 있으므로 이 코드가 필수입니다.
      */
      & > * {
        color: inherit !important; 
      }

      &:hover {
        background-color: ${isSelected ? styles.itemBgSelected : styles.itemBgHover};
      }
    `;
  }}
`;

const MenuContainer = styled.div<{ width?: string; verticalPos: 'top' | 'bottom'; alignPos: 'left' | 'right'; mode: DropdownMode }>`
  position: absolute;
  top: ${(props) => (props.verticalPos === 'bottom' ? '100%' : 'auto')};
  bottom: ${(props) => (props.verticalPos === 'top' ? '100%' : 'auto')};
  left: ${(props) => (props.alignPos === 'left' ? '0' : 'auto')};
  right: ${(props) => (props.alignPos === 'right' ? '0' : 'auto')};
  margin-top: ${(props) => (props.verticalPos === 'bottom' ? '8px' : '0')};
  margin-bottom: ${(props) => (props.verticalPos === 'top' ? '8px' : '0')};
  
  width: ${(props) => props.width || '100%'};
  border-radius: 6px;

  ${({ theme, mode }) => {
    const styles = getDropdownStyle(theme, mode);
    return `
      background-color: ${styles.menuBg};
      border: 1px solid ${styles.menuBorder};
    `;
  }}
  
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 0; 
  overflow: hidden; 
  overscroll-behavior: contain;
`;

const Thumb = styled.div<{ mode: DropdownMode }>`
  border-radius: 4px;
  cursor: pointer;
  border-inline: 0px solid transparent;
  background-clip: content-box;

  ${({ theme, mode }) => {
    const styles = getDropdownStyle(theme, mode);
    return `
      background-color: ${styles.scrollbar};
      &:hover {
        background-color: ${styles.scrollbarHover};
      }
    `;
  }}
`;

const ListWrapper = styled.div`
  padding: 0 8px;
  &::before { content: ""; display: block; height: 8px; }
  &::after { content: ""; display: block; height: 8px; }
`;

// ------------------------------------------------------------------
// Component
// ------------------------------------------------------------------

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ 
    children, 
    isOpen, 
    width, 
    verticalPos = 'bottom', 
    alignPos = 'left', 
    maxHeight = 200, 
    mode = 'light',
    disabled = false, 
    ...props 
  }, ref) => {
    
    if (!isOpen || disabled) return null;

    return (
      <MenuContainer 
        ref={ref} 
        width={width} 
        verticalPos={verticalPos} 
        alignPos={alignPos} 
        mode={mode}
        {...props} 
        onWheel={(e) => { e.stopPropagation(); if (props.onWheel) props.onWheel(e); }}
      >
        <Scrollbars
          autoHeight
          autoHeightMax={maxHeight}
          renderThumbVertical={(props: any) => <Thumb {...props} mode={mode} />}  
        >
          <ListWrapper>
            {children}
          </ListWrapper>
        </Scrollbars>
      </MenuContainer>
    );
  }
);

export default Dropdown;