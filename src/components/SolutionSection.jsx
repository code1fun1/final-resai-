import React from 'react';

const SolutionSection = () => {
  const solutions = [
    {
      icon: "/images/img_radio_check_circle_01_white_a700.svg",
      title: "Beat the ATS Filter",
      description: "Get a role-specific resume optimized to pass every applicant tracking system."
    },
    {
      icon: "/images/img_note_01_check.svg",
      title: "Know Your Skill Gaps",
      description: "See exactly which skills are standing between you and your target role."
    },
    {
      icon: "/images/img_stairs_14945624.svg",
      title: "Get Your Roadmap",
      description: "A step-by-step 6-month plan to transition into your target role."
    }
  ];

  return (
    <section className="w-full bg-[#f6f6f6] py-8 sm:py-12 lg:py-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
        <div className="w-full bg-[#171717] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] p-6 sm:p-8 lg:p-[90px] lg:px-[56px] overflow-hidden"
             style={{ 
               backgroundImage: "url('/images/img_group_2_677x1240.png')", 
               backgroundSize: 'cover', 
               backgroundPosition: 'center' 
             }}>
          
          <div className="flex flex-col justify-center items-center w-full">
            <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[36px] justify-start items-center w-full lg:w-[94%]">
              
              {/* Section Header */}
              <div className="flex flex-col gap-2 justify-start items-start w-full">
                <button 
                  className="bg-[#735302] rounded-[16px] px-5 py-1 text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[22px] text-left text-white"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Solution
                </button>
                
                <h2 
                  className="text-[36px] sm:text-[48px] lg:text-[60px] font-medium leading-[45px] sm:leading-[60px] lg:leading-[75px] text-left text-white w-full lg:w-[92%] mt-4"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  ResAI shows you exactly what to do next — and gives you the tools to get there.
                </h2>
              </div>

              {/* Solutions Grid */}
              <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-[32px] justify-start items-center w-full mt-8 sm:mt-12 lg:mt-16">
                {solutions?.map((solution, index) => (
                  <div key={index} className="flex flex-col gap-4 sm:gap-5 justify-start items-start w-full border-b border-[#dfdfdf] pb-6 sm:pb-7 lg:pb-7">
                    
                    <img 
                      src={solution?.icon}
                      alt="Solution Icon"
                      className="w-[36px] sm:w-[40px] lg:w-[42px] h-[36px] sm:h-[40px] lg:h-[42px]"
                    />
                    
                    <div className="flex flex-col gap-1 justify-start items-start w-full">
                      <h3 
                        className="text-[20px] sm:text-[22px] lg:text-[24px] font-medium leading-[28px] sm:leading-[30px] lg:leading-[33px] text-left text-white"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {solution?.title}
                      </h3>
                      
                      <p 
                        className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[26px] sm:leading-[28px] lg:leading-[30px] text-left text-white w-full mt-1"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {solution?.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SolutionSection;