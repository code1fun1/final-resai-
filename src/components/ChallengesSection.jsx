import React from 'react';

const ChallengesSection = () => {
  const challenges = [
    {
      icon: "/images/img_pdf_note.svg",
      title: "Generic resumes get ignored",
      description: "Hiring managers see hundreds of similar profiles every day."
    },
    {
      icon: "/images/img_question_help_circle.svg",
      title: "You do not know which skills are holding you back",
      description: "And no one tells you what is actually missing."
    },
    {
      icon: "/images/img_briefcase_job_01.svg",
      title: "Switching careers feels overwhelming and slow",
      description: "There is no clear path, just guesswork."
    }
  ];

  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-16">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-12 justify-start items-center w-full">
          
          {/* Section Header */}
          <div className="flex flex-col gap-2 justify-start items-start w-full">
            <button 
              className="bg-[#735302] rounded-[16px] px-5 py-1 text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[22px] text-left text-white"
              style={{ fontFamily: 'Satoshi' }}
            >
              Challenges
            </button>
            
            <h2 
              className="text-[36px] sm:text-[48px] lg:text-[60px] font-medium leading-[45px] sm:leading-[60px] lg:leading-[75px] text-left text-[#03030d] w-full sm:w-[80%] lg:w-[56%] mt-4"
              style={{ fontFamily: 'Satoshi' }}
            >
              Still sending resumes and hearing nothing?
            </h2>
          </div>

          {/* Challenges Grid */}
          <div className="flex flex-col lg:flex-row gap-6 sm:gap-8 lg:gap-[32px] w-full mt-8 sm:mt-12 lg:mt-16">
            {challenges?.map((challenge, index) => (
              <div key={index} className="flex flex-col gap-4 sm:gap-6 justify-start items-center w-full lg:w-[392px] border-b border-[#dfdfdf] pb-6 sm:pb-8 lg:pb-8">
                
                {/* Icon and Title */}
                <div className="flex flex-col gap-4 sm:gap-6 justify-start items-start w-full">
                  <img 
                    src={challenge?.icon}
                    alt="Challenge Icon"
                    className="w-[36px] sm:w-[40px] lg:w-[42px] h-[36px] sm:h-[40px] lg:h-[42px]"
                  />
                  
                  <h3 
                    className="text-[20px] sm:text-[22px] lg:text-[24px] font-medium leading-[28px] sm:leading-[30px] lg:leading-[33px] text-left text-[#03030d]"
                    style={{ fontFamily: 'Satoshi' }}
                  >
                    {challenge?.title}
                  </h3>
                </div>

                {/* Description */}
                <p 
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[26px] sm:leading-[29px] lg:leading-[31px] text-left text-[#535353] w-full"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  {challenge?.description}
                </p>
              </div>
            ))}
          </div>

          {/* See Solution CTA */}
          <div className="flex flex-col gap-4 sm:gap-6 justify-center items-center w-full mt-8 sm:mt-12 lg:mt-16">
            <p 
              className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-center text-[#03030d]"
              style={{ fontFamily: 'Satoshi' }}
            >
              See Solution
            </p>
            
            <button className="w-[64px] sm:w-[72px] lg:w-[88px] h-[64px] sm:h-[72px] lg:h-[88px] bg-[#dabf67] rounded-full flex items-center justify-center hover:opacity-90 transition-opacity">
              <img 
                src="/images/img_huge_icon_arrow.svg" 
                alt="Arrow Down" 
                className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8"
              />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;