import { FunctionComponent } from "react";

export type QuestionHelpCircleType = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const QuestionHelpCircle: FunctionComponent<QuestionHelpCircleType> = ({
  className = "",
  property1 = "thin",
}) => {
  return (
    <div
      className={`w-[42px] h-[42px] relative overflow-hidden shrink-0 ${className}`}
    >
      <img
        className="absolute h-[62.62%] w-[62.62%] top-[18.81%] right-[18.57%] bottom-[18.57%] left-[18.81%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/elements5.svg"
      />
    </div>
  );
};

export default QuestionHelpCircle;
