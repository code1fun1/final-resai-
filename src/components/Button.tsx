import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type ButtonType = {
  className?: string;
  tailingIcon?: React.ReactNode;
  text?: string;
  leadingIcon?: React.ReactNode;
  showTailingIcon?: boolean;
  showLeadingIcon?: boolean;
  tailingIcon1?: React.ReactNode;

  /** Variant props */
  iconOnly?: boolean | string;
  size?: string;
  state?: string;
  type?: string;

  /** Style props */
  buttonFontFamily?: CSSProperties["fontFamily"];
  buttonColor?: CSSProperties["color"];
};

const getButtonStyle = (styleKey: string) => {
  switch (styleKey) {
    case "false-lg-Active-Outline":
      return "!bg-transparent border-color-dark-500 border-solid border-[1.5px] active:border-color active:border-solid active:border-[1px] active:bg-[unset] active:shrink-0";
    default:
      return "[border:none] bg-color";
  }
};
const getUserIconStyle = (styleKey: string) => {
  switch (styleKey) {
    case "false-lg-Active-Outline":
      return "group-active:[flex-shrink:unset] group-active:hidden";
  }
};
const getButtonTextStyle = (styleKey: string) => {
  switch (styleKey) {
    case "false-lg-Active-Outline":
      return "group-active:[flex-shrink:unset]";
  }
};
const getDirectionRight01IconStyle = (styleKey: string) => {
  switch (styleKey) {
    case "false-lg-Active-Outline":
      return "group-active:[filter:brightness(0)_saturate(100%)_invert(4%)_sepia(6%)_saturate(6615%)_hue-rotate(204deg)_brightness(81%)_contrast(102%)] group-active:[flex-shrink:unset] group-active:hidden";
  }
};

const Button: FunctionComponent<ButtonType> = ({
  className = "",
  iconOnly = false,
  size = "2xs",
  state = "Active",
  type = "Fill",
  tailingIcon,
  text = "Signup",
  leadingIcon,
  showTailingIcon = false,
  showLeadingIcon = false,
  buttonFontFamily,
  buttonColor,
  tailingIcon1,
}) => {
  const variantKey = [iconOnly, size, state, type].join("-");

  const buttonStyle: CSSProperties = useMemo(() => {
    return {
      fontFamily: buttonFontFamily,
      color: buttonColor,
    };
  }, [buttonFontFamily, buttonColor]);

  return (
    <button
      className={`cursor-pointer py-other-gap-7 px-other-gap-13 rounded-other-radius-full-corner flex flex-col items-start group ${getButtonStyle(
        variantKey
      )} ${className}`}
    >
      <div className="flex items-center gap-other-gap-5">
        {leadingIcon}
        <div
          className={`relative text-lg tracking-[-0.02em] leading-[150%] font-medium font-[Roboto] text-color-dark-500 text-center shrink-0 ${getButtonTextStyle(
            variantKey
          )}`}
          style={buttonStyle}
        >
          {text}
        </div>
        {tailingIcon1}
      </div>
    </button>
  );
};

export default Button;
