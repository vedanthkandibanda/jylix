// apps/web/src/theme/radius.js

/**
 * ============================================================
 * JYLIX BORDER RADIUS SYSTEM
 * ============================================================
 * Centralized border radius values for the entire project.
 * Use these values instead of hardcoding border-radius.
 */

export const Radius = {
  // Base Radius Scale
  none: "0px",
  xs: "4px",
  sm: "8px",
  md: "12px",
  lg: "16px",
  xl: "24px",
  xxl: "32px",
  full: "9999px",

  // Component Radius
  component: {
    button: "12px",
    input: "12px",
    card: "16px",
    modal: "24px",
    badge: "9999px",
    avatar: "9999px",
  },
};

export default Radius;