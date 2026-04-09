import React from 'react';
import Button from './ui/Button';

const PricingSection = () => {
  const pricingPlans = [
    {
      title: "Free Plan",
      price: "₹0",
      period: "per month",
      billing: "billed monthly",
      features: [
        "1 resume analysis",
        "ATS score reveal", 
        "Top 3 skill gaps preview"
      ],
      buttonText: "Current Plan",
      buttonStyle: "bg-[#535353] text-white",
      bgColor: "bg-[#0d0c0c]"
    },
    {
      title: "Starter Plan", 
      price: "₹199",
      period: "3 month",
      billing: "billed monthly",
      features: [
        "5 resume analysis",
        "ATS score reveal",
        "Top 3 skill gaps preview"
      ],
      buttonText: "Upgrade to Pro Plan",
      buttonStyle: "bg-[#dabf67] text-[#03030d]",
      bgColor: "bg-[#0d0c0c]"
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
        "Priority support"
      ],
      buttonText: "Upgrade to Pro Plan",
      buttonStyle: "bg-[#dabf67] text-[#03030d]",
      badge: "Most Popular",
      bgColor: "bg-[#0d0c0c]",
      freeText: "7 Days Free"
    }
  ];

  return (
    <section className="w-full bg-[#f6f6f6] py-8 sm:py-12 lg:py-20">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[56px]">
        
        <div className="flex flex-col justify-center items-center w-full">
          
          {/* Section Header */}
          <div className="flex flex-col items-center gap-2 mb-6 sm:mb-8">
            <span 
              className="bg-[#735302] text-white rounded-[20px] px-5 py-2 text-[18px] sm:text-[20px] font-medium leading-[24px] sm:leading-[27px]"
              style={{ fontFamily: 'Satoshi' }}
            >
              Pricing
            </span>
            
            <h2 
              className="text-[36px] sm:text-[48px] lg:text-[60px] font-medium leading-[45px] sm:leading-[65px] lg:leading-[81px] text-center text-[#03030d] mt-2"
              style={{ fontFamily: 'Satoshi' }}
            >
              Start free. Upgrade when you are ready.
            </h2>
          </div>

          {/* Pricing Cards Container */}
          <div className="w-full bg-[#171717] rounded-[32px] mt-6 sm:mt-7 lg:mt-8 p-3"
               style={{ 
                 backgroundImage: "url('/images/img_group_2_550x954.png')", 
                 backgroundSize: 'cover', 
                 backgroundPosition: 'center' 
               }}>
            
            <div className="flex flex-col lg:flex-row justify-center items-stretch w-full gap-4">
              
              {pricingPlans?.map((plan, index) => (
                <div key={index} className={`flex flex-col justify-start items-center w-full lg:flex-1 min-h-[600px] bg-[#1a1a1a] rounded-[24px] relative border border-[#2a2a2a]`}>
                  
                  {/* Plan Header */}
                  <div className="flex flex-col gap-3 justify-center items-start w-full p-5 sm:p-6">
                    
                    {/* Title and Badge Row */}
                    <div className="flex flex-row justify-between items-start w-full">
                      <span 
                        className="text-[16px] sm:text-[18px] font-medium leading-[22px] sm:leading-[25px] text-left text-white"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {plan?.title}
                      </span>
                      {plan?.badge && (
                        <span 
                          className="bg-[#dabf67] text-[#03030d] rounded-[12px] px-3 py-1.5 text-[12px] sm:text-[13px] font-bold leading-[16px] sm:leading-[18px] text-center"
                          style={{ fontFamily: 'Satoshi' }}
                        >
                          {plan?.badge}
                        </span>
                      )}
                    </div>

                    {/* Price Row */}
                    <div className="flex flex-row gap-2 justify-start items-center w-full">
                      <span 
                        className="text-[48px] sm:text-[56px] font-bold leading-[52px] sm:leading-[60px] text-left text-white"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {plan?.price}
                      </span>
                      <div className="flex flex-col justify-start items-start">
                        <span 
                          className="text-[14px] sm:text-[16px] font-normal leading-[20px] sm:leading-[22px] text-left text-[#959ca2]"
                          style={{ fontFamily: 'Satoshi' }}
                        >
                          {plan?.period}
                        </span>
                        <span 
                          className="text-[14px] sm:text-[16px] font-normal leading-[20px] sm:leading-[22px] text-left text-[#959ca2]"
                          style={{ fontFamily: 'Satoshi' }}
                        >
                          {plan?.billing}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="flex flex-col gap-3 justify-center items-center w-full px-5 sm:px-6 flex-grow">
                    {plan?.features?.map((feature, featureIndex) => (
                      <div key={featureIndex} className="flex flex-row justify-start items-start w-full">
                        <div className="w-3 h-3 bg-[#dabf67] rounded-[8px] flex items-center justify-center mr-2 mt-1.5">
                          <img 
                            src="/images/img_fill_fconfirm.svg" 
                            alt="Check" 
                            className="w-2 h-2"
                          />
                        </div>
                        <span 
                          className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-left text-[#d2d7d9] flex-1"
                          style={{ fontFamily: 'Satoshi' }}
                        >
                          {feature}
                        </span>
                      </div>
                    ))}
                  </div>

                  {/* Action Button */}
                  <div className="flex flex-col gap-2 justify-center items-center w-full p-5 sm:p-6 lg:p-8 mt-auto">
                    <Button
                      text={plan?.buttonText}
                      text_font_size="18"
                      text_font_family="Geist"
                      text_font_weight="500"
                      text_line_height="24px"
                      text_text_align="center"
                      text_color={plan?.buttonStyle?.includes('text-white') ? "#ffffff" : "#03030d"}
                      fill_background_color={plan?.buttonStyle?.includes('bg-[#535353]') ? "#535353" : "#dabf67"}
                      border_border_radius="22px"
                      border_border="none"
                      position="relative"
                      margin="0"
                      variant="filled"
                      size="md"
                      onClick={() => {}}
                      padding="10px 32px"
                      layout_width="100%"
                      className="w-full"
                    />
                    
                    {plan?.freeText && (
                      <span 
                        className="text-[13px] sm:text-[14px] font-normal leading-[17px] sm:leading-[19px] text-center text-[#959ca2]"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {plan?.freeText}
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PricingSection;