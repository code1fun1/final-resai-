import { FunctionComponent } from "react";
import Button from "./Button";

export type ContentType = {
  className?: string;
};

const Content: FunctionComponent<ContentType> = ({ className = "" }) => {
  return (
    <div
      className={`self-stretch flex-1 flex flex-col items-start justify-center py-other-gap-18 pl-[100px] pr-[70px] box-border gap-other-gap-16 min-w-[484px] max-w-full z-[0] text-left text-7xl text-color-dark-500 font-[Roboto] mq800:gap-6 mq800:py-[42px] mq800:pl-[50px] mq800:pr-[35px] mq800:box-border mq800:min-w-full mq450:pl-5 mq450:box-border ${className}`}
    >
      <div className="self-stretch flex flex-col items-start gap-other-gap-5">
        <h1 className="m-0 w-[618.1px] relative text-[72px] leading-[125%] font-black font-[Roboto] inline-block shrink-0 mq800:text-[58px] mq800:leading-[72px] mq450:text-[43px] mq450:leading-[54px]">
          <span>{`Your next career. `}</span>
          <span className="text-[#4e3000]">Engineered.</span>
        </h1>
        <div className="self-stretch relative text-xl leading-[155%] font-medium text-p-1 shrink-0 mq450:text-base mq450:leading-[25px]">
          Build a role-specific resume, close your skill gaps, and get a
          step-by-step career roadmap — all in one platform, built for Indian
          professionals.
        </div>
      </div>
      <div className="flex items-center gap-[18px] max-w-full mq800:flex-wrap">
        <div className="group flex items-center [row-gap:20px] max-w-full mq450:flex-wrap cursor-pointer">
          <Button
            iconOnly={false}
            size="lg"
            state="Active"
            type="Fill"
            tailingIcon={
              <img
                className="h-6 w-6 relative hidden"
                alt=""
                src="/Huge-icon-arrows-outline-direction-right-01.svg"
              />
            }
            text="Start Free Resume Analysis"
            leadingIcon={null}
            showTailingIcon={false}
            showLeadingIcon={false}
            buttonFontFamily="Roboto"
            buttonColor="#04040e"
            className="transition-all duration-300 group-hover:rounded-r-none group-hover:pr-2"
          />
          <div className="rounded-other-radius-full-corner bg-color flex items-center justify-center p-other-gap-7 transition-all duration-300 group-hover:rounded-l-none group-hover:-translate-x-1">
            <img
              className="w-6 h-6 relative transition-transform duration-300 group-hover:rotate-45"
              alt=""
              src="/Huge-icon-arrows-outline-arrow-up.svg"
            />
          </div>
        </div>
        <Button
          iconOnly={false}
          size="lg"
          state="Active"
          type="Outline"
          tailingIcon={
            <img
              className="h-6 w-6 relative hidden"
              alt=""
              src="/Huge-icon-arrows-outline-direction-right-01.svg"
            />
          }
          text="See how it works"
          leadingIcon={null}
          showTailingIcon={false}
          showLeadingIcon={false}
          buttonFontFamily="Roboto"
          buttonColor="#04040e"
        />
      </div>
      <div className="w-[235px] flex flex-col items-start gap-4 text-lg">
        <div className="flex items-center shrink-0">
          <img
            className="h-12 w-12 relative rounded-other-radius-full-corner object-cover"
            alt=""
            src="/Profile-Avatars2@2x.png"
          />
          <img
            className="h-12 w-12 relative rounded-other-radius-full-corner object-cover ml-[-20px]"
            alt=""
            src="/Profile-Avatars3@2x.png"
          />
          <img
            className="h-12 w-12 relative rounded-other-radius-full-corner object-cover ml-[-20px]"
            alt=""
            src="/Profile-Avatars1@2x.png"
          />
          <img
            className="h-12 w-12 relative rounded-other-radius-full-corner object-cover ml-[-20px]"
            alt=""
            src="/Profile-Avatars@2x.png"
          />
          <img
            className="h-12 w-12 relative rounded-other-radius-full-corner object-cover ml-[-20px]"
            loading="lazy"
            alt=""
            src="/Profile-Avatars4@2x.png"
          />
        </div>
        <div className="w-[386px] flex items-center shrink-0">
          <div className="w-[379px] flex flex-col items-start gap-other-gap-3">
            <div className="self-stretch relative tracking-[-0.02em] leading-[155%] font-medium">
              Join 3,200+
            </div>
            <div className="w-[287.6px] relative text-base leading-[130%] text-p-1 flex items-center">{`professionals who switched & Built careers with ResAI`}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Content;
