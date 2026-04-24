import React, { useMemo, useState } from 'react';
import { Box, Button, Divider, TextField, Typography } from '@mui/material';
import { useStyles } from './ResumeUploadFormStyles';
import FileUploader from '~/shared/components/FileUploader';
import { useTranslation } from 'next-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { FileDetails } from '../Utils/ResumeUploadUtils';
import withLoader from '~/shared/components/HOC/withLoader';
import { detectResumeFromText } from '../Utils/useResumeDetector';

interface ResumeUploadFormProps {
  onSave: (additionalLinks: string) => void;
  onCancel: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  spinTimer: number;
  onDelete: () => void;
  fileDetails: FileDetails;
}

const ResumeUploadForm: React.FC<ResumeUploadFormProps> = React.memo(
  ({ onSave, onCancel, onChange, onDrop, spinTimer, onDelete, fileDetails }) => {
    const styles = useStyles();
    useTranslation(LOCALE_PAGE.RESUME_UPLOAD);

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [additionalLinks, setAdditionalLinks] = useState('');
    const [linksError, setLinksError] = useState('');

    const { showSpinner, fileName, errorMessage, fileUploadUrl } = fileDetails;

    const isValidLinksContent = useMemo(() => {
      if (!additionalLinks.trim()) {
        setLinksError('');
        return false;
      }
      const result = detectResumeFromText(additionalLinks);
      if (!result.isResume) {
        setLinksError('Please enter valid resume content (skills, education, experience, etc.)');
        return false;
      }
      setLinksError('');
      return true;
    }, [additionalLinks]);

    const handleGetStarted = () => {
      onSave(additionalLinks);
    };

    const handleBack = () => {
      if (typeof window !== 'undefined') window.history.back();
    };

    return (
      <Box className={styles.formWrapper}>
        {/* ── Content Area ── */}
        <Box className={styles.contentArea}>
          {/* Header row */}
          <Box className={styles.headerRow}>
            <Box>
              <Box sx={{ mb: 0.75, lineHeight: 0 }}>
                <svg
                  width="173"
                  height="24"
                  viewBox="0 0 173 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M2.55108e-05 11.448V0.311957H3.07203V11.256C3.07203 13.776 4.44003 15.168 6.93603 15.168C9.43203 15.168 10.824 13.752 10.824 11.256V0.311957H13.896V11.448C13.896 15.552 11.208 18.144 6.93603 18.144C2.68803 18.144 2.55108e-05 15.576 2.55108e-05 11.448ZM17.2427 23.352V5.99996H19.9547L20.1467 7.79996C20.8667 6.43196 22.4267 5.63996 24.2267 5.63996C27.5627 5.63996 29.7707 8.06396 29.7707 11.784C29.7707 15.48 27.7547 18.168 24.2267 18.168C22.4507 18.168 20.9147 17.472 20.1707 16.272V23.352H17.2427ZM20.1947 11.928C20.1947 14.064 21.5147 15.528 23.5307 15.528C25.5947 15.528 26.8187 14.04 26.8187 11.928C26.8187 9.81596 25.5947 8.30396 23.5307 8.30396C21.5147 8.30396 20.1947 9.79196 20.1947 11.928ZM35.0541 17.856H32.1501V-4.33922e-05H35.0541V17.856ZM37.4295 11.904C37.4295 8.20796 40.0935 5.66396 43.7655 5.66396C47.4375 5.66396 50.1015 8.20796 50.1015 11.904C50.1015 15.6 47.4375 18.144 43.7655 18.144C40.0935 18.144 37.4295 15.6 37.4295 11.904ZM40.3575 11.904C40.3575 14.064 41.7495 15.528 43.7655 15.528C45.7815 15.528 47.1735 14.064 47.1735 11.904C47.1735 9.74396 45.7815 8.27996 43.7655 8.27996C41.7495 8.27996 40.3575 9.74396 40.3575 11.904ZM55.9504 18.168C53.4304 18.168 51.8944 16.704 51.8944 14.472C51.8944 12.288 53.4784 10.92 56.2864 10.704L59.8384 10.44V10.176C59.8384 8.56796 58.8784 7.91996 57.3904 7.91996C55.6624 7.91996 54.7024 8.63996 54.7024 9.88796H52.2064C52.2064 7.31996 54.3184 5.63996 57.5344 5.63996C60.7264 5.63996 62.6944 7.36796 62.6944 10.656V17.856H60.1264L59.9104 16.104C59.4064 17.328 57.7984 18.168 55.9504 18.168ZM56.9104 15.96C58.7104 15.96 59.8624 14.88 59.8624 13.056V12.432L57.3904 12.624C55.5664 12.792 54.8704 13.392 54.8704 14.352C54.8704 15.432 55.5904 15.96 56.9104 15.96ZM70.4428 18.168C67.0108 18.168 64.8748 15.648 64.8748 11.976C64.8748 8.27996 67.0348 5.63996 70.6108 5.63996C72.2668 5.63996 73.7308 6.33596 74.4748 7.51196V-4.33922e-05H77.3788V17.856H74.6908L74.4988 16.008C73.7788 17.376 72.2428 18.168 70.4428 18.168ZM71.0908 15.48C73.1308 15.48 74.4508 14.016 74.4508 11.88C74.4508 9.74396 73.1308 8.25596 71.0908 8.25596C69.0508 8.25596 67.8028 9.76796 67.8028 11.88C67.8028 13.992 69.0508 15.48 71.0908 15.48ZM90.403 17.856H87.331V0.311957H94.027C98.011 0.311957 100.339 2.32796 100.339 5.78396C100.339 8.13596 99.235 9.81596 97.171 10.656L100.507 17.856H97.147L94.171 11.304H90.403V17.856ZM90.403 3.04796V8.59196H94.027C95.971 8.59196 97.123 7.55996 97.123 5.78396C97.123 4.03196 95.971 3.04796 94.027 3.04796H90.403ZM107.437 18.168C103.909 18.168 101.437 15.6 101.437 11.928C101.437 8.20796 103.861 5.63996 107.341 5.63996C110.893 5.63996 113.149 8.01596 113.149 11.712V12.6L104.221 12.624C104.437 14.712 105.541 15.768 107.485 15.768C109.093 15.768 110.149 15.144 110.485 14.016H113.197C112.693 16.608 110.533 18.168 107.437 18.168ZM107.365 8.03996C105.637 8.03996 104.581 8.97596 104.293 10.752H110.245C110.245 9.11996 109.117 8.03996 107.365 8.03996ZM114.581 14.256H117.365C117.389 15.288 118.157 15.936 119.501 15.936C120.869 15.936 121.613 15.384 121.613 14.52C121.613 13.92 121.301 13.488 120.245 13.248L118.109 12.744C115.973 12.264 114.941 11.256 114.941 9.35996C114.941 7.03196 116.909 5.63996 119.645 5.63996C122.309 5.63996 124.109 7.17596 124.133 9.47996H121.349C121.325 8.47196 120.653 7.82396 119.525 7.82396C118.373 7.82396 117.701 8.35196 117.701 9.23996C117.701 9.91196 118.229 10.344 119.237 10.584L121.373 11.088C123.365 11.544 124.373 12.456 124.373 14.28C124.373 16.68 122.333 18.168 119.405 18.168C116.453 18.168 114.581 16.584 114.581 14.256ZM134.642 5.99996H137.57V17.856H134.858L134.642 16.272C133.922 17.4 132.386 18.168 130.802 18.168C128.066 18.168 126.458 16.32 126.458 13.416V5.99996H129.386V12.384C129.386 14.64 130.274 15.552 131.906 15.552C133.754 15.552 134.642 14.472 134.642 12.216V5.99996ZM143.522 17.856H140.594V5.99996H143.282L143.522 7.39196C144.122 6.40796 145.322 5.63996 147.026 5.63996C148.826 5.63996 150.074 6.52796 150.698 7.89596C151.298 6.52796 152.69 5.63996 154.49 5.63996C157.37 5.63996 158.954 7.36796 158.954 10.104V17.856H156.05V10.872C156.05 9.16796 155.138 8.27996 153.746 8.27996C152.33 8.27996 151.25 9.19196 151.25 11.136V17.856H148.322V10.848C148.322 9.19196 147.434 8.30396 146.042 8.30396C144.65 8.30396 143.522 9.21596 143.522 11.136V17.856ZM167.133 18.168C163.605 18.168 161.133 15.6 161.133 11.928C161.133 8.20796 163.557 5.63996 167.037 5.63996C170.589 5.63996 172.845 8.01596 172.845 11.712V12.6L163.917 12.624C164.133 14.712 165.237 15.768 167.181 15.768C168.789 15.768 169.845 15.144 170.181 14.016H172.893C172.389 16.608 170.229 18.168 167.133 18.168ZM167.061 8.03996C165.333 8.03996 164.277 8.97596 163.989 10.752H169.941C169.941 9.11996 168.813 8.03996 167.061 8.03996Z"
                    fill="#04040E"
                  />
                </svg>
              </Box>
              <Typography
                sx={{
                  fontFamily: 'Inter, sans-serif',
                  fontWeight: 400,
                  fontSize: '16px',
                  lineHeight: '100%',
                  letterSpacing: '0px',
                  color: '#04040E'
                }}
              >
                Reengineer your career based on today&apos;s hiring
              </Typography>
            </Box>
            <Box className={styles.progressContainer}>
              <Box className={styles.progressTrack}>
                <Box className={styles.progressFill} />
              </Box>
              <Typography variant="caption" sx={{ color: '#6B7280', whiteSpace: 'nowrap' }}>
                0/4 completed
              </Typography>
            </Box>
          </Box>

          <Divider sx={{ mb: 3, borderColor: '#E5E7EB' }} />

          {/* File Uploader */}
          <FileUploader
            showSpinner={showSpinner}
            spinTimer={spinTimer}
            selectedFileName={fileName}
            onChange={onChange}
            onDrop={onDrop}
            onDelete={onDelete}
            errorMessage={errorMessage}
          />

          {/* OR START FROM SCRATCH */}
          <Divider className={styles.scratchDivider}>OR START FROM SCRATCH</Divider>

          {/* Name + Email row */}
          <Box className={styles.fieldsRow}>
            <TextField
              label="Name"
              placeholder="eg. John Doe"
              value={name}
              onChange={(e) => setName(e.target.value)}
              fullWidth
              className={styles.inputField}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
            <TextField
              label="Email"
              placeholder="john@gmail.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              fullWidth
              className={styles.inputField}
              size="small"
              InputLabelProps={{ shrink: true }}
            />
          </Box>

          {/* Additional Links textarea */}
          <Box>
            <Typography
              variant="body2"
              sx={{ color: '#374151', fontWeight: 500, mb: 1, fontSize: '13px' }}
            >
              Additional Links
            </Typography>
            <TextField
              placeholder={
                'Paste anything !\nyour LinkedIn summary, a previous resume, or just a list of your jobs and skills. We\'ll take it from there.'
              }
              value={additionalLinks}
              onChange={(e) => setAdditionalLinks(e.target.value)}
              fullWidth
              multiline
              rows={4}
              className={styles.additionalLinksField}
              error={!!linksError}
              helperText={linksError || ''}
            />
          </Box>
        </Box>

        {/* ── Footer ── */}
        <Box className={styles.footerRow}>
          <Button className={styles.cancelBtn} onClick={onCancel} disableRipple>
            Cancel
          </Button>
          <Box className={styles.footerActions}>
            <Button variant="outlined" className={styles.backBtn} onClick={handleBack}>
              Back
            </Button>
            <Button
              variant="contained"
              className={styles.getStartedBtn}
              onClick={handleGetStarted}
              disabled={!fileUploadUrl && !isValidLinksContent}
            >
              Get started
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default withLoader(ResumeUploadForm);
