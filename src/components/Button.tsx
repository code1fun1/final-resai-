import { FunctionComponent } from "react";
import styles from "./Button.module.css";

export type ButtonType = {
  className?: string;
  tailingIcon?: React.ReactNode;
  text?: string;
  leadingIcon?: React.ReactNode;
  showTailingIcon?: boolean;
  showLeadingIcon?: boolean;
  tailingIcon1?: React.ReactNode;

  /** Variant props */
  iconOnly?: boolean;
  size?: string;
  state?: string;
  type?: string;
};

const Button: FunctionComponent<ButtonType> = ({
  className = "",
  iconOnly = false,
  size = "2xs",
  state = "Active",
  type = "Fill",
  tailingIcon,
  text = "Continue",
  leadingIcon,
  showTailingIcon = false,
  showLeadingIcon = false,
  tailingIcon1,
}) => {
  return (
    <button
      className={[styles.button, className].join(" ")}
      type="submit"
      data-iconOnly={iconOnly}
      data-size={size}
      data-state={state}
      data-type={type}
    >
      <div className={styles.buttonWrapper}>
        {showLeadingIcon && leadingIcon}
        <div className={styles.button2}>{text}</div>
        {showTailingIcon && tailingIcon1}
      </div>
    </button>
  );
};

export default Button;
