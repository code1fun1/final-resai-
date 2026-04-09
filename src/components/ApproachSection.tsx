import { FunctionComponent } from "react";
import { ArrowLeft } from "lucide-react";

interface Comparison {
  id: number;
  icon: string;
  before: string;
  after: string;
}

const ApproachSection: FunctionComponent = () => {
  const comparisons: Comparison[] = [
    {
      id: 1,
      icon: "/images/img_pdf_note.svg",
      before: "Same resume sent to every job",
      after: "Custom resume tailored for each role",
    },
    {
      id: 2,
      icon: "/images/img_computer_monitor_chat.svg",
      before: "Applying randomly, hoping something sticks",
      after: "Targeted applications with a 6-month roadmap and higher response rates",
    },
  ];

  return (
    <section className="w-full bg-[#f6f6f6] py-14 sm:py-16 lg:py-20 overflow-hidden">
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[100px]">

        {/* Header */}
        <div className="mb-8 lg:mb-10 max-w-[1240px] mx-auto">
          <button className="bg-[#735302] rounded-[16px] px-4 sm:px-5 py-1 text-white text-[14px] sm:text-[15px] lg:text-[16px] font-medium">
            Approach
          </button>
          <h2
            className="mt-4 text-[36px] sm:text-[48px] lg:text-[60px] font-[500] leading-[125%] tracking-[-0.02em] text-[#03030d]"
            style={{ fontFamily: "Satoshi" }}
          >
            The Difference Real Guidance Makes
          </h2>
        </div>

        <div className="flex flex-col gap-4 sm:gap-5 items-center">

          {/* ROW 1 */}
          <div className="group relative w-full lg:w-[1240px] h-[80px] sm:h-[92px] lg:h-[106px] rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

            {/* White card */}
            <div className="absolute left-0 top-0 w-[72%] sm:w-[74%] md:w-[76%] lg:w-[1018px] h-full bg-white rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] px-4 sm:px-6 lg:px-8 flex items-center">
              <img
                src={comparisons[0].icon}
                alt=""
                className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] lg:w-[42px] lg:h-[42px] mr-3 shrink-0"
              />
              <span className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-medium text-[#03030d] leading-tight">
                {comparisons[0].before}
              </span>
            </div>

            {/* Arrow circle + Gold card (always visible) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center z-10">
              <div className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] lg:w-[66px] lg:h-[66px] rounded-full bg-[#dabf67] flex items-center justify-center shrink-0">
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#03030d]" strokeWidth={2.5} />
              </div>
              <div className="ml-2 sm:ml-3 w-[170px] sm:w-[220px] md:w-[260px] lg:w-[349px] h-[64px] sm:h-[78px] md:h-[88px] lg:h-[106px] bg-[#dabf67] rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] flex items-center justify-center px-3 sm:px-4 text-center">
                <span className="text-[11px] sm:text-[13px] md:text-[15px] lg:text-[20px] text-[#03030d] font-medium leading-tight">
                  Hover to see what changes with us
                </span>
              </div>
            </div>

            {/* Gold overlay — slides from RIGHT to LEFT on hover, covers entire row */}
            <div className="absolute inset-0 bg-[#dabf67] flex items-center px-4 sm:px-6 lg:px-8 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20">
              <img
                src={comparisons[0].icon}
                alt=""
                className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] lg:w-[42px] lg:h-[42px] mr-3 shrink-0"
              />
              <span className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-medium text-[#03030d] leading-tight">
                {comparisons[0].after}
              </span>
            </div>

          </div>

          {/* MIDDLE GOLD CARD */}
          <div className="w-full lg:w-[1240px] h-[80px] sm:h-[92px] lg:h-[106px] bg-[#dabf67] rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] px-4 sm:px-6 lg:px-8 flex items-center">
            <img
              src="/images/img_pdf_note_black_900_01.svg"
              alt=""
              className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] lg:w-[42px] lg:h-[42px] mr-3 shrink-0"
            />
            <span className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-medium text-[#03030d] leading-tight">
              Clear skill gap report with specific skills to learn for your target role
            </span>
          </div>

          {/* ROW 2 */}
          <div className="group relative w-full lg:w-[1240px] h-[80px] sm:h-[92px] lg:h-[106px] rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] overflow-hidden">

            {/* White card */}
            <div className="absolute left-0 top-0 w-[72%] sm:w-[74%] md:w-[76%] lg:w-[1018px] h-full bg-white rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] px-4 sm:px-6 lg:px-8 flex items-center">
              <img
                src={comparisons[1].icon}
                alt=""
                className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] lg:w-[42px] lg:h-[42px] mr-3 shrink-0"
              />
              <span className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-medium text-[#03030d] leading-tight">
                {comparisons[1].before}
              </span>
            </div>

            {/* Arrow circle + Gold card (always visible) */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center z-10">
              <div className="w-[44px] h-[44px] sm:w-[52px] sm:h-[52px] lg:w-[66px] lg:h-[66px] rounded-full bg-[#dabf67] flex items-center justify-center shrink-0">
                <ArrowLeft className="w-5 h-5 sm:w-6 sm:h-6 lg:w-8 lg:h-8 text-[#03030d]" strokeWidth={2.5} />
              </div>
              <div className="ml-2 sm:ml-3 w-[170px] sm:w-[220px] md:w-[260px] lg:w-[349px] h-[64px] sm:h-[78px] md:h-[88px] lg:h-[106px] bg-[#dabf67] rounded-[18px] sm:rounded-[20px] lg:rounded-[24px] flex items-center justify-center px-3 sm:px-4 text-center">
                <span className="text-[11px] sm:text-[13px] md:text-[15px] lg:text-[20px] text-[#03030d] font-medium leading-tight">
                  Hover to see what changes with us
                </span>
              </div>
            </div>

            {/* Gold overlay — slides from RIGHT to LEFT on hover, covers entire row */}
            <div className="absolute inset-0 bg-[#dabf67] flex items-center px-4 sm:px-6 lg:px-8 translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out z-20">
              <img
                src={comparisons[1].icon}
                alt=""
                className="w-[24px] h-[24px] sm:w-[30px] sm:h-[30px] lg:w-[42px] lg:h-[42px] mr-3 shrink-0"
              />
              <span className="text-[12px] sm:text-[14px] md:text-[16px] lg:text-[20px] font-medium text-[#03030d] leading-tight">
                {comparisons[1].after}
              </span>
            </div>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ApproachSection;
