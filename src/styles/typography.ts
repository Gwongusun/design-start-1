import { css } from '@emotion/react';

export const typo = {
  displayLarge: css`
    font-family: var(--font-family-base);
    font-size: var(--font-display-large-size);
    font-weight: var(--font-display-large-weight);
    line-height: var(--font-display-large-height);
    letter-spacing: var(--font-display-large-spacing);
  `,
  displayMedium: css`
    font-family: var(--font-family-base);
    font-size: var(--font-display-medium-size);
    font-weight: var(--font-display-medium-weight);
    line-height: var(--font-display-medium-height);
    letter-spacing: var(--font-display-medium-spacing);
  `,
  h1: css`
    font-family: var(--font-family-base);
    font-size: var(--font-h1-size);
    font-weight: var(--font-h1-weight);
    line-height: var(--font-h1-height);
  `,
  h2: css`
    font-family: var(--font-family-base);
    font-size: var(--font-h2-size);
    font-weight: var(--font-h2-weight);
    line-height: var(--font-h2-height);
  `,
  bodyLarge: css`
    font-family: var(--font-family-base);
    font-size: var(--font-body-large-size);
    font-weight: var(--font-body-large-weight);
    line-height: var(--font-body-large-height);
  `,
  bodyMedium: css`
    font-family: var(--font-family-base);
    font-size: var(--font-body-medium-size);
    font-weight: var(--font-body-medium-weight);
    line-height: var(--font-body-medium-height);
  `,
  label: css`
    font-family: var(--font-family-base);
    font-size: var(--font-label-size);
    font-weight: var(--font-label-weight);
    line-height: var(--font-label-height);
  `,
  caption: css`
    font-family: var(--font-family-base);
    font-size: var(--font-caption-size);
    font-weight: var(--font-caption-weight);
    line-height: var(--font-caption-height);
  `,
};