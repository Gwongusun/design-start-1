import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// 1. Typography CSS 파일 불러오기 (필수!)
import './styles/typography.css'; 

// 2. Emotion ThemeProvider 불러오기
import { ThemeProvider } from '@emotion/react';
import { theme } from './styles/theme';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </React.StrictMode>
);