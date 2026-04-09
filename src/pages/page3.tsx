import { FunctionComponent } from "react";
import FrameComponent2 from "../components/header";
import FrameComponent3 from "../components/AIPowered";
import FrameComponent4 from "../components/FrameComponent4";
import FrameComponent5 from "../components/LogoInterviewers";


const page3: FunctionComponent = () => {
  return (
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
        <div className=" mq1050:h-[450px] self-stretch h-[1046px] bg-neutral-white overflow-hidden shrink-0 flex flex-col items-start justify-start pt-6 px-0 pb-[651px] box-border relative gap-[43px] max-w-full lg:pt-5 lg:pb-[423px] lg:box-border mq750:gap-[21px] mq750:pb-[0px] mq750:box-border mq1050:h-auto mq1050:pb-[275px] mq1050:box-border">
          <FrameComponent2 />
          Page333333333333333333333333333
          
        </div>
        
      </div>
      
    </div>
  );
};

export default page3;
