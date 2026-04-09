import { FunctionComponent, useEffect, useState, useRef } from "react";
import { useTranslation } from "react-i18next";
import MobileMenu from "./Mobilemenu";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { config } from "../config/config";
import ReactDOM from 'react-dom';
export type FrameComponent2Type = {
  className?: string;
};
interface Language {
  key: string;
  value: string;
  initial: string;
}
const FrameComponent2: FunctionComponent<FrameComponent2Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const langSegment = pathSegments[1];
  const navigate = useNavigate();

  const [showModal, setShowModal] = useState(false);
  const [isLaungauge, setlanguage] = useState(localStorage.getItem('nextlocale') || "En");
  const handleChangeLaungauge = (nextLocale: string) => {
    const newPath = `/${nextLocale}${location.pathname.substring(
      langSegment.length + 1
    )}`;
    navigate(newPath);
    if (nextLocale === "en") {
      setlanguage("En")
      localStorage.setItem('nextlocale', "En");
      localStorage.setItem('nextSelectedLanguage', "en");
    }
    if (nextLocale === "es") {
      setlanguage("Es")
      localStorage.setItem('nextlocale', "Es");
      localStorage.setItem('nextSelectedLanguage', "es");
    }
    if (nextLocale === "hi") {
      setlanguage("हिं")
      localStorage.setItem('nextlocale', "हिं");
      localStorage.setItem('nextSelectedLanguage', "hi");
    }
    window.location.reload();
  };
  const languages: Language[] = [
    { key: "en", value: "English", initial: "En" },
    // { key: "es", value: "Español", initial: "Es" },
    { key: "hi", value: "हिंदी", initial: "हिं" },
  ];
  const [isOpenLaungauge, setIsOpenLaungauge] = useState(false);
  const handleOpenlangSelector = (e: any) => {
    e.stopPropagation();
    setIsOpenLaungauge(!isOpenLaungauge);
  };
  //hamberger code start

  const [isOpen, setIsOpen] = useState(false);
  const handleOpenNavMenu = (e: any) => {
    e.stopPropagation();
    setIsOpen(!isOpen);
  };

  const [isMobile, setIsMobile] = useState(window.innerWidth < 1201);
  useEffect(() => {
    //console.log('showModal===',showModal)
    const handleResize = () => {
      setIsMobile(window.innerWidth < 1201);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);
  //redirect to particular section start

  let handleSmoothScroll = (e: any, targetId?: any) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      let top_space = 0;
      const header = document.getElementById('headerData');
      if (header) {
        top_space = header.offsetHeight;
        if (!header.classList.contains('header-scrolled')) {
          top_space -= 20;
        }
      }
      window.scroll({
        top: target.offsetTop - top_space,
        behavior: 'smooth',
      });
    }
  };
  //end

//add this code to handle from backend redirection
const externaltargetId = location.hash;

useEffect(() => {
  const handleSmoothScrollExternal = (hash: string) => {
    if (hash) {
      const target = document.querySelector(hash) as HTMLElement;
      if (target) {
        let topSpace = 0;
        const header = document.getElementById('headerData');
        if (header) {
          topSpace = header.offsetHeight;
          if (!header.classList.contains('header-scrolled')) {
            topSpace -= 20; // Adjust if needed
          }
        }
        window.scroll({
          top: target.offsetTop - topSpace,
          behavior: 'smooth',
        });
      }
    }
  };
  // Handle scrolling if hash exists
  if (externaltargetId) {
    handleSmoothScrollExternal(externaltargetId);
  }
  // Optionally add a listener if you need to handle dynamic hash changes
  const handleHashChange = () => {
    const newHash = location.hash;
    handleSmoothScrollExternal(newHash);
  };

  window.addEventListener('hashchange', handleHashChange);

  return () => {
    window.removeEventListener('hashchange', handleHashChange);
  };
}, [externaltargetId]);

  return (
    <>
      <div id="headerData"
        className={`self-stretch flex lg:h-auto lg:gap-0 flex-col items-end justify-start gap-[24px] shrink-0 max-w-full text-right text-lg text-neutrals-n70 font-buttons-button-lg ${className}`}
      >
        {/* <MenuListComposition/> */}
        <div className="self-stretch flex flex-row items-start mq360:justify-start justify-center py-0 pr-[24px] pl-[24px] box-border max-w-full lg:relative lg:py-[24px] lg:bg-neutral-white lg:z-[999]">
          {/* for mobile device start */}
          {/* Humberger Menu start */}
          <div className="hidden w-[132px] mq360:w-[auto] mq360:flex flex-col items-start justify-start pt-px px-0 pb-0 box-border">
            {/* Hamburger Icon */}
            <div className="relative mq360:ml-[26px]">
              {isMobile && (
                <div className="z-10 absolute top-0 right-0 mr-0 mt-[8px] lg:invisible mq360:visible">
                  <MobileMenu />
                  {/* <div className="cursor-pointer" onClick={handleOpenNavMenu}>
                   
                    <img
                      className="h-full1 w-full1 shrink-0 object-contain"
                      alt=""
                      src="/hemburgerImg.png"
                    />
                  </div> */}
                </div>
              )}

              {isOpen && isMobile && (
                <div
                  id="dropdown"
                  className="mq360:left-[0px] mq450:left-[240px] lg:left-[930px] mq750:left-[500px] mq850:left-[590px] mq1050:left-[790px] lg:top-[46px] z-20 absolute top-[30px] bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700 overflow-y-auto right-[0px]"
                >
                  <div className="lg:items-center lg:ml-[0] mq360:items-start flex flex-col  items-start justify-start pt-10 pb-10 pr-0 pl-5">
                    <div className="nav-link d-block py-2 font-semibold inline-block min-w-[41px] cursor-pointer">
                      {i18n("header.Home")}
                    </div>
                    <div className="nav-link d-block py-2 font-semibold inline-block min-w-[41px]">
                      <a
                        className="no-underline cursor-pointer"
                        onClick={((e) => { handleSmoothScroll(e, "#features"); })}
                      >{i18n("header.Features")}</a>
                    </div>
                    <div className="nav-link d-block py-2 font-semibold inline-block min-w-[41px]">
                      <a
                        className="no-underline cursor-pointer"
                        onClick={((e) => { handleSmoothScroll(e, "#tutorials"); })}
                      >{i18n("header.Tutorials")}</a>
                    </div>
                    <div
                      onClick={() => setShowModal(true)}
                      className="nav-link d-block py-2 font-semibold inline-block min-w-[41px] cursor-pointer"
                    >
                      {i18n("header.Pricing")}
                    </div>
                    <div className="nav-link d-block py-2 font-semibold inline-block min-w-[41px]">
                      <a
                        className="no-underline cursor-pointer"
                        onClick={((e) => { handleSmoothScroll(e, "#howItWorks"); })}
                      >{i18n("header.Howitworks")}</a>
                    </div>
                    <div className="nav-link d-block py-2 font-semibold inline-block min-w-[41px]">
                      <a
                        className="no-underline cursor-pointer"
                        onClick={((e) => { handleSmoothScroll(e, "#testimonials"); })}
                      >{i18n("header.Testimonial")}</a>
                    </div>
                    <div className="nav-link d-block py-2 font-semibold inline-block">
                      <a
                        className="no-underline cursor-pointer"
                        onClick={((e) => { handleSmoothScroll(e, "#faqs"); })}
                      >{i18n("header.FAQ")}</a>
                    </div>
                    <div className="nav-link d-block py-2 font-semibold inline-block min-w-[41px]">
                      <a
                        className="no-underline cursor-pointer"
                        onClick={((e) => { handleSmoothScroll(e, "#contactus"); })}
                      >{i18n("header.ContactUs")}</a>
                    </div>
                    {/* <div className="nav-link d-block py-2 font-semibold inline-block min-w-[41px]">
                    <div className="rounded-md bg-neutrals-n90 flex flex-row items-start justify-start py-[11px] px-8 whitespace-nowrap text-center text-neutral-white">
                      <div className="relative leading-[18px] font-semibold inline-block min-w-[53px]">
                        Sign up / in
                      </div>
                    </div>
                  </div> */}
                    <div className="nav-link d-block py-2 font-semibold inline-block min-w-[41px]">
                      <div className="flex flex-row items-start justify-start gap-[6px]" onClick={(e) => handleOpenlangSelector(e)}>
                        {/* <img
                          className="h-5 w-[16.7px] relative overflow-hidden shrink-0"
                          alt=""
                          src="/language-selection-options.svg"
                        /> */}
                        {/* //new dropdown start */}
                        <span className="font-semibold cursor-pointer">{isLaungauge}</span>
                          <img
                            className="h-[22px] w-[21px] relative object-contain min-h-[22px] cursor-pointer"
                            alt=""
                            src={`/${isOpenLaungauge == true ? "up-arrow.svg" : "down-arrow.svg"}`}
                          />
                        {isOpenLaungauge &&
                          <div
                            id="dropdown"
                            className="lg:left-[930px] mq750:left-[500px] mq850:left-[590px] mq1050:left-[790px] lg:top-[46px] z-20 absolute top-[80px] bg-neutrals-n0 divide-y divide-gray-100 rounded-lg shadow w-30 overflow-y-auto"
                          >
                            <div className="lg:items-center lg:ml-[0] mq360:items-start flex flex-col items-start justify-start p-5">
                              {languages?.map((language) => (
                                <div className="nav-link d-block py-2 font-semibold inline-block min-w-[41px] cursor-pointer" onClick={(e) => handleChangeLaungauge(language.key)}>
                                  <span className={`${language.initial == isLaungauge ? "text-blue-500" : ""}`}>{language.value}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        }
                        {/* //end */}
                        {/* <select
                          className="h-5 relative overflow-hidden shrink-0 form-select"
                          value={isLaungauge}
                          onChange={(e) => handleChangeLaungauge(e.target.value)}
                        >
                          {languages?.map((language) => (
                            <option key={language.key} value={language.key}>
                              {language.value}
                            </option>
                          ))}
                        </select> */}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          {/* for mobile device end */}
          <div className="w-[1141px] flex flex-row items-start justify-start gap1-[69.5px] max-w-full lg111:w-[201.5px] lg:gap-[35px] mq750:gap-[17px]">
            <div className="w1-[132px] mq360:w-[auto] flex flex-col items-start justify-start pt-px px-0 pb-0 box-border">
              {/* <div className="w-[1141px] flex flex-row items-start justify-start gap-[69.5px] max-w-full lg:w-[201.5px] lg:gap-[35px] mq750:gap-[17px]">
          <div className="w-[132px] mq360:w-[auto] flex flex-col items-start justify-start pt-px px-0 pb-0 box-border"> */}
              <img
                className="self-stretch h-10 relative max-w-full overflow-visible shrink-0 object-cover mq360:ms-[8px] mq550:max-w-[116px]"
                alt=""
                src="/logo@2x.png"
              />
            </div>
            <div className="lg:absolute lg:right-[68px] lg:visible lg:w-[auto] invisible w-[0px]  mq360:right-[24px] rounded-md bg-neutrals-n90 flex flex-row items-start justify-end  py-[12px] py-[15px] px-8 whitespace-nowrap text-center text-neutral-white">
              <div className="HeaderoginBtn relative leading-[18px] font-semibold inline-block min-w-[53px]">
                <Link to={config.loginUrl ? config.loginUrl : "/"}>
                  {i18n("header.Signupin")}
                </Link>
              </div>
            </div>
            {isMobile && (
              <div className="z-10 m-auto mr-[0px] mq360:invisible h-[24px]">
                <MobileMenu />
                {/* <div className="cursor-pointer" onClick={handleOpenNavMenu}>
                 
                  <img
                    className="h-full1 w-full1 shrink-0 object-contain"
                    alt=""
                    src="/hemburgerImg.png"
                  />
                </div> */}
              </div>
            )}

            <div className="flex-1 flex flex-row items-start justify-between max-w-full gap-[20px] lg:hidden">
              <div className="w-[45.7px] flex flex-col items-start justify-start pt-[15px] pb-0 pr-1 pl-0 box-border">
                <div className="self-stretch h-[11px] relative tracking-[-0.02em] leading-[18px] font-semibold inline-block min-w-[41px] cursor-pointer">
                  {i18n("header.Home")}
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[15px] pb-0 pr-1 pl-0">
                <div className="h-[11px] relative tracking-[-0.02em] leading-[18px] font-semibold inline-block min-w-[58px]">
                  <a
                    className="no-underline cursor-pointer"
                    onClick={((e) => { handleSmoothScroll(e, "#features"); })}
                  >{i18n("header.Features")}</a>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[15px] pb-0 pr-1 pl-0">
                <div className="h-[11px] relative tracking-[-0.02em] leading-[18px] font-semibold inline-block min-w-[51px]">
                  <a
                    className="no-underline cursor-pointer"
                    onClick={((e) => { handleSmoothScroll(e, "#tutorials"); })}
                  >{i18n("header.Tutorials")}</a>
                </div>
              </div>
              <div className="w-[51.7px] flex flex-col items-start justify-start pt-[15px] pb-0 pr-1 pl-0 box-border">
                <div
                  onClick={() => setShowModal(true)}
                  className="self-stretch h-[11px] relative tracking-[-0.02em] leading-[18px] font-semibold inline-block min-w-[47px] cursor-pointer"
                >
                  {i18n("header.Pricing")}
                </div>
              </div>
              <div className="w-[91.7px] flex flex-col items-start justify-start pt-[15px] pb-0 pr-1 pl-0 box-border">
                <div className="self-stretch h-[11px] relative tracking-[-0.02em] leading-[18px] font-semibold inline-block min-w-[87px] whitespace-nowrap">
                  <a
                    className="no-underline cursor-pointer"
                    onClick={((e) => { handleSmoothScroll(e, "#howItWorks"); })}
                  >{i18n("header.Howitworks")}</a>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[15px] pb-0 pr-1 pl-0">
                <div className="flex flex-row items-start justify-start">
                  <div className="ml-[-1.5px] relative tracking-[-0.02em] leading-[20px] font-semibold inline-block min-w-[77px] shrink-0">
                    <a
                      className="no-underline cursor-pointer"
                      onClick={((e) => { handleSmoothScroll(e, "#testimonials"); })}
                    >{i18n("header.Testimonial")}</a>
                  </div>
                </div>
              </div>
              <div className="w-[33.7px] flex flex-col items-start justify-start pt-[15px] pb-0 pr-1 pl-0 box-border">
                <div className="h-[11px] relative tracking-[-0.02em] leading-[18px] font-semibold inline-block min-w-[29px]">
                  <a
                    className="no-underline cursor-pointer"
                    onClick={((e) => { handleSmoothScroll(e, "#faqs"); })}
                  >{i18n("header.FAQ")}</a>
                </div>
              </div>
              <div className="flex flex-col items-start justify-start pt-[15px] pb-0 pr-[15px] pl-0">
                <div className="flex flex-row items-start justify-start">
                  <div className="relative tracking-[-0.02em] leading-[20px] font-semibold inline-block min-w-[74px] whitespace-nowrap">
                    <a
                      className="no-underline cursor-pointer"
                      onClick={((e) => { handleSmoothScroll(e, "#contactus"); })}
                    >{i18n("header.ContactUs")}</a>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-start justify-start pt-[11px] px-0 pb-0 ">
                <div className="flex flex-row items-start justify-start gap-[6px]" onClick={(e) => handleOpenlangSelector(e)}>
                  {/* <img
                    className="h-5 w-[16.7px] relative overflow-hidden shrink-0"
                    alt=""
                    src="/language-selection-options.svg"
                  /> */}
                  {/* //new dropdown start */}
                  <span className="font-semibold cursor-pointer">{isLaungauge}</span>
                  <img
                    className="h-[22px] w-[21px] relative object-contain min-h-[22px] cursor-pointer"
                    alt=""
                    src={`/${isOpenLaungauge == true ? "up-arrow.svg" : "down-arrow.svg"}`}
                  />
                  {isOpenLaungauge &&
                    <div
                      id="dropdown"
                      className="lg:left-[930px] mq750:left-[500px] mq850:left-[590px] mq1050:left-[790px] lg:top-[46px] z-20 absolute top-[80px] bg-neutrals-n0 divide-y divide-gray-100 rounded-lg shadow w-30 overflow-y-auto"
                    >
                      <div className="lg:items-center lg:ml-[0] mq360:items-start flex flex-col items-start justify-start p-5">
                        {languages?.map((language) => (
                          <div className="nav-link d-block py-2 font-semibold inline-block cursor-pointer" onClick={(e) => handleChangeLaungauge(language.key)}>
                            <span className={`${language.initial == isLaungauge ? "text-blue-500" : ""}`}>{language.value}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  }
                  {/* //end */}
                  {/* <select
                    className="h-5 relative overflow-hidden shrink-0 bg-white font-semibold inline-block min-w-[74px] mt-1"
                    value={langSegment}
                    onChange={(e) => handleChange(e.target.value)}
                  >
                    {languages?.map((language) => (
                      <option key={language.key} value={language.key}>
                        <div className="flex flex-col items-start justify-start pt-[4.5px] px-0 pb-0">
                          {language.value}
                        </div>
                      </option>
                    ))}
                  </select> */}
                  {/* <div className="flex flex-col items-start justify-start pt-[4.5px] px-0 pb-0">
                  <div className="h-[11px] relative tracking-[-0.02em] leading-[18px] font-semibold inline-block min-w-[47px]">
                    English
                  </div>
                </div> */}
                </div>
              </div>
              <div className="HeaderoginBtn rounded-md bg-neutrals-n90 flex flex-row items-start justify-start py-[11px] px-8 whitespace-nowrap text-center text-neutral-white">
                <div className="relative leading-[18px] font-semibold inline-block min-w-[53px]">
                  <Link to={config.loginUrl ? config.loginUrl : "/"}>
                    {" "}
                    {i18n("header.Signupin")}
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="self-stretch h-px relative box-border border-t-[1px] border-solid border-gray-1000" />
      </div>

      {/* modal start */}
      <>
        {showModal ? (
          <>
            <div className="grid grid-cols-1 gap-4">
              <div className="">
                {/* sss */}
                <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                  <div className="lg:w-[584px] mq450:w-[312px] mq550:w-[412px] w-[728px] h-[500px] relative w-auto11  mt-[80px] mb-[auto] my1-6 mx-auto max11-w-3xl">
                    {/*content*/}
                    <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                      <div className="relative  mq450:p-5  p-10 flex-auto">
                        <div className="mq450:pb-[0px] m-auto w-[500px] self-stretch flex flex-row items-center justify-center pt-0 px-5 pb-16 box-border max-w-full">
                          <div className=" flex flex-col items-center justify-start gap-[17px] max-w-full">
                            <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5">
                              <b className="relative tracking-[0.04em] leading-[20px] uppercase  mq450:text-base">
                                {i18n("modalPricing.Pricing")}
                              </b>
                              <div className="cursor-pointer absolute right-0 self-stretch flex flex-row mq750:items-center items-center justify-center py-0 px-5">
                                <img
                                  onClick={() => setShowModal(false)}
                                  className="h-[40px] w-[40px] relative"
                                  alt=""
                                  src="../Group 1000009156.png"
                                />
                              </div>
                            </div>
                            <b className="h-20 relative mq450:text-xl  mq450:leading-[20px] mq750:text-13xl text-21xl tracking-[0.01em] leading-[40px] inline-block text-system-black ">
                              <p className="m-0 whitespace-pre-wrap">
                                {i18n("modalPricing.Completelyfree")}
                              </p>
                              <div className="lg:h-[auto] mq450:text-base p-5 h-[11px] font-normal	 relative text-lg leading-[18px] text-neutrals-n60 inline-block max-w-full">
                                {i18n("modalPricing.Todownload")}
                              </div>
                              {/* <p className="m-0">of our resume builder</p> */}
                            </b>
                          </div>
                        </div>
                        <div className="self-stretch mq450:mt-[30px] flex flex-row mq750:items-center items-center justify-center py-0 px-5 mb-[50px]">
                          <img
                            className=" relative mq450:w-[250px]"
                            alt=""
                            src="../Group 1000009163.png"
                          />
                        </div>
                        {/* <div className="mq450:w-[100px] w-[235px] m-auto rounded-md bg-neutrals-n90 flex flex-row items-center justify-center py-[19px] px-[52px] whitespace-nowrap">
                          <div className="relative text-lg leading-[18px] text-neutral-white">
                            {i18n("modalPricing.Sharenow")}
                          </div>
                        </div> */}
                      
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
      {/* modal End */}
    </>
  );
};

export default FrameComponent2;
