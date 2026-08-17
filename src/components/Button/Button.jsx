import styles from "./Button.module.css";

function Button({ children, type = "button", onClick, variant = "primary" }) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      type={type}
      onClick={onClick}
    >
      {children}
    </button>
  );
}

export default Button;
