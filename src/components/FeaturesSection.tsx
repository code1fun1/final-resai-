import { FunctionComponent } from "react";

const FeaturesSection: FunctionComponent = () => {
  return (
    <section className="w-full bg-[#f6f6f6] py-14 sm:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[100px]">

        {/* HEADER */}
        <div className="flex flex-col items-start">
          <button
            className="
              bg-[#735302]
              rounded-[16px]
              px-4 sm:px-5
              py-1
              text-white
              text-[14px]
              sm:text-[15px]
              lg:text-[16px]
              font-medium
            "
            style={{ fontFamily: "Satoshi" }}
          >
            Features
          </button>

          <h2
            className="
              mt-4 sm:mt-5 lg:mt-6
              w-full
              lg:w-[1240px]
              text-[36px]
              sm:text-[48px]
              lg:text-[60px]
              font-[500]
              leading-[125%]
              tracking-[-0.02em]
              text-[#03030d]
            "
            style={{ fontFamily: "Satoshi" }}
          >
            Everything you needed to engineer your career— in one platform.
          </h2>
        </div>

        {/* FEATURES GRID */}
        <div className="mt-10 sm:mt-12 lg:mt-16 flex flex-col gap-4">

          {/* TOP ROW */}
          <div
            className="
              grid
              grid-cols-1
              sm:grid-cols-2
              lg:grid-cols-3
              gap-4
            "
          >
            {/* Card 1 */}
            <div
              className="
                min-h-[260px]
                sm:min-h-[280px]
                lg:h-[320px]
                rounded-[24px]
                lg:rounded-[30px]
                border border-[#d7bc65]
                bg-[#f6f6f6]
                p-6 sm:p-8 lg:p-9
                flex flex-col justify-between
              "
            >
              <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-[#735302] leading-[130%]">
                Beat the ATS Filter
              </h3>

              <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[160%] text-[#535353]">
                Your resume is rewritten and optimized for the specific job
                you're targeting — guaranteed to pass applicant tracking systems.
              </p>
            </div>

            {/* Card 2 */}
            <div
              className="
                min-h-[260px]
                sm:min-h-[280px]
                lg:h-[320px]
                rounded-[24px]
                lg:rounded-[30px]
                bg-[#171717]
                p-6 sm:p-8 lg:p-9
                flex flex-col justify-between
              "
            >
              <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-white leading-[130%]">
                Know Your Skill Gaps
              </h3>

              <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[160%] text-white">
                ResAI compares your current skills to what's actually required
                for your target role — and shows you exactly what to learn next.
              </p>
            </div>

            {/* Card 3 */}
            <div
              className="
                min-h-[260px]
                sm:min-h-[280px]
                lg:h-[320px]
                rounded-[24px]
                lg:rounded-[30px]
                bg-[#171717]
                p-6 sm:p-8 lg:p-9
                flex flex-col justify-between
              "
            >
              <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-white leading-[130%]">
                Close Your Gaps, Fast
              </h3>

              <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[160%] text-white">
                Get personalized course recommendations from top platforms —
                matched to your exact skill gaps, not generic suggestions.
              </p>
            </div>
          </div>

          {/* BOTTOM ROW */}
          <div
            className="
              grid
              grid-cols-1
              lg:grid-cols-[0.9fr_2.1fr]
              gap-4
            "
          >
            {/* Roadmap Card */}
            <div
              className="
                min-h-[260px]
                sm:min-h-[280px]
                lg:h-[320px]
                rounded-[24px]
                lg:rounded-[30px]
                bg-[#171717]
                p-6 sm:p-8 lg:p-9
                flex flex-col justify-between
              "
            >
              <h3 className="text-[20px] sm:text-[22px] lg:text-[24px] font-bold text-white leading-[130%] max-w-[280px]">
                Your 6-Month Career Roadmap
              </h3>

              <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[160%] text-white">
                A structured, step-by-step plan — from your current role to your
                target role, with milestones you can actually follow.
              </p>
            </div>

            {/* Image Card */}
            <div
              className="
                h-[260px]
                sm:h-[320px]
                lg:h-[320px]
                rounded-[24px]
                lg:rounded-[30px]
                overflow-hidden
              "
            >
              <img
                src="/images/img_image_1707.png"
                alt="Career Roadmap Preview"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
