import { FunctionComponent } from "react";
import FrameComponent from "./FrameComponent";
import { useTranslation } from "react-i18next";

export type FrameComponent6Type = {
  className?: string;
};

const CraftsResume: FunctionComponent<FrameComponent6Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  const selectedLanguage = localStorage.getItem('nextSelectedLanguage');
  return (
    <div
      id="features" className={`mq750:text-center self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[120px] box-border max-w-full text-left text-xl text-system-black font-buttons-button-lg mq750:pb-[51px] mq750:box-border mq1050:pb-[78px] mq1050:box-border ${className}`}
    >
      <div className="flex-1 bg-blanchedalmond flex flex-col items-center justify-start py-20 px-5 box-border gap-[58px] max-w-full mq750:gap-[29px] mq750:pt-[34px] mq750:pb-[34px] mq750:box-border mq1050:pt-[52px] mq1050:pb-[52px] mq1050:box-border">
        <div className="w-[1440px] h-[940px] relative bg-blanchedalmond hidden max-w-full" />
        <div className="mq750:items-center w-[1139px] flex flex-col items-start justify-start gap-[17px] max-w-full z-[1]">
          <b className="relative tracking-[0.04em] leading-[20px] uppercase inline-block min-w-[84px] mq750:text-[20px]">{i18n("header.Features")}</b>

          <div className="self-stretch flex flex-row items-start justify-between max-w-full gap-[20px] mq750:text-[32px]  text-neutrals-n160 lg:flex-wrap">
            <div className="self-stretch mq750:flex-col flex justify-between w-full gap-[50px] mq750:gap-[32px]">
              <div>
                {" "}
                <b className={`w1-[614px] relative tracking-[0.01em] inline-block shrink-0 w-full lg:flex-1 text-21xl  mq450:text-[28px] mq850:tracking-[0.28px]  mq850:text-[28px] mq750:min-w-auto mq450:max-w-[278px] max-w-[600px] ${selectedLanguage === 'en' ? ' leading-[40px] mq450:leading-[32px] mq850:leading-[28px]' : 'leading-[50px] mq450:leading-[42px] mq850:leading-[38px]' }`}>
                {i18n("CraftsResume.Welcometo")}
                </b>
              </div>
              <div>
                <div className="w-[415px] flex flex-col items-start justify-start gap-[32px] min-w-[415px] max-w-full text-lg lg:flex-1 mq450:gap-[16px] mq750:min-w-full">
                  <div className="self-stretch flex flex-col items-start justify-start mq450:gap-[16px]">
                    <div className="self-stretch h-[83px] relative leading-[24px] inline-block">
                      
                       {i18n("CraftsResume.Ouradvanced")}
                    </div>
                  </div>
                  <div className="self-stretch relative mq450:mt-8 text-xl tracking-[-0.02em] leading-[24px] font-semibold text-system-black mq450:text-lg mq450:leading-[19px]">
                    {i18n("CraftsResume.Betterthan")}
                   
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="w-[1140px] flex flex-col items-start justify-start gap-[42px] max-w-full text-xl mq750:gap-[40px]">
          <div className="self-stretch mq750:h-14 lg:h-[46px] h-14 rounded-xl box-border shrink-0 flex flex-row items-start justify-center mq750:py-4 lg:py-[12px] py-4 px-5 gap-[14px] z-[2] border-[1px] border-dashed border-dimgray">
            <div className="mt-[-5px] h-6 w-6 relative shrink-0 min-h-[24px] flex items-center justify-center">
              <img
                className="h-full w-full shrink-0 object-contain absolute left-[0px] top-[10px] [transform:scale(2.167)]"
                alt=""
                src="/group-1000009096.svg"
              />
            </div>
              <div className={`mq750:mt-[-3px] mq450:mt-[1px] mt-[-6px] h-full relative tracking-[-0.02em] mq450:leading-[20px] mq750:leading-[24px] font-semibold inline-block mq750:text-[24px] mq450:text-[20px] ${selectedLanguage === 'en' ? '' : 'mt-[-1px] mq450:mt-[2px]' }`}>
                
                {i18n("CraftsResume.CraftResumeinMinutes")}
              </div>

            <div className="mt-[-5px] h-6 w-6 relative shrink-0 min-h-[24px] flex items-center justify-center">
              <img
                className="h-full w-full shrink-0 object-contain absolute left-[0px] top-[10px] [transform:scale(2.167)]"
                alt=""
                src="/group-1000009096.svg"
              />
            </div>
          </div>
          <div className="self-stretch grid grid-cols-3 mq850:grid-cols-2 mq450:grid-cols-1 mq450:gap-y-[16px] lg:gap-y-[24px] gap-y-[28px] gap-x-[24px]">
            
              <div className="self-stretch rounded-xl bg-neutral-white flex flex-col items-start justify-between py-8 px-6 gap-[45px] z-[1] mq450:gap-[22px]">
                <div className="w-full max-w-[290px] flex flex-row items-start justify-between gap-[20px]">
                  <img
                    className="h-[52px] w-[52px] relative"
                    alt=""
                    src="/cone.svg"
                  />
                  <div className="h-[35px] flex flex-col items-start justify-start pt-[11px] px-0 pb-0 box-border">
                    <div className="w-6 h-6 relative flex items-center justify-center">
                      <img
                        className="w-full h-full object-contain absolute left-[0px] top-[6px] [transform:scale(2.167)]"
                        alt=""
                        src="/group-10000090941.svg"
                      />
                    </div>
                  </div>
                </div>

                <div className="self-stretch flex flex-col gap-[5px] mq750:text-left">
                  <div className="self-stretch relative text-xl leading-[24px] font-semibold">
                  {i18n("CraftsResume.EfficientSkillshowcasing")}
                  </div>
                  <div className="self-stretch relative text-base leading-[22px] inline-block font-[400]">
                  {i18n("CraftsResume.Highlightyourskills")}
                  </div>
                </div>
              </div>
            
              <FrameComponent
                cone="/cone2.svg"
                skillExtractionAlgorithm={i18n("CraftsResume.EffortlessInformation")}
                preciselyIdentifyYourSkil={i18n("CraftsResume.AIDrivenUX")}
              />


              <div className="self-stretch rounded-xl bg-neutral-white flex flex-col items-start justify-between py-8 px-6 gap-[23px] z-[1]">
                <div className="w-full max-w-[290px] h-[52px] flex flex-row items-end justify-between gap-[20px]">
                  <img
                    className="h-[52px] w-[52px] relative"
                    alt=""
                    src="/cone4.svg"
                  />
                  <div className="h-6 w-6 relative flex items-center justify-center">
                    <img
                      className="h-full w-full object-contain absolute left-[0px] top-[6px] [transform:scale(2.167)]"
                      alt=""
                      src="/group-10000090941.svg"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[5px] mq750:text-left">
                  <div className="self-stretch relative text-xl leading-[24px] font-semibold ">
                  {i18n("CraftsResume.TailoredResumesusingAI")}
                  </div>
                  <div className="self-stretch relative text-base leading-[22px] inline-block font-[400]">
                  {i18n("CraftsResume.Customizeyourresume")}
                  </div>
                </div>
              </div>
            
              <FrameComponent
                cone="/cone1.svg"
                skillExtractionAlgorithm={i18n("CraftsResume.SkillExtractionAlgorithm")}
                preciselyIdentifyYourSkil={i18n("CraftsResume.Preciselyidentify")}
              />           
            
              <div className="self-stretch rounded-xl bg-neutral-white flex flex-col items-start justify-between pt-5 px-6 pb-8 box-border gap-[45px] z-[1] mq450:gap-[22px]">
                <div className="w-full max-w-[290px] flex-1 flex flex-row items-start justify-between gap-[20px]">
                  <div className="flex flex-col items-start justify-start pt-3 px-0 pb-0">
                    <img
                      className="w-[52px] h-[52px] relative"
                      alt=""
                      src="/cone3.svg"
                    />
                  </div>
                  <div className="h-6 w-6 relative flex items-center justify-center">
                    <img
                      className="h-full w-full object-contain absolute left-[0px] top-[6px] [transform:scale(2.167)]"
                      alt=""
                      src="/group-10000090941.svg"
                    />
                  </div>
                </div>
                <div className="self-stretch flex flex-col items-start justify-start gap-[5px] mq750:text-left">
                  <div className="self-stretch relative text-xl leading-[24px] font-semibold">
                  {i18n("CraftsResume.NativeLanguageinputs")}
                  </div>
                  <div className="self-stretch relative text-base leading-[22px] inline-block font-[400]">
                  {i18n("CraftsResume.Inputinformation")}
                  </div>
                </div>
              </div>
            

            

      

            
              <FrameComponent
                cone="/cone5.svg"
                skillExtractionAlgorithm={i18n("CraftsResume.CourseRecommendations")}
                preciselyIdentifyYourSkil={i18n("CraftsResume.Bridgeskillgaps")}
              />

          </div>
          {/* close row */}
        </div>{" "}
      </div>
    </div>
  );
};

export default CraftsResume;
