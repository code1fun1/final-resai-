import { FunctionComponent } from 'react';

interface Company {
  src: string;
  alt: string;
  width: string;
}

const CompanyLogos: FunctionComponent = () => {
  const companies: Company[] = [
    { src: "/images/img_amazon_logo_1.svg", alt: "Amazon", width: "188px" },
    { src: "/images/img_tech_mahindra_new_logo.svg", alt: "Tech Mahindra", width: "130px" },
    { src: "/images/img_ibm_logo_1.svg", alt: "IBM", width: "88px" },
    { src: "/images/img_logo_google.svg", alt: "Google", width: "110px" },
    { src: "/images/img_microsoft_logo_1.svg", alt: "Microsoft", width: "166px" },
    { src: "/images/img_zomato_logo_1.svg", alt: "Zomato", width: "168px" },
  ];

  const LogoItem = ({ company }: { company: Company }) => (
    <div className="flex-shrink-0 flex items-center justify-center px-12 xl:px-0">
      <img
        src={company.src}
        alt={company.alt}
        className="h-[28px] sm:h-[32px] lg:h-[36px] w-auto object-contain opacity-80 hover:opacity-100 transition-opacity"
        style={{ width: `${Math.floor(parseInt(company.width) * 0.8)}px` }}
      />
    </div>
  );

  return (
    <section className="w-full bg-white py-6 sm:py-8 lg:py-10">
      <div className="w-full max-w-[1440px] mx-auto px-4 sm:px-6 lg:px-[100px]">
        <div className="flex flex-col gap-6 sm:gap-8 lg:gap-12 justify-start items-center w-full">

          {/* Section Title */}
          <p
            className="text-[20px] sm:text-[22px] md:text-[26px] lg:text-[28px] font-medium leading-[28px] sm:leading-[30px] md:leading-[34px] text-center text-[#4e3000]"
            style={{ fontFamily: 'Satoshi' }}
          >
            Our resumes are mostly loved by interviewers at..
          </p>

          {/* Desktop — static flex row */}
          <div className="hidden xl:flex justify-center items-center gap-[76px] w-full">
            {companies.map((company, index) => (
              <LogoItem key={index} company={company} />
            ))}
          </div>

          {/* Mobile/Tablet/iPad — infinite marquee */}
          <div className="xl:hidden w-full overflow-hidden">
            <div className="animate-marquee">
              {/* Duplicate logos for seamless loop */}
              {[...companies, ...companies].map((company, index) => (
                <LogoItem key={index} company={company} />
              ))}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CompanyLogos;
