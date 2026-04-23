import { FunctionComponent, useMemo, type CSSProperties } from "react";
import styles from "./Input1.module.css";

export type Input1Type = {
  className?: string;
  iconRight?: React.ReactNode;
  iconLeft?: React.ReactNode;
  withLabel?: boolean;
  showIconRight?: boolean;
  showIconLeft?: boolean;
  hintText?: boolean;
  placeholder?: boolean;
  label?: string;
  placeholder1?: string;
  iconRight1?: React.ReactNode;

  /** Variant props */
  size?: string;
  state?: string;
  type?: string;

  /** Style props */
  inputAlignSelf?: CSSProperties["alignSelf"];
  inputWidth?: CSSProperties["width"];
};

const Input1: FunctionComponent<Input1Type> = ({
  className = "",
  size = "Normal",
  state = "Normal",
  type = "Text",
  iconRight,
  iconLeft,
  withLabel = true,
  showIconRight = false,
  showIconLeft = false,
  hintText = false,
  placeholder = true,
  inputAlignSelf,
  inputWidth,
  label,
  placeholder1,
  iconRight1,
}) => {
  const inputStyle: CSSProperties = useMemo(() => {
    return {
      alignSelf: inputAlignSelf,
      width: inputWidth,
    };
  }, [inputAlignSelf, inputWidth]);

  return (
    <div
      className={[styles.input, className].join(" ")}
      data-size={size}
      data-state={state}
      data-type={type}
      style={inputStyle}
    >
      {!!withLabel && <div className={styles.label}>{label}</div>}
      <div className={styles.content}>
        <div className={styles.input2}>
          {iconLeft}
          {!!placeholder && (
            <input
              className={styles.placeholder}
              placeholder={placeholder1}
              type="text"
            />
          )}
          {showIconRight && iconRight1}
        </div>
        {!!hintText && (
          <div className={styles.thisIsA}>
            This is a hint text to help user.
          </div>
        )}
      </div>
    </div>
  );
};

export default Input1;
