import { Box, Button } from '@mui/material';
import { useTranslation } from 'next-i18next';
import {
  CoverLetterContent,
  ResumeContent,
  ResumeResponse
} from '~/modules/ResumeDownload/Utils/ResumeDownloadUtils';
import { LOCALE_PAGE, SEVERITY, ToastMessage } from '~/shared/constants/constants';
import Icon from '../Icon';
import { useStyles } from './PDFGeneratorStyles';
import { useEffect, useState } from 'react';
//import Tooltip from '@mui/material/Tooltip';
//import { WhatsappShareButton, WhatsappIcon } from 'react-share';
import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';
import { useRouter } from 'next/router';
import Modal from '~/shared/components/Modal';
import CreditAlertPopup from '~/shared/components/CreditAlertPopup';
import { RootState } from '~/shared/redux/reducers';
import { useDispatch, useSelector } from 'react-redux';
import {
  updateUserCreditData,
  UserCreditDataUpdate,
  handleSetUserResumeData,
  handleSetUserCreditData,
  UserUpdateShareStatusProps,
  updateShareStatus
} from '~/modules/auth/Utils/CreditUtils';
import { LoggedInUserData, setLoggedInUserData, UserCreditDetails } from '~/shared/redux/actions';
import Toast from '~/shared/components/Toast';
import { handleToast } from '~/shared/utils/utils';
import getConfig from 'next/config';
import { envConfig } from '../../../config'; // Import the configuration
interface PDFGeneratorProps {
  ResumeTemplate: React.FC<{ resumeContent: ResumeContent }>;
  CoverLetterTemplate: React.FC<{ coverLetterContent: CoverLetterContent }>;
  resumeData: ResumeResponse;
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}
const PDFGenerator: React.FC<PDFGeneratorProps> = ({
  // ResumeTemplate,
  resumeData,
  setLoadWithoutMount
  // CoverLetterTemplate
}) => {
  const { publicRuntimeConfig: configs = {} } = getConfig() || {};
  const { WEB_ENVIRONMENT } = configs; // eslint-disable-line @typescript-eslint/no-unused-vars
  // console.log('prevEnv:', WEB_ENVIRONMENT); // eslint-disable-line no-console
  const { NextENV } = envConfig; // eslint-disable-line @typescript-eslint/no-unused-vars
  // console.log('prevEnvNEXT:', NextENV); // eslint-disable-line no-console
  const { USER_DOWNLOADCV } = APIS;
  const currentDateTime: string = new Date().toLocaleString('en-IN').replace(/[:/]/g, '-');
  const userName: string = resumeData?.resume_content?.basic_details?.name;

  //const zipFileName: string = `Resume-Cover-Letter-${userName}_${currentDateTime}.zip`;
  // const resumeFileName: string = `Resume-${userName}_${currentDateTime}.pdf`;//disable pdf download option
  // const CoverLetterFileName: string = `Cover-Letter-${userName}_${currentDateTime}.pdf`;//disable pdf download option
  // const resumeDocxFileName: string = `Resume-${userName}_${currentDateTime}.docx`;
  const CoverLetterDocxFileName: string = `Cover-Letter-${userName}_${currentDateTime}.docx`;
  //const [isShared, setIsShared] = useState(false);
  const router = useRouter();
  // Check if the current URL includes '/resume-customize'
  const isResumeCustomize = router.asPath.includes('/resume-customize');
  //credit purchase start
  const { SUCCESS } = API_STATUS;
  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });
  const dispatch = useDispatch();
  const [openModal, setOpenModal] = useState<boolean>(false);
  const handleClose = () => {
    setOpenModal(false);
  };
  const { userCreditData } = useSelector(
    (state: RootState) => state?.user as { userCreditData: UserCreditDetails }
  );
  const currentCredit = userCreditData?.user_current_credit; //get redux state data
  const usedCredits = userCreditData?.user_used_credit; //get redux state data
  const totalCredit = userCreditData?.user_total_credit; // eslint-disable-line @typescript-eslint/no-unused-vars
  // const whatsappStatus = userCreditData?.user_share_status; //get redux state data
  const settings = useSelector((state: RootState) => state.siteSettings);
  // Initialize the downloadCvCredit variable
  let setDownloadCvCredit = 0; //set default 0 to handle undefined case
  let setCoursePurchaseCredit = 0; // eslint-disable-line @typescript-eslint/no-unused-vars
  settings.features.forEach((setting) => {
    if (setting.id == 1 && setting.name === 'resume-download' && setting.type === 'one-time-pay') {
      // Set downloadCvCredit to the weight of the 'resume-download' feature
      setDownloadCvCredit = setting.weight;
    }
    // ---------------------------COURSE PURCHASE START------------------------------
    if (setting.id == 2 && setting.name === 'course-purchase' && setting.type === 'repeat-pay') {
      setCoursePurchaseCredit = setting.weight;
    }
    // ---------------------------COURSE PURCHASE END------------------------------
  });
  const downloadCvCredit = setDownloadCvCredit;

  const canDownloadCv = () => {
    return currentCredit >= downloadCvCredit;
  };
  // ---------------------------COURSE PURCHASE START------------------------------
  // const [isAlreadyCoursePurchase, setCoursePurchaseStatus] = useState(false); // eslint-disable-line @typescript-eslint/no-unused-vars
  // const coursePurchaseCredit = setCoursePurchaseCredit;
  // const canCoursePurchase = () => {
  //   return currentCredit >= coursePurchaseCredit;
  // };
  // ---------------------------COURSE PURCHASE END--------------------------------
  //whatspp share - START
  const { loggedInUser } = useSelector(
    (state: RootState) => state?.user as { loggedInUser: LoggedInUserData }
  );
  const userAlreadyWSharedCount = loggedInUser?.share_and_invite?.whatsapp?.share ?? 0; //set user based as dynamic
  const creditForPerShare = settings.share_and_invite[0]?.whatsapp?.share[0]?.credit_point;
  const userMaxWShareCountAllowed = settings.share_and_invite[0]?.whatsapp?.share[1]?.useable_count;
  const canGetCreditWhatsAppShare = userAlreadyWSharedCount < userMaxWShareCountAllowed;
  const handleUpdateShare = async () => {
    if (canGetCreditWhatsAppShare === true) {
      const updatedUserShareData: UserUpdateShareStatusProps = {
        credits: creditForPerShare,
        status: 'success',
        actions: 'whatsapp-share',
        share_and_invite: { whatsapp: { share: userAlreadyWSharedCount + 1 } }
      };
      //update into Api
      const resShare = await updateShareStatus(updatedUserShareData);
      if (resShare.status === SUCCESS) {
        const severity: SEVERITY = SEVERITY.SUCCESS;
        const successMessage = `You have received ${creditForPerShare} free credits for sharing.`;
        handleToast({ severity, message: successMessage }, setToastState, toastState);
        // ------------------------------Update Credit Data START---------------------------------------------
        await handleSetUserCreditData(dispatch); //set UserCreditDetails
        // ------------------------------Update Credit Data END---------------------------------------------
        const shareCountUpdated = resShare?.data?.share_and_invite?.whatsapp?.share;
        // ------------------------------Update Logged in data START---------------------------------------------
        dispatch(
          setLoggedInUserData({
            //to handle share and invite
            ...loggedInUser,
            share_and_invite: { whatsapp: { share: shareCountUpdated } }
          })
        );
        // ------------------------------Update Logged in data END---------------------------------------------
      }
    }
  };
  //whatspp share - END
  const [isAlreadyDownloaded, setDownloadedStatus] = useState(false);
  const currentResumeId = resumeData?.id;
  const downloadedCvList = useSelector(
    (state: RootState) => state.downloadedResumeIds.downloadable_resume_ids
  );
  useEffect(() => {
    const fetchData = async () => {
      try {
        // Check if currentResumeId exists in downloadable_resume_ids
        const isDownloaded = downloadedCvList.includes(currentResumeId);
        setDownloadedStatus(isDownloaded);
      } catch (error) {
        console.error('Error fetching CV:', error);
      }
    };

    fetchData();
  }, [currentResumeId, downloadedCvList]);

  const generateDOCXBlob = async (url: string, fileType: string) => {
    try {
      // Check if URL has a .docx extension
      if (!url.endsWith('.docx') && !url.endsWith('.pdf')) {
        console.error(`URL does not point to a DOCX file for ${fileType}`);
        return false;
      }

      const response = await fetch(url);

      if (!response.ok) {
        console.error(`Network response was not ok for ${fileType}`);
        return false;
      }

      const docxBlob = await response.blob();
      return docxBlob;
    } catch (error) {
      console.error(`Failed to fetch the DOCX file for ${fileType}:`, error);
      return false;
    }
  };

  // Function to download Blob as a file
  const downloadBlob = (blob: Blob, filename: string) => {
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
  };
  //Download CV using Api start
  const resId = resumeData?.id;
  //end
  //get file Extention ----START
  const getFileExtension = (url: string) => {
    // Regular expression to match the file extension (pdf, docx, etc.)
    const match = url.match(/\.([a-zA-Z0-9]+)(?=$|\?)/);
    return match ? match[1] : null;
  };
  //get file Extention--------End
  const handleDownloadCoverResume = async () => {
    if (canDownloadCv() == true || isAlreadyDownloaded == true) {
      setLoadWithoutMount(true, i18n('loaderMessages.pleaseWait', { ns: 'common' }));
      try {
        const [response] = await httpRequest({
          url: `${USER_DOWNLOADCV}/${resId}`,
          method: API_METHOD.GET
        });

        if (response && response.length !== null) {
          const coverUrl = response?.res_data?.data?.docx_cover_letter_url;
          // const cvUrl = response?.res_data?.data?.docx_resume_url;
          const cvUrl = resumeData?.download_urls?.pdf_resume_url
            ? resumeData?.download_urls?.pdf_resume_url
            : response?.res_data?.data?.docx_resume_url;
          // const cvUrl = response?.res_data?.data?.pdf_resume_url
          //   ? response?.res_data?.data?.pdf_resume_url
          //   : response?.res_data?.data?.docx_resume_url;
          const docxBlobCover = await generateDOCXBlob(coverUrl, 'cover letter');
          if (docxBlobCover) {
            downloadBlob(docxBlobCover, CoverLetterDocxFileName);
            if (isAlreadyDownloaded == false) {
              //update redux state before process (to avoid hard code change credits)-start
              await handleSetUserCreditData(dispatch);
              //update redux state before process (to avoid hard code change credits)-end

              //deduct credit from wallet and redux state
              const updatedCurrentCredit = currentCredit - downloadCvCredit; // eslint-disable-line @typescript-eslint/no-unused-vars
              const updatedUsedCredit = usedCredits + downloadCvCredit; // eslint-disable-line @typescript-eslint/no-unused-vars
              const downloadCVCreditInNegative = -downloadCvCredit;
              const updatedUserCreditData: UserCreditDataUpdate = {
                credits: downloadCVCreditInNegative, //pass spend credits
                status: 'success',
                entity_type: 'resume',
                entity_id: resId, //pass user_resume_id
                actions: 'resume-download'
              };
              //update into Api
              const res = await updateUserCreditData(updatedUserCreditData);

              //update into redux after succeefully update in api
              if (res.status === 'success') {
                // -------------------------------------Update Downloaded CV LIST START---------------------------------

                await handleSetUserResumeData(dispatch); //set user resume data

                // -------------------------------------Update Downloaded CV LIST END---------------------------------

                // ------------------------------Update Credit Data START---------------------------------------------

                await handleSetUserCreditData(dispatch); //set UserCreditDetails

                // ------------------------------Update Credit Data END---------------------------------------------
              }
            }
          } else {
            console.error('Cover letter DOCX file download failed.');
          }

          const docxBlobResume = await generateDOCXBlob(cvUrl, 'resume');
          if (docxBlobResume) {
            const fileExtension = getFileExtension(cvUrl);
            const resumeDocxFileName: string = `Resume-${userName}_${currentDateTime}.${fileExtension}`;
            downloadBlob(docxBlobResume, resumeDocxFileName);
          } else {
            console.error('Resume DOCX file download failed.');
          }
          setLoadWithoutMount(false, '');
          return { status: 'success', data: response?.res_data?.data };
        } else {
          setLoadWithoutMount(false, '');
          return { status: 'failed', message: response?.err?.response?.message };
        }
      } catch (error) {
        setLoadWithoutMount(false, '');
        console.error('Error during download process:', error);
      }
    } else {
      setOpenModal(true);
    }
  };
  //Download Docx format end(RG Work)
  // ---------------------------COURSE PURCHASE START------------------------------
  // const courseId = '123abcde123';
  // const handlePurchaseCourse = async () => {
  //   if (canCoursePurchase() == true || isAlreadyCoursePurchase == true) {
  //     setLoadWithoutMount(true, i18n('loaderMessages.pleaseWait', { ns: 'common' }));
  //     try {
  //       if (isAlreadyCoursePurchase == false) {
  //         //if multile time course purchase or repeat enable then remove this if condition
  //         //update redux state before process (to avoid hard code change credits)-start
  //         await handleSetUserCreditData(dispatch);
  //         //update redux state before process (to avoid hard code change credits)-end

  //         //deduct credit from wallet and redux state
  //         const updatedCurrentCredit = currentCredit - coursePurchaseCredit; // eslint-disable-line @typescript-eslint/no-unused-vars
  //         const updatedUsedCredit = usedCredits + coursePurchaseCredit; // eslint-disable-line @typescript-eslint/no-unused-vars
  //         const coursePurchaseCreditInNegative = -coursePurchaseCredit;
  //         const updatedUserCreditData: UserCreditDataUpdate = {
  //           credits: coursePurchaseCreditInNegative, //pass spend credits
  //           status: 'success',
  //           entity_type: 'course',
  //           entity_id: courseId, //pass user_course_id
  //           actions: 'course-purchase'
  //         };
  //         //update into Api
  //         const res = await updateUserCreditData(updatedUserCreditData);

  //         //update into redux after succeefully update in api
  //         if (res.status === 'success') {
  //           const severity: SEVERITY = SEVERITY.SUCCESS;
  //           const successMessage = 'Course purchased successfully.';
  //           handleToast({ severity, message: successMessage }, setToastState, toastState);
  //           // -------------------------------------Update Course Purchase LIST START---------------------------------

  //           // await handleSetUserResumeData(dispatch); //set Course Purchase data

  //           // -------------------------------------Update Course Purchase LIST END---------------------------------

  //           // ------------------------------Update Credit Data START---------------------------------------------

  //           await handleSetUserCreditData(dispatch); //set UserCreditDetails

  //           // ------------------------------Update Credit Data END---------------------------------------------
  //         }
  //         setLoadWithoutMount(false, '');
  //       }
  //     } catch (error) {
  //       setLoadWithoutMount(false, '');
  //       console.error('Error during download process:', error);
  //     }
  //   } else {
  //     setOpenModal(true);
  //   }
  // };
  // ---------------------------COURSE PURCHASE END------------------------------
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_DOWNLOAD);
  const styles = useStyles();

  return (
    <Box className={styles.shareAndDownloadBox}>
      {!isResumeCustomize && (
        <>
          {/* <Typography className={styles.info}>
            {i18n('buttonTexts.shareOnInfo', { ns: 'common' })}
          </Typography> */}
          <span>
            <Button
              variant="contained"
              endIcon={<Icon name="whiteDiamondIcon" />}
              className={styles.downloadBtn}
              onClick={handleDownloadCoverResume}
              disabled={false}
              // disabled={isShared ? false : true}
            >
              {i18n('buttonTexts.download', { ns: 'common' })}{' '}
              {isAlreadyDownloaded == true ? 0 : downloadCvCredit}
            </Button>
          </span>
          {/* {(NextENV === 'DEV' || NextENV === 'LOCAL') && (
            <Tooltip title={i18n('buttonTexts.buyCourseInfo', { ns: 'common' })}>
              <span>
                <Button
                  variant="contained"
                  endIcon={<Icon name="whiteDiamondIcon" />}
                  className={styles.courseBtn}
                  onClick={handlePurchaseCourse}
                  disabled={isShared || CanGetCreditWhatsAppShare() == false ? false : true}
                >
                  {i18n('buttonTexts.buyCourseBtnName', { ns: 'common' })} {coursePurchaseCredit}
                </Button>
              </span>
            </Tooltip>
          )} */}
        </>
      )}
      {/* modal open start */}
      {openModal && (
        <Modal open={openModal} onClose={handleClose} closeOnBackdropClick={false}>
          <Box
            display="flex"
            flexDirection={'column'}
            gap={2}
            width={{ xs: '100%', sm: '409px' }}
            my={2}
          >
            <CreditAlertPopup
              handleUpdateShare={handleUpdateShare}
              creditForPerShare={creditForPerShare}
              canGetCreditWhatsAppShare={canGetCreditWhatsAppShare}
              onClose={() => setOpenModal(false)}
            />
          </Box>
        </Modal>
      )}
      {/* end */}
      {toastState.open && <Toast toastState={toastState} />}
    </Box>
  );
};

export default PDFGenerator;
