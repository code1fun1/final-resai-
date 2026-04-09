import { FunctionComponent } from "react";
import { useTranslation } from "react-i18next";
export type FrameComponent12Type = {
  className?: string;
};

const LogoFooterTop: FunctionComponent<FrameComponent12Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  return (
    <>
      <div
        className={`self-stretch  h2-[232px] shadow-[0px_24px_48px_rgba(0,_0,_0,_0.05)] bg-neutral-white overflow-hidden shrink-0 flex flex-col items-end justify-start pt-12 px-0 pb-0 box-border relative gap-[73px] max-w-full z-[1] text-left text-13xl text-system-black font-buttons-button-lg mq450:gap-[18px] mq10750:gap-[0px] ${className}`}
      >
        <div className="self-stretch h-[232px] relative bg-neutral-white hidden z-[0]" />
        <div className="w-8 h-[62.4px] relative hidden z-[1]" />
        <div className="w-[440px] h-[604px] absolute !m-[0] top-[-366px] left-[0px]">
          <div className="absolute h-full top-[0px] bottom-[0px] left-[-164px] [filter:blur(600px)] rounded-[50%] w-[604px] z-[2]" />
          <img
            className="absolute top-[400px] left-[140px] w-[50.3px] h-[50.3px] object-contain z-[3]"
            alt=""
            src="/cone11@2x.png"
          />
        </div>
        <div className="self-stretch flex flex-col items-start justify-start gap-[38px] shrink-0 max-w-full mq750:gap-[19px]">
          <div className="w-[790px] mq550:w-[350px] mq550:text-center mq550:m-auto flex flex-row items-start justify-center py-0 px-5 box-border max-w-full">
            <div className="relative tracking-[-0.02em] leading-[32px] font-semibold z-[4]">
              {i18n("logoFooterTop.NeedResumeWriter")}
            </div>
          </div>
        </div>

        <div
          className={` w-full  shadow-[0px_24px_48px_rgba(0,_0,_0,_0.05)] bg-neutral-white  items-end pt1-10`}
        >
          <div
            className={`self-stretch  grid grid-cols-8  mq450:grid-cols-2   mq750:grid-cols-2 mq550:grid-cols-2 pt1-12 px-5 pb-[0px] mq1050:h-[auto]   h-[116px]  justify-start box-border relative gap-[45px]  z-[1] text-left text-13xl text-system-black font-buttons-button-lg  mq1050:gap-[0px] border-t-[1px] border-solid border-gray-900 border-b-[1px] mq1050:lg:pl-[0] mq1050:lg:pr-[0]  lg:pl-[75px] lg:pr-[75px] lg:box-border ${className}`}
          >
            <div className="col-span-2 gap-20  mq750:col-span-1 box-border shrink-0 opacity1-[0.32] border-r-[1px] border-solid border-neutrals-n40  mq1050:border-b-[1px]">
              <div className=" shrink-0   items-end justify-end pt-[46px] px-0 mq1050:pb-[30px] pb-0 box-border pr-10  mq1050:pr-0">
                <div className="flex flex-row items-start justify-end gap-[7.7px] mq750:justify-around mq1050:pr-[10px]">
                  <img
                    className="flex-2 flex flex-col items-end justify-end  h-6 mq850:w-[90px]  w-[100px] relative shrink-0"
                    alt=""
                    src="/wheelappLogo.png"
                  />
                </div>
              </div>
            </div>

            <div className="box-border shrink-0 opacity1-[0.32] border-r-[1px] border-solid border-neutrals-n40 mq750:border-r-[0px]  mq1050:border-b-[1px]">
              <div className=" shrink-0  items-end justify-end pt-[46px] mq1050:pb-[30px] px-0 pb-0 box-border pr-10 mq1050:pr-0">
                <div className="flex flex-row items-start justify-end gap-[7.7px] mq1050:justify-around">
                  <img
                    className="flex-2 flex flex-col items-end justify-end  h-6 mq850:w-[90px] w-[100px] relative shrink-0"
                    alt=""
                    src="/kineticLogo.png"
                  />
                </div>
              </div>
            </div>

            <div className="box-border shrink-0 opacity1-[0.32] border-r-[1px] border-solid border-neutrals-n40  mq1050:border-b-[1px]">
              <div className=" shrink-0  items-end justify-end pt-[46px] mq1050:pb-[30px] px-0 pb-0 box-border pr-10  mq1050:pr-0">
                <div className="flex flex-row items-start justify-end gap-[7.7px] mq1050:justify-around">
                  <img
                    className="flex-2 flex flex-col items-end justify-end  h-6 mq850:w-[90px]  w-[100px] relative shrink-0"
                    alt=""
                    src="/grosshoperLogo.png"
                  />
                </div>
              </div>
            </div>

            <div className="box-border shrink-0 opacity1-[0.32] border-r-[1px] border-solid border-neutrals-n40  mq750:border-r-[0px]  mq1050:border-b-[1px]">
              <div className=" shrink-0 mq1050:justify-center  items-end justify-end pt-[46px] px-0 pb-0 box-border pr-10  mq1050:pr-0">
                <div className="flex flex-row items-start justify-end gap-[7.7px] mq1050:justify-around">
                  <img
                    className="flex-2 flex flex-col items-end justify-end  h-6 mq850:w-[90px]  w-[100px] relative shrink-0"
                    alt=""
                    src="/pastelLogo.png"
                  />
                </div>
              </div>
            </div>

            <div className="box-border shrink-0 opacity1-[0.32] border-r-[1px] border-solid border-neutrals-n40 ">
              <div className=" shrink-0  items-end justify-end pt-[46px] mq1050:pb-[30px] px-0 pb-0 box-border pr-10  mq1050:pr-0">
                <div className="flex flex-row items-start justify-end gap-[7.7px] mq1050:justify-around">
                  <img
                    className="flex-2 flex flex-col items-end justify-end1 justify-between h-6 mq850:w-[90px]  w-[100px] relative shrink-0"
                    alt=""
                    src="/omegaLogo.png"
                  />
                </div>
              </div>
            </div>

            <div className="mq850:col-span-1 col-span-2 mq1050:col-span-1 box-border shrink-0 opacity1-[0.32] ">
              <div className=" shrink-0  items-start justify-start pt-[46px] px-0 pb-0 box-border">
                <div className=" flex flex-row mq1050:justify-around items-end justify-start gap-[7.7px]">
                  <img
                    className="h-6 mq850:w-[90px] w-[100px] relative shrink-0"
                    alt=""
                    src="/egalKartLogo.png"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default LogoFooterTop;
