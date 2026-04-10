import { FunctionComponent, useState, useEffect } from "react";

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  image: string;
}

interface Stat {
  value: string;
  description: string;
}

const TestimonialsSection: FunctionComponent = () => {
  const testimonials: Testimonial[] = [
    {
      quote: "Thank you so much, I found this website in 2022 and now I am become an important person in this company. This website is pretty good and very helpful to providing tips on the best jobs. I am very happy now.",
      name: "Riya Sharma (Bangalore)",
      role: "QA Engineer → Product Manager | ATS SCORE: 58 → 91",
      image: "/images/img_ellipse_15.png",
    },
    {
      quote: "ResAI completely transformed my job search. The ATS-optimized resume got me 3x more callbacks within the first week. The skill gap analysis showed me exactly what to learn next.",
      name: "Arjun Mehta (Mumbai)",
      role: "Software Developer → Senior Engineer | ATS SCORE: 62 → 89",
      image: "/images/img_ellipse_15.png",
    },
    {
      quote: "I was stuck in the same role for 4 years. ResAI gave me a clear 6-month roadmap and helped me switch industries entirely. Best investment I made in my career.",
      name: "Priya Nair (Hyderabad)",
      role: "Marketing Executive → Product Analyst | ATS SCORE: 54 → 88",
      image: "/images/img_ellipse_15.png",
    },
  ];

  const stats: Stat[] = [
    { value: "+41", description: "Avg. Score Improvement" },
    { value: "3200+", description: "Career Placement" },
    { value: "4.8/5", description: "User Rating" },
    { value: "5 min", description: "Avg. Completion" },
  ];

  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      goTo((current + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [current]);

  const goTo = (index: number) => {
    if (animating || index === current) return;
    setAnimating(true);
    setTimeout(() => {
      setCurrent(index);
      setAnimating(false);
    }, 300);
  };

  const t = testimonials[current];

  return (
    <section className="w-full bg-[#735302] py-[60px] sm:py-[80px] lg:py-[100px]">
      <div className="max-w-[1240px] mx-auto px-5 sm:px-8 lg:px-[20px]">

        {/* HEADER */}
        <div className="flex flex-col gap-4">
          <button className="bg-white text-[#735302] text-[14px] font-medium px-4 py-[6px] rounded-full w-fit">
            Testimonials
          </button>

          <h2
            className="text-white text-[32px] sm:text-[48px] lg:text-[60px] leading-[125%] tracking-[-0.02em] font-[500] max-w-[900px]"
            style={{ fontFamily: 'Satoshi' }}
          >
            People are already switching and building careers with ResAI
          </h2>
        </div>

        {/* TESTIMONIAL CARD */}
        <div
          className="mt-10 max-w-[900px] transition-opacity duration-300"
          style={{ opacity: animating ? 0 : 1 }}
        >
          {/* Quote */}
          <p className="text-white text-[18px] sm:text-[20px] lg:text-[24px] font-[500] leading-[132%] tracking-[0.02em]" style={{ fontFamily: 'Satoshi' }}>
            "{t.quote}"
          </p>

          {/* User Info */}
          <div className="flex flex-col gap-3 mt-8">
            <img
              src={t.image}
              alt={t.name}
              className="w-[52px] h-[52px] sm:w-[56px] sm:h-[56px] rounded-full object-cover shrink-0"
            />
            <div>
              <h4 className="text-white text-[16px] sm:text-[18px] font-medium">
                {t.name}
              </h4>
              <p className="text-white/70 text-[14px] sm:text-[16px] mt-1">
                {t.role}
              </p>
            </div>
          </div>

          {/* Dots */}
          <div className="flex items-center gap-2 mt-8">
            {testimonials.map((_, i) => (
              <button
                key={i}
                onClick={() => goTo(i)}
                className={`rounded-full transition-all duration-300 ${
                  i === current
                    ? "w-6 h-2 bg-white"
                    : "w-2 h-2 bg-white/40 hover:bg-white/70"
                }`}
              />
            ))}
          </div>
        </div>

        {/* DIVIDER */}
        <div className="w-full border-t border-white/30 mt-10"></div>

        {/* STATS */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-y-8 gap-x-4 mt-10">
          {stats.map((stat, index) => (
            <div key={index} className="flex flex-col">
              <span className="text-white text-[40px] sm:text-[48px] font-medium leading-[1.25]">
                {stat.value}
              </span>
              <p className="text-white/70 text-[14px] sm:text-[16px] mt-2">
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
