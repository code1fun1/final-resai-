import { FunctionComponent } from "react";
import RadioCheckCircle from "./RadioCheckCircle";

export type Image1Type = {
  className?: string;
};

const Image1: FunctionComponent<Image1Type> = ({ className = "" }) => {
  return (
    <div
      className={`h-[900px] w-[695px] overflow-hidden shrink-0 flex items-start pt-0 px-[29px] pb-44 box-border max-w-full text-left text-base text-color-dark-500 font-[Roboto] mq800:min-w-full mq450:h-auto mq1300:flex-1 ${className}`}
    >
      <img
        className="h-[803.7px] w-[552.5px] relative object-cover hidden z-[1] shrink-0"
        alt=""
        src="/young-smiling-woman-pointing-finger-upper-left-corner-empty-space-shopping-sale-advertisement-standing-white-background-1@2x.png"
      />
      <div className="mb-[-217.3px] w-[602.9px] flex items-start justify-between pt-[319px] pb-[174.3px] pl-[11px] pr-8 box-border gap-5 bg-cover bg-no-repeat shrink-0 max-w-full mq450:flex-wrap mq450:gap-5" style={{ backgroundImage: "url('/image-1718@2x.png')", backgroundPosition: '50% -80px' }}>
        <img
          className="w-[602.9px] relative max-h-full object-cover hidden shrink-0"
          alt=""
          src="/image-1718@2x.png"
        />
        <div className="flex flex-col items-start pt-[347px] px-0 pb-0 shrink-0">
          <img
            className="w-16 h-16 rounded-other-radius-xl"
            loading="lazy"
            alt=""
            src="/Text.svg"
          />
        </div>
        <div className="h-16 w-16 [backdrop-filter:blur(15px)] rounded-other-radius-xl bg-[rgba(255,255,255,0.9)] border-color-netural-white border-solid border-[1.6px] box-border flex items-center justify-center py-[12.8px] px-[19px] relative isolate gap-[25.6px] shrink-0">
          <img
            className="h-[37.2px] w-[32.6px] absolute !!m-[0 important] bottom-[15px] left-[calc(50%_-_16.3px)] z-[0] shrink-0"
            alt=""
            src="/Vector.svg"
          />
          <img
            className="w-[34px] relative max-h-full object-cover hidden z-[1] shrink-0"
            alt=""
            src="/image-1709@2x.png"
          />
          <img
            className="w-[34px] relative max-h-full object-cover hidden z-[2] shrink-0"
            alt=""
            src="/image-1715@2x.png"
          />
          <img
            className="h-[38px] w-[38px] absolute !!m-[0 important] top-[19px] left-[13px] z-[3] shrink-0"
            alt=""
            src="/image-1715-Vectorized.svg"
          />
        </div>
      </div>
      <div className="h-20 w-[236px] [backdrop-filter:blur(15px)] rounded-other-radius-xl bg-[rgba(255,255,255,0.9)] border-color-netural-white border-solid border-[1px] box-border flex flex-col items-start justify-center py-3.5 px-other-gap-9 shrink-0 z-[2] ml-[-222.6px] relative self-end">
        <div className="w-[175px] flex flex-col items-start">
          <div className="self-stretch flex items-end">
            <div className="flex-1 flex items-center gap-other-gap-7">
              <div className="w-10 rounded-other-radius-lg bg-color-netural-white flex items-center justify-center p-other-gap-5 box-border">
                <RadioCheckCircle
                  property1="contrast"
                  elements="/elements4@2x.png"
                />
              </div>
              <div className="flex-1 flex flex-col items-start gap-other-gap-3">
                <b className="self-stretch relative tracking-[-0.02em] leading-[140%] shrink-0">
                  ATS-Approved
                </b>
                <div className="w-[154.6px] relative text-color-gray-700 flex items-center shrink-0">
                  ATS Ready Template
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Image1;
