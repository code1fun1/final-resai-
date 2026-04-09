import { FunctionComponent } from "react";

export type FrameComponentV2Type = {
  className?: string;
};

const FrameComponentV2: FunctionComponent<FrameComponentV2Type> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch flex flex-col items-center py-20 px-[100px] box-border gap-12 mq800:gap-6 mq800:py-[34px] mq800:px-[50px] mq800:box-border mq450:pl-5 mq450:pr-5 mq450:box-border mq1300:pt-[52px] mq1300:pb-[52px] mq1300:box-border ${className}`}
    >
      <section className="w-full max-w-[1240px] flex flex-col items-start gap-other-gap-9 text-left text-base text-color-netural-white font-[Roboto]">
        <div className="self-stretch flex flex-col items-start gap-other-gap-5 shrink-0">
          <div className="rounded-[30px] bg-color-2 flex items-center justify-center py-[5px] px-5">
            <div className="relative tracking-[-0.02em] leading-[150%] font-medium">
              Features
            </div>
          </div>
          <h1 className="m-0 self-stretch relative text-6xl tracking-[-0.02em] leading-[125%] font-medium font-[inherit] text-color-dark-500 mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
            Everything you needed to engineer your career <br />
            — in one platform.
          </h1>
        </div>
        <div className="w-[1240px] relative text-lg tracking-[-0.02em] leading-[155%] text-color-gray-700 whitespace-pre-wrap hidden shrink-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
          sagittis, <br />
          proin ut lectus sed ut.
        </div>
      </section>
      <div className="w-full max-w-[1240px] flex items-start justify-center flex-wrap content-start gap-4">
        <section 
          className="h-[358px] w-[400px] rounded-[30px] overflow-hidden shrink-0 flex items-start pt-[39px] px-[31px] pb-10 box-border text-left text-2xl text-color-2 font-[Roboto] mq550:w-full mq450:h-auto mq450:pt-[25px] mq450:pb-[26px] mq450:box-border"
          style={{
            background: "linear-gradient(#fafafa, #fafafa) padding-box, linear-gradient(180deg, #a98536, #d7bc65) border-box",
            border: "1.5px solid transparent"
          }}
        >
          <div className="h-[276px] w-full flex flex-col items-start justify-between gap-2 mq450:h-auto">
            <h3 className="m-0 w-full relative text-[length:inherit] tracking-[0.02em] leading-[132%] font-bold font-[inherit] mq450:text-[19px] mq450:leading-[25px]">
              Beat the ATS Filter
            </h3>
            <div className="self-stretch relative text-xl text-p-1 mq450:text-base">
              Your resume is rewritten and optimized for the specific job you're
              targeting — guaranteed to pass applicant tracking systems.
            </div>
          </div>
        </section>
        <section className="h-[358px] w-[400px] rounded-[30px] bg-primary-02-black-01 overflow-hidden shrink-0 flex items-start pt-[40.2px] px-8 pb-[41.8px] box-border text-left text-2xl text-color-netural-white font-[Roboto] mq550:w-full mq450:h-auto mq450:pt-[26px] mq450:pb-[27px] mq450:box-border">
          <div className="h-[276px] w-full flex flex-col items-start justify-between gap-2 mq450:h-auto">
            <h3 className="m-0 w-full relative text-[length:inherit] tracking-[0.02em] leading-[132%] font-bold font-[inherit] mq450:text-[19px] mq450:leading-[25px]">
              Know Your Skill Gaps
            </h3>
            <div className="self-stretch relative text-xl mq450:text-base">
              ResAI compares your current skills to what's actually required for
              your target role — and shows you exactly what to learn next.
            </div>
          </div>
        </section>
        <section className="h-[358px] w-[400px] rounded-[30px] bg-primary-02-black-01 overflow-hidden shrink-0 flex items-start pt-[40.2px] px-8 pb-[41.8px] box-border text-left text-2xl text-color-netural-white font-[Roboto] mq550:w-full mq450:h-auto mq450:pt-[26px] mq450:pb-[27px] mq450:box-border">
          <div className="h-[276px] w-full flex flex-col items-start justify-between gap-2 mq450:h-auto">
            <h3 className="m-0 w-full relative text-[length:inherit] tracking-[0.02em] leading-[132%] font-bold font-[inherit] mq450:text-[19px] mq450:leading-[25px]">
              Close Your Gaps, Fast
            </h3>
            <div className="self-stretch relative text-xl mq450:text-base">
              Get personalized course recommendations from top platforms —
              matched to your exact skill gaps, not generic suggestions.
            </div>
          </div>
        </section>
        <section className="h-[358px] w-[400px] rounded-[30px] bg-primary-02-black-01 overflow-hidden shrink-0 flex items-start pt-[40.2px] px-8 pb-[41.8px] box-border text-left text-2xl text-color-netural-white font-[Roboto] mq550:w-full mq450:h-auto mq450:pt-[26px] mq450:pb-[27px] mq450:box-border">
          <div className="h-[276px] w-full flex flex-col items-start justify-between gap-2 mq450:h-auto">
            <b className="w-full relative tracking-[0.02em] leading-[132%] mq450:text-[19px] mq450:leading-[25px]">
              Your 6-Month Career Roadmap
            </b>
            <div className="self-stretch relative text-xl mq450:text-base">
              A structured, step-by-step plan — from your current role to your
              target role, with milestones you can actually follow.
            </div>
          </div>
        </section>
        <img
          className="h-[358px] w-full max-w-[800px] relative rounded-[30px] object-cover mq450:h-[220px]"
          loading="lazy"
          alt=""
          src="/Frame-33929@2x.png"
        />
      </div>
    </section>
  );
};

export default FrameComponentV2;
