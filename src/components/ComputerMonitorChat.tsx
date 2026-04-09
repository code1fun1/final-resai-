import { FunctionComponent } from "react";

export type ComputerMonitorChatType = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const ComputerMonitorChat: FunctionComponent<ComputerMonitorChatType> = ({
  className = "",
  property1 = "thin",
}) => {
  return (
    <div
      className={`h-[42px] w-[42px] relative overflow-hidden shrink-0 ${className}`}
    >
      <img
        className="absolute h-[66.67%] w-[70.95%] top-[16.67%] right-[12.38%] bottom-[16.67%] left-[16.67%] max-w-full overflow-hidden max-h-full"
        loading="lazy"
        alt=""
        src="/elements2.svg"
      />
    </div>
  );
};

export default ComputerMonitorChat;
