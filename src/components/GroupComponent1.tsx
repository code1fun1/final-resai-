import { FunctionComponent, useMemo, useState, type CSSProperties } from "react";
import { useTranslation } from "react-i18next";
export type GroupComponent1Type = {
  className?: string;
  testimonialContent: string;
  testimonialAuthorImages?: string;
  snehaSharma?: string;
  location?: string;
  /** Style props */
  propLeft?: CSSProperties["left"];
  propWidth?: CSSProperties["width"];
};

const GroupComponent1: FunctionComponent<GroupComponent1Type> = ({
  className = "",
  testimonialContent,
  testimonialAuthorImages,
  snehaSharma,
  location,
  propLeft,
  propWidth,
}) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const { t: i18n } = useTranslation();
  const groupDivStyle: CSSProperties = useMemo(() => {
    return {
      left: propLeft,
      width: propWidth,
    };
  }, [propLeft, propWidth]);

  const toggleReadMore = () => setIsExpanded((prev) => !prev);

  const displayedContent =
    testimonialContent.length > 150 && !isExpanded
      ? `${testimonialContent.slice(0, 150)}...`
      : testimonialContent;

  return (
    <div
      className={` !m-[0] ml-5px absolute1 top-[0px] left-[0px] rounded-xl bg-neutral-white box-border flex flex-row items-start justify-start py-[38px] mq450:py-[35px] px-7 mq450:px-[20px] max-w-full text-left text-base text-neutrals-n80 font-buttons-button-lg border-[1px] border-solid border-neutrals-n10 ${className}`}
      style={groupDivStyle}
    >
      <div className="h-[248px] w-[364px] relative rounded-xl bg-neutral-white box-border hidden max-w-full border-[1px] border-solid border-neutrals-n10" />
      <div className="w-[308px] flex flex-col items-start justify-start py-0 px-0 box-border gap-[24px] z-[1]">
        <div className="self-stretch relative leading-[26px] mq450:text-sm font-normal mq450:leading-[23px] text-justify">
          {displayedContent}
          {testimonialContent.length > 150 && (
            <span
              className="text1-blue-500 font-semibold cursor-pointer ml-2"
              onClick={toggleReadMore}
            >
              {isExpanded ? i18n("groupComponentOne.ReadLess") : i18n("groupComponentOne.ReadMore")}
            </span>
          )}
        </div>
        <div className="flex flex-row items-center justify-start gap-[8px]">
          <img
            className="h-10 w-10 relative rounded-[50%] object-cover"
            alt=""
            src={testimonialAuthorImages}
          />
          <div className="flex flex-row items-center justify-start gap-[12px]">
            <div className="relative tracking-[-0.02em] leading-[16px] font-semibold inline-block min-w-[88px]">
              {snehaSharma}
            </div>
            <div className="relative text-sm leading-[14px] text-neutrals-n50 inline-block min-w-[30px]">
              {location}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default GroupComponent1;
