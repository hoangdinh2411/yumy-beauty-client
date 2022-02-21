import styles from "./button.module.css";
function Button({ type,children,handleClick ,disable,sx }) {
  return <button disabled={disable} style={sx} className={styles.button} type={type} onClick={handleClick}>{children}</button>;
}

export default Button;
