import { FunctionComponent } from "react";
import styles from "./Divider.module.css";

export type DividerType = {
  className?: string;
};

const Divider: FunctionComponent<DividerType> = ({ className = "" }) => {
  return (
    <div className={[styles.divider, className].join(" ")}>
      <div className={styles.divider2} />
      <div className={styles.or}>OR</div>
      <div className={styles.divider2} />
    </div>
  );
};

export default Divider;
