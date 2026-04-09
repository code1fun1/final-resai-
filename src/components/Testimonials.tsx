import { FunctionComponent } from "react";

export type TestimonialsType = {
  className?: string;
};

const Testimonials: FunctionComponent<TestimonialsType> = ({
  className = "",
}) => {
  return (
    <section
      className={`self-stretch bg-color-2 flex flex-col items-center py-other-gap-18-3 px-[100px] gap-other-gap-16 mq800:gap-6 mq800:py-[51px] mq800:px-[50px] mq800:box-border mq450:pl-5 mq450:pr-5 mq450:box-border mq1100:pt-[78px] mq1100:pb-[78px] mq1100:box-border ${className}`}
    >
      <section className="self-stretch flex flex-col items-start text-left text-base text-color-2 font-[Geist]">
        <div className="self-stretch flex flex-col items-start gap-other-gap-5">
          <div className="rounded-[30px] bg-color-netural-white flex items-center justify-center py-[5px] px-5">
            <div className="relative font-medium">Testimonials</div>
          </div>
          <h1 className="m-0 self-stretch relative text-6xl tracking-[-0.02em] leading-[125%] font-medium font-[Roboto] text-color-netural-white mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
            People are already switching and building careers with ResAI
          </h1>
        </div>
      </section>
      <section className="self-stretch flex flex-col items-center text-left text-2xl text-color-netural-white font-[Roboto] mq800:gap-8 mq450:gap-4">
        <div className="w-full flex flex-col items-start gap-other-gap-11 max-w-full">
          <div className="self-stretch relative tracking-[0.02em] leading-[132%] font-medium mq450:text-[19px] mq450:leading-[25px]">
            "Thank you so much, I found this website in 2022 and now I am become
            an important person in this company. This website is pretty good and
            very helpful to providing tips on the best jobs. <br />I am very
            happy now.
          </div>
          <div className="self-stretch flex flex-col items-start gap-other-gap-9 text-xl">
            <img
              className="w-16 h-16 relative rounded-[50%] object-cover"
              loading="lazy"
              alt=""
              src="/Ellipse-15@2x.png"
            />
            <div className="self-stretch flex flex-col items-start gap-other-gap-3">
              <h3 className="m-0 self-stretch relative text-[length:inherit] leading-[155%] font-medium font-[inherit] mq450:text-base mq450:leading-[25px]">
                Riya Sharma (Bangalore)
              </h3>
              <div className="self-stretch relative text-lg text-color-gray-200">
                QA Engineer → Product Manager | ATS SCORE: 58 → 91
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="self-stretch border-[rgba(255,255,255,0.3)] border-solid border-t-[1px] flex items-start justify-between pt-[38px] px-0 pb-0 gap-5 text-left text-6xl text-color-netural-white font-[Roboto] mq1100:flex-wrap mq1100:gap-5">
        <div className="flex flex-col items-start gap-other-gap-5">
          <h2 className="m-0 self-stretch relative text-[length:inherit] tracking-[-0.02em] leading-[125%] font-medium font-[inherit] mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
            +41
          </h2>
          <div className="self-stretch relative text-lg tracking-[-0.02em] leading-[155%]">
            Avg. Score Improvement
          </div>
        </div>
        <div className="flex flex-col items-start gap-other-gap-5">
          <h2 className="m-0 self-stretch relative text-[length:inherit] tracking-[-0.02em] leading-[125%] font-medium font-[inherit] mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
            3200+
          </h2>
          <div className="self-stretch relative text-lg tracking-[-0.02em] leading-[155%]">
            Career Placement
          </div>
        </div>
        <div className="flex flex-col items-start gap-other-gap-5">
          <h2 className="m-0 self-stretch relative text-[length:inherit] tracking-[-0.02em] leading-[125%] font-medium font-[inherit] mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
            4.8/5
          </h2>
          <div className="self-stretch relative text-lg tracking-[-0.02em] leading-[155%]">
            User Rating
          </div>
        </div>
        <div className="flex flex-col items-start gap-other-gap-5">
          <h2 className="m-0 self-stretch relative text-[length:inherit] tracking-[-0.02em] leading-[125%] font-medium font-[inherit] mq800:text-5xl mq800:leading-[60px] mq450:text-4xl mq450:leading-[45px]">
            5 min
          </h2>
          <div className="self-stretch relative text-lg tracking-[-0.02em] leading-[155%] whitespace-pre-wrap">
            Avg. Completion
          </div>
        </div>
      </section>
    </section>
  );
};

export default Testimonials;
