import { FunctionComponent } from 'react';

const HeroSection: FunctionComponent = () => {
  return (
    <section className="w-full bg-[#f0f0f0] overflow-hidden" style={{ minHeight: '680px' }}>
      <div className="w-full max-w-[1440px] mx-auto relative flex flex-col lg:flex-row" style={{ minHeight: '680px' }}>
        
        {/* Left Content */}
        <div className="flex flex-col justify-center items-start w-full lg:w-[55%] px-6 sm:px-10 lg:pl-[100px] lg:pr-8 py-16 lg:py-20 z-10">
          <div className="flex flex-col gap-8 justify-start items-start w-full">
            
            {/* Headline */}
            <div className="flex flex-col gap-2 justify-start items-start w-full">
              <h1
                className="font-satoshi font-black leading-[1.05] tracking-tight text-[clamp(40px,5.5vw,76px)]"
              >
                <span className="text-[#03030d] block">
                  Your next career
                </span>
                <span className="text-[#4e3000] block">
                  Engineered.
                </span>
              </h1>

              <p
                className="text-[16px] sm:text-[17px] font-normal leading-[1.65] text-left text-[#535353] w-full mt-3"
                style={{ fontFamily: 'Satoshi', maxWidth: '420px' }}
              >
                Build a role-specific resume, close your skill gaps, and get a step-by-step career roadmap — all in one platform, built for Indian professionals.
              </p>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-row flex-wrap justify-start items-center gap-3">
              <div className="flex flex-row items-center gap-2">
                <button
                  className="bg-[#c9a84c] rounded-[28px] px-6 py-3 flex justify-center items-center hover:bg-[#b8973e] transition-colors"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  <span className="text-[15px] font-medium leading-[22px] text-center text-[#03030d] whitespace-nowrap">
                    Start Free Resume Analysis
                  </span>
                </button>
                <button className="w-[46px] h-[46px] bg-[#c9a84c] rounded-[23px] flex items-center justify-center hover:bg-[#b8973e] transition-colors flex-shrink-0">
                  <img
                    src="/images/img_huge_icon_arrow.svg"
                    alt="Arrow"
                    className="w-5 h-5"
                  />
                </button>
              </div>

              <button
                className="border border-[#c9a84c] bg-transparent rounded-[28px] px-6 py-3 hover:bg-[#c9a84c] hover:bg-opacity-10 transition-colors whitespace-nowrap"
                style={{ fontFamily: 'Satoshi' }}
              >
                <span className="text-[15px] font-medium leading-[22px] text-center text-[#03030d]">
                  See how it works
                </span>
              </button>
            </div>

            {/* Social Proof */}
            <div className="flex flex-col gap-3 justify-start items-start w-full">
              <img
                src="/images/img_user_profiles.png"
                alt="User Profiles"
                className="h-[48px] w-auto"
              />
              <div className="flex flex-col gap-0.5">
                <h3
                  className="text-[17px] font-bold leading-[24px] text-left text-[#03030d]"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Join 3,200+
                </h3>
                <p
                  className="text-[14px] font-normal leading-[1.5] text-left text-[#535353]"
                  style={{ fontFamily: 'Satoshi', maxWidth: '260px' }}
                >
                  professionals who switched &amp; Built careers with ResAI
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Image — full height, flush right */}
        <div className="w-full lg:w-[55%] relative mt-8 lg:mt-0" style={{ minHeight: '500px' }}>
          {/* Background image fills the right panel */}
          <img
            src="/images/img_image_1718.png"
            alt="Career Professional"
            className="w-full h-full object-contain object-bottom"
            style={{ position: 'absolute', inset: 0 }}
          />

          {/* Rating Card — left side, vertically centered */}
          <div
            className="absolute bg-white rounded-[16px] shadow-lg flex items-center gap-3 px-4 py-3"
            style={{ top: '42%', left: '4%', transform: 'translateY(-50%)' }}
          >
            <div className="w-[38px] h-[38px] bg-[#fefce8] rounded-full flex items-center justify-center flex-shrink-0">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="#eab308">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#03030d]" style={{ fontFamily: 'Satoshi' }}>4.8 / 5.0</span>
              <span className="text-[12px] text-[#7b7b7b]" style={{ fontFamily: 'Satoshi' }}>12.5K Reviews</span>
            </div>
          </div>

          {/* Money/Salary icon — top right */}
          <div
            className="absolute bg-white rounded-[16px] shadow-md flex items-center justify-center"
            style={{ top: '8%', right: '4%', width: '58px', height: '58px' }}
          >
            <img
              src="/images/img_text.svg"
              alt="Salary Icon"
              className="w-8 h-8"
            />
          </div>

          {/* Chart icon — bottom left */}
          <div
            className="absolute bg-white bg-opacity-90 rounded-[16px] shadow-md flex items-center justify-center p-3"
            style={{ bottom: '18%', left: '4%' }}
          >
            <img
              src="/images/img_image_1709_vectorized.svg"
              alt="Chart Icon"
              className="w-[52px] h-[52px]"
            />
          </div>

          {/* ATS Card — bottom right */}
          <div
            className="absolute bg-white rounded-[16px] shadow-lg flex items-center gap-3 px-4 py-3"
            style={{ bottom: '10%', right: '4%' }}
          >
            <div className="w-[36px] h-[36px] bg-white rounded-[10px] flex items-center justify-center border border-gray-100 flex-shrink-0">
              <img
                src="/images/img_radio_check_circle_01.svg"
                alt="Check"
                className="w-5 h-5"
              />
            </div>
            <div className="flex flex-col">
              <span className="text-[14px] font-bold text-[#03030d]" style={{ fontFamily: 'Satoshi' }}>ATS-Approved</span>
              <span className="text-[12px] text-[#7b7b7b]" style={{ fontFamily: 'Satoshi' }}>ATS Ready Template</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
