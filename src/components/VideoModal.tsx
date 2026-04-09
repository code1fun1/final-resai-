import { FunctionComponent,useState } from "react";
import { useTranslation } from "react-i18next";
export type VideoModalType = {
  className?: string;
  showModalState?: string;
};
import { CardMedia } from "@mui/material";

const VideoModal: FunctionComponent<VideoModalType> = ({
  className = "",
  showModalState,
}) => {
  const [showModal, setShowModal] = useState(true);
  const { t: i18n } = useTranslation();
  const selectedLanguage = localStorage.getItem('nextSelectedLanguage');
  return (

    <>
    {/* modal start */}
    <>
    {
    (showModal && showModalState!=='ModalShowedTrue') ? (
        <>
          <div className="grid grid-cols-1 gap-4">
            <div className="">
              {/* sss */}
              <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
                <div className="mq850:w-[584px] mq450:w-[312px] mq550:w-[412px] w-[914px] h-[500px] relative w-auto11  mt-[125px] mb-[auto] my1-6 mx-auto max11-w-3xl">
                  {/*content*/}
                  <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
                    <div className="relative  mq450:p-5  p-10 flex-auto">
                      <div className="mq450:pb-[0px] m-auto w-[500px] self-stretch flex flex-row items-center justify-center pt-0 px-5 pb-16 box-border max-w-full">
                        <div className=" flex flex-col items-center justify-start gap-[17px] max-w-full">
                          <div className="self-stretch flex flex-row items-start justify-center py-0 pr-[21px] pl-5">
                            <b className="relative tracking-[0.04em] leading-[20px] uppercase  mq450:text-base">
                              {i18n("videoModal.VideoTitle")}
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
                          {/* <b className={`h-20 relative mq450:text-xl  mq450:leading-[20px] mq750:text-13xl text-21xl tracking-[0.01em] inline-block text-system-black  
                          ${selectedLanguage === 'en' ? 'leading-[40px]' : ' leading-[55px]'}`}
                          > */}
                            <b className={`h-20 relative mq450:text-xl  mq450:leading-[20px] mq750:text-13xl text-21xl tracking-[0.01em] inline-block text-system-black leading-[40px]`}
                          >
                            <p className="m-0 whitespace-pre-wrap">
                              {i18n("videoModal.CompleteWalkthrough")}
                            </p>
                            {/* <p className="m-0">of our resume builder</p> */}
                          </b>
                        </div>
                      </div>

                      <CardMedia
                        component="video"
                        //className={classes.media}
                        //image={"/walkthru-1.png"}
                        autoPlay
                        image={"/resai-video.mov"}
                        controls
                      />
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
    {/* onClick={() => setShowModal(true)}  */}



    </>

  );
};

export default VideoModal;
