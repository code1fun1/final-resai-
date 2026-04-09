import { FunctionComponent, useEffect } from "react";
import Header from "../components/header";
import FrameComponent3 from "../components/AIPowered";
import FrameComponent4 from "../components/FrameComponent4";
import FrameComponent5 from "../components/LogoInterviewers";
import CraftsResume from "../components/CraftsResume";
import WalkthroughVisual from "../components/WalkthroughVisual";
import WhyChooseUS from "../components/WhyChooseUS";
import SuccessStories from "../components/SuccessStories";
import FrameComponent9 from "../components/FrameComponent9";
import Faq from "../components/Faq";
import ChooseTemplate from "../components/ChooseTemplate";
import LogoFooterTop from "../components/LogoFooterTop";
import FrameComponent13 from "../components/FrameComponent13";
import VideoModal from "../components/VideoModal";
import Cookies from "universal-cookie";
import { Seo } from "../utilities/Seo";
const ResAILandingPage: FunctionComponent = () => {
  const cookies = new Cookies(null, { path: "/" });
  useEffect(() => {
    const handleModalVideo = () => {
      let expires = new Date();
      let maxTimeInMinToExpire = 60 * 5; // 5 min
      expires.setTime(expires.getTime() + maxTimeInMinToExpire * 1000); //
      if (!cookies.get("ModalVideo")) {
        cookies.set("ModalVideo", "ModalShowedTrue", { path: "/", expires });
      }
    };
    handleModalVideo();
    // cookies.remove('ModalVideo');
  }, []);
  return (
    <>
    <Seo/>
    <div className="w-full relative bg-gray-200 overflow-hidden flex flex-col items-start justify-start leading-[normal] tracking-[normal] text-center text-xl text-darkgoldenrod font-buttons-button-lg">
      <div className="w-px h-[227px] relative box-border hidden z-[0] border-r-[1px] border-dashed border-gray-300" />
      <div className="w-px h-[892px] absolute !m-[0] right-[428px] bottom-[145px] box-border border-r-[1px] border-dashed border-gray-1000" />
      <div className="w-px h-[892px] absolute !m-[0] bottom-[145px] left-[429px] box-border border-r-[1px] border-dashed border-gray-1000" />
      <img
        className="w-[164px] h-10 relative object-contain hidden z-[3]"
        alt=""
        src="/image-22@2x.png"
      />
      <div className="self-stretch flex flex-col items-start justify-start max-w-full">
        <div className=" mq1050:h-[450px] self-stretch h-[1046px] bg-neutral-white overflow-hidden shrink-0 flex flex-col items-start justify-start lg:pt-0 pt-6 px-0 pb-[651px] box-border relative gap-[43px] max-w-full lg:pb-[423px] lg:box-border mq750:gap-[21px] mq750:pb-[0px] mq750:box-border mq1050:h-auto mq1050:pb-[0px] mq1050:box-border">
          <Header />

          <VideoModal showModalState={cookies.get("ModalVideo")} />

          <FrameComponent3 />
          <FrameComponent4 />
          <div className="mq1050:h-[auto] w-full h-[411px] absolute !m-[0] right-[0px] bottom-[-163px] left-[0px] [background:linear-gradient(178.79deg,_rgba(246,_246,_246,_0),_#f6f6f6)] z-[5]" />
          <img
            className="mq1050:invisible mq1050:h-[auto] w-[463.5px] !m-[0]  absolute right-[150.4px] bottom-[353.2px] rounded-[11.98px] max-h-full object-contain z-[5]"
            alt=""
            src="/resume-card@2x.png"
          />
          <div className="w-[1402px] h-[1534px] absolute !m-[0] bottom-[-589px] left-[calc(50%_-_701px)]">
            <div className="absolute top-[377px] left-[123px] [filter:blur(400px)] rounded-[50%] bg-lightgray2 w-[1157px] h-[1157px]" />
            <img
              className="absolute mq850:top-auto mq850:bottom-[85px] top-[0px] left-[0px] w-[1402px] h-[912px] z-[1] mq750:hidden"
              alt=""
              src="/union.svg"
            />
            <img
              className="mq850:top-[46%] mq850:left-[22.7%] mq750:top-[42%] mq750:left-[27%] mq1050:top-[37%] mq1050:left-[21%] mq450:top-[39%] mq450:left-[36%] mq360:top-[38.5%] mq360:left-[38.5%] absolute top-[198.5px] left-[205.3px] w-[32.5px] h-[32.5px] z-[2]"
              alt=""
              src="/group-1000009094.svg"
            />
            <img
              className="mq850:top-[54%] mq850:left-[73%]   mq750:top-[52%] mq750:left-[60%] mq1050:top-[51%] mq1050:left-[60%]  mq450:top-[49.5%] mq450:left-[59.2%] absolute top-[319px] left-[1165px] w-[32.5px] h-[32.5px] z-[2]"
              alt=""
              src="/group-1000009095.svg"
            />
            <img
              className="mq1050:invisible mq1050:h-[0px] h-[auto] absolute top-[614px] left-[102px] rounded-xl max-h-full w-[486.2px] object-contain z-[7]"
              alt=""
              src="/similarity-score-card@2x.png"
            />
          </div>
        </div>
        <div className="w-[100%] [background:linear-gradient(178.79deg,_rgba(246,_246,_246,_0),_#f6f6f6)]">
          <FrameComponent5 />
        </div>
      </div>
      <CraftsResume />
      <WalkthroughVisual />
      <WhyChooseUS />
      <SuccessStories />
      <FrameComponent9 />
      <Faq />
      <ChooseTemplate />
      {/* <LogoFooterTop /> */}
      <FrameComponent13 />

    </div>
    </>
  );
};

export default ResAILandingPage;
