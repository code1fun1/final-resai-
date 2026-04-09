import { FunctionComponent } from "react";

export type FrameComponentType = {
  className?: string;
  cone?: string;
  skillExtractionAlgorithm?: string;
  preciselyIdentifyYourSkil?: string;
};

const FrameComponent: FunctionComponent<FrameComponentType> = ({
  className = "",
  cone,
  skillExtractionAlgorithm,
  preciselyIdentifyYourSkil,
}) => {
  return (
    <div
      className={`self-stretch rounded-xl bg-neutral-white flex flex-col items-start justify-between py-9 px-6 gap-[45px] z-[1] text-left text-xl text-system-black font-buttons-button-lg mq450:gap-[22px] ${className}`}
    >
      <img className="w-[52px] h-[52px] relative" alt="" src={cone} />
      <div className="self-stretch flex flex-col items-start justify-start gap-[5px]">
        <div className="self-stretch relative text-xl leading-[24px] font-semibold">
          {skillExtractionAlgorithm}
        </div>
        <div className="self-stretch relative text-base leading-[22px] inline-block font-[400] mq750:mb-[20px]">
          {preciselyIdentifyYourSkil}
        </div>
      </div>
    </div>
  );
};

export default FrameComponent;
