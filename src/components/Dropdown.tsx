/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ReactNode, forwardRef } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

// ... (OptionItem 등 기존 코드는 그대로 유지) ...

interface DropdownProps {
  children: ReactNode;
  isOpen: boolean;
  width?: string;
  verticalPos?: 'top' | 'bottom';
  alignPos?: 'left' | 'right';
  maxHeight?: number;
}

export const OptionItem = styled.div<{ isSelected: boolean }>`
  /* ... 기존 코드 유지 ... */
  padding: 5px 10px;
  font-size: 14px;
  border-radius: 6px;
  color: ${(props) => (props.isSelected ? '#68d391' : '#333')};
  background-color: ${(props) => (props.isSelected ? '#f0fff4' : 'transparent')};
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
  cursor: pointer;
  transition: all 0.2s;
  &:hover {
    background-color: #f7f7f7;
  }
`;

const MenuContainer = styled.div<{ width?: string; verticalPos: 'top' | 'bottom'; alignPos: 'left' | 'right' }>`
  position: absolute;
  top: ${(props) => (props.verticalPos === 'bottom' ? '100%' : 'auto')};
  bottom: ${(props) => (props.verticalPos === 'top' ? '100%' : 'auto')};
  left: ${(props) => (props.alignPos === 'left' ? '0' : 'auto')};
  right: ${(props) => (props.alignPos === 'right' ? '0' : 'auto')};
  margin-top: ${(props) => (props.verticalPos === 'bottom' ? '8px' : '0')};
  margin-bottom: ${(props) => (props.verticalPos === 'top' ? '8px' : '0')};
  width: ${(props) => props.width || '100%'};
  background-color: white;
  border: 1px solid #eee;
  border-radius: 6px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 0; 
  overflow: hidden; 

  /* ✅ [핵심 추가 1] 스크롤 체이닝 방지 */
  /* 이 영역 내부에서 스크롤이 끝에 도달해도 부모(전체 페이지)로 스크롤을 넘기지 않음 */
  overscroll-behavior: contain;
`;

// ... (Thumb, ListWrapper 등 기존 코드 유지) ...
const Thumb = styled.div`
  background-color: #d1d5db;
  border-radius: 4px;
  cursor: pointer;
  border-inline: 0px solid transparent;
  background-clip: content-box;
  &:hover {
    background-color: #a0aec0;
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
      <MenuContainer 
        ref={ref} 
        width={width} 
        verticalPos={verticalPos} 
        alignPos={alignPos}
        // ✅ [핵심 추가 2] 휠 이벤트 전파 방지 (Stop Propagation)
        // 마우스 휠이 굴러갈 때, 이 이벤트가 부모(전체 페이지)로 전달되는 것을 강제로 막습니다.
        // 브라우저에게 "이 휠 이벤트는 여기서 끝내라"고 명시하는 역할입니다.
        onWheel={(e) => {
          e.stopPropagation();
        }}
      >
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