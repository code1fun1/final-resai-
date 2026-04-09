import { FunctionComponent, useState } from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import { useTranslation } from "react-i18next";

export type FrameComponent10Type = {
  className?: string;
};

const Faq: FunctionComponent<FrameComponent10Type> = ({ className = ""}) => {
   const { t: i18n } = useTranslation();
  // const { t } = useTranslation();
  const getfaqs:any = i18n('faqsQuesAnswer', { returnObjects: true });
  

  const [expanded, setExpanded] = useState<string | false>(false);

  const handleChange = (panel: string) => (
    event: React.SyntheticEvent,
    isExpanded: boolean
  ) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div
      id="faqs"
      className={`self-stretch bg-neutrals-n0  h-[1850px]  relative bg-neutral-white overflow-hidden shrink-0 max-w-full z-[3] text-left text-xl text-darkgoldenrod font-buttons-button-lg ${className}`}
    >
      <img
        className="absolute top-[0px] left-[0px] w-[1440px] h-[745px] object-cover hidden"
        alt=""
        src="/image-311@2x.png"
      />
      <div className="absolute top-[0px] left-[999px] box-border w-px h-[935px] z-[1] border-r-[1px] border-dashed border-gray-1100" />
      <div className="absolute top-[0px] left-[417px] box-border w-px h-[935px] z-[1] border-r-[1px] border-dashed border-gray-1100" />
      <div className="absolute top-[0px] left-[0px] bg-neutrals-n0 w-full flex flex-row items-start justify-center py-20  mq5502:pb-[5rem]  mq5502:pt-[5px] px-5 box-border min-h-[0] max-w-full">
        <div className="h-[1800px] w-[1440px] relative bg-neutrals-n0 hidden max-w-full" />
        <div className="w-[752px] overflow-auto shrink-0 flex flex-col mq750:items-center mq750:justify-center items-center justify-start gap-[56px] max-w-full z-[2] mq750:gap-[28px]">
          <div className="flex flex-col mq750:items-center mq750:justify-center items-center justify-start gap-[17px] max-w-full">
            <b className="relative tracking-[0.04em] leading-[20px] uppercase inline-block min-w-[36px]">
              {i18n("faqs.FaqTitle")}
            </b>
            <b className="relative text-21xl tracking-[0.01em] leading-[40px] capitalize text-neutrals-n90 text-center mq750:text-13xl mq750:leading-[32px]">
              <p className="m-0">{i18n("faqs.AnswerFrequently")}</p>
              <p className="m-0">{i18n("faqs.AskedQuestion")}</p>
            </b>
          </div>
          <div className="FaqAccordion self-stretch flex flex-col items-start justify-start mq550:gap-[5px] gap-[15px] max-w-full text-lg text-neutrals-n60">
            {getfaqs.map((faq:any, index:any) => (
              <Accordion
                key={index}
                expanded={expanded === `panel${index}`}
                onChange={handleChange(`panel${index}`)}
                sx={{
                  borderColor: "#e2e2e3",
                  boxShadow: "none",
                  border: "#e2e2e3 1px solid",
                }}
              >
                <AccordionSummary
                  sx={{
                    paddingLeft: "25px",
                    letterSpacing: "-0.01em",
                    lineHeight: "18px",
                    backgroundColor: "#f3f3f3",
                    borderRadius: "5px",
                    fontWeight: 500,
                    opacity: 0.75,
                    minHeight: "54px",
                  }}
                  expandIcon={<ExpandMoreIcon />}
                  aria-controls={`panel${index}-content`}
                  id={`panel${index}-header`}
                >
                  {faq.question}
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    paddingTop: "0px",
                    paddingLeft: "25px",
                    paddingBottom: "17px",
                    backgroundColor: "#f6f6f6",
                    fontWeight: 500,
                  }}
                >
                  {faq.answer}
                </AccordionDetails>
              </Accordion>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Faq;
