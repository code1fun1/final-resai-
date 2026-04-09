import { CardMedia } from "@mui/material";
import { FunctionComponent,useState } from "react";
import { useTranslation } from "react-i18next";
export type WalkthroughVisualType = {
  className?: string;
};
const WalkthroughVisual: FunctionComponent<WalkthroughVisualType> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  const selectedLanguage = localStorage.getItem('nextSelectedLanguage');
  return (
    <>
    <div id="tutorials"
     className="self-stretch flex flex-row items-center justify-center pt-0 px-5 pb-16 box-border max-w-full">
    <div className="w-[501px] flex flex-col items-center justify-start gap-[17px] max-w-full">
      <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5">
        <b className="relative tracking-[0.04em] leading-[20px] uppercase  mq450:leading-[16px]">
        {i18n("walkThroughVisual.StillConfusing")}
        </b>
      </div>
      <b className={`h-20 relative mq750:text-13xl text-21xl tracking-[0.01em]  inline-block text-system-black 
         ${
            selectedLanguage === 'en' ? 'leading-[40px]' : 'mq550:leading-[40px] leading-[55px]'
        }`}>
        <p className="m-0 whitespace-pre-wrap">
        {i18n("walkThroughVisual.CompletelWalkthrough")}
        </p>
        <p className="m-0">{i18n("walkThroughVisual.OurResumeBuilder")}</p>
      </b>
    </div>
  </div>
    
    <div
      className={`self-stretch flex flex-row items-start justify-center pt-0 px-5 pb-[130px]  ${className}`}
    >
           <CardMedia
        component="video"
        image={"/resai-video.mov"}
        controls
        sx={{
          maxWidth: '1000px',
          maxHeight: '732px',
          width: '100%',
          height: 'auto',
          margin: '0 auto',
          display: 'block'
        }}
      />
    </div>
    </>
  );
};

export default WalkthroughVisual;
