import { FunctionComponent } from "react";

export type StepsContainerType = {
  className?: string;
  stepOneNumber?: string;
  uploadYourInformation?: string;
  uploadYourExistingResumeO?: string;
};

const StepsContainer: FunctionComponent<StepsContainerType> = ({
  className = "",
  stepOneNumber,
  uploadYourInformation,
  uploadYourExistingResumeO,
}) => {
  const originalClassName = "[background:linear-gradient(180deg,_#222327,_#fafbf9)]"
  const dynamicClassName = "[background:linear-gradient(180deg,_#22232752,_#22232752)]"
  return (
    <div
      className={`self-stretch flex flex-col items-start justify-start max-w-full text-left text-5xl text-neutral-white font-buttons-button-lg ${className}`}
    >
      <div className="flex flex-row items-start justify-start gap-[24px]">
        <div className="h-12 w-12 relative">
          <div className={`absolute top-[0px] left-[0px] [backdrop-filter:blur(40px)] rounded-[50%] ${stepOneNumber=='1'?' bg-system-black border-[0px] text-neutral-white':'bg-white border-[2px]'} box-border w-full h-full  border-solid border-neutrals-n20`} />
          <b className={`absolute top-[12px] ${stepOneNumber=='1'?'text-neutral-white':'text-black'} left-[17px] tracking-[0.01em] leading-[24px] inline-block min-w-[13px] z-[1] mq450:text-lgi mq450:leading-[19px]`}>
            {stepOneNumber}
          </b>
        </div>
        <div className="flex flex-col items-start justify-start pt-2 px-0 pb-0 text-neutrals-n90">
          <div className="relative leading-[24px] font-semibold mq450:text-lgi mq450:leading-[19px]">
            {uploadYourInformation}
          </div>
        </div>
      </div>
      <div className="self-stretch flex flex-row items-start justify-start py-0 pr-0 pl-[23px] box-border max-w-full text-base text-neutrals-n70">
        <div className="flex-1 flex flex-row items-start justify-start gap-[46px] max-w-full mq450:flex-wrap mq450:gap-[23px]">
          <div className="h-[115px] mq850:h-[80px] flex flex-col items-start justify-start pt-[5px] px-0 pb-0 box-border">
            <div className={`w-[3px] flex-1 relative rounded-21xl ${stepOneNumber=='1'?originalClassName:dynamicClassName}`} />
          </div>
          <div className="flex-1 relative leading-[24px] whitespace-pre-wrap inline-block min-w-[246px] max-w-full">
            {uploadYourExistingResumeO}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StepsContainer;
