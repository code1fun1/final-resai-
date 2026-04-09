import { FunctionComponent } from "react";
import Button from "./Button";

export type HeaderV2Type = {
  className?: string;
};

const HeaderV2: FunctionComponent<HeaderV2Type> = ({ className = "" }) => {
  return (
    <header
      className={`self-stretch bg-white border-b-2 border-[#3f6aff] flex flex-col items-center py-other-gap-9 px-5 top-[0] z-[99] sticky ${className}`}
    >
      <div className="w-[1240px] flex items-center gap-other-gap-9">
        <img
          className="h-10 w-[197px] object-cover"
          loading="lazy"
          alt=""
          src="/Frame-16100679301@2x.png"
        />
        <nav className="m-0 self-stretch flex-1 flex items-center justify-center gap-other-gap-13 text-center text-base text-color-dark-500 font-[Roboto] mq800:gap-4 mq1300:hidden">
          <div className="relative tracking-[-0.02em] leading-[150%] font-medium text-[#4e3000]">
            Challenges
          </div>
          <div className="relative tracking-[-0.02em] leading-[150%]">
            How its Works?
          </div>
          <div className="relative tracking-[-0.02em] leading-[150%]">
            Approach
          </div>
          <div className="relative tracking-[-0.02em] leading-[150%]">
            Features
          </div>
          <div className="relative tracking-[-0.02em] leading-[150%]">
            Testimonials
          </div>
          <div className="relative tracking-[-0.02em] leading-[150%]">
            Pricing
          </div>
        </nav>
        <div className="group flex items-center cursor-pointer">
          <Button
            iconOnly={false}
            size="lg"
            state="Active"
            type="Fill"
            text="Signup"
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
    </header>
  );
};

export default HeaderV2;
