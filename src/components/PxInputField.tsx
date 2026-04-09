import { FunctionComponent, useMemo, type CSSProperties } from "react";

export type PxInputFieldType = {
  className?: string;
  name1?: string;
  fullName?: string;

  /** Style props */
  propFlex?: CSSProperties["flex"];
  propMinWidth?: CSSProperties["minWidth"];
  propAlignSelf?: CSSProperties["alignSelf"];
};

const PxInputField: FunctionComponent<PxInputFieldType> = ({
  className = "",
  name1,
  fullName,
  propFlex,
  propMinWidth,
  propAlignSelf,
}) => {
  const pxInputFieldStyle: CSSProperties = useMemo(() => {
    return {
      flex: propFlex,
      minWidth: propMinWidth,
      alignSelf: propAlignSelf,
    };
  }, [propFlex, propMinWidth, propAlignSelf]);

  return (
    <div
      className={`flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[183px] text-left text-sm text-neutrals-n70 font-buttons-button-lg ${className}`}
      style={pxInputFieldStyle}
    >
      <div className="w-[34px] relative leading-[14px] capitalize font-semibold inline-block overflow-hidden1 text-ellipsis whitespace-nowrap">
        {name1}
      </div>
      <div className="self-stretch rounded-md bg-neutral-white flex flex-row items-center justify-center py-1.5 px-[23px] text-base text-neutrals-n40 border-[1px] border-solid border-neutrals-n10">
        <div className="flex-1 flex flex-row items-center justify-start py-3 px-0">
          <div className="relative leading-[16px] capitalize font-semibold inline-block min-w-[63px]">
            {fullName}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PxInputField;
