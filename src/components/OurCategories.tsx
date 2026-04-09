import { FunctionComponent } from "react";
import PdfNote from "./PdfNote";
import QuestionHelpCircle from "./QuestionHelpCircle";
import BriefcaseJob from "./BriefcaseJob";

export type OurCategoriesType = {
  className?: string;
};

const OurCategories: FunctionComponent<OurCategoriesType> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch bg-color-netural-white flex flex-col items-start py-other-gap-18-2 px-[100px] box-border gap-other-gap-16 text-center text-lg text-color-dark-500 font-[Roboto] mq800:gap-6 mq800:py-[52px] mq800:px-[50px] mq800:box-border mq450:pl-5 mq450:pr-5 mq450:box-border ${className}`}
    >
      <section className="self-stretch flex flex-col items-start gap-other-gap-5 text-left text-base font-[Roboto]">
        <div className="rounded-[30px] bg-color-2 flex items-center justify-center py-[5px] px-5">
          <div className="relative tracking-[-0.02em] leading-[150%] font-medium text-white">
            Challenges
          </div>
        </div>
        <h1 className="m-0 w-full relative text-6xl tracking-[-0.02em] leading-[125%] font-medium font-[inherit] text-color-dark-500 mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
          Still sending resumes and hearing nothing?
        </h1>
      </section>

      <section className="self-stretch flex flex-col items-start text-left text-2xl text-color-dark-500 font-[Roboto]">
        <div className="self-stretch flex items-start flex-wrap content-start gap-other-gap-13 mq800:gap-4">
          {/* Card 1 */}
          <div className="flex-1 border-color-gray-200 border-solid border-b-[1px] box-border flex flex-col items-start pt-0 px-0 pb-[30px] gap-other-gap-11 min-w-[294px]">
            <PdfNote property1="stroke" />
            <div className="self-stretch flex flex-col items-start gap-other-gap-5">
              <h3 className="m-0 self-stretch relative text-[length:inherit] tracking-[0.02em] leading-[132%] font-medium font-[inherit] mq450:text-[19px] mq450:leading-[25px]">
                Generic resumes get ignored
              </h3>
              <div className="self-stretch relative text-xl leading-[155%] text-p-1 mq450:text-base mq450:leading-[25px]">
                Hiring managers see hundreds of similar profiles every day.
              </div>
            </div>
          </div>

          {/* Card 2 — golden gradient bottom border */}
          <div
            className="flex-1 flex flex-col items-start pt-0 px-0 pb-[30px] gap-other-gap-11 min-w-[294px]"
            style={{
              borderBottom: "2px solid",
              borderImage: "linear-gradient(180deg, #a98536, #d7bc65) 1",
            }}
          >
            <QuestionHelpCircle property1="stroke" />
            <div className="self-stretch flex flex-col items-start gap-other-gap-5">
              <div className="self-stretch relative tracking-[0.02em] leading-[132%] font-medium mq450:text-[19px] mq450:leading-[25px]">
                You don't know which skills are holding you back
              </div>
              <div className="self-stretch relative text-xl leading-[155%] text-p-1 mq450:text-base mq450:leading-[25px]">
                And no one tells you what's actually missing.
              </div>
            </div>
          </div>

          {/* Card 3 */}
          <div className="flex-1 border-color-gray-200 border-solid border-b-[1px] box-border flex flex-col items-start pt-0 px-0 pb-[30px] gap-other-gap-11 min-w-[294px]">
            <BriefcaseJob property1="stroke" />
            <div className="self-stretch flex flex-col items-start gap-other-gap-5">
              <div className="self-stretch relative tracking-[0.02em] leading-[132%] font-medium mq450:text-[19px] mq450:leading-[25px]">
                Switching careers feels overwhelming and slow
              </div>
              <div className="self-stretch relative text-xl leading-[155%] text-p-1 mq450:text-base mq450:leading-[25px]">
                There's no clear path, just guesswork.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* See Solution button */}
      <div className="group self-stretch flex flex-col items-center gap-3 cursor-pointer">
        <div className="text-base text-color-dark-500 font-medium transition-all duration-300 group-hover:opacity-70">See Solution</div>
        <div className="w-[52px] h-[52px] rounded-other-radius-full-corner bg-color flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:shadow-lg">
          <img
            className="w-5 h-5 rotate-[135deg] transition-transform duration-300 group-hover:rotate-[180deg]"
            alt=""
            src="/Huge-icon-arrows-outline-arrow-up.svg"
          />
        </div>
      </div>
    </section>
  );
};

export default OurCategories;
