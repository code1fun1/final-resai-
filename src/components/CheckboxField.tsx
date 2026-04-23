import { FunctionComponent } from "react";
import styles from "./CheckboxField.module.css";

export type CheckboxFieldType = {
  className?: string;
  label?: string;
  description?: string;
  hasDescription?: boolean;

  /** Variant props */
  state?: string;
  valueType?: string;
};

const CheckboxField: FunctionComponent<CheckboxFieldType> = ({
  className = "",
  state = "Default",
  valueType = "Checked",
  label = "Keep me signed in",
  description = "Description",
  hasDescription = false,
}) => {
  return (
    <div
      className={[styles.checkboxField, className].join(" ")}
      data-state={state}
      data-valueType={valueType}
    >
      <div className={styles.checkboxAndLabel}>
        <input className={styles.checkbox} type="checkbox" />
        <div className={styles.label}>{label}</div>
      </div>
      {!!hasDescription && (
        <div className={styles.descriptionRow}>
          <div className={styles.space} />
          <div className={styles.description}>{description}</div>
        </div>
      )}
    </div>
  );
};

export default CheckboxField;
