/** @jsxImportSource @emotion/react */
import { BrowserRouter, Routes, Route, Link, useLocation } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme, Global, css } from '@emotion/react';

// 컴포넌트들
import SelectTest from './SelectTest';
import TextTest from './TextTest';
import InputTextFieldTest from './InputTextFieldTest';
import ButtonTest from './ButtonTest';
import DropdownTest from './DropdownTest';

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
  padding: 20px 16px;
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
const NavLink = styled(Link) <{ $isActive?: boolean }>`
  display: flex;
  align-items: center;
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  padding: 10px 12px;
  border-radius: 6px;
  transition: all 0.2s;

  /* 기본 상태 */
  color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.indigo[600] : theme.colors.coolgray[600]};
  background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.white : 'transparent'};

  &:hover {
    background-color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.indigo[100] : theme.colors.coolgray[100]};
    color: ${({ theme, $isActive }) =>
    $isActive ? theme.colors.indigo[700] : theme.colors.coolgray[900]};
  }
`;

// 오른쪽 컨텐츠 영역
const Main = styled.main`
  flex: 1;
  padding: 40px;
  overflow-y: auto; /* 컨텐츠가 길어지면 스크롤 */
`;

// Navigation Content Component (Moved inside to use useLocation)
function SidebarContent() {
  const theme = useTheme();
  const location = useLocation();
  const path = location.pathname;

  return (
    <Sidebar theme={theme}>
      <SidebarTitle theme={theme}>Components</SidebarTitle>

      <NavLink theme={theme} to="/" $isActive={path === '/'}>
        Text
      </NavLink>
      <NavLink theme={theme} to="/select" $isActive={path === '/select'}>
        Select
      </NavLink>
      <NavLink theme={theme} to="/input" $isActive={path === '/input'}>
        Input
      </NavLink>
      <NavLink theme={theme} to="/button" $isActive={path === '/button'}>
        Button
      </NavLink>
      <NavLink theme={theme} to="/dropdown" $isActive={path === '/dropdown'}>
        Dropdown
      </NavLink>
    </Sidebar>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Global
        styles={css`
          html,
          body {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }

          button,
          input,
          textarea,
          select {
            -webkit-font-smoothing: antialiased;
            -moz-osx-font-smoothing: grayscale;
            text-rendering: optimizeLegibility;
          }
        `}
      />
      <Layout>
        {/* 왼쪽 메뉴 영역 */}
        <SidebarContent />

        {/* 오른쪽 컨텐츠 영역 */}
        <Main>
          <Routes>
            <Route path="/" element={<TextTest />} />
            <Route path="/select" element={<SelectTest />} />
            <Route path="/input" element={<InputTextFieldTest />} />
            <Route path="/button" element={<ButtonTest />} />
            {/* Added a placeholder route for dropdown if user wants one, or just redirect */}
            <Route path="/dropdown" element={<DropdownTest />} />
          </Routes>
        </Main>
      </Layout>
    </BrowserRouter>
  );
}

export default App;