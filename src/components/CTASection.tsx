import { FunctionComponent } from "react";

const CTASection: FunctionComponent = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-[84px] py-4 sm:py-5 lg:py-[26px]">
      <div className="w-full max-w-[1440px] mx-auto">
        
        {/* ❗ CHANGE 1: overflow-visible (important for badge) */}
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

          {/* ================= BADGE ================= */}
          
          {/* ❗ CHANGE 2: negative position (outside corner) */}
          <div className="absolute -top-6 -right-6 lg:-top-10 lg:-right-10 z-20">
            
            <div className="relative w-[90px] h-[90px] sm:w-[100px] sm:h-[100px] lg:w-[120px] lg:h-[120px]">
              
              {/* Rotating Text */}
              <svg
                viewBox="0 0 100 100"
                className="w-full h-full animate-[spinSlow_12s_linear_infinite]"
              >
                <defs>
                  <path
                    id="circlePath"
                    d="
                      M 50,50
                      m -35,0
                      a 35,35 0 1,1 70,0
                      a 35,35 0 1,1 -70,0
                    "
                  />
                </defs>

                <text
                  fill="#dabf67"
                  fontSize="8"
                  fontFamily="Satoshi"
                  letterSpacing="2"
                >
                  <textPath href="#circlePath">
                    TRY FOR FREE • TRY FOR FREE •
                  </textPath>
                </text>
              </svg>

              {/* Center Circle */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-[50px] h-[50px] sm:w-[55px] sm:h-[55px] lg:w-[70px] lg:h-[70px] bg-[#dabf67] rounded-full flex items-center justify-center shadow-[0_10px_30px_rgba(218,191,103,0.3)]">
                  <img
                    src="/images/img_vuesax_linear_arrow_up.svg"
                    alt="Arrow"
                    className="w-4 h-4 sm:w-5 sm:h-5 lg:w-6 lg:h-6"
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;