import { FunctionComponent } from "react";

export type ResAINaukriType = {
  className?: string;
};

const ResAINaukri: FunctionComponent<ResAINaukriType> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch flex flex-col items-center py-20 px-[100px] box-border gap-12 text-center text-6xl text-color-dark-500 font-[Roboto] mq800:gap-6 mq800:px-[50px] mq450:pt-[34px] mq450:pb-[34px] mq450:px-5 mq450:box-border mq1100:pt-[52px] mq1100:pb-[52px] mq1100:box-border ${className}`}
    >
      <div className="w-full max-w-[1240px] flex flex-col items-start gap-other-gap-9">
        <div className="self-stretch flex flex-col items-start shrink-0">
          <h2 className="m-0 self-stretch relative text-[length:inherit] tracking-[-0.02em] leading-[125%] font-medium font-[inherit] mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
            Why ResAI vs Naukri Resume Services?
          </h2>
        </div>
        <div className="w-[1240px] relative text-lg tracking-[-0.02em] leading-[155%] text-color-gray-700 whitespace-pre-wrap text-left hidden shrink-0">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
          sagittis, <br />
          proin ut lectus sed ut.
        </div>
      </div>
      <div className="flex flex-col items-center gap-4 text-2xl text-color-2">
        <section className="w-full max-w-[1240px] flex items-start justify-center flex-wrap content-start gap-4 text-left text-2xl text-p-1 font-[Roboto]">
          <div className="h-[358px] w-[400px] rounded-[30px] bg-[#f6f6f6] overflow-hidden shrink-0 flex items-start pt-[40.2px] px-8 pb-[41.8px] box-border mq450:pt-[26px] mq450:pb-[27px] mq450:box-border">
            <div className="h-[276px] w-[336px] flex flex-col items-start justify-between gap-2">
              <img
                className="w-[145.3px] relative max-h-full"
                loading="lazy"
                alt=""
                src="/Naukri-id5Uu3XyB-1-1.svg"
              />
              <div className="self-stretch h-[138px] relative tracking-[-0.02em] leading-[150%] inline-block mq450:text-[19px] mq450:leading-[29px]">
                ₹4,200/yr
                <br />
                8-day wait
                <br />
                no ATS guarantee
              </div>
            </div>
          </div>
          <div className="h-[358px] w-[400px] rounded-[30px] bg-primary-02-black-01 overflow-hidden shrink-0 flex items-start pt-[40.2px] px-8 pb-[41.8px] box-border text-color-netural-white mq450:pt-[26px] mq450:pb-[27px] mq450:box-border">
            <div className="h-[276px] w-[336px] flex flex-col items-start justify-between gap-2">
              <img
                className="w-[197px] h-10 object-cover"
                loading="lazy"
                alt=""
                src="/Frame-1610067930@2x.png"
              />
              <div className="self-stretch relative tracking-[-0.02em] leading-[150%] mq450:text-[19px] mq450:leading-[29px]">
                ₹499/yr
                <br />5 minutes
                <br />
                ATS-optimized + roadmap + skill gaps
              </div>
            </div>
          </div>
        </section>
        <div className="w-full max-w-[816px] rounded-3xl bg-[#f6f6f6] flex items-start justify-center py-10 px-8 box-border">
          <div className="w-full relative tracking-[0.02em] leading-[132%] font-medium shrink-0 mq450:text-[19px] mq450:leading-[25px]">
            'Less than a Zomato dinner. More valuable than a career coach.'
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResAINaukri;
