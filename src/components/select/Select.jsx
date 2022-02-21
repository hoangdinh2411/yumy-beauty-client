import React, { useState } from "react";
import { getFieldError } from "utils/services";
import styles from "./select.module.css";
function Select({
  value,
  handleChange,
  wasSubmitted,
  options,
  defaultValue,
  showErrorMessage,
  title,
  sx,
}) {
  const [touched, setTouched] = useState(false);
  const errorMessage = value === "" ? "Please choose a category" : null;
  const displayErrorMessage = (wasSubmitted || touched) && errorMessage;
  return (
    <div style={sx} key={title}>
      {showErrorMessage ? (
        <p className={styles.title}>
          {title}{" "}
          {displayErrorMessage ? (
            <span className={styles.error}>{`(* ${errorMessage})`}</span>
          ) : null}
        </p>
      ) : null}
      <select
        value={value}
        onChange={(e) => handleChange(e)}
        onBlur={() => setTouched(true)}
      >
        <option value="All" className={styles.default}>
          {defaultValue}
        </option>
        {options.length > 0
          ? options.map((option) => {
              return (
                <option key={option._id} value={option._id}>
                  {option.name || option.fullName}
                </option>
              );
            })
          : null}
      </select>
    </div>
  );
}

export default React.memo(Select);
