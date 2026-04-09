import React from 'react';

const FeaturesSection = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-20 mt-8 sm:mt-12 lg:mt-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
        
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 justify-start items-center w-full">
          
          {/* Section Header */}
          <div className="flex flex-col gap-2 justify-start items-start w-full">
            <button 
              className="bg-[#735302] rounded-[16px] px-5 py-1 text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[22px] text-left text-white"
              style={{ fontFamily: 'Satoshi' }}
            >
              Features
            </button>
            
            <h2 
              className="text-[36px] sm:text-[48px] lg:text-[60px] font-medium leading-[45px] sm:leading-[60px] lg:leading-[75px] text-left text-[#03030d] w-full mt-4"
              style={{ fontFamily: 'Satoshi' }}
            >
              Everything you needed to engineer your career— in one platform.
            </h2>
            
            <div className="flex flex-row items-center gap-3 mt-6">
              <button 
                className="bg-[#dabf67] rounded-[24px] px-6 py-3 text-[16px] font-bold leading-[20px] text-center text-[#171717] hover:bg-[#c9a84c] transition-colors"
                style={{ fontFamily: 'Satoshi' }}
              >
                Signup
              </button>
              <button 
                className="w-[44px] h-[44px] bg-[#dabf67] rounded-full flex items-center justify-center hover:bg-[#c9a84c] transition-colors"
              >
                <img 
                  src="/images/img_huge_icon_arrow.svg" 
                  alt="Arrow" 
                  className="w-5 h-5"
                />
              </button>
            </div>
          </div>

          {/* Features Grid */}
          <div className="flex flex-col gap-4 justify-start items-center w-full mt-8 sm:mt-12 lg:mt-16">
            
            {/* Top Row - 3 Cards */}
            <div className="flex flex-col lg:flex-row gap-4 justify-start items-center w-full">
              
              {/* Card 1 - Beat ATS Filter */}
              <div className="flex flex-col gap-8 sm:gap-12 lg:gap-[60px] justify-center items-start w-full h-auto bg-[#f6f6f6] border border-transparent rounded-[30px] p-6 sm:p-8 lg:p-9"
                   style={{ 
                     borderImage: 'linear-gradient(180deg,#a98536 0%, #d7bc65 100%) 1'
                   }}>
                <h3 
                  className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[28px] sm:leading-[30px] lg:leading-[33px] text-left text-[#735302]"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Beat the ATS Filter
                </h3>
                
                <p 
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[24px] sm:leading-[26px] lg:leading-[27px] text-left text-[#535353] w-full"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Your resume is rewritten and optimized for the specific job you are targeting — guaranteed to pass applicant tracking systems.
                </p>
              </div>

              {/* Card 2 - Know Your Skill Gaps */}
              <div className="flex flex-col gap-8 sm:gap-12 lg:gap-[56px] justify-start items-start w-full h-auto bg-[#171717] rounded-[30px] p-6 sm:p-8 lg:p-9">
                <h3 
                  className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[28px] sm:leading-[30px] lg:leading-[33px] text-left text-white"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Know Your Skill Gaps
                </h3>
                
                <p 
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[24px] sm:leading-[26px] lg:leading-[27px] text-left text-white w-full"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  ResAI compares your current skills to what is actually required for your target role — and shows you exactly what to learn next.
                </p>
              </div>

              {/* Card 3 - Close Your Gaps */}
              <div className="flex flex-col gap-8 sm:gap-12 lg:gap-[56px] justify-start items-start w-full h-auto bg-[#171717] rounded-[30px] p-6 sm:p-8 lg:p-9">
                <h3 
                  className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[28px] sm:leading-[30px] lg:leading-[33px] text-left text-white"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Close Your Gaps, Fast
                </h3>
                
                <p 
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[24px] sm:leading-[26px] lg:leading-[27px] text-left text-white w-full"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Get personalized course recommendations from top platforms — matched to your exact skill gaps, not generic suggestions.
                </p>
              </div>
            </div>

            {/* Bottom Row - 2 Cards */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-4">
              
              {/* Card 4 - Career Roadmap */}
              <div className="flex flex-col gap-5 sm:gap-6 lg:gap-[30px] justify-start items-start w-full lg:w-[34%] h-auto bg-[#171717] rounded-[30px] p-6 sm:p-8 lg:p-9">
                <h3 
                  className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold leading-[26px] sm:text-[28px] lg:leading-[31px] text-left text-white w-full lg:w-[80%]"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Your 6-Month Career Roadmap
                </h3>
                
                <p 
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[24px] sm:leading-[26px] lg:leading-[27px] text-left text-white w-full lg:w-[94%]"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  A structured, step-by-step plan — from your current role to your target role, with milestones you can actually follow.
                </p>
              </div>

              {/* Card 5 - Image Feature */}
              <div className="flex flex-row justify-center items-center w-full lg:w-auto bg-[#171717] rounded-[30px]">
                <img 
                  src="/images/img_image_1707.png" 
                  alt="Career Roadmap Preview" 
                  className="w-full lg:w-[800px] h-auto object-cover rounded-[30px]"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;