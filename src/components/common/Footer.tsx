import React from 'react';

const Footer = () => {
  const menuLinks = [
    'Product',
    'Pricing',
    'Career Roadmap',
    'About ResAI',
    'Blog'
  ];

  const servicesLinks = [
    'Resume Builder',
    'Skill Assessment',
    'Career Roadmap',
    'Interview Prep',
    'Job Matching'
  ];

  const resourcesLinks = [
    'Career Blog',
    'Success Stories',
    'Resume Templates',
    'Interview Tips',
    'Industry Guides'
  ];

  const companyLinks = [
    'About Us',
    'Contact',
    'Careers',
    'Partners',
    'Press'
  ];

  const supportLinks = [
    'Help Center',
    'FAQ',
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy'
  ];

  const socialLinks = [
    'Facebook',
    'LinkedIn',
    'Twitter'
  ];

  const legalLinks = [
    'Terms',
    'Privacy policy'
  ];

  const copyrightItems = [
    'Copyright',
    '2026',
    'ResAi',
    'Company'
  ];

  return (
    <div className="root px-[20px] pb-[40px]">
      <footer className="bg-[#171717] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] mt-[40px] sm:mt-[60px] lg:mt-[80px] mx-[50px]mb-[20px] py-8 sm:py-12 lg:py-20">
        <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[120px]">
          <div className="flex flex-col justify-start items-center w-full mt-[24px]">

            {/* Main Content Section */}
            <div className="flex flex-col justify-start items-center w-full">

              {/* Hero Text and Arrow */}
              <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-4 lg:gap-0">
                <h2
                  className="text-[40px] font-medium leading-[125%] tracking-[-0.02em] text-left text-white max-w-[667px]"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Stop guessing. Start transforming your career.
                </h2>
                <div className="flex justify-end items-center w-full lg:w-[48%]">
                  <button className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition-colors">
                    <img
                      src="/images/img_huge_icon_arrow.svg"
                      alt="Arrow"
                      className="w-6 h-6"
                    />
                  </button>
                </div>
              </div>

              {/* Horizontal Line */}
              <div className="w-full h-[1px] bg-white/25 mt-8 lg:mt-12"></div>
            </div>

            {/* Links Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:flex lg:flex-row lg:justify-between items-start w-full mt-[26px] gap-8 lg:gap-0">

              {/* Menu Column */}
              <div className="flex flex-col gap-[12px] justify-start items-start lg:w-[22%]">
                <h3
                  className="text-[20px] sm:text-[24px] font-medium leading-[28px] sm:leading-[33px] text-left text-white"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Menu
                </h3>
                <ul className="flex flex-col justify-start items-start">
                  {menuLinks?.map((link, index) => (
                    <li key={index} className={index > 0 ? 'mt-[4px] sm:mt-[6px]' : ''}>
                      <a
                        href="#"
                        className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-left text-[#b8b8b8] hover:text-white transition-colors"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Services Column */}
              <div className="flex flex-col gap-[12px] justify-start items-start lg:w-[22%]">
                <h3
                  className="text-[20px] sm:text-[24px] font-medium leading-[28px] sm:leading-[33px] text-left text-white"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Services
                </h3>
                <ul className="flex flex-col justify-start items-start">
                  {servicesLinks?.map((link, index) => (
                    <li key={index} className={index > 0 ? 'mt-[4px] sm:mt-[6px]' : ''}>
                      <a
                        href="#"
                        className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-left text-[#b8b8b8] hover:text-white transition-colors"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Resources Column */}
              <div className="flex flex-col gap-[12px] justify-start items-start lg:w-[22%]">
                <h3
                  className="text-[20px] sm:text-[24px] font-medium leading-[28px] sm:leading-[33px] text-left text-white"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Resources
                </h3>
                <ul className="flex flex-col justify-start items-start">
                  {resourcesLinks?.map((link, index) => (
                    <li key={index} className={index > 0 ? 'mt-[4px] sm:mt-[6px]' : ''}>
                      <a
                        href="#"
                        className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-left text-[#b8b8b8] hover:text-white transition-colors"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Company Column */}
              <div className="flex flex-col gap-[12px] justify-start items-start lg:w-[22%]">
                <h3
                  className="text-[20px] sm:text-[24px] font-medium leading-[28px] sm:leading-[33px] text-left text-white"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Company
                </h3>
                <ul className="flex flex-col justify-start items-start">
                  {companyLinks?.map((link, index) => (
                    <li key={index} className={index > 0 ? 'mt-[4px] sm:mt-[6px]' : ''}>
                      <a
                        href="#"
                        className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-left text-[#b8b8b8] hover:text-white transition-colors"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Support Column */}
              <div className="flex flex-col gap-[12px] justify-start items-start md:col-span-2 lg:col-span-1 lg:w-[22%]">
                <h3
                  className="text-[20px] sm:text-[24px] font-medium leading-[28px] sm:leading-[33px] text-left text-white"
                  style={{ fontFamily: 'Satoshi' }}
                >
                  Support
                </h3>
                <ul className="flex flex-col md:flex-row md:flex-wrap md:gap-x-10 lg:flex-col lg:gap-x-0 justify-start items-start">
                  {supportLinks?.map((link, index) => (
                    <li key={index} className={index > 0 ? 'mt-[4px] sm:mt-[6px] md:mt-0 lg:mt-[4px]' : ''}>
                      <a
                        href="#"
                        className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-left text-[#b8b8b8] hover:text-white transition-colors"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Bottom Section */}
            <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-[60px] sm:mt-[80px] lg:mt-[94px] gap-6 lg:gap-0">

              {/* Logo */}
              <div className="w-full lg:w-[10%]">
                <img
                  src="/images/img_frame_1610068082.svg"
                  alt="ResAI Logo"
                  className="w-[100px] sm:w-[120px] lg:w-[132px] h-auto mx-auto lg:mx-0"
                />
              </div>

              {/* Social Links and Legal */}
              <div className="flex flex-col sm:flex-row justify-center items-center gap-4 sm:gap-[20px] w-auto">

                {/* Social Links */}
                <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-[20px]">
                  {socialLinks?.map((social, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-left text-[#b8b8b8] hover:text-white transition-colors"
                      style={{ fontFamily: 'Satoshi' }}
                    >
                      {social}
                    </a>
                  ))}

                  <span className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[24px] text-[#b8b8b8]" style={{ fontFamily: 'Geist' }}>|</span>

                  {/* Legal Links */}
                  {legalLinks?.map((legal, index) => (
                    <a
                      key={index}
                      href="#"
                      className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-left text-[#c8c8c8] hover:text-white transition-colors"
                      style={{ fontFamily: 'Satoshi' }}
                    >
                      {legal}
                    </a>
                  ))}

                  <span className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[24px] text-[#b8b8b8]" style={{ fontFamily: 'Geist' }}>|</span>

                  {/* Copyright */}
                  <div className="flex flex-wrap justify-center items-center gap-2 sm:gap-[10px]">
                    {copyrightItems?.map((item, index) => (
                      <a
                        key={index}
                        href="#"
                        className="text-[16px] sm:text-[18px] font-normal leading-[22px] sm:leading-[25px] text-left text-[#c8c8c8] hover:text-white transition-colors"
                        style={{ fontFamily: 'Satoshi' }}
                      >
                        {item}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Footer;