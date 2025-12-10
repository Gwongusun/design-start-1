/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ReactNode } from 'react';
import { Scrollbars } from 'react-custom-scrollbars-2';

interface DropdownProps {
  children: ReactNode;
  isOpen: boolean;
  width?: string;
}

export const OptionItem = styled.div<{ isSelected: boolean }>`
  padding: 8px 12px;
  font-size: 14px;
  border-radius: 6px;
  color: ${(props) => (props.isSelected ? '#68d391' : '#333')};
  background-color: ${(props) => (props.isSelected ? '#f0fff4' : 'transparent')};
  font-weight: ${(props) => (props.isSelected ? 'bold' : 'normal')};
  cursor: pointer;
  transition: all 0.5s;
  &:hover {
    background-color: #f7f7f7;
  }
`;

const MenuContainer = styled.div<{ width?: string }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: ${(props) => props.width || '100%'};
  margin-top: 8px;
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

// [수정됨] 패딩/마진이 아닌 '높이 값'으로 위아래 공간을 확보하는 래퍼
const ListWrapper = styled.div`
  padding: 0 8px; /* 좌우 패딩은 유지 */

  /* 위쪽 공간 확보: 8px 높이의 빈 블록 생성 */
  &::before {
    content: "";
    display: block;
    height: 8px;
  }

  /* 아래쪽 공간 확보: 8px 높이의 빈 블록 생성 */
  &::after {
    content: "";
    display: block;
    height: 8px;
  }
`;

function Dropdown({ children, isOpen, width }: DropdownProps) {
  if (!isOpen) return null;

  return (
    <MenuContainer width={width}>
      <Scrollbars
        autoHeight
        autoHeightMax={300}
        renderThumbVertical={(props: any) => <Thumb {...props} />}  
      >
        {/* 기존 div 대신 ListWrapper 사용 */}
        <ListWrapper>
          {children}
        </ListWrapper>
      </Scrollbars>
    </MenuContainer>
  );
}

export default Dropdown;