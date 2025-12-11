/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ReactNode, forwardRef } from 'react'; // forwardRef 추가
import { Scrollbars } from 'react-custom-scrollbars-2';

interface DropdownProps {
  children: ReactNode;
  isOpen: boolean;
  width?: string;
  verticalPos?: 'top' | 'bottom';
  alignPos?: 'left' | 'right';
  maxHeight?: number;
}

export const OptionItem = styled.div<{ isSelected: boolean }>`
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
`;

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

// ✅ [수정] forwardRef로 감싸서 외부에서 ref를 받을 수 있게 변경
const Dropdown = forwardRef<HTMLDivElement, DropdownProps>(
  ({ children, isOpen, width, verticalPos = 'bottom', alignPos = 'left', maxHeight = 200 }, ref) => {
    if (!isOpen) return null;

    return (
      // 전달받은 ref를 실제 DOM 요소인 MenuContainer에 연결
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