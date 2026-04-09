import { FunctionComponent } from "react";
import RadioCheckCircle from "./RadioCheckCircle";
import Note01Check from "./Note01Check";

export type SectionType = {
  className?: string;
};

const Section: FunctionComponent<SectionType> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch bg-[#f6f6f6] flex items-center justify-center py-20 px-[100px] box-border max-w-full mq800:pl-[50px] mq800:pr-[50px] mq800:box-border mq450:py-[34px] mq450:px-5 mq450:box-border mq1100:pt-[52px] mq1100:pb-[52px] mq1100:box-border ${className}`}
    >
      <div className="w-full max-w-[1240px] rounded-[50px] bg-primary-02-black-01 overflow-hidden flex flex-col items-start p-[90px] box-border relative isolate mq800:py-[58px] mq800:px-[22px] mq800:box-border mq1300:pl-[45px] mq1300:pr-[45px] mq1300:box-border">
        <img
          className="w-[3640.6px] h-[1159px] absolute !!m-[0 important] right-[-1458.4px] bottom-[-352px] shrink-0"
          alt=""
          src="/Group-21.svg"
        />
        <div className="w-full flex flex-col items-start gap-12 max-w-full z-[1] shrink-0 mq800:gap-6">
          <section className="self-stretch h-auto flex flex-col items-start gap-other-gap-5 text-left text-base text-color-netural-white font-[Roboto]">
            <div className="rounded-[30px] bg-color-2 flex items-center justify-center py-[5px] px-5 box-border shrink-0">
              <div className="relative tracking-[-0.02em] leading-[150%] font-medium">
                Solution
              </div>
            </div>
            <h1 className="m-0 w-full relative text-6xl tracking-[-0.02em] leading-[125%] font-medium font-[inherit] shrink-0 mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
              ResAI shows you exactly what to do next — and gives you the tools
              to get there.
            </h1>
          </section>
          <section className="self-stretch h-auto flex flex-col items-start max-w-full text-left text-2xl text-color-netural-white font-[Roboto] mq800:gap-6">
            <div className="self-stretch flex items-start gap-other-gap-13 max-w-full mq800:gap-4 mq1100:flex-wrap">
              <div className="flex-1 min-w-[220px] border-color-gray-200 border-solid border-b-[1px] box-border flex flex-col items-start pt-0 px-0 pb-[30px] gap-other-gap-11">
                <RadioCheckCircle
                  property1="stroke"
                  radioCheckCircle01Height="42px"
                  radioCheckCircle01Width="42px"
                  elements="/elements1.svg"
                />
                <div className="self-stretch flex flex-col items-start gap-other-gap-5 shrink-0">
                  <h3 className="m-0 self-stretch relative text-[length:inherit] tracking-[0.02em] leading-[132%] font-medium font-[inherit] mq450:text-[19px] mq450:leading-[25px]">
                    Beat the ATS Filter
                  </h3>
                  <div className="self-stretch relative text-xl tracking-[-0.02em] leading-[150%] mq450:text-base mq450:leading-6">
                    Get a role-specific resume optimized to pass every applicant
                    tracking system.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[220px] border-color-netural-white border-solid border-b-[1px] box-border flex flex-col items-start pt-0 px-0 pb-[30px] gap-other-gap-11">
                <Note01Check property1="stroke" />
                <div className="self-stretch flex flex-col items-start gap-other-gap-5 shrink-0">
                  <h3 className="m-0 self-stretch relative text-[length:inherit] tracking-[0.02em] leading-[132%] font-medium font-[inherit] mq450:text-[19px] mq450:leading-[25px]">
                    Know Your Skill Gaps
                  </h3>
                  <div className="self-stretch relative text-xl tracking-[-0.02em] leading-[150%] mq450:text-base mq450:leading-6">
                    See exactly which skills are standing between you and your
                    target role.
                  </div>
                </div>
              </div>
              <div className="flex-1 min-w-[220px] border-color-gray-200 border-solid border-b-[1px] box-border flex flex-col items-start pt-0 px-0 pb-[30px] gap-other-gap-11">
                <img
                  className="w-[42px] relative max-h-full shrink-0"
                  loading="lazy"
                  alt=""
                  src="/stairs-14945624-1-Vectorized.svg"
                />
                <div className="self-stretch flex flex-col items-start gap-other-gap-5 shrink-0">
                  <h3 className="m-0 self-stretch relative text-[length:inherit] tracking-[0.02em] leading-[132%] font-medium font-[inherit] mq450:text-[19px] mq450:leading-[25px]">
                    Get Your Roadmap
                  </h3>
                  <div className="self-stretch relative text-xl tracking-[-0.02em] leading-[150%] mq450:text-base mq450:leading-6">
                    A step-by-step 6-month plan to transition into your target
                    role.
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </section>
  );
};

export default Section;
