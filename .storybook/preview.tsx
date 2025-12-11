import type { Preview } from '@storybook/react';
import React from 'react';

// 1. Emotion의 ThemeProvider와 작성하신 theme 객체 가져오기
import { ThemeProvider, Global, css } from '@emotion/react';
import { theme } from '../src/styles/theme'; // 경로 확인 필요

// 2. CSS 변수가 정의된 CSS 파일 가져오기 (매우 중요!)
import '../src/styles/typography.css'; // 경로 확인 필요

// (선택 사항) 스토리북 내 기본 폰트 적용을 위한 Global Style
const GlobalStyles = css`
  body {
    font-family: var(--font-family-base); /* typography.css에 정의된 변수 사용 */
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }
`;

const preview: Preview = {
  parameters: {
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
  },
  // 3. decorators 설정: 모든 스토리를 ThemeProvider로 감싸기
  decorators: [
    (Story) => (
      <ThemeProvider theme={theme}>
        <Global styles={GlobalStyles} /> {/* body 폰트 적용을 위해 추가 */}
        <Story />
      </ThemeProvider>
    ),
  ],
};

export default preview;