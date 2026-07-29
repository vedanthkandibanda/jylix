// apps/web/src/components/common/PageWrapper/PageWrapper.jsx

import styles from "./PageWrapper.module.css";

/**
 * ============================================================
 * JYLIX PAGE WRAPPER
 * ============================================================
 * Root wrapper for every page.
 * Provides a consistent page layout structure.
 */

const PageWrapper = ({
  children,
  className = "",
  as: Component = "main",
}) => {
  return (
    <Component className={`${styles.pageWrapper} ${className}`.trim()}>
      {children}
    </Component>
  );
};

export default PageWrapper;