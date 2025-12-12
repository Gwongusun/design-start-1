export type FontWeight = '400' | '500' | '700' | '900';
export type FontSize = '64' | '56' | '48' | '40' | '36' | '32' | '28' | '24' | '20' | '18' | '16' | '14' | '13' | '12' | '11';
export type TypographyVariant = `${FontWeight}-${FontSize}`;

export const typo = {
  weights: {
    '400': 400,
    '500': 500,
    '700': 700,
    '900': 900,
  },
  sizes: {
    // lineHeight를 계산된 px 문자열로 변경했습니다.
    64: { fontSize: '64px', lineHeight: '76px', letterSpacing: '-0.02em' },
    56: { fontSize: '56px', lineHeight: '67px', letterSpacing: '-0.02em' },
    48: { fontSize: '48px', lineHeight: '60px', letterSpacing: '-0.015em' },
    40: { fontSize: '40px', lineHeight: '50px', letterSpacing: '-0.01em' },
    36: { fontSize: '36px', lineHeight: '47px', letterSpacing: '-0.01em' },
    32: { fontSize: '32px', lineHeight: '42px', letterSpacing: '-0.005em' },
    28: { fontSize: '28px', lineHeight: '38px', letterSpacing: '0' },
    24: { fontSize: '24px', lineHeight: '34px', letterSpacing: '0' },
    20: { fontSize: '20px', lineHeight: '29px', letterSpacing: '0' },
    18: { fontSize: '18px', lineHeight: '27px', letterSpacing: '0' },
    16: { fontSize: '16px', lineHeight: '24px', letterSpacing: '0' },
    14: { fontSize: '14px', lineHeight: '22px', letterSpacing: '0.005em' },
    13: { fontSize: '13px', lineHeight: '21px', letterSpacing: '0.01em' },
    12: { fontSize: '12px', lineHeight: '18px', letterSpacing: '0.01em' },
    11: { fontSize: '11px', lineHeight: '17px', letterSpacing: '0.02em' },
  },
};