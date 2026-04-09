import { FunctionComponent } from "react";

export type PdfNoteType = {
  className?: string;

  /** Variant props */
  property1?: string;
};

const PdfNote: FunctionComponent<PdfNoteType> = ({
  className = "",
  property1 = "thin",
}) => {
  return (
    <div className={`w-[42px] h-[42px] relative ${className}`}>
      <img
        className="absolute h-[62.38%] w-[62.62%] top-[20.95%] right-[16.43%] bottom-[16.67%] left-[20.95%] max-w-full overflow-hidden max-h-full"
        alt=""
        src="/elements3.svg"
      />
    </div>
  );
};

export default PdfNote;
