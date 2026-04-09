import { FunctionComponent } from "react";

const CTASection: FunctionComponent = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-[84px] py-4 sm:py-5 lg:py-[26px]">
      <div className="w-full max-w-[1440px] mx-auto">

        <div className="relative w-full h-[200px] sm:h-[240px] lg:h-[260px] bg-[#171717] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] p-4 sm:p-6 lg:p-[24px] overflow-visible">

          {/* TEXT */}
          <div className="flex flex-col justify-center items-center w-full h-full relative z-10">
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[18px] items-center w-full lg:w-[72%]">
              <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-[500] leading-[30px] sm:leading-[40px] lg:leading-[50px] text-center text-white font-satoshi">
                ResAI helps professionals build careers as well as switch careers
              </h2>
              <p className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[25px] lg:leading-[27px] text-center text-white font-satoshi">
                With ATS-optimized resumes, personalized skill gap analysis, and a step-by-step career roadmap.
              </p>
            </div>
          </div>

          {/* BADGE */}
          <div className="absolute top-[10px] right-[10px] sm:top-[12px] sm:right-[12px] lg:-top-[60px] lg:-right-[60px] z-20">
            <div className="relative w-[90px] h-[90px] sm:w-[110px] sm:h-[110px] lg:w-[175px] lg:h-[175px]">

              {/* Full golden circle with text curved inside along the edge */}
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

              {/* Arrow in center */}
              <div className="absolute inset-0 flex items-center justify-center">
                <img
                  src="/images/img_vuesax_linear_arrow_up.svg"
                  alt="Arrow"
                  className="w-8 h-8 sm:w-9 sm:h-9 lg:w-11 lg:h-11"
                />
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
