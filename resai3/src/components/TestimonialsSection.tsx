import { FunctionComponent } from 'react';

interface Stat {
  value: string;
  description: string;
}

const TestimonialsSection: FunctionComponent = () => {
  const stats: Stat[] = [
    {
      value: "+41",
      description: "Avg. Score Improvement"
    },
    {
      value: "3200+", 
      description: "Career Placement"
    },
    {
      value: "4.8/5",
      description: "User Rating"
    },
    {
      value: "5 min",
      description: "Avg. Completion"
    }
  ];

  return (
    <section className="w-full bg-[#735302] py-12 sm:py-16 lg:py-[120px] mt-8 sm:mt-12 lg:mt-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-0">
        
        <div className="flex flex-col gap-8 sm:gap-10 lg:gap-[46px] justify-center items-center w-full">
          
          {/* Section Header */}
          <div className="flex flex-col gap-2 justify-start items-start w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-[100px]">
            <button 
              className="bg-white rounded-[14px] px-5 py-1 text-[14px] sm:text-[16px] font-medium leading-[19px] sm:leading-[21px] text-left text-[#735302]"
              style={{ fontFamily: 'Geist' }}
            >
              Testimonials
            </button>
            
            <h2 
              className="text-[36px] sm:text-[48px] lg:text-[60px] font-medium leading-[45px] sm:leading-[60px] lg:leading-[75px] text-left text-white w-full mt-4"
              style={{ fontFamily: 'Satoshi' }}
            >
              People are already switching and building careers with ResAI
            </h2>
          </div>

          {/* Testimonial Card */}
          <div className="flex flex-col gap-4 sm:gap-5 lg:gap-6 justify-start items-center w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-[100px]">
            
            <p 
              className="text-[20px] sm:text-[22px] lg:text-[24px] font-medium leading-[26px] sm:leading-[29px] lg:leading-[31px] text-left text-white w-full"
              style={{ fontFamily: 'Satoshi' }}
            >
              "Thank you so much, I found this website in 2022 and now I am become an important person in this company. This website is pretty good and very helpful to providing tips on the best jobs. I am very happy now."
            </p>

            {/* Testimonial Author */}
            <div className="flex flex-col gap-4 justify-start items-start w-full">
              <img 
                src="/images/img_ellipse_15.png" 
                alt="Riya Sharma" 
                className="w-[56px] sm:w-[60px] lg:w-[64px] h-[56px] sm:h-[60px] lg:h-[64px] rounded-full object-cover"
              />
              
              <div className="flex flex-col gap-0.5 justify-center items-start w-full">
                <h4 
                  className="text-[18px] sm:text-[19px] lg:text-[20px] font-medium leading-[24px] sm:leading-[26px] lg:leading-[27px] text-left text-white"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Riya Sharma (Bangalore)
                </h4>
                <p 
                  className="text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[22px] sm:leading-[24px] lg:leading-[25px] text-left text-[#dfdfdf]"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  QA Engineer → Product Manager | ATS SCORE: 58 → 91
                </p>
              </div>
            </div>
          </div>

          {/* Stats Section */}
          <div className="flex justify-center items-end w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-[100px] border-t border-[#ffffff4c] pt-6 sm:pt-7 lg:pt-8 mt-6 sm:pt-7 lg:mt-8">
            
            <div className="flex flex-wrap lg:flex-nowrap justify-center lg:justify-start items-start w-full gap-8 sm:gap-12 lg:gap-[190px]">
              {stats?.map((stat, index) => (
                <div key={index} className="flex flex-col justify-start items-start">
                  <span 
                    className="text-[36px] sm:text-[48px] lg:text-[60px] font-medium leading-[45px] sm:leading-[65px] lg:leading-[81px] text-left text-white"
                    style={{ fontFamily: 'Satoshi' }}
                  >
                    {stat?.value}
                  </span>
                  <p 
                    className="text-[16px] sm:text-[17px] lg:text-[18px] font-normal leading-[22px] sm:leading-[24px] lg:leading-[25px] text-left text-white mt-2 sm:mt-3 lg:mt-4"
                    style={{ fontFamily: 'Satoshi' }}
                  >
                    {stat?.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
