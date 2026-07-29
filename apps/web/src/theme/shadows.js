// apps/web/src/theme/shadows.js

/**
 * ============================================================
 * JYLIX SHADOW SYSTEM
 * ============================================================
 * Centralized shadow definitions for the entire project.
 * Use these shadow presets instead of hardcoding box-shadow values.
 */

export const Shadows = {
  none: "none",

  sm: "0 1px 2px rgba(0, 0, 0, 0.08)",

  md: "0 4px 8px rgba(0, 0, 0, 0.12)",

  lg: "0 8px 16px rgba(0, 0, 0, 0.16)",

  xl: "0 12px 24px rgba(0, 0, 0, 0.20)",

  // ------------------------------------------------------------
  // Component Shadows
  // ------------------------------------------------------------
  component: {
    card: "0 4px 8px rgba(0, 0, 0, 0.12)",

    button: "0 2px 6px rgba(0, 0, 0, 0.10)",

    dropdown: "0 8px 24px rgba(0, 0, 0, 0.18)",

    modal: "0 16px 40px rgba(0, 0, 0, 0.25)",

    floating: "0 12px 32px rgba(0, 0, 0, 0.22)",
  },
};

export default Shadows;