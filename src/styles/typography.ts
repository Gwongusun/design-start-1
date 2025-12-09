/* src/styles/typography.ts */
import { css } from '@emotion/react';

// typography.css에 정의한 변수명과 1:1로 매칭해서 만듭니다.
export const typo = {
  // 1. Display (큰 제목)
  displayLarge: css`
    font-size: var(--font-display-large-size);
    font-weight: var(--font-display-large-weight);
    line-height: var(--font-display-large-height);
    letter-spacing: var(--font-display-large-spacing);
  `,
  displayMedium: css`
    font-size: var(--font-display-medium-size);
    font-weight: var(--font-display-medium-weight);
    line-height: var(--font-display-medium-height);
    letter-spacing: var(--font-display-medium-spacing);
  `,

  // 2. Heading (중간 제목)
  h1: css`
    font-size: var(--font-h1-size);
    font-weight: var(--font-h1-weight);
    line-height: var(--font-h1-height);
  `,
  h2: css`
    font-size: var(--font-h2-size);
    font-weight: var(--font-h2-weight);
    line-height: var(--font-h2-height);
  `,

  // 3. Body (본문)
  bodyLarge: css`
    font-size: var(--font-body-large-size);
    font-weight: var(--font-body-large-weight);
    line-height: var(--font-body-large-height);
  `,
  bodyMedium: css`
    font-size: var(--font-body-medium-size);
    font-weight: var(--font-body-medium-weight);
    line-height: var(--font-body-medium-height);
  `,

  // 4. Label & Caption
  label: css`
    font-size: var(--font-label-size);
    font-weight: var(--font-label-weight);
    line-height: var(--font-label-height);
  `,
  caption: css`
    font-size: var(--font-caption-size);
    font-weight: var(--font-caption-weight);
    line-height: var(--font-caption-height);
    color: var(--font-caption-color); /* 색상까지 포함 가능 */
  `,
};