import React from 'react';

const HowItWorksSection = () => {
  const steps = [
    {
      number: "01",
      title: "Upload your resume or build one from scratch",
      description: "It takes under 2 minutes.",
    },
    {
      number: "02",
      title: "Tell us your target role",
      description: "Paste the job description for a 40% better ATS match.",
    },
    {
      number: "03",
      title: "Download your ATS-optimized resume",
      description: "Unlock your personalized 6-month career roadmap.",
    }
  ];

  return (
    <section className="w-full bg-white py-10 sm:py-14 lg:py-20">
      <div className="w-full max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-[100px]">

        {/* Badge */}
        <div className="inline-flex items-center bg-[#735302] rounded-[16px] px-3 py-1 mb-6">
          <span
            className="text-[13px] sm:text-[14px] font-medium text-white"
            style={{ fontFamily: 'Satoshi' }}
          >
            How It Works?
          </span>
        </div>

        {/* Heading */}
        <h2
          className="text-[36px] sm:text-[48px] lg:text-[60px] font-medium leading-[1.2] text-[#03030d] mb-12 sm:mb-16 lg:mb-20"
          style={{ fontFamily: 'Satoshi' }}
        >
          From resume to career<br />
          move in 3 steps.
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 lg:gap-8 mb-10 sm:mb-12 lg:mb-14">
          {steps?.map((step) => (
            <div key={step?.number} className="flex flex-col">
              {/* Invisible spacer to align all steps consistently */}
              <div className="w-8 h-[3px] mb-6 invisible" />

              {/* Step number (faded background) */}
              <span
                className="text-[72px] sm:text-[80px] lg:text-[96px] font-bold leading-none text-[#f0f0f0] mb-[-32px] sm:mb-[-36px] lg:mb-[-40px] select-none"
                style={{ fontFamily: 'Satoshi' }}
              >
                {step?.number}
              </span>

              {/* Title */}
              <h3
                className="text-[18px] sm:text-[20px] lg:text-[22px] font-medium leading-[1.35] text-[#03030d] mb-2 relative z-10"
                style={{ fontFamily: 'Satoshi' }}
              >
                {step?.title}
              </h3>

              {/* Description */}
              <p
                className="text-[15px] sm:text-[16px] lg:text-[17px] font-normal leading-[1.5] text-[#535353]"
                style={{ fontFamily: 'Satoshi' }}
              >
                {step?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Full-width image block with CTA overlay */}
        <div className="relative w-full rounded-2xl overflow-hidden" style={{ minHeight: '380px' }}>
          <img
            src="/images/img_image_1708.png"
            alt="Team working together"
            className="w-full h-full object-cover"
            style={{ minHeight: '380px', maxHeight: '480px' }}
          />
          {/* Overlay button on left side */}
          <div className="absolute left-6 sm:left-10 top-1/2 -translate-y-1/2">
            <button
              className="flex items-center gap-3 bg-[#f5c842] hover:bg-[#e6b830] text-[#03030d] font-medium text-[15px] sm:text-[16px] rounded-full px-5 py-3 transition-colors duration-200"
              style={{ fontFamily: 'Satoshi' }}
            >
              Start Free Resume Analysis
              <span className="flex items-center justify-center w-7 h-7 bg-[#03030d] rounded-full">
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M2 7H12M12 7L7.5 2.5M12 7L7.5 11.5" stroke="#f5c842" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </span>
            </button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;