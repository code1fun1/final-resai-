import { Box, Grid, Alert } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useState, useMemo } from 'react';
// import Alert from '~/shared/components/Alert';
import BreadCrumb from '~/shared/components/BreadCrumb';
import withLoader from '~/shared/components/HOC/withLoader';
import PDFGenerator from '~/shared/components/PDFGenerator';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { ROUTES } from '~/shared/constants/routes';
import { getStorageItem } from '~/shared/utils/storage';
import BridgeSkillGaps from './BridgeSkillGaps';
import { useStyles } from './ResumeDownloadStyles';
//import ResumePreview from './ResumePreview';
//import CoverLetter from './ResumePdf/CoverLetter';
//import ResumeTemplateOne from './ResumePdf/ResumeTemplate/ResumeTemplateOne';
import {
  CoverLetterContent,
  ResumeContent
} from '~/modules/ResumeDownload/Utils/ResumeDownloadUtils';

import ScoreCard from './ScoreCard';
import {
  DEFAULT_RESUME_RESPONSE,
  ResumeResponse,
  getResumeInformation
} from './Utils/ResumeDownloadUtils';
interface ResumeDownloadProps {
  setLoadWithoutMount: (value: boolean) => void;
}

import loadable from '@loadable/component';
import ResumeForm from './ResumeForm';
import { useRouter } from 'next/router';
const ResumeDownload: React.FC<ResumeDownloadProps> = ({ setLoadWithoutMount }) => {
  const styles = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_DOWNLOAD);
  const { t: resumeCustomizeI18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  // const [isToastOpen, setIsToastOpen] = useState<boolean>(true);
  const [resumeData, setResumeData] = useState<ResumeResponse>(DEFAULT_RESUME_RESPONSE);
  const [DefaultTemplate, setDefaultTemplate] = useState('68770179-db38-45b7-971e-e45cea7e840c');

  // const handleClose = () => {
  //   setIsToastOpen(false);
  // };
  const router = useRouter();
  const { asPath } = router;
  // Check if the current URL includes '/resume-customize'
  const isResumeCustomize = router.asPath.includes('/resume-customize');
  const breadcrumbData = [
    {
      label: i18n('home'),
      link: ROUTES.MY_RESUMES
    },
    {
      label: isResumeCustomize ? resumeCustomizeI18n('pageHeading') : i18n('preview'),
      link: '/'
    }
  ];
  const lastResumeId = getStorageItem({ key: 'lastResumeId', useCombineStorage: true });
  useEffect(() => {
    setLoadWithoutMount(true);
    if (lastResumeId == null || lastResumeId == '') {
      router.push(ROUTES.RESUME_UPLOAD);
      if (asPath === ROUTES.RESUME_UPLOAD) {
        // Stop the loader when the URL matches
        setLoadWithoutMount(false);
      }
    }
    const fetchCvInformation = async () => {
      if (lastResumeId !== null) {
        const res = await getResumeInformation(lastResumeId);
        setResumeData(res?.data);
        setLoadWithoutMount(false);
      }
    };
    fetchCvInformation();
    setDefaultTemplate('68770179-db38-45b7-971e-e45cea7e840c');
    setLoadWithoutMount(false);
  }, [lastResumeId]);

  // Load Dynamic Templates///////////
  const DynamicPdfTemp = useMemo(() => {
    return DefaultTemplate
      ? loadable(
          () =>
            import(
              `./ResumeTemplates/${DefaultTemplate}/ResumePdf/ResumeTemplate/ResumeTemplateOne/`
            )
        )
      : null;
  }, [DefaultTemplate]);

  const DynamicCoverLetterTemplate = useMemo(() => {
    return DefaultTemplate
      ? loadable(() => import(`./ResumeTemplates/${DefaultTemplate}/ResumePdf/CoverLetter/`))
      : null;
  }, [DefaultTemplate]);

  const DynamicPreviewTemplate = useMemo(() => {
    return DefaultTemplate
      ? loadable(() => import(`./ResumeTemplates/${DefaultTemplate}/ResumePreview/`))
      : null;
  }, [DefaultTemplate]);

  const DynamicPreviewTemplate2 = DynamicPreviewTemplate as React.FC<{
    resumeData: ResumeResponse;
    tempId: string;
  }>;
  // Close Load Dynamic Templates///////////
  return (
    <Box className={styles.sideCustomStyle}>
      <Box
        display="flex"
        alignItems="center"
        justifyContent="space-between"
        py={1}
        px="30px"
        className={styles.boxWrapper}
      >
        <Box>
          <BreadCrumb
            breadcrumbs={breadcrumbData}
            navigateBeforeIcon={true}
            activeIndex={1}
            className={styles.breadcrumbStyle}
          />
        </Box>

        <Box>
          <PDFGenerator
            ResumeTemplate={DynamicPdfTemp as React.FC<{ resumeContent: ResumeContent }>}
            CoverLetterTemplate={
              DynamicCoverLetterTemplate as React.FC<{ coverLetterContent: CoverLetterContent }>
            }
            resumeData={resumeData}
            setLoadWithoutMount={setLoadWithoutMount}
          />
        </Box>
      </Box>
      <Box>
        <Alert sx={{ bgcolor: '#fff', color: '#5C5D61', fontWeight: '500' }} severity="info">
          {i18n('note')}
        </Alert>
      </Box>
      <Box p={2} pb={8}>
        <Grid container spacing={2} className={styles.gridContainer}>
          <Grid item xs={12} md={4}>
            <Box display="flex" flexDirection={'column'} gap={2}>
              <ScoreCard
                scorePercent={resumeData?.resume_content?.similarity_score}
                targetJob={resumeData?.resume_content?.target_job}
              />
              <BridgeSkillGaps />
            </Box>
          </Grid>
          <Grid item xs={12} md={8}>
            {/* <Alert sx={{ bgcolor: '#fff', color: '#5C5D61' }} severity="info">
              Before submitting your resume, please review it carefully. If you notice any missing
              information, make the necessary edits to complete your resume. Once updated, be sure
              to save the final version.
            </Alert> */}

            {!isResumeCustomize && DynamicPreviewTemplate2 && (
              <div>
                <DynamicPreviewTemplate2 resumeData={resumeData} tempId={DefaultTemplate} />
              </div>
            )}
            {isResumeCustomize && <ResumeForm />}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
export default withLoader(ResumeDownload);
