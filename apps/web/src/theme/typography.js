// apps/web/src/theme/typography.js

/**
 * ============================================================
 * JYLIX TYPOGRAPHY SYSTEM
 * ============================================================
 * Centralized typography configuration for the entire project.
 * Use these values instead of hardcoding font sizes, weights,
 * or line heights inside components.
 */

export const Typography = {
  // ------------------------------------------------------------
  // Font Family
  // ------------------------------------------------------------
  fontFamily: {
    primary: "'Inter', sans-serif",
  },

  // ------------------------------------------------------------
  // Font Size
  // ------------------------------------------------------------
  fontSize: {
    xs: "12px",
    sm: "14px",
    md: "16px",
    lg: "18px",
    xl: "20px",
    xxl: "24px",
    displaySm: "32px",
    displayMd: "40px",
    displayLg: "48px",
    displayXl: "64px",
  },

  // ------------------------------------------------------------
  // Font Weight
  // ------------------------------------------------------------
  fontWeight: {
    regular: 400,
    medium: 500,
    semibold: 600,
    bold: 700,
    extrabold: 800,
  },

  // ------------------------------------------------------------
  // Line Height
  // ------------------------------------------------------------
  lineHeight: {
    tight: 1.2,
    normal: 1.5,
    relaxed: 1.7,
  },

  // ------------------------------------------------------------
  // Letter Spacing
  // ------------------------------------------------------------
  letterSpacing: {
    tight: "-0.02em",
    normal: "0",
    wide: "0.02em",
  },
};

export default Typography;