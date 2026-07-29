// apps/web/src/components/common/Section/Section.jsx

import styles from "./Section.module.css";

const Section = ({
  as: Component = "section",
  children,
  className = "",
}) => {
  return (
    <Component className={`${styles.section} ${className}`.trim()}>
      {children}
    </Component>
  );
};

export default Section;