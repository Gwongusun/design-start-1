// 1. Emotion의 타입을 확장하기 위해 import가 필요합니다.
import '@emotion/react'; 
import { typo } from './typography';

export const colors = {
  // 1. Base Colors (기본)
  white: '#FFFFFF',
  black: '#000000',

  // 2. Grayscale (Coolgray)
  coolgray: {
    50: '#F5F6F7',
    75: '#ECEEF0',
    100: '#E2E5E8',
    150: '#D0D5DA',
    200: '#B8BFC6',
    250: '#A0A8B0',
    300: '#848B93',
    400: '#676E74',
    500: '#52585E',
    600: '#44494E',
    700: '#32363B',
    800: '#222529',
    900: '#111214',
  },

  // 3. Brand & Palette Colors (기존 코드 그대로 유지)
  red: {
    50: '#FFF5F5', 100: '#FFE3E3', 150: '#FFC9C9', 200: '#FFA8A8', 250: '#FF8787',
    300: '#FF6B6B', 400: '#FA5252', 500: '#F03E3E', 600: '#E03131', 700: '#C92A2A',
    800: '#A12222', 900: '#840606',
  },
  pink: {
    50: '#FFF0F6', 100: '#FFDEEB', 150: '#FCC2D7', 200: '#FAA2C1', 250: '#F783AC',
    300: '#F06595', 400: '#E64980', 500: '#D6336C', 600: '#C2255C', 700: '#A61E4D',
    800: '#85183E', 900: '#660A29',
  },
  grape: {
    50: '#F8F0FC', 100: '#F3D9FA', 150: '#EEBEFA', 200: '#E599F7', 250: '#DA77F2',
    300: '#CC5DE8', 400: '#BE4BDB', 500: '#AE3EC9', 600: '#9C36B5', 700: '#862E9C',
    800: '#6B257D', 900: '#521363',
  },
  violet: {
    50: '#F3F0FF', 100: '#E5DBFF', 150: '#D0BFFF', 200: '#B197FC', 250: '#9775FA',
    300: '#845EF7', 400: '#7950F2', 500: '#7048E8', 600: '#6741D9', 700: '#5D3AC4',
    800: '#4C2DA6', 900: '#3A257B',
  },
  indigo: {
    50: '#EDF2FF', 100: '#DBE4FF', 150: '#BAC8FF', 200: '#91A7FF', 250: '#748FFC',
    300: '#5C7CFA', 400: '#4C6EF5', 500: '#4263EB', 600: '#3B5BDB', 700: '#364FC7',
    800: '#2B3F9F', 900: '#202F77',
  },
  blue: {
    50: '#E7F5FF', 100: '#D5EDFF', 150: '#A5D8FF', 200: '#74C0FC', 250: '#4DABF7',
    300: '#339AF0', 400: '#228BE6', 500: '#1C7ED6', 600: '#1971C2', 700: '#1864AB',
    800: '#135089', 900: '#0E3C67',
  },
  cyan: {
    50: '#E3FAFC', 100: '#CFF6F9', 150: '#99E9F2', 200: '#66D9E8', 250: '#3BC9DB',
    300: '#22B8CF', 400: '#15AABF', 500: '#1098AD', 600: '#0C8599', 700: '#0B7285',
    800: '#095B6A', 900: '#074450',
  },
  teal: {
    50: '#E6FCF5', 100: '#CDFAEB', 150: '#96F2D7', 200: '#77E9C6', 250: '#38D9A9',
    300: '#20C997', 400: '#12B886', 500: '#0CA678', 600: '#099268', 700: '#087F5B',
    800: '#066649', 900: '#054C37',
  },
  green: {
    50: '#EBFBEE', 100: '#D3F9D8', 150: '#B2F2BB', 200: '#8CE99A', 250: '#69DB7C',
    300: '#51CF66', 400: '#40C057', 500: '#37B24D', 600: '#2F9E44', 700: '#2B8A3E',
    800: '#226E32', 900: '#1A5325',
  },
  lime: {
    50: '#F4FCE3', 100: '#E9FAC8', 150: '#D8F5A2', 200: '#C0EB75', 250: '#A9E34B',
    300: '#94D82D', 400: '#82C91E', 500: '#74B816', 600: '#66A80F', 700: '#5C940D',
    800: '#4A760A', 900: '#375908',
  },
  yellow: {
    50: '#FFF9DB', 100: '#FFF3BF', 150: '#FFEC99', 200: '#FFE066', 250: '#FFD43B',
    300: '#FCC419', 400: '#EFB609', 500: '#E1A201', 600: '#D78E00', 700: '#CE7C00',
    800: '#B06A01', 900: '#885203',
  },
  orange: {
    50: '#FFF4E6', 100: '#FFE8CC', 150: '#FFD8A8', 200: '#FFC078', 250: '#FFA94D',
    300: '#FF922B', 400: '#FD7E14', 500: '#F76707', 600: '#E8590C', 700: '#D9480F',
    800: '#AE3A0C', 900: '#832A08',
  },
};

// 🔥 [NEW] 컴포넌트 전용 시맨틱 토큰 추가
// colors 객체의 값을 '참조'하여 의미를 부여합니다.
const components = {
  // 1. Input & Select 공통 토큰
  input: {
    light: {
      bg: { default: colors.coolgray[50], hover: colors.coolgray[75], active: colors.white, disabled: colors.coolgray[75] },
      border: { default: 'transparent', hover: colors.coolgray[200], active: colors.coolgray[200] },
      text: { default: colors.coolgray[900], placeholder: colors.coolgray[400], disabled: colors.coolgray[300] },
      label: { default: colors.coolgray[800], disabled: colors.coolgray[250] },
      icon: { default: colors.coolgray[300], active: colors.coolgray[900], disabled: colors.coolgray[200] },
    },
    dark: {
      // 투명도(Alpha) 값은 팔레트에 없으므로 Hex Alpha 코드 직접 사용
      bg: { default: `${colors.white}14`, hover: `${colors.white}1f`, active: `${colors.white}00`, disabled: `${colors.white}14` },
      border: { default: 'transparent', hover: colors.coolgray[600], active: colors.coolgray[700] },
      text: { default: colors.white, placeholder: colors.coolgray[200], disabled: colors.coolgray[400] },
      label: { default: colors.coolgray[300], disabled: colors.coolgray[500] },
      icon: { default: colors.coolgray[400], active: colors.white, disabled: colors.coolgray[600] },
    },
    transparent: {
      bg: { default: 'transparent', hover: `${colors.black}0A`, active: `${colors.black}0A`, disabled: 'transparent' },
      border: { default: 'transparent', hover: 'transparent', active: 'transparent' },
      text: { default: colors.coolgray[900], placeholder: colors.coolgray[400], disabled: colors.coolgray[200] },
      label: { default: colors.coolgray[800], disabled: colors.coolgray[250] },
      icon: { default: colors.coolgray[300], active: colors.coolgray[900], disabled: colors.coolgray[200] },
    },
  },
  
  // 2. Button 토큰 (Colors 팔레트의 50, 500, 600번대를 활용)
  button: {
    gray: { 
      main: colors.coolgray[600], 
      sub: colors.coolgray[75], 
      contrast: colors.white, 
      hover: colors.coolgray[700] 
    },
    blue: { 
      main: colors.blue[500], 
      sub: colors.blue[50], 
      contrast: colors.white, 
      hover: colors.blue[600] 
    },
    green: { 
      main: colors.green[500], 
      sub: colors.green[50], 
      contrast: colors.white, 
      hover: colors.green[600] 
    },
    red: { 
      main: colors.red[500], 
      sub: colors.red[50], 
      contrast: colors.white, 
      hover: colors.red[600] 
    },
  }
};

// 테마 객체 생성
export const theme = {
  colors,
  typo, 
  components, // 🔥 추가됨
};

// 사용자 정의 테마 타입 추출
export type ThemeType = typeof theme;

// Emotion의 기본 Theme 인터페이스를 우리가 만든 ThemeType 구조로 덮어씌웁니다.
declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}