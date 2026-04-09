import { FunctionComponent } from "react";

interface Stat {
  value: string;
  description: string;
}

const TestimonialsSection: FunctionComponent = () => {
  const stats: Stat[] = [
    { value: "+41", description: "Avg. Score Improvement" },
    { value: "3200+", description: "Career Placement" },
    { value: "4.8/5", description: "User Rating" },
    { value: "5 min", description: "Avg. Completion" },
  ];

  return (
    <section className="w-full bg-[#735302] py-[100px]">
      {/* ===== CONTAINER (STRICT FIGMA WIDTH) ===== */}
      <div className="max-w-[1240px] mx-auto px-[20px]">

        {/* ===== HEADER ===== */}
        <div className="flex flex-col gap-4">
          <button className="bg-white text-[#735302] text-[14px] font-medium px-4 py-[6px] rounded-full w-fit">
            Testimonials
          </button>

          <h2 className="text-white text-[36px] sm:text-[48px] lg:text-[60px] leading-[125%] tracking-[-0.02em] font-[500] max-w-[900px]" style={{ fontFamily: 'Satoshi' }}>
            People are already switching and building careers with ResAI
          </h2>
        </div>

        {/* ===== TESTIMONIAL TEXT ===== */}
        <div className="mt-10 max-w-[900px]">
          <p className="text-white text-[20px] leading-[30px] font-normal">
            “Thank you so much, I found this website in 2022 and now I am become
            an important person in this company. This website is pretty good and
            very helpful to providing tips on the best jobs. I am very happy now.”
          </p>
        </div>

        {/* ===== USER INFO ===== */}
        <div className="flex items-center gap-4 mt-8">
          <img
            src="/images/img_ellipse_15.png"
            alt="user"
            className="w-[56px] h-[56px] rounded-full object-cover"
          />

          <div>
            <h4 className="text-white text-[18px] font-medium">
              Riya Sharma (Bangalore)
            </h4>
            <p className="text-white/70 text-[16px] mt-1">
              QA Engineer → Product Manager | ATS SCORE: 58 → 91
            </p>
          </div>
        </div>

        {/* ===== DIVIDER ===== */}
        <div className="w-full border-t border-white/30 mt-10"></div>

        {/* ===== STATS ===== */}
        <div className="flex justify-between items-start mt-10 flex-wrap gap-y-8">

          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col min-w-[140px]">

              <span className="text-white text-[48px] font-medium leading-[60px]">
                {stat.value}
              </span>

              <p className="text-white/70 text-[16px] mt-2">
                {stat.description}
              </p>

            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;
