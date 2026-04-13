import { FunctionComponent } from "react";

const CTASection: FunctionComponent = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-[84px] py-4 sm:py-5 lg:py-[26px]">
      <div className="w-full max-w-[1440px] mx-auto relative">

        {/* DARK BOX */}
        <div className="w-full h-auto sm:h-[240px] lg:h-[260px] bg-[#171717] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] px-6 py-8 sm:p-6 lg:p-[24px] flex flex-col justify-center items-center">
          <div className="flex flex-col gap-4 sm:gap-4 lg:gap-[18px] items-center w-full lg:w-[72%]">
            <h2 className="text-[22px] sm:text-[32px] lg:text-[40px] font-[500] leading-[130%] sm:leading-[40px] lg:leading-[125%] text-center text-white" style={{ fontFamily: 'Satoshi' }}>
              ResAI helps professionals build careers as well as switch careers
            </h2>
            <p className="text-[18px] sm:text-[20px] lg:text-[20px] font-normal leading-[160%] sm:leading-[25px] lg:leading-[155%] text-center text-white" style={{ fontFamily: 'Satoshi' }}>
              With ATS-optimized resumes, personalized skill gap analysis, and a step-by-step career roadmap.
            </p>
          </div>
        </div>

        {/* BADGE — hidden on mobile/sm (not enough space), visible from ipad-pro+ */}
        <div className="hidden ipad-pro:block absolute ipad-pro:top-[12px] ipad-pro:right-[12px] lg:-top-[32px] lg:-right-[32px] z-20">
          <div className="relative ipad-pro:w-[113px] ipad-pro:h-[113px] lg:w-[113px] lg:h-[113px] animate-float">

            <svg viewBox="0 0 100 100" className="w-full h-full">
              <circle cx="50" cy="50" r="50" fill="#dabf67" />
              <defs>
                <path
                  id="badgeTextPath"
                  d="M 50,50 m -38,0 a 38,38 0 1,1 76,0 a 38,38 0 1,1 -76,0"
                />
              </defs>
              <text
                fill="#04040E"
                fontSize="8"
                fontFamily="Satoshi"
                letterSpacing="3.8"
                fontWeight="600"
              >
                <textPath href="#badgeTextPath">
                  TRY FOR FREE • TRY FOR FREE •
                </textPath>
              </text>
            </svg>

            <div className="absolute inset-0 flex items-center justify-center">
              <img
                src="/images/img_vuesax_linear_arrow_up.svg"
                alt="Arrow"
                className="ipad-pro:w-9 ipad-pro:h-9 lg:w-10 lg:h-10"
              />
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default CTASection;
