import { FunctionComponent } from "react";
import { Link } from 'react-router-dom';
import { config } from "../config/config";
import { useTranslation } from "react-i18next";
export type FrameComponent3Type = {
  className?: string;
};

const AIPowered: FunctionComponent<FrameComponent3Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  const selectedLanguage = localStorage.getItem('nextSelectedLanguage');
  //added by Ayaz selectedLanguage 
  return (
    <>
      <div
        className={`self-stretch flex flex-row items-start justify-center mq750:pt-[53px] pt-0 px-5 mq360:pb-[51px] pb-[54px] box-border max-w-full shrink-0 text-center 
        ${selectedLanguage === 'en' ? 'text-53xl' : 'text-50xl'
          }
        text-neutrals-n90 font-buttons-button-lg ${className}`}
      >
        <div className="flex flex-col items-center justify-start gap-[32px] shrink-0 max-w-full z-[2] mq750:gap-[16px] mq750:gap-[32px]">
          <div className="flex flex-col items-center justify-start gap-[15px] max-w-full">
            <div className={`relative tracking-[-0.01em]  leading-[74px] capitalize mq450:text-21xl   mq360:max-w-[240px] mq750:text-39xl ${selectedLanguage === 'en' ? 'mq450:leading-[40px]  mq750:leading-[59px]' : 'mq450:leading-[60px]  mq750:leading-[89px]'
              }`}>
              <p className="m-0">
                <span className="font-medium">
                  {i18n("AiPowered.ultimateFree")}
                </span>
                <b className="font-buttons-button-lg"> {i18n("AiPowered.powered")} </b>
              </p>
              <p className="m-0 font-medium">{i18n("AiPowered.ResumeBuilder")}</p>
            </div>
            <div className="mq1050:h-[auto] relative text-lg leading-[18px] mq550:text-[16px] mq550:leading-[24px] mq550:font-[400] mq550:px-[10px] text-neutrals-n60 inline-block max-w-full">
              {i18n("AiPowered.Resumemaker")}
            </div>
          </div>
          <div className="flex flex-row items-start justify-start gap-[32px] text-lg text-neutral-white w-[235px] mq750:justify-center">
            <div className="cursor-pointer rounded-md bg-neutrals-n90 flex flex-row items-center justify-center py-[19px] px-[53px] whitespace-nowrap">
              <div className="HeaderoginBtn relative leading-[18px] font-semibold">

                <Link to={config.loginUrl ? config.loginUrl : '/'}>{i18n("AiPowered.BuildResume")} </Link>
              </div>
            </div>
            <div className="self-stretch hidden flex-row items-center justify-start py-2 pr-0 pl-[22px] gap-[16px] text-neutrals-n90 border-l-[2px] border-solid border-goldenrod">
              <div className="relative leading-[18px] font-semibold">
                {i18n("AiPowered.ResumeScore")}
              </div>
              <img
                className="h-[5.1px] w-[10.2px] relative"
                alt=""
                src="/group-1000009070.svg"
              />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default AIPowered;
