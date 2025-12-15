/** @jsxImportSource @emotion/react */
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// 기존 컴포넌트들
import SelectTest from './SelectTest';
import TextTest from './TextTest';
import InputTextFieldTest from './InputTextFieldTest';

// [NEW] 새로 만든 버튼 테스트 추가
import ButtonTest from './ButtonTest'; 

// 전체 레이아웃 컨테이너 (Flex로 좌우 분할)
const Layout = styled.div`
  display: flex;
  min-height: 100vh;
  background-color: #ffffff;
`;

// 왼쪽 사이드바
const Sidebar = styled.nav`
  width: 240px;
  flex-shrink: 0; /* 사이드바 너비 고정 */
  background-color: ${({ theme }) => theme.colors?.coolgray?.[50] || '#f8f9fa'};
  border-right: 1px solid ${({ theme }) => theme.colors?.coolgray?.[200] || '#e2e5e8'};
  padding: 24px 16px;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;

// 사이드바 타이틀 (선택 사항)
const SidebarTitle = styled.div`
  padding: 0 12px 12px;
  font-size: 13px;
  font-weight: 700;
  color: ${({ theme }) => theme.colors?.coolgray?.[500] || '#868e96'};
  text-transform: uppercase;
  letter-spacing: 0.5px;
`;

// 네비게이션 링크 스타일
const NavLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  color: #495057;
  padding: 10px 12px;
  border-radius: 6px;
  transition: all 0.2s;

  &:hover {
    background-color: ${({ theme }) => theme.colors?.coolgray?.[100] || '#e9ecef'};
    color: #111;
  }
`;

// 오른쪽 컨텐츠 영역
const Main = styled.main`
  flex: 1;
  padding: 40px;
  overflow-y: auto; /* 컨텐츠가 길어지면 스크롤 */
`;

function App() {
  const theme = useTheme();

  return (
    <BrowserRouter>
      <Layout>
        {/* 왼쪽 메뉴 영역 */}
        <Sidebar theme={theme}>
          <SidebarTitle theme={theme}>Components</SidebarTitle>

          <NavLink theme={theme} to="/text">
            Text 
          </NavLink> 
          <NavLink theme={theme} to="/">
            Select 
          </NavLink>
          <NavLink theme={theme} to="/input">
            Input 
          </NavLink>
          <NavLink theme={theme} to="/button">
            Button 
          </NavLink>
        </Sidebar>

        {/* 오른쪽 컨텐츠 영역 */}
        <Main>
          <Routes>
            <Route path="/" element={<SelectTest />} />
            <Route path="/text" element={<TextTest />} />
            <Route path="/input" element={<InputTextFieldTest />} />
            <Route path="/button" element={<ButtonTest />} />
          </Routes>
        </Main>
      </Layout>
    </BrowserRouter>
  );
}

export default App;