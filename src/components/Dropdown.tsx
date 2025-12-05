/** @jsxImportSource @emotion/react */
import styled from '@emotion/styled';
import { ReactNode } from 'react';

// 타입 정의 (에러 방지용)
interface DropdownProps {
  children: ReactNode;
  isOpen: boolean;
  width?: string;
}

// 스타일 정의 (CSS가 이 안으로 들어왔습니다)
const MenuContainer = styled.div<{ width?: string }>`
  position: absolute;
  top: 100%;
  left: 0;
  width: ${(props) => props.width || '100%'};
  margin-top: 8px;
  background-color: white;
  border: 1px solid #eee;
  border-radius: 16px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  z-index: 10;
  padding: 8px 0;
  max-height: 300px;
  overflow-y: auto;

  /* 스크롤바 디자인 */
  &::-webkit-scrollbar {
    width: 8px;
  }
  &::-webkit-scrollbar-track {
    background: transparent;
    margin: 8px 0;
  }
  &::-webkit-scrollbar-thumb {
    background: #d1d5db;
    border-radius: 10px;
    border: 2px solid transparent;
    background-clip: content-box;
  }
  &::-webkit-scrollbar-thumb:hover {
    background-color: #a0aec0;
  }
`;

function Dropdown({ children, isOpen, width }: DropdownProps) {
  if (!isOpen) return null;
  return <MenuContainer width={width}>{children}</MenuContainer>;
}

export default Dropdown;