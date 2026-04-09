import { FunctionComponent, useState, useEffect, useRef } from "react";
import { config } from "../config/config";
import PxInputField from "./PxInputField";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextField } from "@mui/material";
import AlertTitle from "@mui/material/AlertTitle";
import Alert from "@mui/material/Alert";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
export type FrameComponent13Type = {
  className?: string;
};

const FrameComponent13: FunctionComponent<FrameComponent13Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  useEffect(() => {
    //console.log(config.apiUrl)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 550);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 550);
  const [isContactFormActive, setIsContactFormActive] = useState(true);
  const [messageSent, setMessageSent] = useState(false);
  const [errorInSending, setErrorInSending] = useState(false);
  const [messageSentShare, setMessageSentShare] = useState(false);
  const [errorInSendingShare, setErrorInSendingSnare] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showModalTerm, setShowModalTerm] = useState(false);
  const [isShareContactFormActive, setIsShareContactFormActive] = useState(true);

  const schema = yup
    .object({
      to: yup
        .string()
        .email(i18n("frameComponentsThirteen.ToEmailValid"))
        .required(i18n("frameComponentsThirteen.ToEmailRequired")),
      name: yup.string().required(i18n("frameComponentsThirteen.NameRequired"))
      .min(4,i18n("frameComponentsThirteen.NameMin4")),
      email: yup
        .string()
        .email(i18n("frameComponentsThirteen.EmailValid"))
        .required(i18n("frameComponentsThirteen.EmailRequired")),
      phone: yup
        .string()
        .required(i18n("frameComponentsThirteen.PhoneRequired"))
        .matches(/^[0-9]+$/, i18n("frameComponentsThirteen.PhoneMatch"))
        .min(10, i18n("frameComponentsThirteen.PhoneMin10"))
        .max(10, i18n("frameComponentsThirteen.PhoneMax10")),
      message: yup
        .string()
        .required(i18n("frameComponentsThirteen.MessageRequired"))
        .min(8, i18n("frameComponentsThirteen.MessageMin8")),
    })
    .required();

    const schemaShare = yup
    .object({
      phone: yup
        .string()
        .required(i18n("frameComponentsThirteen.PhoneRequired"))
        .matches(/^[0-9]+$/, i18n("frameComponentsThirteen.PhoneMatch"))
        .min(10, i18n("frameComponentsThirteen.PhoneMin10"))
        .max(10, i18n("frameComponentsThirteen.PhoneMax10"))
    })
    .required();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,  // Added reset function to reset the form after submission
  } = useForm({ resolver: yupResolver(schema) });


  const { register: registerShare, handleSubmit: handleSubmitShare,formState: { errors: shareErrors }} =
    useForm({ resolver: yupResolver(schemaShare) });
  const formRef = useRef<HTMLFormElement>(null); // Explicitly specify HTMLFormElement type

  const onSubmitShare = async (data: any) => {
    // alert(data)
    setIsShareContactFormActive(false);
    setMessageSentShare(false);
    try {
      const fixData = {
        name: "Anonymous",
        email: "guest@resai.com",
        message: "Shared Phone Number",
        phone:  data.phone,
        to: config.env.contactTo,
      };
      // perform async request, for example, using fetch
      const sharedData = fixData  //{ ...fixData, ...data };
      console.log('data==',data)
      console.log('sharedData==',sharedData)
      const response = await fetch(config.apiUrl + "email/contact-us", {
        method: "POST",
        body: JSON.stringify({ req_param: sharedData }),
        headers: {
          "Content-Type": "application/json",
          locale: "en",
        },
      })
        .then((response) => {
          if (response.ok) {
            // console.log('success')
            setIsShareContactFormActive(true);
            setMessageSentShare(true);
            setErrorInSendingSnare(false);
          } else {
            // console.log('error from backend server')
            setMessageSentShare(false);
            setErrorInSendingSnare(true);
          }
        })
        .then((data) => {
          //for now no use response data
        })
        .catch((error) => {
          setIsShareContactFormActive(false);
          setMessageSentShare(false);
          setErrorInSendingSnare(true);
          // handle network errors or other exceptions
          console.error("An error occurred:", error.message);
        });
    } catch (error) {
      setIsShareContactFormActive(false);
      setMessageSentShare(false);
      setErrorInSendingSnare(true);
      console.error("Error submitting form:", error);
      // Handle error
    }
  };

  const onSubmit = async (data: any) => {
    try {
      setErrorInSending(false);
      setIsContactFormActive(false);
      // perform async request, for example, using fetch
      const response = await fetch(config.apiUrl + "email/contact-us", {
        method: "POST",
        body: JSON.stringify({ req_param: data }),
        headers: {
          "Content-Type": "application/json",
          locale: "en",
        },
      })
        .then((response) => {
          setIsContactFormActive(true);
          //check if response is successful
          if (response.ok) {
            setMessageSent(true);
            reset();  // Reset the form after successful submission
          } else {
            setMessageSent(false);
            setErrorInSending(true);
          }
        })
        .then((data) => {
          //for now no use response data
        })
        .catch((error) => {
          setMessageSent(false);
          setErrorInSending(true);
          setIsContactFormActive(false);
          // handle network errors or other exceptions
          console.error("An error occurred:", error.message);
        });
    } catch (error) {
      console.error("Error submitting form:", error);
      // Handle error
    }
  };
    const scrollUp = () => {
      window.scrollBy({ top: isMobile? -1000 : -350, behavior: "smooth" });
    }
    
    const currentYear = new Date().getFullYear();
  const selectedLanguage = localStorage.getItem('nextSelectedLanguage');
  return (
    <div id="contactus"
      className={`self-stretch h-[auto] bg-gray-100 box-border overflow-auto1 shrink-0 flex flex-col items-start justify-start pt-[62px] px-0 pb-[55px] gap1-[55.5px] max-w-full z-[1] text-left text-base text-neutrals-n80 font-buttons-button-lg border-t-[1px] border-solid border-gainsboro mq750:gap-[28px] mq750:pt-[26px] mq750:pb-[23px] mq750:box-border mq1050:h-auto mq1050:pt-10 mq1050:pb-9 mq1050:box-border ${className}`}
    >
      <div className="grid grid-cols-2 mq1050:grid-cols-1 mq1050:px-[100px]  mq450:px-6 gap-[100px] self-stretch px-[150px]">
        <div>
          {" "}
          <div className="w-[460px] mq1050:w-[auto] flex flex-col items-start justify-start pt-0.5 px-0 pb-0 box-border min-w-[460px] max-w-full mq750:min-w-full mq1050:flex-1">
            <div className="self-stretch flex flex-col items-start justify-start gap-[40px] max-w-full mq450:gap-[20px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
                <img
                  className="w-[132px] h-10 relative object-contain"
                  alt=""
                  src="/logo2@2x.png"
                />
                <div className="self-stretch relative leading-[26px]">{i18n("frameComponentsThirteen.AIPoweredResumeBuilder")}</div>
              </div>

              <div className="w-full">
              <form
                ref={formRef}
                method="post"
                onSubmit={handleSubmitShare(onSubmitShare)}
              >
                <div className="self-stretch flex flex-row items-start mq1050:items-start justify-start gap-[16px] max-w-full text-neutrals-n150 mq450:flex-wrap">
                  <div className="flex-1 flex flex-col items-start justify-start gap-[32px] max-w-full mq450:gap-[16px]">
                    <div className="relative self-stretch flex flex-col items-start justify-start gap-[8px] max-w-full">
                      <div className={`relative capitalize font-semibold inline-block overflow-hidden text-ellipsis whitespace-nowrap  ${selectedLanguage === 'en' ? 'leading-[16px]' : 'leading-[26px]'}`}>
                        {i18n("frameComponentsThirteen.WantToTalkUs")}
                      </div>

                      {/* {!isMobile ? (
                        ""
                      ) : ( */}
                        
                        <TextField
                        // required
                          id="sharePhone"
                          {...registerShare("phone")}
                          className="[border:none] phone-search-field bg-[transparent] self-stretch h-14 font-captions-captions-rg font-semibold text-base text-neutrals-n40"
                          placeholder={i18n("frameComponentsThirteen.ShareFieldPlaceholderName")}
                          variant="outlined"
                          sx={{
                            "& fieldset": { borderColor: "#e2e2e3" },
                            "& .MuiInputBase-root": {
                              height: "56px",
                              backgroundColor: "#fff",
                              borderRadius: "6px",
                            },
                            "& .MuiInputBase-input": { color: "#919295", fontWeight: "600" },
                          }}
                        />
                       {/* )} */}
                      {shareErrors.phone && (
                        <div className="text-red-600">
                          {shareErrors.phone.message}
                        </div>
                      )}
                      {messageSentShare ? (
                        <div className="m-auto1">
                          <Alert severity="success">
                            <AlertTitle>{i18n("frameComponentsThirteen.ShareSuccess")}</AlertTitle>
                            {i18n("frameComponentsThirteen.ShareSuccessMessage")}
                          </Alert>
                        </div>
                      ) : (
                        // <div>Thanks for sharing </div>
                        ""
                      )}
                       <img
                       className="w-[100px]"
                        id="processing"
                        style={{ display: isShareContactFormActive ? "none" : "block" }}
                        src="/processing.gif"
                      />
                      {errorInSendingShare ? (
                        <div className="m-auto1">
                          <Alert severity="error">
                            <AlertTitle>{i18n("frameComponentsThirteen.ShareError")}</AlertTitle>
                            {i18n("frameComponentsThirteen.ShareErrorMessage")}
                          </Alert>
                        </div>
                      ) : (
                        ""
                      )}
                    </div>
                  
                  </div>
                  
                  {/* {!isMobile ? (
                    ""
                  ) : ( */}
                    <div className={`flex flex-col items-start justify-start px-0 pb-0 text-center text-lg text-neutral-white mq450:ml-0 relative ${selectedLanguage === 'en' ? ' bottom-[-24px]' : ' bottom-[-34px]'}`}>
                      <button
                       style={{ display: isShareContactFormActive ? "flex" : "d" }} 
                        type="submit"
                        className={`cursor-pointer font-buttons-button-lg rounded-md bg-neutrals-n90 flex flex-row items-start h-[56px] items-center justify-start px-6 mq450:px-2 mq1050:w-[130px] mq450:w-[72px] mq1050:h-[56px] mq1050:flex mq1050:items-center mq1050:justify-center`}
                      >
                        
                       
                        <div className="relative leading-[18px] text-lg font-semibold inline-block text-white min-w-[41px]">
                        {i18n("frameComponentsThirteen.ShareButtonName")}
                                  
                        </div>
                      </button>
                    </div>
                {/* )} */}
                </div>
                <div className="mq450:flex-col mq850:flex mq850:justify-between w-full items-center mq450:flex-start mq450:items-start mt-[32px]">
                    <div className="flex flex-col items-start justify-start z-[3] text-system-black mb-[32px] mq850:mb-[0px]">
                      {/* {isMobile ? ( */}
                      <div className="rounded-md bg-silver flex flex-row items-center justify-center py-2.5 px-[15px] border-[1px] border-solid border-neutrals-n20">
                        <div className="flex flex-row items-center justify-center gap-[8px]">
                          <div className="overflow-hidden flex flex-row items-start justify-start">
                            <img
                              className="h-4 w-4 relative object-cover"
                              alt=""
                              src="/group@2x.png"
                            />
                          </div>
                          <div className="flex flex-col items-start justify-start">
                          <Link to="https://wa.me/9985308286?text=Hello%20there!" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                          <div className="relative leading-[16px] capitalize font-semibold">
                            {i18n("frameComponentsThirteen.MessageOnWhatsapp")}
                            </div>
                            </Link>
                           
                          </div>
                        </div>
                      </div>
                       {/* ) : (
                          ""
                        )}  */}
                    </div>
                    <div className="w-[136px] flex flex-row items-start justify-between gap-[20px] mq450:mt-[24px]">
                      <Link to="https://www.linkedin.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                      <img
                        className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                        alt=""
                        src="/hugeiconsocialoutlinelinkedln.svg"
                      />
                      </Link>
                       <Link to="https://www.facebook.com/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                      <img
                        className="h-6 w-6 relative overflow-hidden shrink-0 min-h-[24px]"
                        alt=""
                        src="/hugeiconsocialoutlinefacebook.svg"
                      />
                      </Link>
                       <Link to="https://x.com/?lang=en" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                      <img
                        className="h-6 w-6 relative min-h-[24px]"
                        alt=""
                        src="/social-links.svg"
                      />
                        </Link>
                    </div>
                  </div>
              </form>
              </div>
            </div>
          </div>
        </div>

        <div>
          <form
            action=""
            method="post"
            role="form"
            style={{ display: isContactFormActive ? "block" : "none" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <input
              type="hidden"
              value={config.env.contactTo}
              {...register("to")}
            />

            {messageSent ? (
              <div className="m-auto mb-5">
                {/* <div>Your message has been sent. Thank you!</div> */}
                <Alert severity="success">
                  <AlertTitle>{i18n("frameComponentsThirteen.ContactUsSuccess")}</AlertTitle>
                  {i18n("frameComponentsThirteen.ContactUsSuccessMessage")}
                </Alert>
              </div>
            ) : (
              ""
            )}
            {errorInSending ? (
              <div className="m-auto mb-5">
                <Alert severity="error">
                  <AlertTitle>{i18n("frameComponentsThirteen.ContactUsError")}</AlertTitle>
                  {i18n("frameComponentsThirteen.ContactUsErrorMessage")}
                </Alert>
              </div>
            ) : (
              ""
            )}
            <div className="flex-1 flex flex-col items-end justify-start gap-[40px] min-w-[377px] max-w-full mq450:min-w-full mq750:gap-[20px]">
              <div className="self-stretch flex flex-col items-start justify-start gap-[34px] mq750:gap-[17px]">
                <h1 className="m-0 relative text-13xl tracking-[-0.02em] leading-[32px] font-semibold font-captions-captions-rg text-system-black text-left mq450:text-13xl mq450:leading-[32px] mq750:text-7xl mq750:leading-[26px]">
                {i18n("frameComponentsThirteen.FeelfreeToGetInTouch")}
                </h1>

                <div className="self-stretch flex flex-col items-start justify-start gap-[24px]">
                  <div className="self-stretch flex flex-row items-start justify-start gap-[16px] mq750:flex-wrap">
                    <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[183px]">
                      <div className={`w-[34px] relative text-sm capitalize font-semibold font-captions-captions-rg text-neutrals-n70 text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap ${selectedLanguage === 'en' ? 'leading-[14px]' : ' leading-[20px]'}`}>
                      {i18n("frameComponentsThirteen.NameLabel")}
                      </div>
                      <TextField
                        id="name"
                        {...register("name")}
                        className="[border:none] phone-search-field bg-[transparent] self-stretch h-14 font-captions-captions-rg font-semibold text-base text-neutrals-n40"
                        placeholder={i18n("frameComponentsThirteen.NamePlaceholderName")}
                        variant="outlined"
                        sx={{
                          "& fieldset": { borderColor: "#e2e2e3" },
                          "& .MuiInputBase-root": {
                            height: "56px",
                            backgroundColor: "#fff",
                            borderRadius: "6px",
                          },
                          "& .MuiInputBase-input": { color: "#919295" },
                        }}
                      />
                      {errors.name && (
                        <div className="text-red-600">
                          {errors.name.message}
                        </div>
                      )}
                    </div>
                    <div className="flex-1 flex flex-col items-start justify-start gap-[8px] min-w-[183px]">
                      <div className={`w-[30px] relative text-sm capitalize font-semibold font-captions-captions-rg text-neutrals-n70 text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap ${selectedLanguage === 'en' ? 'leading-[14px]' : ' leading-[20px]'}`}>
                        {i18n("frameComponentsThirteen.EmailLabel")}
                      </div>
                      <TextField
                        id="email"
                        {...register("email")}
                        className="[border:none] phone-search-field bg-[transparent] self-stretch h-14 font-captions-captions-rg font-semibold text-base text-neutrals-n40"
                        placeholder={i18n("frameComponentsThirteen.EmailPlaceholderName")}
                        variant="outlined"
                        sx={{
                          "& fieldset": { borderColor: "#e2e2e3" },
                          "& .MuiInputBase-root": {
                            height: "56px",
                            backgroundColor: "#fff",
                            borderRadius: "6px",
                          },
                          "& .MuiInputBase-input": { color: "#919295" },
                        }}
                      />
                      {errors.email && (
                        <div className="text-red-600">
                          {errors.email.message}
                        </div>
                      )}
                    </div>
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                    <div className={`w-[171px] relative text-sm capitalize font-semibold font-captions-captions-rg text-neutrals-n70 text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap ${selectedLanguage === 'en' ? 'leading-[14px]' : ' leading-[20px]'}`}>
                      {i18n("frameComponentsThirteen.MobileLabel")}
                    </div>
                    <TextField
                      id="phone"
                      {...register("phone")}
                      className="[border:none] phone-search-field bg-[transparent] self-stretch h-14 font-captions-captions-rg font-semibold text-base text-neutrals-n40"
                      placeholder= {i18n("frameComponentsThirteen.MobilePlaceholderName")}
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#e2e2e3" },
                        "& .MuiInputBase-root": {
                          height: "56px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                        },
                        "& .MuiInputBase-input": { color: "#919295" },
                      }}
                    />
                    {errors.phone && (
                      <div className="text-red-600">{errors.phone.message}</div>
                    )}
                  </div>
                  <div className="self-stretch flex flex-col items-start justify-start gap-[8px]">
                    <div className={`w-[49px] relative text-sm capitalize font-semibold font-captions-captions-rg text-neutrals-n70 text-left inline-block overflow-hidden text-ellipsis whitespace-nowrap ${selectedLanguage === 'en' ? 'leading-[14px]' : ' leading-[20px]'}`}>
                      {i18n("frameComponentsThirteen.MessageLabel")}
                    </div>
                    <TextField
                      id="message"
                      {...register("message")}
                      className="[border:none] phone-search-field bg-[transparent] self-stretch h-28 font-captions-captions-rg font-semibold text-base text-neutrals-n40"
                      placeholder={i18n("frameComponentsThirteen.MessagePlaceholderName")}
                      variant="outlined"
                      sx={{
                        "& fieldset": { borderColor: "#e2e2e3" },
                        "& .MuiInputBase-root": {
                          height: "112px",
                          backgroundColor: "#fff",
                          borderRadius: "6px",
                        },
                        "& .MuiInputBase-input": { color: "#919295" },
                      }}
                    />
                    {errors.message && (
                      <div className="text-red-600">
                        {errors.message.message}
                      </div>
                    )}
                  </div>
                </div>
              </div>

              <button className="cursor-pointer rounded-md font-semibold bg-neutrals-n90 flex flex-row items-center w-[160px] h-[56px] mq450:w-full justify-center py-[8px] w3-[160px]  px-[40px] text-center text-lg text-neutral-white font-buttons-button-lg">
              {i18n("frameComponentsThirteen.SendButtonName")}
              </button>
            </div>
          </form>
          <img
            id="processing"
            style={{ display: isContactFormActive ? "none" : "block" }}
            src="/processing.gif"
          />
        </div>
      </div>

      {/* mob */}
      <div className="self-stretch w1-[1356px]  h-[250px] mq1050:h-[560px] mq450:h-[840px] flex flex-row items-start1 justify-start1 mt-[55px] py-0 px-0 box-border max-w-full text-center1 text-xl   gap-[25px]">
        <div className="grid grid-cols-4 mq450:grid-cols-1 mq1050:gap-0 mq1050:grid-cols-2  gap-4 w-full items-center  justify-center  h-[auto]   self-stretch h-px relative box-border z-[1] border-t-[1px] border-b-[1px] border-solid border-gray-1000 mq1050:border-b-[0px]">
          <div className="col-span2-2 box-border border-r-[1px] border-solid border-gray-1000 pb-10 pt-10 mq450:pb-[20px] mq450:pt-[20px]">
            <div className="flex flex-col items-start justify-start py-0 pl-[40px] pl-0 gap-[25px] mq1050:border-b-[1px] border-solid border-gray-1000 mq1050:pb-10 mq1050:pt-10  mq450:pb-[20px] mq450:pt-[5px]">
              <div className="relative tracking-[0.08em] leading-[20px] uppercase font-semibold inline-block min-w-[73px]">{i18n("frameComponentsThirteenFooter.ResumeTitle")}</div>
              <div className="flex flex-col items-start justify-around gap-[8px] text-base">
                <Link to={config.loginUrl ? config.loginUrl : "/"} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[98px] ">
                {i18n("frameComponentsThirteenFooter.ResumeBuilder")}
                </div>
                </Link>
                <Link to={config.loginUrl ? config.loginUrl : "/"} target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[119px]">
                {i18n("frameComponentsThirteenFooter.ResumeTemplates")}
                </div>
                </Link>
                <Link to="https://braven.org/2021/06/how-to-write-a-strong-resume-with-examples" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[105px]">
                {i18n("frameComponentsThirteenFooter.ResumeFormats")}
                </div>
                
                </Link>
                <Link to="https://www.cvdesigner.in/blogs" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px]">
                {i18n("frameComponentsThirteenFooter.ResumeProfessionalWriter")}
                </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="box-border border-r-[1px] border-solid border-gray-1000 pb-10 pt-10 mq1050:border-b-[1px] mq450:pb-[20px] mq450:pt-[20px]">
            <div className="flex flex-col items-start justify-start py-0 pl-[40px] pl-0 gap-[25px]">
              <div className="relative tracking-[0.08em] leading-[20px] uppercase font-semibold">
              {i18n("frameComponentsThirteenFooter.CoverLetterTitle")}
              </div>
              <div className="flex flex-col items-start justify-start gap-[8px] text-base">
              <Link to="https://www.mycvcreator.com/blog/purpose-of-a-cover-letter-a-simple-guide" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] text-left">
                {i18n("frameComponentsThirteenFooter.WhatIsCoverLetter")}
                </div>
                </Link>
                <Link to="https://www.tealhq.com/cover-letter-example/blog-writer" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px]">
                {i18n("frameComponentsThirteenFooter.CoverLetterTemplates")}
                </div>
                </Link>
                <Link to="https://www.mycvcreator.com/blog/best-cover-letter-format-tips-to-stand-out-in-2025" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px]">
                {i18n("frameComponentsThirteenFooter.CoverLetterFormats")}
                </div>
                </Link>
                <Link to="https://www.cvdesigner.in/how-a-well-written-cover-letter-complements-your-resume" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px]">
                {i18n("frameComponentsThirteenFooter.HowToWriteCoverLetter")}
                </div>
                </Link>
              </div>
            </div>
          </div>

          <div className="box-border border-r-[1px] border-solid border-gray-1000 pb-10 pt-10 mq1050:border-b-[1px] mq450:pb-[20px] mq450:pt-[20px]">
            <div className="flex flex-col items-start justify-start py-0 pl-[70px] mq450:pl-[40px] pl-0 gap-[25px]">
              <div className="relative tracking-[0.08em] leading-[20px] uppercase font-semibold inline-block min-w-[87px]">
              {i18n("frameComponentsThirteenFooter.Support")}
              </div>
              <div className="flex flex-col items-start justify-start gap-[8px] text-base">
              {/* <Link to="/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[39px]">
                {i18n("frameComponentsThirteenFooter.About")}
                </div>
                </Link> */}
                {/* <Link onClick={scrollUp} style={{ color: 'inherit', textDecoration: 'inherit'}}> */}
                <Link to="/about" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[122px] cursor-pointer"> 
                  {i18n("frameComponentsThirteenFooter.About")}

                </div>
                </Link>

                <div onClick={scrollUp} className="relative leading-[26px] inline-block min-w-[52px] cursor-pointer">
                {i18n("frameComponentsThirteenFooter.Contact")}
                </div>
                {/* </Link> */}
                <Link to="/terms-and-conditions" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[122px] cursor-pointer"> 
                  {i18n("frameComponentsThirteenFooter.TermCondition")}

                </div>
                </Link>
                <Link to="/privacy-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[86px] cursor-pointer"  >
                {i18n("frameComponentsThirteenFooter.PrivacyPolicy")}
                </div>
                </Link>

                <Link to="/refund-policy" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[122px] cursor-pointer"> 
                  {i18n("frameComponentsThirteenFooter.refundpolicy")}

                </div>
                </Link>


              </div>
            </div>
          </div>

          <div className="box-border pb-10 pt-10 mq450:pb-[20px] mq450:pt-[20px]">
            <div className="flex flex-col items-start justify-start py-0 pl-[70px] mq450:pl-[40px] pl-0 gap-[25px] mq1050:border-b-[1px] ">
              <div className="relative tracking-[0.08em] leading-[20px] uppercase font-semibold inline-block min-w-[110px]">
              {i18n("frameComponentsThirteenFooter.Resources")}
              </div>
              <div className="flex flex-col items-start justify-start gap-[8px] text-base">
              {/* <Link to="/" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[29px]">
                {i18n("frameComponentsThirteenFooter.Blog")}
                </div>
                </Link> */}
                <Link to="https://blog.theinterviewguys.com/how-to-prepare-for-a-job-interview" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px]">
                {i18n("frameComponentsThirteenFooter.JobInterviewGuides")}
                </div>
                </Link>
                <Link to="https://novoresume.com/career-blog/interview-questions-and-best-answers-guide" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px]">
                {i18n("frameComponentsThirteenFooter.JobInterviewQuestions")}
                </div>
                </Link>
                <Link to="https://www.mployee.me/blog" target="_blank" rel="noopener noreferrer" style={{ color: 'inherit', textDecoration: 'inherit'}}>
                <div className="relative leading-[26px] inline-block min-w-[111px]">
                {i18n("frameComponentsThirteenFooter.CareerResources")}
                </div>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* mob c */}

    
        {/* Privacy policy modal start */}
        <>
        {showModal ? (
          <>
            <div className="grid grid-cols-1 gap-4 ">
              <div className="">
                {/* sss */}
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="lg:w-[584px] mq450:w-[312px] mq550:w-[412px] w-[60%] h-[500px] relative w-auto11  mt-[80px] mb-[auto] my1-6 mx-auto max11-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="relative  mq450:p-5  p-10 flex-auto">
                        <div className="mq450:pb-[0px] m-auto w-[100%] self-stretch flex flex-row items-center justify-center pt-0  pb-16 box-border max-w-full">
                        <div className="cursor-pointer absolute right-0 self-stretch flex flex-row mq750:items-center items-center justify-center py-0 px-5">
                                <img
                                  onClick={() => setShowModal(false)}
                                  className="h-[40px] w-[40px] relative"
                                  alt=""
                                  src="../Group 1000009156.png"
                                />
                              </div>
                          <div className="container">
        <h1>Privacy Policy</h1>
        <p>Effective date: [Date]</p>

        <h2>Introduction</h2>
        <p>Welcome to [Your Company Name]. We are committed to safeguarding your personal data. This Privacy Policy outlines the types of personal information we collect, how we use it, and your rights regarding your data.</p>

        <h2>Information We Collect</h2>
        <p>We may collect the following types of personal information:</p>
        <ul>
            <li>Personal identification information (Name, email address, phone number, etc.)</li>
            <li>Usage data (how you interact with our services)</li>
            <li>Cookies and tracking technologies</li>
        </ul>

        <h2>How We Use Your Information</h2>
        <p>We use the information we collect to:</p>
        <ul>
            <li>Provide and maintain our services</li>
            <li>Improve and personalize your experience</li>
            <li>Communicate with you, including for customer support</li>
            <li>Comply with legal obligations</li>
        </ul>

        <h2>Sharing of Your Information</h2>
        <p>We do not share your personal information with third parties except in the following cases:</p>
        <ul>
            <li>With your consent</li>
            <li>For legal reasons (e.g., complying with legal obligations or protecting our rights)</li>
            <li>With trusted service providers who assist us in operating our services</li>
        </ul>

        <h2>Your Data Protection Rights</h2>
        <p>You have the following rights regarding your personal data:</p>
        <ul>
            <li>Right to access – You have the right to request copies of your personal data.</li>
            <li>Right to rectification – You have the right to request correction of inaccurate or incomplete information.</li>
            <li>Right to erasure – You have the right to request the deletion of your personal data, under certain conditions.</li>
        </ul>

        <h2>Security of Your Data</h2>
        <p>We take the security of your personal data seriously and implement appropriate technical and organizational measures to protect it from unauthorized access, alteration, or destruction.</p>

        <h2>Changes to This Privacy Policy</h2>
        <p>We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new policy on this page with an updated effective date.</p>

        <h2>Contact Us</h2>
        <p>If you have any questions about this Privacy Policy, please contact us at:</p>
        <p>Email: <a href="mailto:your-email@example.com">your-email@example.com</a></p>
        <p>Address: [Your Company Address]</p>
    </div>
                        </div>
                      
                       
                      
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                {/* end */}
              </div>
            </div>
          </>
        ) : null}
      </>
      {/* Privacy policy modal End */}




      {/* Term & condition modal start */}
      <>
        {showModalTerm ? (
          <>
            <div className="grid grid-cols-1 gap-4 ">
              <div className="">
                {/* sss */}
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="lg:w-[584px] mq450:w-[312px] mq550:w-[412px] w-[60%] h-[500px] relative w-auto11  mt-[80px] mb-[auto] my1-6 mx-auto max11-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="relative  mq450:p-5  p-10 flex-auto">
                        <div className="mq450:pb-[0px] m-auto w-[100%] self-stretch flex flex-row items-center justify-center pt-0  pb-16 box-border max-w-full">
                        <div className="cursor-pointer absolute right-0 self-stretch flex flex-row mq750:items-center items-center justify-center py-0 px-5">
                                <img
                                  onClick={() => setShowModalTerm(false)}
                                  className="h-[40px] w-[40px] relative"
                                  alt=""
                                  src="../Group 1000009156.png"
                                />
                              </div>
                              <div className="container">
        <h1>Terms & Conditions</h1>
        <p>Effective date: [Date]</p>

        <h2>Introduction</h2>
        <p>Welcome to [Your Company Name]. These terms and conditions outline the rules and regulations for the use of [Your Company Name]'s Website, located at [Your Website URL].</p>

        <h2>Acceptance of Terms</h2>
        <p>By accessing this website, we assume you accept these terms and conditions. Do not continue to use [Your Company Name] if you do not agree to all of the terms and conditions stated on this page.</p>

        <h2>Cookies</h2>
        <p>We employ the use of cookies. By accessing [Your Website Name], you agreed to use cookies in agreement with the [Your Company Name]'s Privacy Policy.</p>

        <h2>License</h2>
        <p>Unless otherwise stated, [Your Company Name] and/or its licensors own the intellectual property rights for all material on [Your Website Name]. All intellectual property rights are reserved. You may access this from [Your Website Name] for your own personal use subjected to restrictions set in these terms and conditions.</p>

        <h3>You must not:</h3>
        <ul>
            <li>Republish material from [Your Website Name]</li>
            <li>Sell, rent, or sub-license material from [Your Website Name]</li>
            <li>Reproduce, duplicate or copy material from [Your Website Name]</li>
            <li>Redistribute content from [Your Website Name]</li>
        </ul>

        <h2>Content Liability</h2>
        <p>We shall not be held responsible for any content that appears on your website. You agree to protect and defend us against all claims that arise on your website. No link(s) should appear on any website that may be interpreted as libelous, obscene, or criminal, or which infringes, otherwise violates, or advocates the infringement or other violation of, any third-party rights.</p>

        <h2>Reservation of Rights</h2>
        <p>We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request. We also reserve the right to amend these terms and conditions and its linking policy at any time.</p>

        <h2>Disclaimer</h2>
        <p>To the maximum extent permitted by applicable law, we exclude all representations, warranties, and conditions relating to our website and the use of this website. Nothing in this disclaimer will:</p>
        <ul>
            <li>Limit or exclude our or your liability for death or personal
              </li></ul>
              </div>
             
                        </div>
                      
                       
                      
                      </div>
                    </div>
                  </div>
                </div>
                <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                {/* end */}
              </div>
            </div>
          </>
        ) : null}
      </>
      {/* Term & condition modal End */}

      <div className="self-stretch h-[78px] box-border flex flex-col items-start justify-start pt-1.5 px-0 pb-7 gap-[27px] shrink-0 z-[2] border-t-[1px] border-solid border-neutrals-n20">
        <div className="self-stretch h-px relative box-border z-[1] border-t-[1px] border-solid border-gray-1100" />
        <div className="self-stretch flex-1 flex flex-row items-start justify-center py-0 px-5">
          <div className="self-stretch w-[156px] relative leading-[16px] font-medium inline-block">
            {`${i18n("frameComponentsThirteenFooter.CopyRightText")} © ${currentYear} ResAI`}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FrameComponent13;
