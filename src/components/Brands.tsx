import { FunctionComponent } from "react";

export type BrandsType = {
  className?: string;
};

const Brands: FunctionComponent<BrandsType> = ({ className = "" }) => {
  return (
    <section
      className={`self-stretch bg-color-netural-white flex flex-col items-center justify-center py-10 px-[100px] box-border gap-8 text-left text-lg text-[#4e3000] font-[Roboto] mq800:gap-6 mq800:pl-[50px] mq800:pr-[50px] mq800:box-border mq450:pl-5 mq450:pr-5 mq450:box-border ${className}`}
    >
      <div className="relative leading-[155%] font-medium">
        Our resumes are mostly loved by interviewers at..
      </div>
      <div className="w-full max-w-[1240px] flex items-center justify-between gap-8 flex-wrap mq550:justify-center mq550:gap-6">
        <img
          className="h-[40px] w-auto object-contain"
          loading="lazy"
          alt="Amazon"
          src="/amazon-black-1.svg"
        />
        <img
          className="h-[44px] w-auto object-contain"
          loading="lazy"
          alt="Tech Mahindra"
          src="/Logo-TechMahindra.svg"
        />
        <img
          className="h-[40px] w-auto object-contain"
          loading="lazy"
          alt="IBM"
          src="/Logo-IBM.svg"
        />
        <img
          className="h-[36px] w-auto object-contain"
          loading="lazy"
          alt="Google"
          src="/google-black-1.svg"
        />
        <img
          className="h-[40px] w-auto object-contain"
          loading="lazy"
          alt="Microsoft"
          src="/Logo-Microsoft.svg"
        />
        <img
          className="h-[40px] w-auto object-contain"
          loading="lazy"
          alt="Zomato"
          src="/Logo-Zomato.svg"
        />
      </div>
    </section>
  );
};

export default Brands;
