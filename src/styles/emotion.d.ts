import '@emotion/react';
import { theme } from './theme'; // 👈 같은 폴더니까 './theme'가 맞습니다.

type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}