import { Box } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { ChangeEvent, useState } from 'react';
import TabGroup from '~/shared/components/TabGroup';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { ResumeResponse } from '../Utils/ResumeDownloadUtils';
import PreviewCoverLetter from './Preview/PreviewCoverLetter';
import PreviewTemplateOne from './Preview/PreviewResumeTemplate/PreviewTemplateOne';
import { useStyles } from './ResumePreviewStyles';

interface ResumePreviewProps {
  resumeData: ResumeResponse;
}
const ResumePreview: React.FC<ResumePreviewProps> = ({ resumeData }) => {
  const templateData = [
    {
      template: <PreviewTemplateOne resumeContent={resumeData?.resume_content} />
    },
    {
      template: <PreviewCoverLetter coverLetterContent={resumeData?.cover_letter} />
    }
  ];

  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_DOWNLOAD);
  const templateToggle = [i18n('resume'), i18n('coverLetter')];
  const [alignment, setAlignment] = useState(0);

  const handleChange = (event: ChangeEvent<{}>, newValue: number) => {
    setAlignment(newValue);
  };
  const styles = useStyles();

  return (
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
    </Box>
  );
};
export default ResumePreview;
