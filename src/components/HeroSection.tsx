import { FunctionComponent } from "react";

const HeroSection: FunctionComponent = () => {
  return (
    <section className="w-full bg-[#f6f6f6] overflow-hidden lg:min-h-[760px]">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[100px] lg:min-h-[760px] flex flex-col lg:flex-row items-center">

        {/* LEFT CONTENT */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center pt-10 lg:pt-0">
          <h1
            className="
              font-[900]
              text-[#03030d]
              leading-[125%]
              tracking-[0]
              text-[44px]
              sm:text-[56px]
              md:text-[64px]
              lg:text-[72px]
            "
            style={{ fontFamily: "Satoshi" }}
          >
            <span className="block">Your next career.</span>
            <span className="block text-[#4E3000]">Engineered.</span>
          </h1>

          <p
            className="
              mt-5 lg:mt-6
              text-[#535353]
              leading-[155%]
              text-[16px]
              sm:text-[18px]
              lg:text-[20px]
              font-[500]
              max-w-full
              lg:max-w-[560px]
            "
            style={{ fontFamily: "Satoshi" }}
          >
            Build a role-specific resume, close your skill gaps, and get a
            step-by-step career roadmap — all in one platform, built for Indian
            professionals.
          </p>

          {/* CTA */}
          <div className="flex flex-col sm:flex-row sm:flex-wrap items-start sm:items-center gap-4 mt-8 lg:mt-10">

            {/* Animated Merge CTA */}
            <div className="group flex items-center w-fit cursor-pointer relative">

              {/* Main Button */}
              <button
                className="
                  h-[51px]
                  pl-[24px] pr-[24px]
                  lg:pl-[34px] lg:pr-[34px]
                  rounded-full
                  bg-[#dabf67]
                  group-hover:bg-[#c7aa4d]
                  group-hover:pr-[76px]
                  lg:group-hover:pr-[86px]
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-500
                  ease-in-out
                  relative
                  z-10
                "
              >
                <span className="text-[15px] lg:text-[16px] font-[500] text-[#03030d] whitespace-nowrap">
                  Start Free Resume Analysis
                </span>
              </button>

              {/* Arrow Button - slides behind main button on hover */}
              <button
                className="
                  w-[51px]
                  h-[51px]
                  rounded-full
                  bg-[#dabf67]
                  group-hover:bg-[#c7aa4d]
                  flex
                  items-center
                  justify-center
                  transition-all
                  duration-500
                  ease-in-out
                  shrink-0
                  ml-0
                  group-hover:ml-0
                  group-hover:-translate-x-[51px]
                  group-hover:opacity-0
                  relative
                  z-0
                "
              >
                <img
                  src="/images/img_huge_icon_arrow.svg"
                  alt="Arrow"
                  className="w-5 h-5"
                />
              </button>
            </div>

            {/* Secondary Button */}
            <button className="h-[51px] px-[24px] lg:px-[34px] rounded-full border border-[#dabf67] hover:bg-[#dabf67]/10 transition-all">
              <span className="text-[15px] lg:text-[16px] font-medium text-[#03030d] whitespace-nowrap">
                See how it works
              </span>
            </button>
          </div>

          {/* Social Proof */}
          <div className="mt-8 lg:mt-10 flex flex-col gap-6">
            <img
              src="/images/img_user_profiles.png"
              alt="Users"
              className="w-[140px] sm:w-[168px] h-auto"
            />

            <div>
              <h3 className="text-[18px] font-[500] text-[#03030d] leading-[155%] tracking-[-0.02em]" style={{ fontFamily: 'Satoshi' }}>
                Join 3,200+
              </h3>

              <p className="mt-0 text-[16px] lg:text-[18px] text-[#535353] leading-[150%] max-w-[320px]">
                professionals who switched & Built careers with ResAI
              </p>
            </div>
          </div>
        </div>

        {/* RIGHT IMAGE SIDE */}
        <div className="w-full lg:w-1/2 relative h-[420px] sm:h-[520px] md:h-[620px] lg:h-[760px] flex items-end justify-center lg:justify-end mt-10 lg:mt-0 overflow-hidden lg:overflow-visible">

          <img
            src="/images/img_image_1718.png"
            alt="Career Professional"
            className="
              h-[380px]
              sm:h-[480px]
              md:h-[560px]
              lg:h-[730px]
              w-auto
              object-contain
              relative
              z-10
            "
          />

          {/* Rating Card */}
          <div className="absolute left-[10px] sm:left-[60px] md:left-[80px] lg:left-[0px] xl:left-[20px] top-[180px] sm:top-[230px] md:top-[270px] lg:top-[300px] xl:top-[340px] w-[208px] h-[80px] bg-white/90 backdrop-blur-[15px] rounded-[20px] border border-white/90 p-[9px] flex items-center gap-[9px] z-20 origin-left transition-transform duration-300 hover:scale-105 cursor-default">
            <div className="w-[56px] h-[56px] shrink-0 rounded-full bg-[#fefce8] flex items-center justify-center">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="#eab308">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
              </svg>
            </div>

            <div>
              <div className="text-[16px] font-[700] leading-[100%] tracking-[0] text-[#04040E]" style={{ fontFamily: 'Satoshi' }}>
                4.8 / 5.0
              </div>
              <div className="mt-1 text-[16px] font-[400] leading-[100%] tracking-[0] text-[#787878]" style={{ fontFamily: 'Satoshi' }}>
                12.5K Reviews
              </div>
            </div>
          </div>

          {/* Salary Icon */}
          <div className="absolute top-[30px] sm:top-[50px] md:top-[60px] lg:top-[200px] xl:top-[200px] right-[20px] sm:right-[80px] md:right-[100px] lg:right-[10px] xl:right-[30px] w-[56px] h-[56px] lg:w-[62px] lg:h-[62px] xl:w-[74px] xl:h-[74px] bg-white/90 backdrop-blur-sm rounded-[20px] shadow-md flex items-center justify-center z-20 transition-transform duration-300 hover:scale-110 cursor-default">
            <img src="/images/img_text.svg" alt="Salary Icon" className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" />
          </div>

          {/* Chart Icon */}
          <div className="absolute left-[10px] sm:left-[60px] md:left-[80px] lg:left-[0px] xl:left-[20px] bottom-[100px] sm:bottom-[130px] md:bottom-[150px] lg:bottom-[160px] xl:bottom-[180px] w-[56px] h-[56px] lg:w-[62px] lg:h-[62px] xl:w-[74px] xl:h-[74px] bg-white/90 backdrop-blur-sm rounded-[20px] shadow-md flex items-center justify-center z-20 transition-transform duration-300 hover:scale-110 cursor-default">
            <img src="/images/img_image_1709_vectorized.svg" alt="Chart Icon" className="w-8 h-8 lg:w-9 lg:h-9 xl:w-10 xl:h-10" />
          </div>

          {/* ATS Card */}
          <div className="absolute right-[10px] sm:right-[60px] md:right-[80px] lg:right-[0px] xl:right-[10px] bottom-[40px] sm:bottom-[60px] md:bottom-[80px] lg:bottom-[100px] xl:bottom-[120px] bg-white/90 backdrop-blur-sm rounded-[20px] shadow-lg px-4 py-3 flex items-center gap-3 z-20 origin-right transition-transform duration-300 hover:scale-105 cursor-default">
            <div className="w-[38px] h-[38px] shrink-0 rounded-[12px] border border-gray-100 flex items-center justify-center">
              <img src="/images/img_radio_check_circle_01.svg" alt="Check" className="w-5 h-5" />
            </div>

            <div>
              <div className="text-[16px] font-[700] leading-[100%] text-[#04040E]" style={{ fontFamily: 'Satoshi' }}>
                ATS-Approved
              </div>
              <div className="mt-1 text-[14px] font-[400] leading-[100%] text-[#787878]" style={{ fontFamily: 'Satoshi' }}>
                ATS Ready Template
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
