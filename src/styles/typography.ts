/**
 * 폰트 두께 (Weight)
 */
export type FontWeight = '400' | '500' | '700' | '900';

/**
 * 폰트 크기 (Size)
 */
export type FontSize = 
  | '11' | '12' | '13' | '14' 
  | '16' | '18' | '20' 
  | '24' | '28' | '32' | '36' | '40' 
  | '48' | '56' | '64';

/**
 * 조합형 변형 타입 (Template Literal Types)
 * 이 타입이 export 되어야 Text.tsx에서 import 할 수 있습니다.
 * 예: "400-14", "700-32", "900-64" 등
 */
export type TypographyVariant = `${FontWeight}-${FontSize}`;