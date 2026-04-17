import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useEffect, useState } from 'react';
import TabGroup from '~/shared/components/TabGroup';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { ResumeResponse } from '../../../Utils/ResumeDownloadUtils';
// import PreviewCoverLetter from './Preview/PreviewCoverLetter';
// import PreviewTemplateOne from './Preview/PreviewResumeTemplate/PreviewTemplateOne';
// import PreviewTemplateTwo from './Preview/PreviewResumeTemplate/PreviewTemplateOne/PreviewTemplateTwo';
import { useStyles } from './ResumePreviewStyles';
// import TemplateOne from '~/modules/ResumeDownload/ResumeTemplates/MultipleResumeTemplates/TemplateOne';
// import TemplateTwo from '~/modules/ResumeDownload/ResumeTemplates/MultipleResumeTemplates/TemplateTwo';
// import TemplateThree from '~/modules/ResumeDownload/ResumeTemplates/MultipleResumeTemplates/TemplateThree';
// import TemplateFour from '~/modules/ResumeDownload/ResumeTemplates/MultipleResumeTemplates/TemplateFour';
import CoverTemplateOne from '~/modules/ResumeDownload/ResumeTemplates/MultipleCoverTemplates/CoverTemplateOne';
// import CoverTemplateTwo from '~/modules/ResumeDownload/ResumeTemplates/MultipleCoverTemplates/CoverTemplateTwo';
// import CoverTemplateThree from '~/modules/ResumeDownload/ResumeTemplates/MultipleCoverTemplates/CoverTemplateThree';
// import CoverTemplateFour from '~/modules/ResumeDownload/ResumeTemplates/MultipleCoverTemplates/CoverTemplateFour';
import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';
import { getStorageItem } from '~/shared/utils/storage';
import withLoader from '~/shared/components/HOC/withLoader';
import DefaultTemplateReactiveResume from '~/modules/ResumeDownload/ResumeTemplates/MultipleResumeTemplates/DefaultTemplateReactiveResume';
import PdfViewer from '~/modules/ResumeDownload/ResumeTemplates/MultipleResumeTemplates/PdfShow/PdfViewer';
interface ResumePreviewProps {
  resumeData: ResumeResponse;
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}
const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData, setLoadWithoutMount }) => {
  const { CREATE_CV } = APIS;
  /* eslint-disable @typescript-eslint/no-unused-vars */
  const [resumeTemplateData, setResumeTemplateData] = useState({
    id: '',
    name: '',
    is_active: true
  });
  /* eslint-enable @typescript-eslint/no-unused-vars */
  const [loading, setLoading] = useState(true);
  const getTemplateData = async () => {
    const lastResumeId = getStorageItem({ key: 'lastResumeId', useCombineStorage: true });
    const [response] = await httpRequest({
      url: `${CREATE_CV}/${lastResumeId}`,
      method: API_METHOD.GET
    });
    if (response && response.length !== null) {
      const resData = response?.res_data?.data;
      setResumeTemplateData({
        id: resData?.template_id,
        name: resData?.template_name,
        is_active: true
      });
      setLoading(false); // Set loading to false after fetching data
      setLoadWithoutMount(false, '');
      //end
      return { status: 'success', data: resData };
    } else {
      setLoading(false); // Also set loading to false if there's an error
      setLoadWithoutMount(false, '');
      return { status: 'failed', message: response?.err?.response?.message };
    }
  };
  // Function to check if the resume URL is valid
  const [isPdfUrl, setIsPdfUrl] = useState(false);
  // const pdfResumeUrl = 'https://resairesumes-2025.s3.ap-south-1.amazonaws.com/cm3fq6pqa0002x75jnjpdwm84/resumes/Ltd Gentle Ant.pdf'; //set dynamic url if available
  const pdfResumeUrl = resumeData?.download_urls?.pdf_resume_url;
  useEffect(() => {
    // First, check the resume URL
    if (resumeData?.download_urls?.pdf_resume_url) {
      setIsPdfUrl(true);
    } else {
      setIsPdfUrl(false);
    }
  }, [resumeData]); // Runs when `resumeData` changes
  useEffect(() => {
    getTemplateData();
  }, []);

  const templateData = [
    {
      template: isPdfUrl ? (
        <PdfViewer pdfUrl={pdfResumeUrl} />
      ) : (
        // If isPdfUrl is false or not available, show DefaultTemplateReactiveResume
        <DefaultTemplateReactiveResume
          resumeContent={resumeData?.resume_content}
          reactiveResumeContent={resumeData?.rr_content}
        />
      )
      // template: isPdfUrl ? (
      //   <PdfViewer pdfUrl={pdfResumeUrl} />
      // ) : (
      //   <>
      //     {resumeTemplateData.id === 'f9b7a27c-6461-45cb-8b81-a7cf03e538fa' && (
      //       // <TemplateOne resumeContent={resumeData?.resume_content} reactiveResumeContent={resumeData?.rr_content} />
      //       <DefaultTemplateReactiveResume
      //         resumeContent={resumeData?.resume_content}
      //         reactiveResumeContent={resumeData?.rr_content}
      //       /> //Default
      //     )}
      //     {resumeTemplateData.id === '64e028ff-dc87-487b-9ed2-8fbdb917efb1' && (
      //       <TemplateTwo resumeContent={resumeData?.resume_content} />
      //     )}
      //     {resumeTemplateData.id === '6660dc4a-1923-47bc-9595-abbdd9049c80' && (
      //       <TemplateThree resumeContent={resumeData?.resume_content} />
      //     )}
      //     {resumeTemplateData.id === '718fde6a-9ef5-468a-959b-9f365549fdeb' && (
      //       <TemplateFour resumeContent={resumeData?.resume_content} />
      //     )}
      //   </>
      // )
    },
    {
      template: (
        <CoverTemplateOne
          coverLetterContent={resumeData?.cover_letter}
          reactiveResumeContent={resumeData?.rr_content}
        />
      ) //Chnage PreviewCoverLetter to CoverTemplateOne/Two/Three/Four
    }
  ];

  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_DOWNLOAD);
  const templateToggle = [i18n('resume'), i18n('coverLetter')];
  const [alignment, setAlignment] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setAlignment(newValue);
  };
  const styles = useStyles();
  // Call setLoadWithoutMount when loading state changes
  useEffect(() => {
    if (loading) {
      setLoadWithoutMount(true, '');
    } else {
      setLoadWithoutMount(false, '');
    }
  }, [loading, setLoadWithoutMount]);
  return (
    <>
      {loading ? (
        // setLoadWithoutMount(true, '')
        <Box className={styles.templateWrapper} sx={{ textAlign: 'center', padding: '50px' }}></Box>
      ) : (
        <Box className={styles.tabContentWrapper}>
          <TabGroup value={alignment} onChange={handleChange} tabBtnName={templateToggle} />
          <Box className={styles.templateWrapper} mt={1}>
            {templateData.map((data: { template: JSX.Element }, index: number) => (
              <Box
                key={`${data?.template?.key}-${index}`}
                display={alignment === index ? 'block' : 'none'}
                minWidth="797px"
              >
                {data.template}
              </Box>
            ))}
          </Box>
          {/* {pdfUrl && <PdfViewer pdfUrl={pdfUrl} />} */}
        </Box>
      )}
    </>
  );
};
export default withLoader(ResumePreview);
