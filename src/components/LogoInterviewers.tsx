import { FunctionComponent } from "react";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { useTranslation } from "react-i18next";
export type FrameComponent5Type = {
  className?: string;
};

const FrameComponent5: FunctionComponent<FrameComponent5Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 100,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000
  }
  const selectedLanguage = localStorage.getItem('nextSelectedLanguage');
  return (
    <>




<div
      className={`self-stretch shadow-[0px_24px_48px_rgba(0,_0,_0,_0.05)] bg-neutral-white overflow-hidden flex flex-col items-end justify-start pt-[34px] px-0 pb-0 relative gap-[33px] z-[7] mt-[-23px] text-center text-9xl text-neutrals-n160 font-buttons-button-lg mq750:gap-[16px] logo-interviwers-slider ${className}`}
    >
      <img
        className="w-full h-[219px] absolute !m-[0] right-[0px] bottom-[-33px] left-[0px] max-w-full overflow-hidden shrink-0 object-cover"
        alt=""
        src="/rectangle-40051@2x.png"
      />
      <img
        className="w-full h-[95px] absolute !m-[0] top-[0px] right-[0px] left-[0px] max-w-full overflow-hidden shrink-0 object-cover z-[1]"
        alt=""
        src="/rectangle-40052@2x.png"
      />
      <div className="self-stretch flex flex-row items-start justify-center py-0 pr-5 pl-[21px]">
        <div className={`mq450:w-[328px] w-[513px] relative tracking-[-0.02em] font-semibold inline-block z-[2] mq450:text-5xl mq360:max-w-[240px] ${selectedLanguage === 'en' ? 'leading-[28px]' : 'leading-[38px]' }`}>
        {i18n("LogoInterviewers.Ourresumes")}
        </div>
      </div>
     
   

      <div className="mq750:invisible min-h-[91px]  mq750:min-h-[0px] mq750:h-[0] self-stretch h-[auto] overflow-x-auto1 shrink-0 flex flex-row items-start justify-between py-0 px-[150px] mq850:pl-[75px] box-border bg-[url('/public/company-logos@3x.png')] bg-cover bg-no-repeat bg-[top] gap-[20px] z-[1] mq450:pl-5 mq450:pr-5 mq450:box-border mq750:pl-[75px] mq750:pr-[75px] mq750:box-border mb-[-20px]">
        <div className="w-[125.7px] shrink-0 flex flex-col items-start justify-start pt-[35.7px] pb-[35.7px] px-0 pb-0 box-border">
          <img
            className="self-stretch h-[19.7px] relative max-w-full overflow-hidden shrink-0 object-cover"
            alt=""
            src="/tesla-1@2x.png"
          />
        </div>
        <div className="self-stretch w-px relative box-border shrink-0 opacity-[0.32] border-r-[1px] border-solid border-neutrals-n40" />
        <div className="w-[72.6px] shrink-0 flex flex-col items-start justify-start pt-[33.5px] pb-[33.5px] px-0 pb-0 box-border">
          <img
            className="self-stretch h-6 relative max-w-full overflow-hidden shrink-0"
            alt=""
            src="/google-black-1.svg"
          />
        </div>
        <div className="self-stretch w-px relative box-border shrink-0 opacity-[0.32] border-r-[1px] border-solid border-neutrals-n40" />
        <div className="w-[91.1px] shrink-0 flex flex-col items-start justify-start pt-[35px] pb-[35px] px-0 pb-0 box-border">
          <div className="self-stretch flex flex-row items-end justify-start gap-[6.4px]">
            <img
              className="h-[21px] w-[21px] relative"
              alt=""
              src="/logo1.svg"
            />
            <div className="flex-1 flex flex-col items-start justify-end pt-0 px-0 pb-[4.8px]">
              <img
                className="self-stretch h-[11.4px] relative max-w-full overflow-hidden shrink-0"
                alt=""
                src="/path46.svg"
              />
            </div>
          </div>
        </div>
        <div className="self-stretch w-px relative box-border shrink-0 opacity-[0.32] border-r-[1px] border-solid border-neutrals-n40" />
        <div className="w-[87.1px] shrink-0 flex flex-col items-start justify-start pt-[35px] pb-[35px] px-0 pb-0 box-border">
          <img
            className="self-stretch h-[20.9px] relative max-w-full overflow-hidden shrink-0"
            alt=""
            src="/spotify-new-2024-black-1.svg"
          />
        </div>
        <div className="self-stretch w-px relative box-border shrink-0 opacity-[0.32] border-r-[1px] border-solid border-neutrals-n40" />
        <div className="w-[67.7px] shrink-0 flex flex-col items-start justify-start pt-[34.7px] pb-[34.7px] px-0 pb-0 box-border">
          <img
            className="self-stretch h-[21.5px] relative max-w-full overflow-hidden shrink-0"
            alt=""
            src="/amazon-black-1.svg"
          />
        </div>
      </div>

  {/* Mobile View */}

  <div className="mq750:visible mq750:mt-[0px] mt-[-13px] mq750:h-[91px] invisible   self-stretch  h-[0px]  shrink-0 flex1 flex-row1 items-start justify-center py-0  box-border bg-cover bg-no-repeat bg-[top]  z-[1] mq450:box-border  mq750:box-border">
  
  <div className="grid grid-cols-1 gap-4 ">
<Slider {...sliderSettings}  >
  <div className="">
  <img
           className="self-stretch h-[19.7px] relative max-w-full overflow-hidden1 shrink-0 object-cover m-auto"
           // className="h-[auto] w-[23%] object-cover md:w-full"
            alt=""
            src="/tesla-1@2x.png"
          />
  </div>
  <div className="">
  <img
            className="self-stretch h-[19.7px] relative max-w-full overflow-hidden1 shrink-0 object-cover m-auto"
            alt=""
            src="/google-black-1.svg"
          />
  </div>
  <div className="">
  <img
            className="self-stretch h-[19.7px] relative max-w-full overflow-hidden1 shrink-0 object-cover m-auto"
            alt=""
            src="/path46.svg"
          />
  </div>
  <div className=""> 
  <img
            className="self-stretch h-[19.7px] relative max-w-full overflow-hidden1 shrink-0 object-cover m-auto"
            alt=""
            src="/spotify-new-2024-black-1.svg"
          />
          </div>
  <div className="">
  <img
            className="self-stretch h-[19.7px] relative max-w-full overflow-hidden1 shrink-0 object-cover  m-auto"
            alt=""
            src="/amazon-black-1.svg"
          />
  </div>
  </Slider> 
</div>
  
  </div>
 {/* Mobile Close */}

    </div>
    </>
  );
};

export default FrameComponent5;
