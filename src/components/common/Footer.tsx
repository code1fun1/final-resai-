import React, { FunctionComponent } from 'react';

type LinkList = string[];

const Footer: FunctionComponent = () => {
  const menuLinks: LinkList = [
    'Product',
    'Pricing',
    'Career Roadmap',
    'About ResAI',
    'Blog'
  ];

  const servicesLinks: LinkList = [
    'Resume Builder',
    'Skill Assessment',
    'Career Roadmap',
    'Interview Prep',
    'Job Matching'
  ];

  const resourcesLinks: LinkList = [
    'Career Blog',
    'Success Stories',
    'Resume Templates',
    'Interview Tips',
    'Industry Guides'
  ];

  const companyLinks: LinkList = [
    'About Us',
    'Contact',
    'Careers',
    'Partners',
    'Press'
  ];

  const supportLinks: LinkList = [
    'Help Center',
    'FAQ',
    'Privacy Policy',
    'Terms of Service',
    'Cookie Policy'
  ];

  const socialLinks: LinkList = [
    'Facebook',
    'LinkedIn',
    'Twitter'
  ];

  const legalLinks: LinkList = [
    'Terms',
    'Privacy policy'
  ];

  const copyrightItems: LinkList = [
    'Copyright',
    '2026',
    '©ResAi',
    'Company'
  ];

  return (
    <footer className="w-full bg-[#171717] rounded-[30px] sm:rounded-[40px] lg:rounded-[50px] mx-0 mt-[40px] sm:mt-[60px] lg:mt-[80px] mb-[20px] p-[20px] sm:p-[25px] lg:p-[30px]">
      <div className="w-full max-w-[1440px] mx-auto">
        <div className="flex flex-col items-center w-full mt-[24px]">

          {/* Hero */}
          <div className="flex flex-col gap-[40px] sm:gap-[48px] lg:gap-[56px] w-full">
            <div className="flex flex-col lg:flex-row justify-between items-center w-full gap-4">
              
              <h2 className="text-[24px] sm:text-[32px] lg:text-[40px] font-medium leading-[30px] sm:leading-[40px] lg:leading-[50px] text-center lg:text-left text-white w-full lg:w-[52%] font-satoshi">
                Stop guessing. Start transforming your career.
              </h2>

              <div className="flex justify-end w-full lg:w-[48%]">
                <button className="w-[60px] h-[60px] bg-white rounded-full flex items-center justify-center hover:bg-gray-100 transition">
                  <img src="/images/img_huge_icon_arrow.svg" alt="Arrow" className="w-6 h-6" />
                </button>
              </div>

            </div>

            <div className="w-full h-[1px] bg-white" />
          </div>

          {/* Links */}
          <div className="flex flex-col lg:flex-row justify-between w-full mt-[26px] gap-8">
            
            {[
              { title: 'Menu', links: menuLinks },
              { title: 'Services', links: servicesLinks },
              { title: 'Resources', links: resourcesLinks },
              { title: 'Company', links: companyLinks },
              { title: 'Support', links: supportLinks },
            ].map((section, i) => (
              <div key={i} className="flex flex-col gap-[12px] w-full lg:w-[22%]">
                
                <h3 className="text-[20px] sm:text-[24px] font-medium text-white font-satoshi">
                  {section.title}
                </h3>

                <ul>
                  {section.links.map((link, index) => (
                    <li key={index} className={index > 0 ? 'mt-[6px]' : ''}>
                      <a
                        href="#"
                        className="text-[16px] sm:text-[18px] text-[#b8b8b8] hover:text-white transition font-satoshi"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>

              </div>
            ))}
          </div>

          {/* Bottom */}
          <div className="flex flex-col lg:flex-row justify-between items-center w-full mt-[60px] sm:mt-[80px] lg:mt-[94px] gap-6">

            <div className="w-full lg:w-[10%]">
              <img
                src="/images/img_frame_1610068082.svg"
                alt="ResAI Logo"
                className="w-[100px] sm:w-[120px] lg:w-[132px] mx-auto lg:mx-0"
              />
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-4 sm:gap-[20px]">

              {/* Social */}
              <div className="flex flex-wrap items-center gap-4 sm:gap-[20px]">
                {socialLinks.map((social, index) => (
                  <a key={index} href="#" className="text-[#b8b8b8] hover:text-white transition font-satoshi">
                    {social}
                  </a>
                ))}

                <span className="text-[#b8b8b8]">|</span>

                {legalLinks.map((legal, index) => (
                  <a key={index} href="#" className="text-[#c8c8c8] hover:text-white transition font-satoshi">
                    {legal}
                  </a>
                ))}

                <span className="text-[#b8b8b8]">|</span>

                <div className="flex gap-2">
                  {copyrightItems.map((item, index) => (
                    <span key={index} className="text-[#c8c8c8] font-satoshi">
                      {item}
                    </span>
                  ))}
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;