import styles from "@/styles/buttons/buttons.module.css";


function ContainedButton({ children, onClick = () => { }, color = "black", backgroundColor = "lightgray", disabled = false }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={styles.contained}
      style={{
        color: color,
        backgroundColor: backgroundColor,
      }}
    >
      {children}
    </button>
  )
}

function Button({ children, variant, className, ...props }) {
  const buttonClass = variant === "outline" ? styles.buttonOutline : styles.buttonPrimary;
  
  return (
    <button className={`${styles.button} ${buttonClass}`  } {...props}>
      {children}
    </button>
  );
}

export { ContainedButton, Button }