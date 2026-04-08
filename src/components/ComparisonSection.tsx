import { FunctionComponent } from 'react';

const ComparisonSection: FunctionComponent = () => {
  return (
    <section className="w-full bg-white py-8 sm:py-12 lg:py-20 mt-8 sm:mt-12 lg:mt-20">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-[80px]">
        
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-[30px] justify-start items-center w-full max-w-[1026px] mx-auto">
          
          {/* Section Title */}
          <h2 
            className="text-[28px] sm:text-[40px] lg:text-[60px] font-medium leading-[1.35] text-center text-[#03030d]"
            style={{ fontFamily: 'Satoshi' }}
          >
            Why ResAI vs Naukri Resume Services?
          </h2>

          {/* Comparison Cards */}
          <div className="flex flex-col gap-4 justify-start items-center w-full">
            
            {/* Comparison Row */}
            <div className="flex flex-col sm:flex-row gap-4 w-full">
              
              {/* Naukri Card */}
              <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[98px] justify-center items-start w-full sm:w-1/2 h-auto bg-[#f6f6f6] rounded-[30px] p-6 sm:p-8 lg:p-10">
                <img 
                  src="/images/img_naukri_id5uu3xyb_1.png" 
                  alt="Naukri Logo" 
                  className="w-[90px] sm:w-[110px] lg:w-[144px] h-auto"
                />
                
                <p 
                  className="text-[18px] sm:text-[20px] lg:text-[24px] font-normal leading-[1.5] text-left text-[#535353]"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  ₹4,200/yr
                  <br />
                  8-day wait
                  <br />
                  no ATS guarantee
                </p>
              </div>

              {/* ResAI Card */}
              <div className="flex flex-col gap-10 sm:gap-14 lg:gap-[92px] justify-center items-start w-full sm:w-1/2 h-auto bg-[#171717] rounded-[30px] p-6 sm:p-8 lg:p-10">
                <img 
                  src="/images/img_frame_1610067930.svg" 
                  alt="ResAI Logo" 
                  className="w-[120px] sm:w-[150px] lg:w-[196px] h-auto"
                />
                
                <p 
                  className="text-[18px] sm:text-[20px] lg:text-[24px] font-normal leading-[1.5] text-left text-white w-full"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  ₹499/yr
                  <br />
                  5 minutes
                  <br />
                  ATS-optimized + roadmap + skill gaps
                </p>
              </div>
            </div>

            {/* Quote Card */}
            <div className="flex flex-row justify-start items-center w-full bg-[#f6f6f6] rounded-[24px] p-6 sm:p-8 lg:p-10">
              <p 
                className="text-[18px] sm:text-[20px] lg:text-[24px] font-medium leading-[1.4] text-center text-[#735302] flex-1 px-2 sm:px-6 lg:px-[54px]"
                style={{ fontFamily: 'Satoshi' }}
              >
                'Less than a Zomato dinner. More valuable than a career coach.'
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ComparisonSection;
