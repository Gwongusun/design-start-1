import '@emotion/react'; 
import { typo } from './typography'; 

// 1. Primitive Tokens
export const colors = {
  white: '#FFFFFF',
  black: '#000000',
  coolgray: {
    50: '#F4F6F9', 75: '#ECEEF0', 100: '#E2E5E8', 150: '#D0D5DA', 200: '#B8BFC6',
    250: '#A0A8B0', 300: '#848B93', 400: '#676E74', 500: '#52585E', 600: '#44494E',
    700: '#32363B', 800: '#222529', 900: '#111214',
  },
  red: {
    50: '#FFF4F4', 100: '#FFE3E3', 150: '#FFC9C9', 200: '#FFA8A8', 250: '#FF8787',
    300: '#F96868', 400: '#EF4F4F', 500: '#DB3434', 600: '#D62525', 700: '#C12020',
    800: '#A12222', 900: '#840606',
  },
  indigo: {
    50: '#F2F5FF', 100: '#DBE4FF', 150: '#BECAFB', 200: '#91A7FF', 250: '#7F98FF',
    300: '#6786FF', 400: '#4C6EF5', 500: '#4263EB', 600: '#3B5BDB', 700: '#364FC7',
    800: '#2B3F9F', 900: '#202F77',
  },
  blue: {
    50: '#E7F5FF', 100: '#D5EDFF', 150: '#A5D8FF', 200: '#74C0FC', 250: '#4DABF7',
    300: '#339AF0', 400: '#228BE6', 500: '#1C7ED6', 600: '#1971C2', 700: '#1864AB',
    800: '#135089', 900: '#0E3C67',
  },
  green: {
    50: '#E9F9EC', 100: '#D3F9D8', 150: '#99DFA3', 200: '#6BD47B', 250: '#4EC662',
    300: '#3ABD50', 400: '#2FA644', 500: '#229A37', 600: '#198A2E', 700: '#1C8330',
    800: '#226E32', 900: '#1A5325',
  },
};


// 2. Semantic Tokens
const components = {
  input: {
    light: {
      bg: { default: colors.coolgray[50], hover: colors.coolgray[75], active: colors.white, disabled: colors.coolgray[75] },
      border: { default: 'transparent', hover: colors.coolgray[200], active: colors.coolgray[200] },
      text: { default: colors.coolgray[900], placeholder: colors.coolgray[400], disabled: colors.coolgray[300] },
      label: { default: colors.coolgray[800], disabled: colors.coolgray[250] },
      icon: { default: colors.coolgray[300], active: colors.coolgray[900], disabled: colors.coolgray[200] },
    },
    dark: {
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
  
  button: {
    light: {
      // (1) Normal State
      filled: {
        gray: { bg: colors.coolgray[700], text: colors.white, border: 'transparent', hover: { bg: colors.coolgray[900], text: colors.white, border: 'transparent' }, active: { bg:  colors.coolgray[700], text: colors.white, border: 'transparent' } },
        indigo: { bg: colors.indigo[400], text: colors.white, border: 'transparent', hover: { bg: colors.indigo[600], text: colors.white, border: 'transparent' }, active: { bg: colors.indigo[700], text: colors.white, border: 'transparent' } },
        green: { bg: colors.green[400], text: colors.white, border: 'transparent', hover: { bg: colors.green[600], text: colors.white, border: 'transparent' }, active: { bg: colors.green[700], text: colors.white, border: 'transparent' } },
        red: { bg: colors.red[400], text: colors.white, border: 'transparent', hover: { bg: colors.red[600], text: colors.white, border: 'transparent' }, active: { bg: colors.red[700], text: colors.white, border: 'transparent' } },
      },
      outlined: {
        gray: { bg: 'transparent', text: colors.coolgray[800], border: colors.coolgray[200], hover: { bg: colors.coolgray[50], text: colors.coolgray[800], border: colors.coolgray[400] }, active: { bg: colors.coolgray[100], text: colors.coolgray[900], border: colors.coolgray[600] } },
        indigo: { bg: 'transparent', text: colors.indigo[400], border: colors.indigo[150], hover: { bg: colors.indigo[50], text: colors.indigo[500], border: colors.indigo[400] }, active: { bg: colors.indigo[100], text: colors.indigo[600], border: colors.indigo[600] } },
        green: { bg: 'transparent', text: colors.green[400], border: colors.green[150], hover: { bg: colors.green[50], text: colors.green[500], border: colors.green[400] }, active: { bg: colors.green[100], text: colors.green[600], border: colors.green[700] } },
        red: { bg: 'transparent', text: colors.red[400], border: colors.red[150], hover: { bg: colors.red[50], text: colors.red[500], border: colors.red[400] }, active: { bg: colors.red[100], text: colors.red[600], border: colors.red[600] } },
      },
      transparent: {
        gray: { bg: 'transparent', text: colors.coolgray[800], border: 'transparent', hover: { bg: colors.coolgray[50], text: colors.coolgray[800], border: 'transparent' }, active: { bg: colors.coolgray[100], text: colors.coolgray[900], border: 'transparent' } },
        indigo: { bg: 'transparent', text: colors.indigo[400], border: 'transparent', hover: { bg: colors.indigo[50], text: colors.indigo[500], border: 'transparent' }, active: { bg: colors.indigo[100], text: colors.indigo[600], border: 'transparent' } },
        green: { bg: 'transparent', text: colors.green[400], border: 'transparent', hover: { bg: colors.green[50], text: colors.green[500], border: 'transparent' }, active: { bg: colors.green[100], text: colors.green[600], border: 'transparent' } },
        red: { bg: 'transparent', text: colors.red[400], border: 'transparent', hover: { bg: colors.red[50], text: colors.red[500], border: 'transparent' }, active: { bg: colors.red[100], text: colors.red[600], border: 'transparent' } },
      },


      // (2) Disabled State
      disabled: {
        filled: { // key: filled
          gray: { bg: colors.coolgray[50], text: colors.coolgray[150], border: 'transparent' },
          indigo: { bg: colors.coolgray[50], text: colors.coolgray[150], border:'transparent' },
          green: { bg: colors.coolgray[50], text: colors.coolgray[150], border: 'transparent' },
          red: { bg: colors.coolgray[50], text: colors.coolgray[150], border: 'transparent' },
        },
        outlined: {
          gray: { bg: colors.coolgray[50], text: colors.coolgray[150], border: 'transparent' },
          indigo: { bg: colors.coolgray[50], text: colors.coolgray[150], border:'transparent' },
          green: { bg: colors.coolgray[50], text: colors.coolgray[150], border: 'transparent' },
          red: { bg: colors.coolgray[50], text: colors.coolgray[150], border: 'transparent' },
        },
        transparent: { 
          gray: { bg: colors.coolgray[50], text: colors.coolgray[150], border: 'transparent' },
          indigo: { bg: colors.coolgray[50], text: colors.coolgray[150], border:'transparent' },
          green: { bg: colors.coolgray[50], text: colors.coolgray[150], border: 'transparent' },
          red: { bg: colors.coolgray[50], text: colors.coolgray[150], border: 'transparent' },
        },

      },

      // (3) Loading State
      loading: {
        filled: {
          gray: { bg: colors.coolgray[700], border: 'transparent', text: colors.coolgray[400] },
          indigo: { bg: colors.indigo[400], border: 'transparent', text: colors.indigo[200] },
          green: { bg: colors.green[400], border: 'transparent', text: colors.green[200] },
          red: { bg: colors.red[400], border: 'transparent', text: colors.red[200] },
        },
        outlined: {
          gray: { bg: 'transparent', border: colors.coolgray[200], text: colors.coolgray[300] },
          indigo: { bg: 'transparent', border: colors.indigo[200], text: colors.indigo[300] },
          green: { bg: 'transparent', border: colors.green[200], text: colors.green[300] },
          red: { bg: 'transparent', border: colors.red[200], text: colors.red[300] },
        },
        transparent: {
          gray: { bg: colors.coolgray[50], border: 'transparent', text: colors.coolgray[400] },
          indigo: { bg: colors.indigo[50], border: 'transparent', text: colors.indigo[300] },
          green: { bg: colors.green[50], border: 'transparent', text: colors.green[300] },
          red: { bg: colors.red[50], border: 'transparent', text: colors.red[300] },
        },

      },
      
      // Text fallback (Optional)
      text: {
        gray: { default: colors.coolgray[900] },
        indigo: { default: colors.white },
        green: { default: colors.white },
        red: { default: colors.white },
      },
    },
  },
};

export const theme = {
  colors,
  typo, 
  components,
};

export type ThemeType = typeof theme;

declare module '@emotion/react' {
  export interface Theme extends ThemeType {}
}