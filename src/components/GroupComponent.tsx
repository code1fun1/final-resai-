import { FunctionComponent } from "react";

export type GroupComponentType = {
  className?: string;
  resumeTemplateKelsey1?: string;
  resumeTemplateName?: string;
  resumeTemplateColumn?: string;
  padingingX?: string;
};

const GroupComponent: FunctionComponent<GroupComponentType> = ({
  className = "",
  resumeTemplateKelsey1,
  resumeTemplateName,
  resumeTemplateColumn,
  padingingX
}) => {
  return (
    
    <div
      className={`h-[auto] flex flex-col items-center justify-start gap-[16px] text-left text-lg text-neutrals-n150 font-buttons-button-lg ${className}`}
    >
   
      <div className="self-stretch1 flex-1 relative rounded-md max-w-full max-h-full flex items-center justify-center">
        <img
          className={`self-stretch flex-1 overflow-hidden1 object-contain absolute1 left-[0px] top-[15px] w-full h-full [transform:scale(1)] pt1-[30px] px-[${padingingX}]`}
          alt=""
          src={resumeTemplateKelsey1}
        />
        
      </div>
      <div className="flex flex-row items-start mq450:items-center justify-start mq450:justify-center py-0 px-1">
        <div className="flex flex-col items-start mq450:items-center justify-start mq450:justify-center gap-[8px]">
          <div className="relative leading-[24px] font-semibold inline-block min-w-[121px]">
          {resumeTemplateColumn}
          </div>
          <div className="relative text-base leading-[24px]">
            {resumeTemplateName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupComponent;
