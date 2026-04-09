import { FunctionComponent } from "react";

interface Solution {
  icon: string;
  title: string;
  description: string;
}

const SolutionSection: FunctionComponent = () => {
  const solutions: Solution[] = [
    {
      icon: "/images/img_radio_check_circle_01_white_a700.svg",
      title: "Beat the ATS Filter",
      description:
        "Get a role-specific resume optimized to pass every applicant tracking system.",
    },
    {
      icon: "/images/img_note_01_check.svg",
      title: "Know Your Skill Gaps",
      description:
        "See exactly which skills are standing between you and your target role.",
    },
    {
      icon: "/images/img_stairs_14945624.svg",
      title: "Get Your Roadmap",
      description:
        "A step-by-step 6-month plan to transition into your target role.",
    },
  ];

  return (
    <section id="solution" className="w-full bg-[#f6f6f6] py-10 sm:py-14 lg:py-20">
      <div className="w-full max-w-[1200px] mx-auto px-6 sm:px-10 lg:px-[80px]">

        {/* ================= MAIN BOX ================= */}
        <div className="relative w-full rounded-[40px] lg:rounded-[50px] p-6 sm:p-8 lg:p-[90px] lg:px-[56px] overflow-hidden bg-[#0b0b0b]">

          {/* ===== DARK BASE GRADIENT ===== */}
          <div className="absolute inset-0 bg-gradient-to-br from-[#0b0b0b] via-[#121212] to-[#0b0b0b]"></div>

          {/* ===== TOP RIGHT CURVED SHADOW ===== */}
          <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#050505] rounded-full translate-x-1/3 -translate-y-1/3"></div>

          {/* ===== BOTTOM LEFT CURVED SHADOW ===== */}
          <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#050505] rounded-full -translate-x-1/3 translate-y-1/3"></div>

          {/* ===== SOFT CENTER GLOW ===== */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.06),transparent_60%)]"></div>

          {/* ===== 🔥 DIAGONAL LIGHT STRIP ===== */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute w-[130%] h-[130%] bg-gradient-to-r from-transparent via-white/6 to-transparent rotate-[20deg] translate-x-[-10%] translate-y-[-10%]"></div>
          </div>

          {/* ===== ✨ NOISE TEXTURE (REALISTIC UI) ===== */}
          <div className="absolute inset-0 opacity-[0.04] mix-blend-overlay pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/asfalt-dark.png')]"></div>

          {/* ================= CONTENT ================= */}
          <div className="relative z-10 flex flex-col gap-8 lg:gap-10 w-full">

            {/* HEADER */}
            <div className="flex flex-col gap-4 items-start">

              <button className="bg-[#735302] rounded-full px-4 py-1 text-[14px] font-medium text-white">
                Solution
              </button>

              <h2 className="text-[32px] sm:text-[42px] lg:text-[52px] leading-[40px] sm:leading-[52px] lg:leading-[64px] font-[500] text-white max-w-[850px]">
                ResAI shows you exactly what to do next — and gives you the tools to get there.
              </h2>

            </div>

            {/* ================= CARDS ================= */}
            <div className="flex flex-col lg:flex-row gap-8 lg:gap-[40px] mt-4">

              {solutions.map((solution, index) => (
                <div
                  key={index}
                  className="flex flex-col gap-4 w-full border-b border-white/20 pb-6"
                >

                  <img
                    src={solution.icon}
                    alt="icon"
                    className="w-[42px] h-[42px]"
                  />

                  <h3 className="text-[20px] lg:text-[22px] font-medium text-white">
                    {solution.title}
                  </h3>

                  <p className="text-[15px] lg:text-[16px] text-white/70 leading-[24px]">
                    {solution.description}
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

export default SolutionSection;
