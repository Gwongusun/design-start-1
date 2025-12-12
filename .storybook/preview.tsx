import type { Preview } from '@storybook/react';
import React from 'react';

// 1. Emotion의 ThemeProvider와 작성하신 theme 객체 가져오기
import { ThemeProvider, Global, css } from '@emotion/react';
import { theme } from '../src/styles/theme'; // 경로가 맞는지 확인해주세요

// 2. 폰트 등 CSS 변수 파일 가져오기
import '../src/styles/typography.css'; 

// 3. (선택) 스토리북 자체의 기본 폰트 설정
const GlobalStyles = css`
  body {
    font-family: var(--font-family-base);
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
  * {
    box-sizing: border-box;
  }
`;

const preview: Preview = {
  parameters: {
    // Select가 열릴 때 잘리지 않도록 넉넉한 여백을 줍니다.
    layout: 'padded', 
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // ⭐️ 핵심: 모든 스토리에 ThemeProvider를 감싸줍니다.
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} />
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;