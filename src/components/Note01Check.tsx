import { FunctionComponent } from "react";

export type Note01CheckType = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const Note01Check: FunctionComponent<Note01CheckType> = ({
  className = "",
  property1 = "thin",
}) => {
  return (
    <div
      className={`w-[42px] h-[42px] relative overflow-hidden shrink-0 ${className}`}
    >
      <img
        className="absolute h-[66.67%] w-[58.33%] top-[16.67%] right-[20.71%] bottom-[16.67%] left-[20.95%] max-w-full overflow-hidden max-h-full"
        loading="lazy"
        alt=""
        src="/elements6.svg"
      />
    </div>
  );
};

export default Note01Check;
