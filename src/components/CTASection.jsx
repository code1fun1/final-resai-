import React from 'react';

const CTASection = () => {
  return (
    <section className="w-full px-4 sm:px-6 lg:px-[84px] py-4 sm:py-5 lg:py-[26px]">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="relative w-full h-[200px] sm:h-[250px] lg:h-[320px] bg-[#171717] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] p-4 sm:p-6 lg:p-[34px] overflow-hidden">
          
          {/* Main Content */}
          <div className="flex flex-col lg:flex-row justify-center items-center w-full h-full relative z-10">
            
            {/* Text Content */}
            <div className="flex flex-col gap-3 sm:gap-4 lg:gap-[18px] justify-start items-center w-full lg:w-[72%]">
              <h2 
                className="text-[24px] sm:text-[32px] lg:text-[40px] font-medium leading-[30px] sm:leading-[40px] lg:leading-[50px] text-center text-white w-full"
                style={{ fontFamily: 'Satoshi' }}
              >
                ResAI helps professionals built careers as well as switch careers  
              </h2>
              
              <p 
                className="text-[16px] sm:text-[18px] lg:text-[20px] font-normal leading-[22px] sm:leading-[25px] lg:leading-[27px] text-center text-white"
                style={{ fontFamily: 'Satoshi' }}
              >
                With ATS-optimized resumes, personalized skill gap analysis, and a step-by-step career roadmap. 
              </p>
            </div>
          </div>

          {/* Floating Arrow Button */}
          <div className="absolute bottom-4 sm:bottom-6 lg:bottom-8 right-4 sm:right-6 lg:right-8 w-[60px] sm:w-[80px] lg:w-[114px] h-[60px] sm:h-[80px] lg:h-[114px] bg-[#dabf67] rounded-full flex items-center justify-center">
            <img 
              src="/images/img_vuesax_linear_arrow_up.svg" 
              alt="Arrow Up" 
              className="w-8 sm:w-12 lg:w-[66px] h-8 sm:h-12 lg:h-[66px]"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;