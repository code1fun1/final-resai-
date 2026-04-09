import { FunctionComponent } from "react";
import GroupComponent from "./GroupComponent";
import Slider from 'react-slick'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import { config } from "../config/config";

export type FrameComponent11Type = {
  className?: string;
};

const ChooseTemplate: FunctionComponent<FrameComponent11Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 4,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    responsive: [{
      breakpoint: 850,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
        initialSlide: 1,
        arrows: false,
        dots: false,
        autoplay: false,
      
      }
    },
    {
      breakpoint: 450,
      settings: {
        dots: true,
        infinite: true,
        speed: 100,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        autoplay: false,
      
      }
    }
  ]
  }

  return (
    <div
      className={`self-stretch bg-blanchedalmond overflow-hidden flex flex-col mq750:items-center mq750:justify-center items-center justify-start py-20 px-5 min-[1440px]:px-[152px] box-border relative gap-[56px] max-w-full text-left text-xl text-darkgoldenrod font-buttons-button-lg mq750:gap-[28px] mq750:pt-[52px] mq750:pb-[52px] mq750:box-border mq360:mt-[40px] ${className}`}
    >
      <div className="w-[1440px] h-[746px] relative bg-blanchedalmond hidden max-w-full z-[0]" />
      <img
        className="w-[1440px] h-[745px] relative object-cover hidden max-w-full z-[1]"
        alt=""
        src="/image-311@2x.png"
      />
      <div className="w-px h-[935px] absolute !m-[0] right-[440px] bottom-[-190px] box-border z-[1] border-r-[1px] border-dashed border-gray-1100" />
      <div className="w-px h-[935px] absolute !m-[0] bottom-[-190px] left-[417px] box-border z-[1] border-r-[1px] border-dashed border-gray-1100" />
      <div className="w-[1140px] flex flex-row mq750:items-center mq750:justify-center items-end justify-between max-w-full gap-[20px] z-[2] mq750:flex-wrap">
        <div className="flex flex-col mq750:items-center mq750:justify-center items-start justify-start gap-[17px] min-w-[390px] max-w-full mq750:flex-1 mq750:min-w-full">
          <b className="relative tracking-[0.04em] leading-[20px] uppercase">
          {i18n("chooseTemplate.ChooseYourTemplates")}
          </b>
          <b className="relative text-21xl tracking-[0.01em] leading-[40px] text-system-black  mq750:text-13xl mq750:leading-[32px]">
            <p className="m-0"> {i18n("chooseTemplate.CraftResume")}</p>
            <p className="m-0 mq750:ml-[75px]">{i18n("chooseTemplate.Impress")}</p>
          </b>
        </div>
        <div className="shadow-[0px_63px_18px_rgba(0,_0,_0,_0),_0px_40px_16px_rgba(0,_0,_0,_0.02),_0px_23px_14px_rgba(0,_0,_0,_0.08),_0px_10px_10px_rgba(0,_0,_0,_0.13),_0px_3px_6px_rgba(0,_0,_0,_0.15)] flex flex-row items-start justify-start text-center text-lg text-neutrals-n80">
        <Link to={config.loginUrl ? config.loginUrl : "/"} style={{ color: 'inherit', textDecoration: 'inherit'}}>
          <div className="rounded-md bg-neutrals-n5 flex flex-row mq750:items-center mq750:justify-center items-center justify-center py-[13px] px-[23px] gap-[8px] whitespace-nowrap border-[1px] border-solid border-neutrals-n70">
            <div className="relative leading-[18px] font-semibold inline-block min-w-[108px]">
            {i18n("chooseTemplate.CreateResumeButton")}
            </div>
            <img
              className="h-3 w-1.5 relative"
              alt=""
              src="/choose-button-icon.svg"
            />
          </div>
          </Link>
        </div>
      </div>
     



{/* Slider */}
{/* <div className="mq850:visible mq850:h-[auto] h-[0px]  invisible w-[1140px] overflow-hidden1 grid flex-row items-start justify-start py-0 px-0.5 box-border gap-[24px] max-w-full  z-[2] text-lg text-neutrals-n150"> */}
      <div className="w-full mq450:overflow-visible overflow-hidden grid flex-row items-start justify-start1 py-0 px-0.5 box-border gap-[24px] max-w-full  z-[2] text-lg text-neutrals-n150">
      <div className="ChooseTemplate grid grid-cols-1 gap-4 w-full">
      <Slider {...sliderSettings}  >
      <GroupComponent   resumeTemplateKelsey1="/template_1.png"  resumeTemplateName={i18n("chooseTemplate.ResumeTemplateOne")} resumeTemplateColumn={i18n("chooseTemplate.ResumeTemplateColumnOne")}/>
        {/* <GroupComponent resumeTemplateKelsey1="/resumea4--1-1@2x1.png" resumeTemplateName="College Resume Template"  resumeTemplateColumn="2 Column Layout" /> */}
        <GroupComponent  resumeTemplateKelsey1="/template_2.png" resumeTemplateName={i18n("chooseTemplate.ResumeTemplateTwo")}  resumeTemplateColumn={i18n("chooseTemplate.ResumeTemplateColumnTwo")} />
        <GroupComponent  resumeTemplateKelsey1="/template_3.png" resumeTemplateName={i18n("chooseTemplate.ResumeTemplateThree")}  resumeTemplateColumn={i18n("chooseTemplate.ResumeTemplateColumnThree")} />
        <GroupComponent  resumeTemplateKelsey1="/template_4.png" resumeTemplateName={i18n("chooseTemplate.ResumeTemplateFour")}  resumeTemplateColumn={i18n("chooseTemplate.ResumeTemplateColumnFour")} />
        {/* <GroupComponent resumeTemplateKelsey1="/resumetemplatekevin1@2x.png" resumeTemplateName="College Resume Template"  resumeTemplateColumn="2 Column Layout" /> */}
      
        </Slider> 
        </div>
    
      </div>





    </div>
  );
};

export default ChooseTemplate;
