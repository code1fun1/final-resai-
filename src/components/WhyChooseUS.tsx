import { FunctionComponent } from "react";
import FrameComponent1 from "./FrameComponent1";
import { useTranslation } from "react-i18next";
export type FrameComponent7Type = {
  className?: string;
};

const WhyChooseUS: FunctionComponent<FrameComponent7Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  return (
    <div
      className={`self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[130px] box-border max-w-full text-left text-xl text-darkgoldenrod font-buttons-button-lg mq450:pb-[55px] mq450:box-border mq1050:pb-[84px] mq1050:box-border ${className}`}
    >
      <div className="w-[1140px] flex flex-col items-start mq750:items-center justify-start gap-[20px] max-w-full mq750:gap-[28px]">
        <div className="self-stretch flex flex-row items-start mq750:items-center justify-center py-0 px-5">
          <div className=" mq750:text-center w-[315px] flex flex-col items-center justify-start gap-[17px]">
            <div className="self-stretch flex flex-row mq750:items-center items-start justify-center py-0 pr-[21px] pl-5">
              <b className="relative tracking-[0.04em] leading-[20px] uppercase ">
              {i18n("whyChooseUs.Special")}
              </b>
            </div>
            <b className="relative mq750:text-13xl text-21xl tracking-[0.01em] leading-[40px] text-neutrals-n90 ">
            {i18n("whyChooseUs.ChooseResAi")}
            </b>
          </div>
        </div>

        <div className="self-stretch grid grid-cols-3 mq450:grid-cols-1 mq850:grid-cols-2 gap-4 ">
  <div className="...">
  <FrameComponent1
              cone="/cone6.svg"
              professionalTailoredResum={i18n("whyChooseUs.ProfessionalTailoredResume")}
              createCustomizedResumesTh={i18n("whyChooseUs.CreateCustomisedResume")}
             // propMinWidth="400px"
            />

  </div>
  <div className="...">
  <FrameComponent1
              cone="/cone7.svg"
              professionalTailoredResum={i18n("whyChooseUs.BridgeSkillGap")}
              createCustomizedResumesTh={i18n("whyChooseUs.WithOurGetSkill")}
             // propFlex="1"
             // propMinWidth="400px"
            />
  </div>
  <div className="...">
  <FrameComponent1
              cone="/cone8.svg"
              professionalTailoredResum={i18n("whyChooseUs.AccesibleAndFree")}
              createCustomizedResumesTh={i18n("whyChooseUs.UseOurFreeTools")}
            //  propFlex="0.8317"
            //  propMinWidth="400px"
            />
  </div>

  <div className="mq850:visible mq850:h-[auto] h-[0] invisible mq450:visible">
  <FrameComponent1
                cone="/cone9.svg"
                professionalTailoredResum={i18n("whyChooseUs.PersonalisedSimilarityScore")}
                createCustomizedResumesTh={i18n("whyChooseUs.BoostCareer")}
               // propFlex="1"
                //propMinWidth="370px"
              />
    </div>
  </div>
  {/* row1 close */}

  <div className="self-stretch grid grid-cols-2 mq450:grid-cols-1   mq850:grid-cols-1 gap-4 m-auto  mq450:ml-[0px] mq450:mr-[0px] 	ml-[12.5%]  mr-[12.5%]	mq850:ml-[25%] mq850:mr-[25%]">

  <div className="mq850:invisible mq850:h-[0] h-[auto] visible mq450:invisible ">
  <FrameComponent1
                cone="/cone9.svg"
                professionalTailoredResum={i18n("whyChooseUs.PersonalisedSimilarityScore")}
                createCustomizedResumesTh={i18n("whyChooseUs.BoostCareer")}
               // propFlex="1"
                //propMinWidth="370px"
              />
    </div>
    <div className="">
    <FrameComponent1
                cone="/cone10.svg"
                professionalTailoredResum={i18n("whyChooseUs.NativeLanguageInput")}
                createCustomizedResumesTh={i18n("whyChooseUs.HavingProblemWithEnglish")}
               // propFlex="1"
              // propMinWidth="370px"
              />
    </div>

  
</div>


        {/* <div className="self-stretch flex flex-col items-center justify-center gap-[24px] max-w-full text-center text-3xl text-neutrals-n90">
          <div className="self-stretch flex flex-row items-center justify-center gap-[16px] max-w-full mq1050:flex-wrap">

          







            <FrameComponent1
              cone="/cone6.svg"
              professionalTailoredResum="Professional tailored resumes"
              createCustomizedResumesTh="Create customized resumes that meet  industry standards."
             // propMinWidth="400px"
            />
            <FrameComponent1
              cone="/cone7.svg"
              professionalTailoredResum="Bridge skill gaps"
              createCustomizedResumesTh="With our “Get Skill Course” feature get access to personalized skill courses designed to enhance your professional abilities and boost your career prospects significantly"
             // propFlex="1"
             // propMinWidth="400px"
            />
            <FrameComponent1
              cone="/cone8.svg"
              professionalTailoredResum="Accessible and Free"
              createCustomizedResumesTh="Use our free tools to build your resume without any  hassle."
            //  propFlex="0.8317"
            //  propMinWidth="400px"
            />

          
          </div>
          <div className="self-stretch flex flex-row mq750:items-center items-start justify-center py-0 px-5 box-border max-w-full">
            <div className="w-[756px] flex flex-row mq750:items-center items-start justify-center gap-[16px] max-w-full mq750:flex-wrap">
              <div className="flex shadow-[0px_24px_48px_rgba(0,_0,_0,_0.05)] rounded-xl bg-neutral-white box-border flex flex-col mq750:items-center items-start justify-start pt-[20px] px-14 pb-[20px] gap-[9px] min1-w-[400px] mq1050:min-h-[263px] min1-h-[341px] max-w-full border-[1px] border-solid border-neutrals-n10 mq450:pl-5 mq450:pr-5 mq450:box-border mq750:flex-1">
                <div className="self-stretch flex flex-row mq750:items-center items-start justify-center">
                  <img className="h-20 w-20 relative" alt="" src="/cone9.svg" />
                </div>
                <div className="self-stretch flex flex-col mq750:items-center mq750:justify-center items-start justify-start gap-[16px]">
                  <div className="self-stretch flex flex-row mq750:items-center items-start mq750:justify-center justify-start py-0 px-1.5">
                    <div className="relative leading-[22px] font-semibold ">
                      Personalized similarity score
                    </div>
                  </div>
                  <div className="self-stretch relative text-sm tracking-[0.01em] leading-[20px] text-neutrals-n70">
                    Boost career with personalized skill courses for
                    professional enhancement.
                  </div>
                </div>
              </div>

              
              <FrameComponent1
                cone="/cone10.svg"
                professionalTailoredResum="Native language Input"
                createCustomizedResumesTh="Having problems with English? No probs! Our resume builder lets you enter your personal info in your native language and its AI interface does the rest for you, from interpreting to processing. We have it all covered."
               // propFlex="1"
                //propMinWidth="400px"
              />
            </div>
          </div>
        </div> */}
      </div>
    </div>
  );
};

export default WhyChooseUS;
