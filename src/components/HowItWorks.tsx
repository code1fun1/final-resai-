import { FunctionComponent } from "react";
import Button from "./Button";

export type HowItWorksType = {
  className?: string;
};

const HowItWorks: FunctionComponent<HowItWorksType> = ({ className = "" }) => {
  return (
    <main
      className={`self-stretch bg-color-netural-white overflow-hidden flex flex-col items-center py-other-gap-18-2 px-[100px] gap-[85px] mq800:gap-[42px] mq800:py-[34px] mq800:px-[50px] mq800:box-border mq450:gap-[21px] mq450:pl-5 mq450:pr-5 mq450:box-border mq1300:pt-[52px] mq1300:pb-[52px] mq1300:box-border ${className}`}
    >
      {/* Heading */}
      <section className="self-stretch flex flex-col items-start gap-other-gap-9 text-left text-base text-color-netural-white font-[Roboto]">
        <div className="self-stretch flex flex-col items-start gap-other-gap-5 shrink-0">

          <div className="h-[34px] rounded-[30px] bg-color-2 flex items-center justify-center py-[5px] px-5 box-border">
            <div className="relative tracking-[-0.02em] leading-[150%] font-medium">
              How It Works?
            </div>
          </div>

          <h1 className="m-0 self-stretch relative text-6xl tracking-[-0.02em] leading-[125%] font-medium font-[inherit] text-color-dark-500 mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
            From resume to career <br />
            move in 3 steps.
          </h1>
        </div>

        <div className="w-[1240px] relative text-lg tracking-[-0.02em] leading-[155%] text-color-gray-700 whitespace-pre-wrap hidden shrink-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
          sagittis, <br />
          proin ut lectus sed ut.
        </div>
      </section>

      {/* Steps */}
      <div className="self-stretch flex flex-col items-start gap-other-gap-16 mq800:gap-6">

        <section className="self-stretch flex items-start justify-between gap-5 text-left font-[Roboto] mq1100:flex-wrap mq1100:gap-5">

          {/* Step 1 */}
          <div className="flex-1 min-w-[240px] flex flex-col items-start relative pt-10">
            <span className="absolute top-0 left-0 text-[72px] font-bold leading-none text-[#ebebeb] select-none z-[0]">
              01
            </span>
            <div className="flex flex-col items-start gap-other-gap-5 z-[1] text-2xl text-color-dark-500 w-full">
              <div className="w-full tracking-[0.02em] leading-[132%] font-medium mq450:text-[19px] mq450:leading-[25px]">
                Upload your resume or build one from scratch
              </div>
              <p className="m-0 w-full text-xl leading-[155%] font-normal text-p-1 mq450:text-base mq450:leading-[25px]">
                It takes under 2 minutes.
              </p>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex-1 min-w-[240px] flex flex-col items-start relative pt-10">
            <span className="absolute top-0 left-0 text-[72px] font-bold leading-none text-[#ebebeb] select-none z-[0]">
              02
            </span>
            <div className="flex flex-col items-start gap-other-gap-5 z-[1] text-2xl text-color-dark-500 w-full">
              <div className="w-full tracking-[0.02em] leading-[132%] font-medium mq450:text-[19px] mq450:leading-[25px]">
                Tell us your target role
              </div>
              <p className="m-0 w-full text-xl leading-[155%] font-normal text-p-1 mq450:text-base mq450:leading-[25px]">
                Paste the job description for a 40% better ATS match.
              </p>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex-1 min-w-[240px] flex flex-col items-start relative pt-10">
            <span className="absolute top-0 left-0 text-[72px] font-bold leading-none text-[#ebebeb] select-none z-[0]">
              03
            </span>
            <div className="flex flex-col items-start gap-other-gap-5 z-[1] text-2xl text-color-dark-500 w-full">
              <div className="w-full tracking-[0.02em] leading-[132%] font-medium mq450:text-[19px] mq450:leading-[25px]">
                Download your ATS-optimized resume
              </div>
              <p className="m-0 w-full text-xl leading-[155%] font-normal text-p-1 mq450:text-base mq450:leading-[25px]">
                Unlock your personalized 6-month career roadmap.
              </p>
            </div>
          </div>
        </section>

        {/* Image Section */}
        <div className="self-stretch rounded-other-radius-xl2 overflow-hidden relative">

          {/* ✅ FIXED IMAGE */}
          <img
            className="w-full h-[650px] object-cover object-[center_top] mq800:h-[400px] mq450:h-[260px]"
            alt=""
            src="/image-1708@2x.png"
          />

          {/* CTA Button */}
          <div className="absolute top-[40px] left-[40px] flex items-center z-[1] mq450:top-5 mq450:left-5 group cursor-pointer">
            <Button
              iconOnly={false}
              size="lg"
              state="Active"
              type="Fill"
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
        </div>
      </div>
    </main>
  );
};

export default HowItWorks;