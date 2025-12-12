/** @jsxImportSource @emotion/react */
import { BrowserRouter, Routes, Route, Link } from 'react-router-dom';
import styled from '@emotion/styled';
import { useTheme } from '@emotion/react';

// 1. 방금 만든 페이지 컴포넌트들 가져오기
import SelectTest from './SelectTest';
import TextTest from './TextTest';

// 2. 네비게이션 바 스타일링
const Nav = styled.nav`
  padding: 0 20px;
  height: 60px;
  /* 테마 색상이 로드되지 않았을 때를 대비한 안전한 기본값 설정 */
  background-color: ${({ theme }) => theme.colors?.coolgray?.[50] || '#f5f6f7'};
  border-bottom: 1px solid ${({ theme }) => theme.colors?.coolgray?.[200] || '#e2e5e8'};
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: 40px;
`;

// 3. 링크 버튼 스타일링
const NavLink = styled(Link)`
  text-decoration: none;
  font-size: 15px;
  font-weight: 600;
  color: ${({ theme }) => theme.colors?.coolgray?.[600] || '#666'};
  padding: 8px 16px;
  border-radius: 6px;
  transition: all 0.2s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors?.coolgray?.[200] || '#dde1e6'};
    color: ${({ theme }) => theme.colors?.coolgray?.[900] || '#111'};
  }
`;

function App() {
  // 컴포넌트 안에서 theme을 사용하기 위해 호출 (혹시 모를 에러 방지용)
  const theme = useTheme();

  return (
    <BrowserRouter>
      {/* 상단 고정 메뉴바 */}
      <Nav>
        <NavLink to="/">🏠 Select 테스트</NavLink>
        <NavLink to="/text">📝 Text 테스트</NavLink>
      </Nav>

      {/* URL에 따라 내용이 바뀌는 영역 */}
      <div style={{ padding: '0 20px' }}>
        <Routes>
          {/* 기본 경로(/)는 SelectTest를 보여줌 */}
          <Route path="/" element={<SelectTest />} />
          
          {/* /text 경로는 TextTest를 보여줌 */}
          <Route path="/text" element={<TextTest />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;