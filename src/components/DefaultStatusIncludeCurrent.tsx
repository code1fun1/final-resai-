import { FunctionComponent } from "react";
import Button from "./Button";

export type DefaultStatusIncludeCurrentType = {
  className?: string;
};

const DefaultStatusIncludeCurrent: FunctionComponent<
  DefaultStatusIncludeCurrentType
> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch bg-[#f6f6f6] overflow-hidden flex flex-col items-center py-20 px-[100px] gap-12 text-left text-lg text-color-gray-700 font-[Roboto] mq800:gap-6 mq800:pl-[50px] mq800:pr-[50px] mq800:box-border mq450:py-[34px] mq450:px-5 mq450:box-border mq1100:pt-[52px] mq1100:pb-[52px] mq1100:box-border ${className}`}
    >
      <section className="self-stretch flex flex-col items-center gap-other-gap-5 text-left text-xl text-color-netural-white font-[Roboto]">
        <div className="rounded-[30px] bg-color-2 flex items-center justify-center py-[5px] px-5">
          <h3 className="m-0 relative text-[length:inherit] leading-[155%] font-medium font-[inherit] mq450:text-base mq450:leading-[25px]">
            Pricing
          </h3>
        </div>
        <h2 className="m-0 relative text-6xl tracking-[-0.02em] leading-[125%] font-medium font-[inherit] text-color-dark-500 text-center mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
          Start free. Upgrade when you're ready.
        </h2>
      </section>
      <div className="w-[1240px] relative tracking-[-0.02em] leading-[155%] whitespace-pre-wrap hidden">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sit lorem
        sagittis, <br />
        proin ut lectus sed ut.
      </div>
      <div className="w-full max-w-[954px] h-auto rounded-[32px] bg-primary-02-black-01 overflow-hidden shrink-0 flex items-stretch justify-center flex-wrap p-3 box-border relative isolate gap-[15px]">
        <img
          className="h-[648.4px] w-[2036.8px] absolute !!m-[0 important] top-[-90.4px] left-[-690.8px] z-[0] shrink-0"
          alt=""
          src="/Group-2.svg"
        />
        {/* Free Plan */}
        <section className="flex-1 min-w-[260px] w-[300px] rounded-[30px] bg-[#0d0c0c] overflow-hidden shrink-0 flex flex-col items-center z-[1] text-left text-lg text-color-netural-white font-[Roboto]">
          <div className="self-stretch flex flex-col items-start py-8 px-6 gap-4">
            <div className="relative font-medium">Free Plan</div>
            <div className="self-stretch flex items-center gap-2 text-4xl">
              <h2 className="m-0 relative text-[length:inherit] tracking-[0.02em] font-bold font-[inherit] mq800:text-[29px] mq450:text-[22px]">
                ₹0
              </h2>
              <div className="flex flex-col items-start justify-center text-base text-[#969ca3]">
                <div className="relative">per month</div>
                <div className="relative">billed monthly</div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-col items-start pt-0 px-6 pb-14 gap-3 text-sm text-[#d2d7d9] font-[Inter]">
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg font-[Roboto]">
              <img className="h-4 w-4 relative" loading="lazy" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">1 resume analysis</div>
            </div>
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg font-[Roboto]">
              <img className="h-4 w-4 relative" loading="lazy" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">ATS score reveal</div>
            </div>
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg font-[Roboto]">
              <img className="h-4 w-4 relative" loading="lazy" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">Top 3 skill gaps preview</div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center pt-0 px-6 pb-8">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex items-center">
              <Button
                iconOnly={false}
                size="lg"
                state="Active"
                type="Fill"
                tailingIcon={
                  <img className="h-6 w-6 relative hidden shrink-0" alt="" src="/Huge-icon-arrows-outline-direction-right-01.svg" />
                }
                text="Current Plan"
                leadingIcon={null}
                showTailingIcon={false}
                showLeadingIcon={false}
                buttonFontFamily="Geist"
                buttonColor="#fff"
              />
            </button>
          </div>
        </section>
        {/* Starter Plan */}
        <section className="flex-1 min-w-[260px] w-[300px] rounded-[30px] bg-[#0d0c0c] overflow-hidden shrink-0 flex flex-col items-center z-[2] text-left text-lg text-color-netural-white font-[Roboto]">
          <div className="self-stretch flex flex-col items-start py-8 px-6 gap-4">
            <div className="relative font-medium">Starter Plan</div>
            <div className="self-stretch flex items-center gap-2 text-4xl">
              <h2 className="m-0 relative text-[length:inherit] tracking-[0.02em] font-bold font-[inherit] mq800:text-[29px] mq450:text-[22px]">
                ₹199
              </h2>
              <div className="flex flex-col items-start justify-center text-base text-[#969ca3]">
                <div className="relative">3 month</div>
                <div className="relative">billed monthly</div>
              </div>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-col items-start pt-0 px-6 pb-14 gap-3 text-sm text-[#d2d7d9] font-[Inter]">
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg font-[Roboto]">
              <img className="h-4 w-4 relative" loading="lazy" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">5 resume analysis</div>
            </div>
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg font-[Roboto]">
              <img className="h-4 w-4 relative" loading="lazy" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">ATS score reveal</div>
            </div>
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg font-[Roboto]">
              <img className="h-4 w-4 relative" loading="lazy" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">Top 3 skill gaps preview</div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center pt-0 px-6 pb-8">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex items-center">
              <Button
                iconOnly={false}
                size="lg"
                state="Active"
                type="Fill"
                tailingIcon={
                  <img className="h-6 w-6 relative hidden" alt="" src="/Huge-icon-arrows-outline-direction-right-01.svg" />
                }
                text="Upgrade to Pro Plan"
                leadingIcon={null}
                showTailingIcon={false}
                showLeadingIcon={false}
                buttonFontFamily="Geist"
                buttonColor="#04040e"
              />
            </button>
          </div>
        </section>
        {/* Pro Plan */}
        <section className="flex-1 min-w-[260px] w-[300px] rounded-[30px] bg-[#0d0c0c] overflow-hidden shrink-0 flex flex-col items-center z-[3] text-left text-sm text-color-netural-white font-[Roboto]">
          <div className="self-stretch flex flex-col items-start py-8 px-6 relative isolate gap-4 text-lg">
            <div className="relative font-medium z-[0] shrink-0">Pro Plan</div>
            <div className="self-stretch flex items-center gap-2 z-[1] shrink-0 text-4xl">
              <h2 className="m-0 relative text-[length:inherit] tracking-[0.02em] font-bold font-[inherit] mq800:text-[29px] mq450:text-[22px]">
                ₹499
              </h2>
              <div className="flex flex-col items-start justify-center text-base text-[#969ca3]">
                <div className="relative">Yearly</div>
                <div className="relative">billed yearly</div>
              </div>
            </div>
            <div className="!!m-[0 important] absolute top-[24.2px] right-[20px] rounded-lg bg-color-netural-white flex items-center justify-center py-1.5 px-2 whitespace-nowrap z-[2] shrink-0 text-center text-xs text-[#0d0c0c]">
              <div className="relative tracking-[0.02em] font-medium">
                Most Popular
              </div>
            </div>
          </div>
          <div className="self-stretch flex-1 flex flex-col items-start pt-0 px-6 pb-14 gap-3 text-[#d2d7d9]">
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg">
              <img className="h-4 w-4 relative" loading="lazy" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">10 resumes</div>
            </div>
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg">
              <img className="h-4 w-4 relative" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">Full skill gap report</div>
            </div>
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg">
              <img className="h-4 w-4 relative" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">6-month career roadmap</div>
            </div>
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg">
              <img className="h-4 w-4 relative" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">Personalized up skilling plan</div>
            </div>
            <div className="self-stretch flex items-start gap-2 shrink-0 text-lg">
              <img className="h-4 w-4 relative" alt="" src="/Group-1.svg" />
              <div className="flex-1 relative">Priority support</div>
            </div>
          </div>
          <div className="self-stretch flex flex-col items-center pt-0 px-6 pb-8 relative isolate gap-2.5 text-center text-[#969ca3]">
            <button className="cursor-pointer [border:none] p-0 bg-[transparent] flex items-center z-[0] shrink-0">
              <Button
                iconOnly={false}
                size="lg"
                state="Active"
                type="Fill"
                tailingIcon={
                  <img className="h-6 w-6 relative hidden" alt="" src="/Huge-icon-arrows-outline-direction-right-01.svg" />
                }
                text="Upgrade to Pro Plan"
                leadingIcon={null}
                showTailingIcon={false}
                showLeadingIcon={false}
                buttonFontFamily="Geist"
                buttonColor="#04040e"
              />
            </button>
            <div className="w-[72px] h-[19px] absolute !!m-[0 important] top-[58px] left-[calc(50%_-_36.5px)] inline-block z-[1] shrink-0">
              7 Days Free
            </div>
          </div>
        </section>
      </div>
    </section>
  );
};

export default DefaultStatusIncludeCurrent;
