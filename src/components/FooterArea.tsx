import { FunctionComponent } from "react";

export type FooterAreaType = {
  className?: string;
};

const FooterArea: FunctionComponent<FooterAreaType> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch flex flex-col items-center pt-0 px-[100px] pb-5 box-border text-left text-lg text-secondary-grey-03 font-[Roboto] mq800:px-[50px] mq450:px-5 mq1100:h-auto ${className}`}
    >
      <div className="w-full max-w-[1360px] rounded-[50px] bg-primary-02-black-01 overflow-hidden shrink-0 flex items-start py-14 px-10 box-border mq800:pt-9 mq800:pb-9 mq800:box-border mq1100:h-auto">
        <div className="w-full flex flex-col gap-7">
          <section className="w-full flex flex-col items-start gap-14 text-left text-[40px] text-color-netural-white font-[Roboto] mq800:gap-7">
            <div className="w-full flex items-center justify-between gap-5 mq800:gap-[120px] mq450:gap-[60px]">
              <h1 className="m-0 relative text-[length:inherit] tracking-[-0.02em] leading-[125%] font-medium font-[inherit] inline-block shrink-0 mq800:text-[32px] mq800:leading-10 mq450:text-2xl mq450:leading-[30px]">
                Stop guessing. Start transforming your career.
              </h1>
              <img
                className="h-[22.1px] w-[121px] relative max-h-full shrink-0"
                alt=""
                src="/Vector-9.svg"
              />
            </div>
            <div className="w-full h-px bg-[rgba(255,255,255,0.2)]" />
          </section>
          <section className="w-full flex items-start justify-between gap-5 text-left text-2xl text-color-netural-white font-[Roboto] mq800:flex-wrap">
            <div className="flex flex-col items-start gap-4">
              <h3 className="m-0 relative text-[length:inherit] leading-[150%] font-medium font-[inherit] mq450:text-[19px] mq450:leading-[29px]">
                Menu
              </h3>
              <div className="flex flex-col items-start gap-3 text-lg text-secondary-grey-03">
                <div className="relative leading-[120%]">Product</div>
                <div className="relative leading-[120%]">Pricing</div>
                <div className="relative leading-[120%]">Career Roadmap</div>
                <div className="relative leading-[120%]">About ResAI</div>
                <div className="relative leading-[120%]">Blog</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h3 className="m-0 relative text-[length:inherit] leading-[150%] font-medium font-[inherit] mq450:text-[19px] mq450:leading-[29px]">
                Placeholder
              </h3>
              <div className="flex flex-col items-start gap-3 text-lg text-secondary-grey-03">
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h3 className="m-0 relative text-[length:inherit] leading-[150%] font-medium font-[inherit] mq450:text-[19px] mq450:leading-[29px]">
                Placeholder
              </h3>
              <div className="flex flex-col items-start gap-3 text-lg text-secondary-grey-03">
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h3 className="m-0 relative text-[length:inherit] leading-[150%] font-medium font-[inherit] mq450:text-[19px] mq450:leading-[29px]">
                Placeholder
              </h3>
              <div className="flex flex-col items-start gap-3 text-lg text-secondary-grey-03">
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
              </div>
            </div>
            <div className="flex flex-col items-start gap-4">
              <h3 className="m-0 relative text-[length:inherit] leading-[150%] font-medium font-[inherit] mq450:text-[19px] mq450:leading-[29px]">
                Placeholder
              </h3>
              <div className="flex flex-col items-start gap-3 text-lg text-secondary-grey-03">
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
                <div className="relative leading-[120%]">Placeholder</div>
              </div>
            </div>
          </section>
          <div className="w-full h-px bg-[rgba(255,255,255,0.2)]" />
          <div className="w-full flex items-center justify-between gap-5 mq1100:flex-wrap">
            <img
              className="h-10 w-[132px] object-cover"
              loading="lazy"
              alt=""
              src="/Frame-1610068082@2x.png"
            />
            <div className="flex items-center gap-[19.9px] mq1100:flex-wrap">
              <div className="relative leading-[120%]">Facebook</div>
              <div className="relative leading-[120%]">Linkdin</div>
              <div className="relative leading-[120%]">Twitter</div>
              <div className="relative font-[Geist]">|</div>
              <div className="relative leading-[120%] text-color-gray-300">Terms</div>
              <div className="relative leading-[120%]">Privacy policy</div>
              <div className="relative font-[Geist]">|</div>
              <div className="relative leading-[120%] text-color-gray-300">
                Copyright 2026 ©ResAi Company
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FooterArea;
