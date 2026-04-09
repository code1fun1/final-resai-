import { FunctionComponent } from "react";

export type BriefcaseJobType = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const BriefcaseJob: FunctionComponent<BriefcaseJobType> = ({
  className = "",
  property1 = "thin",
}) => {
  return (
    <div
      className={`w-[42px] h-[42px] relative overflow-hidden shrink-0 ${className}`}
    >
      <img
        className="absolute h-[62.38%] w-[66.67%] top-[20.95%] right-[16.67%] bottom-[16.67%] left-[16.67%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/elements.svg"
      />
    </div>
  );
};

export default BriefcaseJob;
