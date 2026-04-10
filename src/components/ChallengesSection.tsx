import { FunctionComponent } from "react";

interface Challenge {
  icon: string;
  title: string;
  description: string;
}

const ChallengesSection: FunctionComponent = () => {
  const challenges: Challenge[] = [
    {
      icon: "/images/img_pdf_note.svg",
      title: "Generic resumes get ignored",
      description:
        "Hiring managers see hundreds of similar profiles every day.",
    },
    {
      icon: "/images/img_question_help_circle.svg",
      title: "You do not know which skills are holding you back",
      description:
        "And no one tells you what is actually missing.",
    },
    {
      icon: "/images/img_briefcase_job_01.svg",
      title: "Switching careers feels overwhelming and slow",
      description:
        "There is no clear path, just guesswork.",
    },
  ];

  return (
    <section className="w-full bg-white py-10 sm:py-12 lg:py-16">
      <div className="w-full max-w-[1200px] mx-auto px-4 sm:px-6 lg:px-[40px]">
        
        <div className="flex flex-col gap-10 lg:gap-12 w-full">
          
          {/* ================= HEADER ================= */}
          <div className="flex flex-col gap-3 items-start w-full">
            
            <button className="bg-[#735302] rounded-[20px] px-4 py-1 text-[14px] font-medium text-white font-satoshi">
              Challenges
            </button>
            
            <h2 className="text-[36px] sm:text-[48px] lg:text-[60px] font-[500] leading-[125%] text-[#03030d] max-w-[620px] tracking-[-0.02em] mt-2" style={{ fontFamily: 'Satoshi' }}>
              Still sending resumes and hearing nothing?
            </h2>

          </div>

          {/* ================= CARDS ================= */}
          <div className="flex flex-col lg:flex-row gap-6 lg:gap-[24px] w-full mt-6 lg:mt-10 lg:items-stretch">
            
            {challenges.map((challenge, index) => (
              
<div
  key={index}
  className={`flex flex-col justify-between w-full lg:w-[360px] border-b pb-16 ${
    index === 1 ? "border-[#dabf67]" : "border-[#dfdfdf]"
  }`}
>
  <div className="flex flex-col gap-3">

    <img src={challenge.icon} className="w-[40px] h-[40px] mb-4" />

    <h3 className="text-[24px] sm:text-[26px] lg:text-[22px] font-semibold text-[#03030d] font-satoshi">
      {challenge.title}
    </h3>

    <p className="text-[18px] sm:text-[20px] lg:text-[20px] text-[#535353] font-satoshi">
      {challenge.description}
    </p>

  </div>
</div>
            ))}
          </div>

          {/* ================= CTA ================= */}
          <div className="flex flex-col gap-4 items-center w-full mt-10 lg:mt-14">
            
            <p className="text-[16px] sm:text-[18px] text-[#03030d] font-satoshi">
              See Solution
            </p>

                  <button
                    className="w-[64px] h-[64px] bg-[#dabf67] rounded-full flex items-center justify-center hover:scale-105 transition-transform"
                    onClick={() => document.getElementById('solution')?.scrollIntoView({ behavior: 'smooth' })}
                  >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#03030d"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M12 5v14" />
            <path d="M19 12l-7 7-7-7" />
          </svg>
        </button>

          </div>

        </div>
      </div>
    </section>
  );
};

export default ChallengesSection;