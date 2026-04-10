import { FunctionComponent } from 'react';

interface Step {
  number: string;
  title: string;
  description: string;
}

const HowItWorksSection: FunctionComponent = () => {
  const steps: Step[] = [
    {
      number: "01",
      title: "Upload your resume or build one from scratch",
      description: "It takes under 2 minutes.",
    },
    {
      number: "02",
      title: "Tell us your target\nrole",
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
          className="text-[36px] sm:text-[48px] lg:text-[60px] font-[500] leading-[125%] tracking-[-0.02em] text-[#03030d] mb-6 sm:mb-8 lg:mb-16"
          style={{ fontFamily: 'Satoshi' }}
        >
          From resume to career<br />
          move in 3 steps.
        </h2>

        {/* Steps Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-10 sm:gap-6 lg:gap-[88px] mb-10 sm:mb-12 lg:mb-14">
          {steps?.map((step) => (
            <div key={step?.number} className="flex flex-col">
              {/* Step number (faded background) */}
              <span
                className="text-[60px] font-[500] leading-[125%] tracking-[-0.02em] text-[#EDEDED] mb-[-28px] lg:mb-[-32px] select-none"
                style={{ fontFamily: 'Satoshi' }}
              >
                {step?.number}
              </span>

              {/* Title */}
              <h3
                className="text-[22px] sm:text-[24px] lg:text-[24px] font-[500] leading-[132%] tracking-[0.02em] text-[#04040E] mb-2 relative z-10 whitespace-pre-line"
                style={{ fontFamily: 'Satoshi' }}
              >
                {step?.title}
              </h3>

              {/* Description */}
              <p
                className="text-[15px] sm:text-[16px] lg:text-[16px] font-[400] leading-[155%] tracking-[0] text-[#535353]"
                style={{ fontFamily: 'Satoshi' }}
              >
                {step?.description}
              </p>
            </div>
          ))}
        </div>

        {/* Full-width image block with CTA overlay */}
        <div className="relative w-full rounded-2xl overflow-hidden">
          <img
            src="/images/img_image_1708.png"
            alt="Team working together"
            className="w-full object-cover object-[center_20%]"
            style={{ height: '550px' }}
          />

          {/* Animated Merge CTA */}
          <div className="absolute left-6 sm:left-10 top-[30px] group flex items-center w-fit cursor-pointer">

            {/* Text pill */}
            <div
              className="
                bg-[#f5c842]
                group-hover:bg-[#e6b830]
                text-[#03030d] font-bold text-[14px] sm:text-[15px]
                rounded-full
                pl-5 pr-5
                group-hover:pr-[52px]
                py-[10px]
                flex items-center
                transition-all duration-500 ease-in-out
                relative z-10
              "
              style={{ fontFamily: 'Satoshi' }}
            >
              Start Free Resume Analysis
            </div>

            {/* Arrow pill - slides behind on hover */}
            <div
              className="
                bg-[#f5c842]
                group-hover:bg-[#e6b830]
                w-[38px] h-[38px]
                rounded-full
                flex items-center justify-center
                transition-all duration-500 ease-in-out
                shrink-0
                ml-2
                group-hover:ml-0
                group-hover:-translate-x-[46px]
                group-hover:opacity-0
                relative z-0
              "
            >
              <svg width="13" height="13" viewBox="0 0 14 14" fill="none">
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="#03030d"
                  strokeWidth="1.8"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
