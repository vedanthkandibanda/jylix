import styles from "./Avatar.module.css";

const Avatar = ({
  src,
  alt = "User Avatar",
  name = "",
  size = "medium",
  status,
  className = "",
}) => {
  const initials = name
    .trim()
    .split(" ")
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase())
    .join("");

  return (
    <div
      className={`${styles.avatar} ${styles[size]} ${className}`.trim()}
    >
      {src ? (
        <img
          src={src}
          alt={alt}
          className={styles.image}
        />
      ) : (
        <span className={styles.initials}>
          {initials || "?"}
        </span>
      )}

      {status && (
        <span
          className={`${styles.status} ${styles[status]}`}
          aria-hidden="true"
        />
      )}
    </div>
  );
};

export default Avatar;