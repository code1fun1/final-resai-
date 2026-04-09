import React, { useState } from 'react';

const ApproachSection = () => {
  const [hoveredCard, setHoveredCard] = useState(null);

  const comparisons = [
    {
      id: 1,
      icon: "/images/img_pdf_note.svg",
      before: "Same resume sent to every job",
      after: "Role-specific resume tailored to each position with ATS optimization"
    },
    {
      id: 2, 
      icon: "/images/img_computer_monitor_chat.svg",
      before: "Applying randomly, hoping something sticks",
      after: "Strategic application process with targeted skill development plan"
    }
  ];

  return (
    <section className="w-full bg-[#f6f6f6] py-8 sm:py-12 lg:py-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-0">
        
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[38px] justify-center items-center w-full">
          
          {/* Section Header */}
          <div className="flex flex-col justify-start items-start w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-[100px]">
            <button 
              className="bg-[#735302] rounded-[16px] px-5 py-1 text-[14px] sm:text-[16px] font-medium leading-[20px] sm:leading-[22px] text-left text-white"
              style={{ fontFamily: 'Satoshi' }}
            >
              Approach
            </button>
            
            <h2 
              className="text-[36px] sm:text-[48px] lg:text-[60px] font-medium leading-[45px] sm:leading-[65px] lg:leading-[81px] text-left text-[#03030d] mt-4"
              style={{ fontFamily: 'Satoshi' }}
            >
              The Difference Real Guidance Makes
            </h2>
          </div>

          {/* Comparison Cards */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-5 justify-start items-center w-full max-w-[1018px] mx-auto px-4 sm:px-6 lg:px-0">
            
            {comparisons?.map((comparison, index) => (
              <div key={comparison?.id} className="flex flex-col lg:flex-row justify-center items-center w-full bg-white rounded-[24px] p-4 sm:p-6 lg:p-0 gap-4 lg:gap-0">
                
                {/* Before Card */}
                <div className="flex flex-row justify-start items-center w-full lg:flex-1 px-4 sm:px-6 lg:px-8 py-4 sm:py-6 lg:py-8">
                  <img 
                    src={comparison?.icon}
                    alt="Before Icon"
                    className="w-[36px] sm:w-[40px] lg:w-[42px] h-[36px] sm:h-[40px] lg:h-[42px] mr-3"
                  />
                  <span 
                    className="text-[18px] sm:text-[19px] lg:text-[20px] font-medium leading-[24px] sm:leading-[26px] lg:leading-[27px] text-left text-[#03030d]"
                    style={{ fontFamily: 'Satoshi' }}
                  >
                    {comparison?.before}
                  </span>
                </div>

                {/* Arrow & Hover Button */}
                <div className="flex flex-row justify-center items-center w-auto">
                  <button 
                    className="w-[56px] sm:w-[60px] lg:w-[66px] h-[56px] sm:h-[60px] lg:h-[66px] bg-[#dabf67] rounded-full flex items-center justify-center mr-2 hover:opacity-90 transition-opacity"
                    onMouseEnter={() => setHoveredCard(comparison?.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    <img 
                      src="/images/img_huge_icon_arrow.svg" 
                      alt="Arrow" 
                      className="w-6 sm:w-7 lg:w-8 h-6 sm:h-7 lg:h-8"
                    />
                  </button>
                  
                  <button 
                    className="bg-[#dabf67] rounded-[24px] px-4 sm:px-5 lg:px-[22px] py-6 sm:py-7 lg:py-8 text-[18px] sm:text-[19px] lg:text-[20px] font-normal leading-[24px] sm:leading-[26px] lg:leading-[27px] text-center text-[#03030d] hover:opacity-90 transition-opacity"
                    style={{ fontFamily: 'Satoshi' }}
                    onMouseEnter={() => setHoveredCard(comparison?.id)}
                    onMouseLeave={() => setHoveredCard(null)}
                  >
                    Hover to see what changes with us
                  </button>
                </div>
              </div>
            ))}

            {/* Enhanced Card (Always visible for demo) */}
            <div className="flex flex-row justify-start items-center w-full bg-[#dabf67] rounded-[24px] px-4 sm:px-6 lg:px-8 py-6 sm:py-7 lg:py-8">
              <img 
                src="/images/img_pdf_note_black_900_01.svg"
                alt="After Icon"
                className="w-[36px] sm:w-[40px] lg:w-[42px] h-[36px] sm:h-[40px] lg:h-[42px] mr-3"
              />
              <span 
                className="text-[18px] sm:text-[19px] lg:text-[20px] font-medium leading-[24px] sm:leading-[26px] lg:leading-[27px] text-left text-[#03030d]"
                style={{ fontFamily: 'Satoshi' }}
              >
                Clear skill gap report with specific skills to learn for your target role
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ApproachSection;