import { FunctionComponent, useState } from "react";
import { appConfig } from '../config/config';

interface FAQItem {
  question: string;
  answer: string | JSX.Element;
}

const faqs: FAQItem[] = [
  {
    question: "What is ResAI?",
    answer: (
      <>
        <span className="block">
          ResAI is an AI-powered career platform that helps you build, optimize, and tailor your resume
          to increase your chances of getting shortlisted. It combines resume building, ATS score
          analysis, and job-specific recommendations in one place.
        </span>
        <a
          href={appConfig.loginUrl ?? '/'}
          className="block mt-4 text-[#735302] underline font-[500]"
        >
          Create Free Resume ↗
        </a>
      </>
    ),
  },
  {
    question: "How does ResAI improve my resume?",
    answer:
      "ResAI analyzes your resume against the job description using advanced AI algorithms, identifies gaps, and rewrites sections to match ATS requirements — boosting your shortlisting chances significantly.",
  },
  {
    question: "How does ResAI help increase my ATS score?",
    answer:
      "ResAI scans your resume for missing keywords, formatting issues, and structural problems that ATS systems flag. It then provides a detailed score and actionable suggestions to push your ATS score above 80.",
  },
  {
    question: "Can ResAI tailor my resume for specific jobs?",
    answer:
      "Yes. Simply paste a job description and ResAI will align your resume content — skills, experience, and keywords — to match that specific role, making your application far more relevant.",
  },
  {
    question: "Does ResAI suggest relevant jobs based on my resume?",
    answer:
      "ResAI identifies roles that best match your current skills and experience, so you can apply to positions where you have the highest chance of getting shortlisted.",
  },
  {
    question: "Can ResAI help identify my skill gaps for a job?",
    answer:
      "Absolutely. ResAI compares your current skill set against the requirements of your target role and highlights exactly what's missing — so you know what to learn next.",
  },
  {
    question: "Does ResAI help with upskilling?",
    answer:
      "Yes. After identifying your skill gaps, ResAI recommends curated courses and learning paths to help you close those gaps quickly and become job-ready faster.",
  },
  {
    question: "Is ResAI suitable for freshers and experienced professionals?",
    answer:
      "ResAI is built for everyone — from freshers creating their first resume to experienced professionals switching roles or industries. The AI adapts its recommendations to your career stage.",
  },
  {
    question: "What makes ResAI different from other resume tools?",
    answer:
      "Unlike traditional resume builders, ResAI combines resume creation, ATS optimization, skill gap analysis, job matching, and a personalized career roadmap — all in one platform, at a fraction of the cost.",
  },
  {
    question: "Is ResAI free to use?",
    answer:
      "ResAI offers a free plan that includes 1 resume analysis and ATS score reveal. For full access to skill gap reports, career roadmaps, and unlimited analyses, you can upgrade to a paid plan starting at ₹199.",
  },
  {
    question: "Why should I trust ResAI?",
    answer:
      "ResAI has helped 3,200+ professionals improve their resumes and land better opportunities. With an average ATS score improvement of +41 points and a 4.8/5 user rating, the results speak for themselves.",
  },
];

const FAQSection: FunctionComponent = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="w-full bg-[#F6F6F6] py-12 sm:py-16 lg:py-20">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-10 lg:px-[180px]">

        {/* Title */}
        <h2
          className="text-[36px] sm:text-[48px] lg:text-[60px] font-[500] leading-[125%] tracking-[-0.02em] text-center text-[#04040e] mb-10 sm:mb-12 lg:mb-14"
          style={{ fontFamily: "Satoshi" }}
        >
          Frequently Asked Questions
        </h2>

        {/* FAQ List */}
        <div className="flex flex-col">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;
            return (
              <div
                key={index}
                className={`border-b last:border-b-0 ${index === 0 ? "border-[#101010]" : "border-[rgba(16,16,16,0.1)]"}`}
              >
                <button
                  className="w-full flex items-center justify-between gap-4 py-5 sm:py-6 text-left"
                  onClick={() => toggle(index)}
                  aria-expanded={isOpen}
                >
                  <span
                    className="text-[18px] sm:text-[20px] lg:text-[24px] font-[500] leading-[132%] tracking-[0.02em] text-[#04040e]"
                    style={{ fontFamily: "Satoshi" }}
                  >
                    {faq.question}
                  </span>
                  <span
                    className="text-[#04040e] text-[20px] shrink-0 transition-transform duration-200"
                    style={{ transform: isOpen ? "rotate(180deg)" : "rotate(0deg)" }}
                  >
                    ↓
                  </span>
                </button>

                {isOpen && (
                  <div className="pb-4">
                    <p
                      className="text-[16px] sm:text-[18px] lg:text-[20px] font-[400] leading-[150%] text-[#535353]"
                      style={{ fontFamily: "Satoshi", letterSpacing: "0" }}
                    >
                      {faq.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FAQSection;
