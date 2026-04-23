import { FunctionComponent } from "react";
import Input1 from "./Input1";
import CheckboxField from "./CheckboxField";
import Divider from "./Divider";
import styles from "./FrameComponent.module.css";

export type FrameComponentType = {
  className?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
}) => {
  return (
    <form className={[styles.signInHeaderParent, className].join(" ")}>
      <div className={styles.signInHeader}>
        <h1 className={styles.signIn}>{`Sign In `}</h1>
        <h3 className={styles.toReEngineerYour}>
          To re-engineer your career journey
        </h3>
      </div>
      <Input1
        size="Normal"
        state="Normal"
        type="Text"
        iconRight={<img className={styles.plusIcon2} alt="" src="./Plus.svg" />}
        iconLeft={<img className={styles.plusIcon} alt="" src="./Plus.svg" />}
        withLabel
        showIconRight={false}
        showIconLeft={false}
        hintText={false}
        placeholder
        label="Email"
        placeholder1="john@gmail.com"
        iconRight1={
          <img className={styles.plusIcon2} alt="" src="./Plus.svg" />
        }
      />
      <div className={styles.inputParent}>
        <Input1
          size="Normal"
          state="Normal"
          type="Text"
          iconRight={
            <img className={styles.plusIcon} alt="" src="./Plus.svg" />
          }
          iconLeft={null}
          withLabel
          showIconRight={false}
          showIconLeft={false}
          hintText={false}
          placeholder
          inputAlignSelf="unset"
          inputWidth="522px"
          label="Password"
          placeholder1="***"
        />
        <div className={styles.checkboxFieldParent}>
          <CheckboxField
            state="Default"
            valueType="Checked"
            label="Keep me signed in"
            description="Description"
            hasDescription={false}
          />
          <div className={styles.forgotPassword}>Forgot Password?</div>
        </div>
      </div>
      <div className={styles.action}>
        <div className={styles.continueGroup}>
          <span className={styles.continueLabel}>Continue</span>
          <div className={styles.continueArrow}>
            <img
              className={styles.hugeIconarrowsoutlinearrow}
              alt=""
              src="./Huge-icon-arrows-outline-arrow-up.svg"
            />
          </div>
        </div>
      </div>
      <Divider />
      <div className={styles.buttonGroup}>
        <button className={styles.button2} type="submit">
          <img
            className={styles.hugeIconarrowsoutlinearrow}
            alt=""
            src="./Google-Logo.svg"
          />
          <div className={styles.continueWithGoogle}>Continue with google</div>
          <img className={styles.xIcon} alt="" src="./X.svg" />
        </button>
        <div className={styles.button3}>
          <img className={styles.appleLogoIcon} alt="" src="./Apple-Logo.svg" />
          <div className={styles.continueWithApple}>Continue with apple</div>
          <img className={styles.xIcon2} alt="" src="./X.svg" />
        </div>
        <button className={styles.buttonGroup2} type="submit">
          <div className={styles.button4}>
            <img className={styles.xIcon} alt="" src="./Star.svg" />
            <div className={styles.button5}>Button</div>
            <img className={styles.xIcon} alt="" src="./X.svg" />
          </div>
          <div className={styles.button6}>
            <img
              className={styles.hugeIconarrowsoutlinearrow}
              alt=""
              src="./Vector.svg"
            />
            <div className={styles.continueWithGoogle}>
              Continue with LinkedIn
            </div>
            <img className={styles.xIcon} alt="" src="./X.svg" />
          </div>
          <div className={styles.button3}>
            <img
              className={styles.appleLogoIcon}
              alt=""
              src="./Apple-Logo.svg"
            />
            <div className={styles.continueWithApple}>Continue with apple</div>
            <img className={styles.xIcon2} alt="" src="./X.svg" />
          </div>
        </button>
      </div>
      <div className={styles.dontHaveAnContainer}>
        <span className={styles.dontHaveAnAccount}>
          <span className={styles.dontHaveAn}>Don’t have an account?</span>
          <span className={styles.span}>{` `}</span>
        </span>
        <span className={styles.span}>
          <span className={styles.signUp2}>Sign Up</span>
        </span>
      </div>
    </form>
  );
};

export default FrameComponent;
