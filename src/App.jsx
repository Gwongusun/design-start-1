// src/App.jsx
import './App.css'
// 우리가 만든 부품들을 가져옵니다
import Button from './components/Button';
import Input from './components/Input';

function App() {
  return (
    <div>
      <h1>My Design System</h1>
      <p>모든 요소가 '컴포넌트'로 바뀌었습니다!</p>
      
      {/* 1. 버튼 컴포넌트 사용 */}
      <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', margin: '30px 0' }}>
        <Button variant="primary">로그인</Button>
        <Button variant="danger">취소</Button>
      </div>

      <hr style={{ opacity: 0.3, margin: '40px 0' }} />

      {/* 2. 입력창 컴포넌트 사용 */}
      <div style={{ maxWidth: '400px', margin: '0 auto', textAlign: 'left' }}>
        
        {/* 예전: <div class="..."><label>이메일</label><input ... /></div> */}
        {/* 지금: 딱 한 줄이면 끝! */}
        <Input 
          label="이메일 주소" 
          type="email" 
          placeholder="user@example.com" 
        />
        
        <Input 
          label="비밀번호" 
          type="password" 
          placeholder="비밀번호를 입력하세요" 
        />

      </div>
    </div>
  )
}

export default App