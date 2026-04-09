import * as React from "react";
import Menu from "@mui/material/Menu";
import PopupState, { bindTrigger, bindMenu } from "material-ui-popup-state";
import { useTranslation } from "react-i18next";
import { useLocation, useNavigate, Link } from "react-router-dom";
import { FormControl, MenuItem, Select } from "@mui/material";

interface Language {
  key: string;
  value: string;
  initial: string;
}

export default function MenuPopupState() {
  const { t: i18n } = useTranslation();
  const location = useLocation();
  const pathSegments = location.pathname.split("/");
  const langSegment = pathSegments[1];
  const navigate = useNavigate();

  const handleChange = (nextLocale: string) => {
    const newPath = `/${nextLocale}${location.pathname.substring(
      langSegment.length + 1
    )}`;
    navigate(newPath);
    window.location.reload(); // This forces a reload after navigation
  };

  const languages: Language[] = [
    { key: "en", value: "English", initial: "En" },
    { key: "hi", value: "हिंदी", initial: "हिं" },
  ];

  const [showModal, setShowModal] = React.useState(false);

  let handleSmoothScroll = (e: any, targetId?: any) => {
    e.preventDefault();
    const target = document.querySelector(targetId);
    if (target) {
      let top_space = 0;
      const header = document.getElementById("headerData");
      if (header) {
        top_space = header.offsetHeight;
        if (!header.classList.contains("header-scrolled")) {
          top_space -= 20;
        }
      }
      window.scroll({
        top: target.offsetTop - top_space,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      {showModal ? (
        <>
          <div className="grid grid-cols-1 gap-4">
            {/* Modal */}
            <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
              <div className="lg:w-[584px] mq450:w-[312px] mq550:w-[412px] w-[728px] h-[500px] relative mt-[80px] mb-[auto] my1-6 mx-auto max11-w-3xl">
                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                  <div className="relative  mq450:p-5  p-10 flex-auto">
                    <div className="mq450:pb-[0px] m-auto w-[500px] self-stretch flex flex-row items-center justify-center pt-0 px-5 pb-16 box-border max-w-full">
                      <div className="flex flex-col items-center justify-start gap-[17px] max-w-full">
                        <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5">
                          <b className="relative tracking-[0.04em] leading-[20px] uppercase  mq450:text-base">
                            {i18n("modalPricing.Pricing")}
                          </b>
                          <div className="absolute right-0 self-stretch flex flex-row mq750:items-center items-center justify-center py-0 px-5">
                            <img
                              onClick={() => setShowModal(false)}
                              className="h-[40px] w-[40px] relative"
                              alt=""
                              src="../Group 1000009156.png"
                            />
                          </div>
                        </div>
                        <b className="h-20 text-center relative mq450:text-xl  mq450:leading-[20px] mq750:text-13xl text-21xl tracking-[0.01em] leading-[40px] inline-block text-system-black ">
                          <p className="m-0 whitespace-pre-wrap">
                            {i18n("modalPricing.Completelyfree")}
                          </p>
                          <div className="lg:h-[auto] mq450:text-base p-5 h-[11px] font-normal relative text-lg leading-[18px] text-neutrals-n60 inline-block max-w-full">
                            {i18n("modalPricing.Todownload")}
                          </div>
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
            {/* End Modal */}
          </div>
        </>
      ) : null}

      <PopupState variant="popover" popupId="demo-popup-menu">
        {(popupState) => (
          <React.Fragment>
            <img
              {...bindTrigger(popupState)} // Ensure PopupState triggers on the image click
              className="h-full1 w-full1 shrink-0 object-contain cursor-pointer"
              alt=""
              // Directly bind the image source to the `popupState` state
              src={popupState.isOpen ? "/close-menu-icon.png" : "/hemburgerImg.png"} // Toggle image source based on menu state
            />
            <Menu {...bindMenu(popupState)} style={{ marginTop: "20px" }}>
              <MenuItem
                sx={{ fontFamily: "Afacad", fontSize: "18px" }}
                onClick={() => {
                  popupState.close(); // Close the menu when clicked
                }}
                component={Link}
                to="/home"
              >
                {i18n("header.Home")}
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "Afacad", fontSize: "18px" }}
                onClick={(e) => {
                  handleSmoothScroll(e, "#features");
                  popupState.close(); // Close the menu when clicked
                }}
              >
                {i18n("header.Features")}
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "Afacad", fontSize: "18px" }}
                onClick={(e) => {
                  handleSmoothScroll(e, "#tutorials");
                  popupState.close(); // Close the menu when clicked
                }}
              >
                {i18n("header.Tutorials")}
              </MenuItem>

              <MenuItem
                sx={{ fontFamily: "Afacad", fontSize: "18px" }}
                onClick={(e) => {
                  setShowModal(true);
                  popupState.close(); // Close the menu when clicked
                }}
              >
                {i18n("header.Pricing")}
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "Afacad", fontSize: "18px" }}
                onClick={(e) => {
                  handleSmoothScroll(e, "#howItWorks");
                  popupState.close(); // Close the menu when clicked
                }}
              >
                {i18n("header.Howitworks")}
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "Afacad", fontSize: "18px" }}
                onClick={(e) => {
                  handleSmoothScroll(e, "#testimonials");
                  popupState.close(); // Close the menu when clicked
                }}
              >
                {i18n("header.Testimonial")}
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "Afacad", fontSize: "18px" }}
                onClick={(e) => {
                  handleSmoothScroll(e, "#faqs");
                  popupState.close(); // Close the menu when clicked
                }}
              >
                {i18n("header.FAQ")}
              </MenuItem>
              <MenuItem
                sx={{ fontFamily: "Afacad", fontSize: "18px" }}
                onClick={(e) => {
                  handleSmoothScroll(e, "#contactus");
                  popupState.close(); // Close the menu when clicked
                }}
              >
                {i18n("header.ContactUs")}
              </MenuItem>
            </Menu>
          </React.Fragment>
        )}
      </PopupState>
    </>
  );
}
