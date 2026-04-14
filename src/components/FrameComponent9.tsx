import { FunctionComponent } from "react";
import StepsContainer from "./StepsContainer";
import { useTranslation } from "react-i18next";
import { appConfig } from "../config/config";
export type FrameComponent9Type = {
  className?: string;
};

const FrameComponent9: FunctionComponent<FrameComponent9Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  return (
    <div
      id="howItWorks" className={`self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[130px] box-border max-w-full text-center text-xl text-darkgoldenrod font-buttons-button-lg mq750:pb-[55px] mq750:box-border mq1050:pb-[84px] mq1050:box-border ${className}`}
    >
      <div className="w-[1132px] flex flex-col items-start justify-start gap-[56px] max-w-full mq750:gap-[28px]">
        <div className="self-stretch flex flex-row items-start justify-center py-0 px-5">
          <div className="flex flex-col mq750:items-center mq750:justify-center items-center justify-start gap-[17px]">
            <div className="flex flex-row items-start justify-start py-0 px-14">
              <b className="relative tracking-[0.04em] leading-[20px] uppercase inline-block min-w-[114px]]">
              {i18n("frameComponentsNine.EasySteps")}
              </b>
            </div>
            <b className="relative text-21xl tracking-[0.01em] leading-[40px] text-neutrals-n90 text-left mq750:text-13xl mq750:leading-[32px]">
            {i18n("frameComponentsNine.HowItWork")}
            </b>
          </div>
        </div>
        <div className="self-stretch flex flex-row items-end justify-center gap-[68px] max-w-full text-left text-5xl text-neutral-white lg:gap-[34px] mq750:gap-[17px] mq750:flex-wrap">
          <div className="w-[450px] flex flex-col items-start justify-start gap-[54.5px] min-w-[450px] max-w-full mq450:gap-[27px] mq750:min-w-full mq1050:flex-1">
            <div className="mq850:ml-[60px] mq450:ml-[0px] self-stretch flex flex-col items-start justify-start gap-[5px] max-w-full">
              <StepsContainer
                stepOneNumber="1"
                uploadYourInformation={i18n("frameComponentsNine.UploadYourInformation")}
                uploadYourExistingResumeO={i18n("frameComponentsNine.UploadExistingResume")}
              />
              <StepsContainer
                stepOneNumber="2"
                uploadYourInformation={i18n("frameComponentsNine.AiEnhancement")}
                uploadYourExistingResumeO={i18n("frameComponentsNine.LetAiAlgorithm")}
              />
              <StepsContainer
                stepOneNumber="3"
                uploadYourInformation={i18n("frameComponentsNine.Customisation")}
                uploadYourExistingResumeO={i18n("frameComponentsNine.TailoredYourResume")}
              />
              <div className="self-stretch flex flex-row items-start justify-start gap-[24px] max-w-full text-neutrals-n90 mq450:flex-wrap">
                <div className="h-12 w-12 relative">
                  <div className="bg-white border-[2px] absolute top-[0px] left-[0px] [backdrop-filter:blur(40px)] rounded-[50%] bg-gray-700 box-border w-full h-full border-[0px] border-solid border-neutrals-n20" />
                  <b className="text-black absolute top-[12px] left-[17px] tracking-[0.01em] leading-[24px] inline-block min-w-[13px] z-[1] mq450:text-lgi mq450:leading-[19px]">
                    4
                  </b>
                </div>
                <div className="flex-1 flex flex-col items-start justify-start pt-2 px-0 pb-0 box-border min-w-[246px] max-w-full">
                  <div className="self-stretch flex flex-col items-start justify-start gap-[16px]">
                    <div className="relative leading-[24px] font-semibold inline-block min-w-[98px] mq450:text-lgi mq450:leading-[19px]">
                    {i18n("frameComponentsNine.Download")}
                    </div>
                    <div className="self-stretch relative text-base leading-[24px] text-neutrals-n70">
                      {i18n("frameComponentsNine.DownloadProfessionalyCrafted")}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-row items-start justify-start py-0 px-[69px] box-border max-w-full text-center text-lg mq450:pl-5 mq450:pr-5 mq450:box-border">
            <a href={appConfig.loginUrl ?? '/'} style={{ color: 'inherit', textDecoration: 'inherit'}}>
              <div className="rounded-md bg-neutrals-n90 flex flex-row items-start justify-start py-[19px] px-10 gap-[16px]">
                <div className="relative leading-[18px] font-semibold inline-block min-w-[108px]">
                  {i18n("frameComponentsNine.CreateResumeButton")}
                </div>
                <div className="flex flex-col items-start justify-start pt-[2.9px] px-0 pb-0">
                  <img
                    className="w-1.5 h-3 relative"
                    alt=""
                    src="/create-resume-button-icon.svg"
                  />
                </div>
              </div>
            </a>

            </div>
          </div>
          <div className="h-[711px] mq850:h-[612px]  flex-1 relative rounded-xl bg-papayawhip overflow-hidden min-w-[399px] mq850:min-w-[339px] max-w-full text-right text-9xs-7 text-darkslategray font-caption mq750:h-auto mq750:min-h-[711] mq750:min-w-full">
            <div className="absolute top-[155.8px] mq850:top-[37px] left-[85px] mq850:left-[31px] rounded-tl-[7.78px] rounded-tr-9xs-1 rounded-b-none bg-neutral-white box-border w-[733.9px] flex flex-row items-end justify-between py-0.5 pr-6 pl-2 gap-[20px] z-[3] border-[0.3px] border-solid border-neutrals-n10">
              <div className="h-[20.4px] w-[733.9px] relative rounded-tl-[7.78px] rounded-tr-9xs-1 rounded-b-none bg-neutral-white box-border hidden max-w-full border-[0.3px] border-solid border-neutrals-n10" />
              <div className="flex flex-row items-start justify-start gap-[76px] max-w-full mq750:flex-wrap">
                <div className="flex flex-col items-start justify-start pt-[3.9px] px-0 pb-0">
                  <div className="w-[26.4px] h-[6.1px] relative">
                    <div className="absolute top-[0px] left-[0px] rounded-[50%] bg-alerts-warning w-[6.1px] h-[6.1px] z-[4]" />
                    <div className="absolute top-[0px] left-[10.2px] rounded-[50%] bg-mediumaquamarine w-[6.1px] h-[6.1px] z-[4]" />
                    <div className="absolute top-[0px] left-[20.3px] rounded-[50%] bg-alerts-error w-[6.1px] h-[6.1px] z-[4]" />
                  </div>
                </div>
                <div className="flex flex-row items-end justify-start py-0 pr-[61px] pl-0 gap-[10.7px]">
                  <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[1.9px]">
                    <img
                      className="w-[8.2px] h-[8.2px] relative z-[4]"
                      alt=""
                      src="/group-83732.svg"
                    />
                  </div>
                  <div className="h-[12.2px] w-[25.9px] relative">
                    <img
                      className="absolute top-[0px] left-[0px] w-[12.2px] h-[12.2px] object-contain z-[4]"
                      alt=""
                      src="/group-82512@2x.png"
                    />
                    <img
                      className="absolute top-[0px] left-[13.7px] w-[12.2px] h-[12.2px] z-[4]"
                      alt=""
                      src="/group-83662.svg"
                    />
                  </div>
                </div>
                <div className="w-[159px] rounded-[1.86px] bg-aera-background-grey flex flex-row items-start justify-start pt-[3.9px] pb-[3.7px] pr-[29px] pl-[34px] box-border gap-[4.1px] z-[4]">
                  <div className="h-[13.9px] w-[159px] relative rounded-[1.86px] bg-aera-background-grey hidden" />
                  <img
                    className="h-[6.1px] w-[6.1px] relative z-[1]"
                    alt=""
                    src="/group-83672.svg"
                  />
                  <div className="flex-1 flex flex-col items-start justify-start pt-[1.4px] px-0 pb-0">
                    <div className="self-stretch relative z-[1]">
                      https://dribbble.com/galaxyux
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-start justify-end pt-0 px-0 pb-[2.8px]">
                <div className="w-[44.9px] h-[8.2px] relative">
                  <img
                    className="absolute top-[0px] left-[0px] w-[8.2px] h-[8.2px] z-[4]"
                    alt=""
                    src="/group-83721.svg"
                  />
                  <img
                    className="absolute top-[0px] left-[18.4px] w-[8.2px] h-[8.2px] z-[4]"
                    alt=""
                    src="/group-83711.svg"
                  />
                  <img
                    className="absolute top-[0px] left-[36.7px] w-[8.2px] h-[8.2px] z-[4]"
                    alt=""
                    src="/group-83691.svg"
                  />
                </div>
              </div>
            </div>
            <div className="absolute top-[-37.2px] left-[-27px] mq850:left-[-80px] w-[795px] h-[747.2px]">
              <div className="absolute top-[10px] left-[123px] w-[451px] h-[583px] z-[1] flex items-center justify-center">
                <img
                  className="w-full h-full z-[1] object-contain absolute left-[5px] top-[9px] [transform:scale(1.068)]"
                  alt=""
                  src="/footer-copyright-icon.svg"
                />
              </div>
              <img
                className="absolute top-[213.2px] mq850:top-[94px] left-[112px] rounded-t-none rounded-br-none rounded-bl-lg w-[733.7px] h-[534px] object-cover z-[2]"
                alt=""
                src="/craft-1@2x.png"
              />
              <div className="absolute top-[0px] left-[0px] w-[451px] h-[583px]">
                <div className="absolute top-[0px] left-[0px] w-full h-full flex items-center justify-center">
                  <img
                    className="w-full h-full object-contain absolute left-[10px] top-[9px] [transform:scale(1.045)]"
                    alt=""
                    src="/footer-copyright-icon.svg"
                  />
                </div>
                <img
                  className="absolute top-[153px] left-[75px] mq850:top-[63px] mq850:left-[95px] w-[37px] h-[41px] mq850:w-[16px] mq850:h-[18px] z-[4] "
                  alt=""
                  src="/highlight-05.svg"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent9;
