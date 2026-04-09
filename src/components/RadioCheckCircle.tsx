import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type RadioCheckCircleType = {
  className?: string;
  elements?: string;

  /** Variant props */
  property1?: string;

  /** Style props */
  radioCheckCircle01Height?: CSSProperties["height"];
  radioCheckCircle01Width?: CSSProperties["width"];
};

const getElementsIconStyle = (styleKey: string) => {
  switch (styleKey) {
    case "stroke":
      return "[&]:h-[66.67%] [&]:w-[66.67%] [&]:top-[16.67%] [&]:right-[16.67%] [&]:bottom-[16.67%] [&]:left-[16.67%] [&]:[object-fit:unset]";
  }
};

const RadioCheckCircle: FunctionComponent<RadioCheckCircleType> = ({
  className = "",
  property1 = "thin",
  radioCheckCircle01Height,
  radioCheckCircle01Width,
  elements,
}) => {
  const variantKey = `${property1}`;

  const radioCheckCircle01Style: CSSProperties = useMemo(() => {
    return {
      height: radioCheckCircle01Height,
      width: radioCheckCircle01Width,
    };
  }, [radioCheckCircle01Height, radioCheckCircle01Width]);

  return (
    <div
      className={`h-6 w-6 relative overflow-hidden shrink-0 ${className}`}
      style={radioCheckCircle01Style}
    >
      <img
        className={`absolute h-[72.92%] w-[72.92%] top-[13.75%] right-[13.33%] bottom-[13.33%] left-[13.75%] max-w-full overflow-hidden max-h-full object-cover ${getElementsIconStyle(
          variantKey
        )}`}
        alt=""
        src={elements}
      />
    </div>
  );
};

export default RadioCheckCircle;
