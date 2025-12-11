/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { keyframes } from '@emotion/react'; // ✅ keyframes 추가
import { ReactNode, forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface DropdownProps {
  children: ReactNode;
  isOpen: boolean;
  width?: string;
  verticalPos?: 'top' | 'bottom';
  alignPos?: 'left' | 'right';
  maxHeight?: number;
}

// ✅ [추가] 애니메이션 정의
// 1. 아래로 열릴 때: 살짝 위(-10px)에서 아래로 내려옴
const slideDown = keyframes`
  from {
    opacity: 0;
    transform: translateY(-8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

// 2. 위로 열릴 때: 살짝 아래(10px)에서 위로 올라감
const slideUp = keyframes`
  from {
    opacity: 0;
    transform: translateY(8px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
`;

export const OptionItem = styled.div<{ isSelected: boolean }>`
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s;
  
  color: ${(props) => (props.isSelected 
    ? props.theme.colors.green[600] 
    : props.theme.colors.coolgray[800]
  )};

  background-color: ${(props) => (props.isSelected 
    ? props.theme.colors.green[50] 
    : 'transparent'
  )};

  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};

  &:hover {
    background-color: ${(props) => props.theme.colors.coolgray[50]};
  }
`;

// ✅ [수정] MenuContainer에 애니메이션 적용
const MenuContainer = styled.div<{ width?: string; verticalPos: 'top' | 'bottom'; alignPos: 'left' | 'right' }>`
  position: absolute;
  top: ${(props) => (props.verticalPos === 'bottom' ? '100%' : 'auto')};
  bottom: ${(props) => (props.verticalPos === 'top' ? '100%' : 'auto')};
  left: ${(props) => (props.alignPos === 'left' ? '0' : 'auto')};
  right: ${(props) => (props.alignPos === 'right' ? '0' : 'auto')};
  margin-top: ${(props) => (props.verticalPos === 'bottom' ? '8px' : '0')};
  margin-bottom: ${(props) => (props.verticalPos === 'top' ? '8px' : '0')};
  
  width: ${(props) => props.width || '100%'};
  
  background-color: ${(props) => props.theme.colors.white};
  border: 1px solid ${(props) => props.theme.colors.coolgray[100]};
  
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 0; 
  overflow: hidden; 

  /* ✨ 애니메이션 적용 코드 ✨ */
  /* verticalPos가 top이면 slideUp, bottom이면 slideDown 실행 */
  animation: ${(props) => props.verticalPos === 'top' ? slideUp : slideDown} 0.2s ease-out forwards;
  
  /* 애니메이션 시작점 설정 (자연스러운 움직임을 위해) */
  transform-origin: ${(props) => props.verticalPos === 'top' ? 'bottom center' : 'top center'};
`;

const Thumb = styled.div`
  background-color: ${(props) => props.theme.colors.coolgray[200]};
  border-radius: 4px;
  cursor: pointer;
  border-inline: 0px solid transparent;
  background-clip: content-box;
  
  &:hover {
    background-color: ${(props) => props.theme.colors.coolgray[300]};
  }
`;

const ListWrapper = styled.div`
  padding: 0 8px;
  &::before { content: ""; display: block; height: 8px; }
  &::after { content: ""; display: block; height: 8px; }
`;

const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, isOpen, width, verticalPos = 'bottom', alignPos = 'left', maxHeight = 200 }, ref) => {
    if (!isOpen) return null;

    return (
      <MenuContainer ref={ref} width={width} verticalPos={verticalPos} alignPos={alignPos}>
        <Scrollbars
          autoHeight
          autoHeightMax={maxHeight}
          renderThumbVertical={(props: any) => <Thumb {...props} />}  
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