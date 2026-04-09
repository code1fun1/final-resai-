import { FunctionComponent, useRef, useState, useEffect } from "react";
import GroupComponent1 from "./GroupComponent1";
import Slider from "react-slick";

import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";

import { useTranslation } from "react-i18next";
export type FrameComponent8Type = {
  className?: string;
};

const SuccessStories: FunctionComponent<FrameComponent8Type> = ({
  className = "",
}) => {
  const { t: i18n } = useTranslation();
  const testiMonials:any = i18n('testiMonials', { returnObjects: true });
  const slider = useRef<any>(null);
  const [currentSlide, setCurrentSlide] = useState(0);
  const [totalSlides, setTotalSlides] = useState(0);

  const next = () => {
    if (slider.current) {
      slider.current.slickNext();
    }
  };

  const previous = () => {
    if (slider.current) {
      slider.current.slickPrev();
    }
  };
  const handleAfterChange = (current: number) => {
    if (slider.current) {
      if (
        slider.current &&
        slider.current.props &&
        slider.current.props.children
      ) {
        setTotalSlides(slider.current.props.children.length);
        console.log("totalSlides", totalSlides);
      }
      setTotalSlides(0);
    }
    setCurrentSlide(current);
    console.log("CurrentSlide", currentSlide);
    console.log("currentSlide-totalSlides", totalSlides - currentSlide);
  };

  useEffect(() => {
    if (
      slider.current &&
      slider.current.props &&
      slider.current.props.children
    ) {
      setTotalSlides(slider.current.props.children.length);
    }
  }, [currentSlide, totalSlides]);

  function SampleNextArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img
          style={{
            ...style,
            display: "block",
            marginRight: "-10px",
            marginTop: "-25px",
          }}
          src="/Group 1000009167.png"
          alt="arrow-right"
        />
      </div>
    );
  }

  function SamplePrevArrow(props: any) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block" }}
        onClick={onClick}
      >
        <img
          style={{
            ...style,
            display: "block",
            marginLeft: "-10px",
            marginTop: "-25px",
          }}
          src="/Group 1000009165.png"
          alt="arrow-left"
        />
      </div>
    );
  }

  const sliderSettings = {
    dots: false,
    infinite: false,
    speed: 100,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: false,
    autoplay: false,
    autoplaySpeed: 3000,
    afterChange: handleAfterChange,

    responsive: [
      {
        breakpoint: 750,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          initialSlide: 1,
          arrows: true,
          nextArrow: <SampleNextArrow />,
          prevArrow: <SamplePrevArrow />,
        },
      },
      {
        breakpoint: 1050,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          initialSlide: 1,
        },
      },
    ],
  };

  const selectedLanguage = localStorage.getItem("nextSelectedLanguage");
  return (
    <>
      <div
        id="testimonials"
        className={`mq7501:invisible mq7501:h-[0px] self-stretch flex flex-row items-start justify-start pt-0 px-0 pb-[80px] box-border max-w-full text-left text-xl text-darkgoldenrod font-buttons-button-lg mq450:pb1-[55px] mq450:box-border mq1050:pb1-[84px] mq1050:box-border ${className}`}
      >
        <div className="h-[600px] flex-1 overflow-hidden1 flex flex-row items-start justify-start max-w-full lg:h-auto">
          <img
            className="h-[1013px] w-[1440px] relative object-cover hidden max-w-full"
            alt=""
            src="/image-31@2x.png"
          />
          <div className="flex-1 bg-whitesmoke-100 flex flex-row mq750:items-center items-end justify-center pt-20  pl-[66px] box-border gap-[13px] max-w-full shrink-0 lg:flex-wrap lg:px-[80px] mq550:px-[16px] lg:pt-[80px] lg:pb1-[152px] lg:box-border mq750:pb1-[99px] mq750:box-border">
            <div className="h-[1092px] w-[1440px] relative bg-whitesmoke-100 hidden max-w-full" />
            <div className="w-[1140px] flex flex-col mq750:items-center items-start justify-start pt-0 px-0 pb1-[250px] box-border mq1050:min-h-[auto]  min-h-[auto] max-w-full mq450:pb1-[105px] mq450:box-border mq1050:pb1-[162px] mq1050:box-border">
              <div className="self-stretch flex flex-col mq750:items-center items-start justify-start gap-[48px] max-w-full mq750:gap-[24px]">
                <div className="self-stretch flex flex-col mq750:items-center items-start justify-start gap-[20px] max-w-full">
                  <b className="relative tracking-[0.04em] leading-[20px] uppercase inline-block min-w-[102px] z-[1] ">
                    {i18n("successStories.LetsGo")}
                  </b>
                  <div className="self-stretch flex flex-row mq750:items-center items-start mq750:justify-center justify-between gap-[20px] max-w-full text-21xl  text-neutrals-n90 mq750:flex-wrap">
                    <b
                      className={`relative tracking-[0.01em] inline-block max-w-full z-[2] mq450:text-13xl mq450:font-bold mq450:text-center ${
                        selectedLanguage === "en"
                          ? "leading-[40px]"
                          : "leading-[55px]"
                      }`}
                    >
                      <p className="m-0 max-w-[450px]">
                        {i18n("successStories.ResumesCrafted")}{" "}
                        {i18n("successStories.CountlessSuccessStories")}
                      </p>
                    </b>

                    {slider.current && (
                      <div className="mq750:hidden mq750:h-[0px] h-[68px] w-32 flex flex-col mq750:items-center mq750:justify-center items-start justify-start pt-3 px-0 pb-0 box-border">
                        <div className="self-stretch flex-1 flex flex-row mq750:items-center mq750:justify-center items-start justify-start relative gap-[8px] z-[1]">
                          <img
                            onClick={previous}
                            className="h-14 w-14 relative min-h-[56px] cursor-pointer"
                            alt=""
                            src="/previcon.png"
                            style={{ opacity: currentSlide === 0 ? 0.5 : 1 }}
                          />
                          <div className="self-stretch flex-1 relative rounded-[50%] border-[0px] border-solid border-neutrals-n20" />
                          <img
                            onClick={next}
                            className="h-14 w-14 relative min-h-[56px] cursor-pointer"
                            alt=""
                            src="/nexticon.png"
                            style={{
                              opacity:
                                currentSlide === totalSlides - 3 ? 0.5 : 1,
                            }}
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="mq750:ml-[16px] mq750:mr-[16px] self-stretch flex1 flex-row1 items-start justify-start relative max-w-full text-base text-neutrals-n80">
                  <div className="h-[auto] w-px absolute1 !m-[0] right-[290px] bottom-[-341px] box-border z-[1] border-r-[1px] border-dashed border-gray-600" />
                  <div className="h-[auto] w-px absolute1 !m-[0] bottom-[-341px] left-[267px] box-border z-[1] border-r-[1px] border-dashed border-gray-600" />
                  <div className="SuccessStoriesSection h-[330px] mq450:h-[310px] flex-1 flex1 flex-row1 flex-wrap items-start justify-center relative gap-[56px_22px] max-w-full z-[2]">
                    <Slider
                      ref={(c) => (slider.current = c)}
                      {...sliderSettings}
                    >
      {testiMonials.map((testiMonialsItems:any, index:any) => (

                      <GroupComponent1
                        testimonialContent={testiMonialsItems.testimonial}
                        testimonialAuthorImages="/dummyUser.png"
                        snehaSharma={testiMonialsItems.name}
                        location={testiMonialsItems.city}
                      />

                    ))}

                     
                    </Slider>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SuccessStories;
