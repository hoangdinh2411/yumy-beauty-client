import { useState, useEffect } from "react";
import styles from "./input.module.css";
import { getFieldError } from "utils/services";

function Input({
  icon,
  name,
  type,
  wasSubmitted,
  handleShowPass,
  showErrorMessage,
  placeholder,
  sx,
  title,
  handleChange,
  underline,
  value,
  disabled,
}) {
  const [inputValue, setInputValue] = useState(value);
  const [touched, setTouched] = useState(false);
  const errorMessage = getFieldError(inputValue, title);
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;
  return (
    <>
      {showErrorMessage ? (
        displayErrorMessage ? (
          <span className={styles.error}>{`(* ${errorMessage})`}</span>
        ) : null
      ) : null}
      {!displayErrorMessage && underline ? (
        <p className={styles.line}></p>
      ) : null}
      <div key={name} className={styles.boxes} style={sx}>
        <label htmlFor={`${name}-input`} className={styles.title}>
          {title}
        </label>

        <input
          disabled={disabled}
          value={value ? (handleChange ? value : inputValue) : undefined}
          id={`${name}-input`}
          name={name}
          type={type}
          onChange={(e) =>
            handleChange
              ? handleChange(e)
              : setInputValue(e.currentTarget.value)
          }
          onBlur={type === "search" ? () => {} : (e) => setTouched(true)}
          className={`${styles.input}`}
          required={type === "search" ? false : true}
          placeholder={placeholder}
          aria-describedby={displayErrorMessage ? `${name}-error` : undefined}
        />
        <span
          className={styles.icon}
          onClick={icon ? handleShowPass : () => {}}
        >
          {icon}
        </span>
        {/* Neu co error,  thi hien ra dong thong bao error 
          Neu ko co error , ko co hien thi va co yeu cau underline thi hien thi ra line khi viet xong 
      */}
      </div>
    </>
  );
}

export default Input;
