import { forwardRef } from "react";
import styles from "./Input.module.css";

const Input = forwardRef(
  (
    {
      id,
      name,
      type = "text",
      label,
      placeholder = "",
      value,
      onChange,
      onBlur,
      disabled = false,
      required = false,
      readOnly = false,
      autoComplete,
      error = "",
      helperText = "",
      className = "",
      ...props
    },
    ref
  ) => {
    const inputId = id || name;

    return (
      <div className={styles.field}>
        {label && (
          <label
            htmlFor={inputId}
            className={styles.label}
          >
            {label}

            {required && (
              <span className={styles.required}>
                *
              </span>
            )}
          </label>
        )}

        <input
          ref={ref}
          id={inputId}
          name={name}
          type={type}
          value={value}
          placeholder={placeholder}
          disabled={disabled}
          required={required}
          readOnly={readOnly}
          autoComplete={autoComplete}
          onChange={onChange}
          onBlur={onBlur}
          className={`${styles.input} ${
            error ? styles.error : ""
          } ${className}`.trim()}
          aria-invalid={Boolean(error)}
          aria-describedby={
            helperText || error
              ? `${inputId}-description`
              : undefined
          }
          {...props}
        />

        {(helperText || error) && (
          <p
            id={`${inputId}-description`}
            className={
              error
                ? styles.errorText
                : styles.helperText
            }
          >
            {error || helperText}
          </p>
        )}
      </div>
    );
  }
);

Input.displayName = "Input";

export default Input;