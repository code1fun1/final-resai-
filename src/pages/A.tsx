import { FunctionComponent } from "react";
import Footer from "../components/Footer";
import FrameComponent from "../components/FrameComponent";
import styles from "./A.module.css";

const A: FunctionComponent = () => {
  return (
    <div className={styles.a}>
      <Footer />
      <section className={styles.aInner}>
        <div className={styles.frameParent}>
          <FrameComponent />
          <div className={styles.bySigningUpYouAgreeToOuWrapper}>
            <div className={styles.bySigningUpContainer}>
              <span>{`By signing up, you agree to our `}</span>
              <span
                className={styles.termsConditions}
              >{`Terms & Conditions`}</span>
              <span>{` and `}</span>
              <span className={styles.termsConditions}>Privacy Policy.</span>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default A;
