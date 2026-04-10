import { FunctionComponent } from "react";
import Button from "./ui/Button";

interface PricingPlan {
  title: string;
  price: string;
  period: string;
  billing: string;
  features: string[];
  buttonText: string;
  buttonStyle: string;
  badge?: string;
  freeText?: string;
}

const PricingSection: FunctionComponent = () => {
  const pricingPlans: PricingPlan[] = [
    {
      title: "Free Plan",
      price: "₹0",
      period: "per month",
      billing: "billed monthly",
      features: [
        "1 resume analysis",
        "ATS score reveal",
        "Top 3 skill gaps preview",
      ],
      buttonText: "Current Plan",
      buttonStyle: "gray",
    },
    {
      title: "Starter Plan",
      price: "₹199",
      period: "3 month",
      billing: "billed monthly",
      features: [
        "5 resume analysis",
        "ATS score reveal",
        "Top 3 skill gaps preview",
      ],
      buttonText: "Upgrade to Pro Plan",
      buttonStyle: "gold",
    },
    {
      title: "Pro Plan",
      price: "₹499",
      period: "Yearly",
      billing: "billed yearly",
      features: [
        "10 resumes",
        "Full skill gap report",
        "6-month career roadmap",
        "Personalized up skilling plan",
        "Priority support",
      ],
      buttonText: "Upgrade to Pro Plan",
      buttonStyle: "gold",
      badge: "Most Popular",
      freeText: "7 Days Free",
    },
  ];

  return (
    <section className="w-full bg-[#f6f6f6] py-14 sm:py-16 lg:py-20">
      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 md:px-10 lg:px-[100px]">

        {/* Header */}
        <div className="flex flex-col items-center">
          <span
            className="
              bg-[#735302]
              text-white
              rounded-full
              px-4 sm:px-5
              py-1.5 sm:py-2
              text-[14px] sm:text-[16px] lg:text-[18px]
              font-medium
            "
          >
            Pricing
          </span>

          <h2
            className="
              mt-4 sm:mt-5
              text-[36px]
              sm:text-[48px]
              lg:text-[60px]
              font-[500]
              leading-[125%]
              tracking-[-0.02em]
              text-center
              text-[#03030d]
            "
            style={{ fontFamily: 'Satoshi' }}
          >
            Start free. Upgrade when you&apos;re ready.
          </h2>
        </div>

        {/* Pricing Wrapper */}
        <div
          className="
            mt-8 sm:mt-10
            rounded-[24px]
            lg:rounded-[32px]
            bg-[#111111]
            p-3
            lg:p-[12px]
            lg:max-w-[954px]
            lg:mx-auto
            lg:h-[620px]
          "
          style={{
            backgroundImage: "url('/images/img_group_2_550x954.png')",
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        >
          <div
            className="
              grid
              grid-cols-1
              md:grid-cols-2
              lg:grid-cols-3
              gap-4
              lg:gap-[14px]
              h-full
            "
          >
            {pricingPlans.map((plan, index) => (
              <div
                key={index}
                className={`
                  bg-[#0d0d0d]
                  rounded-[20px]
                  lg:rounded-[30px]
                  border
                  border-[#232323]
                  min-h-[480px]
                  sm:min-h-[520px]
                  lg:min-h-0
                  lg:h-full
                  flex
                  flex-col
                  px-5 sm:px-6
                  pt-6 sm:pt-7
                  pb-5 sm:pb-6
                  ${index === pricingPlans.length - 1 && pricingPlans.length % 2 !== 0
                    ? 'md:col-span-2 md:w-[calc(50%-7px)] md:mx-auto lg:col-span-1 lg:w-full lg:mx-0'
                    : ''}
                `}
              >
                {/* Header */}
                <div>
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-white text-[16px] lg:text-[18px] font-medium">
                      {plan.title}
                    </span>

                    {plan.badge && (
                      <span className="bg-white text-[#03030d] text-[11px] sm:text-[12px] lg:text-[13px] px-3 sm:px-4 py-1.5 rounded-[10px] font-medium whitespace-nowrap">
                        {plan.badge}
                      </span>
                    )}
                  </div>

                  {/* Price */}
                  <div className="flex items-start gap-2 mt-4 sm:mt-5">
                    <span className="text-white text-[48px] sm:text-[56px] lg:text-[64px] font-medium leading-none">
                      {plan.price}
                    </span>

                    <div className="flex flex-col mt-2">
                      <span className="text-[#959ca2] text-[14px] lg:text-[16px] leading-[18px] lg:leading-[20px]">
                        {plan.period}
                      </span>
                      <span className="text-[#959ca2] text-[14px] lg:text-[16px] leading-[18px] lg:leading-[20px]">
                        {plan.billing}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Features */}
                <div className="mt-8 sm:mt-10 flex flex-col gap-3 sm:gap-4">
                  {plan.features.map((feature, featureIndex) => (
                    <div key={featureIndex} className="flex items-start gap-3">
                      <div className="w-[18px] h-[18px] rounded-full bg-[#dabf67] flex items-center justify-center mt-[2px] shrink-0">
                        <img
                          src="/images/img_fill_fconfirm.svg"
                          alt="Check"
                          className="w-[9px] h-[9px]"
                        />
                      </div>

                      <span className="text-[#d2d7d9] text-[15px] sm:text-[16px] lg:text-[18px] leading-[150%] lg:leading-[25px]">
                        {feature}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Spacer */}
                <div className="flex-grow" />

                {/* Button */}
                <div className="h-[75px] flex flex-col justify-start">
                  <Button
                    text={plan.buttonText}
                    text_font_size="18"
                    text_font_family="Geist"
                    text_font_weight="500"
                    text_line_height="24px"
                    text_text_align="center"
                    text_color={
                      plan.buttonStyle === "gray" ? "#ffffff" : "#03030d"
                    }
                    fill_background_color={
                      plan.buttonStyle === "gray" ? "#535353" : "#dabf67"
                    }
                    border_border_radius="999px"
                    border_border="none"
                    position="relative"
                    margin="0"
                    onClick={() => { }}
                    className="w-full h-[47px] px-[13px]"
                  />

                  {plan.freeText && (
                    <p className="mt-2 text-center text-[13px] lg:text-[14px] text-[#959ca2]">
                      {plan.freeText}
                    </p>
                  )}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;
