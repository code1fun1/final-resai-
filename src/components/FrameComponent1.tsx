import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type FrameComponent1Type = {
  className?: string;
  cone?: string;
  professionalTailoredResum?: string;
  createCustomizedResumesTh?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
};

const FrameComponent1: FunctionComponent<FrameComponent1Type> = ({
  className = "",
  cone,
  professionalTailoredResum,
  createCustomizedResumesTh,
  propFlex,
  propMinWidth,
}) => {
  const frameDivStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      minWidth: propMinWidth,
    };
  }, [propFlex, propMinWidth]);

  return (
    <div
      className={`flex mq1050:min-h-[263px] min-h-[270px] shadow-[0px_24px_48px_rgba(0,_0,_0,_0.05)] rounded-xl bg-neutral-white box-border flex flex-col items-start justify-start pt-[20px] px-[55px] pb-[20px] gap-[16px] min1-w-[277px] max-w-full text-center text-3xl text-neutrals-n90 font-buttons-button-lg border-[1px] border-solid border-neutrals-n10 mq450:pl-5 mq450:pr-5 mq450:box-border mq450:flex-1 ${className}`}
       style={frameDivStyle}
    >
      <div className="self-stretch flex flex-row mq750:items-center items-center justify-center py-0 pr-[3px] pl-0.5">
        <div className="flex flex-col mq750:items-center items-center justify-center gap-[9px]">
          <div className="self-stretch flex flex-row mq750:items-center items-center justify-center py-0 px-5">
            <img className="h-20 w-20 relative" alt="" src={cone} />
          </div>
          <div className="relative leading-[22px] font-semibold ">
            {professionalTailoredResum}
          </div>
        </div>
      </div>
      <div className="self-stretch relative text-sm tracking-[0.01em] leading-[20px] text-neutrals-n70 whitespace-pre-wrap">
        {createCustomizedResumesTh}
      </div>
    </div>
  );
};

export default FrameComponent1;
