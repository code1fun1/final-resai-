import React, { useMemo } from 'react';
import { Box, Button, Divider, Paper, Typography } from '@mui/material';
import { useStyles } from './ResumeUploadFormStyles';
import FileUploader from '~/shared/components/FileUploader';
import { useTranslation } from 'next-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import EastRoundedIcon from '@mui/icons-material/EastRounded';
import Editor from '~/shared/components/Editor';
import { EditorState } from 'draft-js';
import { FileDetails } from '../Utils/ResumeUploadUtils';
import { useStylesGoldTheme } from '~/modules/globalStyles';
import withLoader from '~/shared/components/HOC/withLoader';
interface ResumeUploadProps {
  onSave: () => void;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop: (event: React.DragEvent<HTMLDivElement>) => void;
  spinTimer: number;
  onDelete: () => void;
  onEditorChange: (value: EditorState) => void;
  editorData: EditorState;
  fileDetails: FileDetails;
}

import { detectResumeFromText } from '../Utils/useResumeDetector';

const ResumeUploadForm: React.FC<ResumeUploadProps> = React.memo(
  ({ onSave, onChange, onDrop, spinTimer, onDelete, onEditorChange, editorData, fileDetails }) => {
    const styles = useStyles();
    const globalStyles = useStylesGoldTheme();
    const { t: i18n, i18n: i18nextInstance } = useTranslation(LOCALE_PAGE.RESUME_UPLOAD);
    const editorText = editorData.getCurrentContent().getPlainText();
    const [editorError, setEditorError] = React.useState('');
    const isValidEditorContent = useMemo(() => {
      const result = detectResumeFromText(editorText);

      if (!editorText.trim()) {
        setEditorError('');
        return false;
      }

      if (!result.isResume) {
        setEditorError('Please enter valid resume content (skills, education, experience, etc.)');
        return false;
      }

      setEditorError('');
      return true;
    }, [editorText]);
    const { showSpinner, fileName, errorMessage, fileUploadUrl } = fileDetails;
    const editorKey = useMemo(() => i18nextInstance.language, [i18nextInstance.language]);

    return (
      <Box>
        <Box component={Paper} p={2} display="flex" flexDirection="column" gap={3}>
          {/* Title Section */}
          <Box display={{ xs: 'block', md: 'none' }}>
            <Box
              display={'flex'}
              alignItems={{ xs: 'center', md: 'flex-start' }}
              justifyContent="center"
              flexDirection="column"
              gap={2}
              textAlign={{ xs: 'center', md: 'left' }}
              className={styles.titleWrap}
            >
              <Typography variant="body2">{i18n('HiResAI')}</Typography>
              <Typography variant="h2">{i18n('craftingYourResume')}</Typography>
              <Typography variant="body2">{i18n('helpYouCreateResume')}</Typography>
            </Box>
          </Box>

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

          {/* Divider */}
          <Divider className={styles.divider}>{i18n('or_translate')}</Divider>

          {/* Text Editor */}
          <Box
            className={`${styles.textEditorWrapper} ${styles.TextBoxStyle}`}
            sx={{
              border: editorError ? '1px solid red' : undefined,
              borderRadius: '8px'
            }}
          >
            <Editor
              key={editorKey}
              editorData={editorData}
              onChange={onEditorChange}
              placeholder={i18n('editorTextPlaceholder')}
            />
            {editorError && (
              <Typography variant="caption" color="error">
                {editorError}
              </Typography>
            )}
          </Box>

          {/* Save Button */}
          <Box display={{ xs: 'none', md: 'block' }} textAlign="right">
            <Button
              variant="contained"
              // color="primary"
              className={globalStyles.btnBlackColor}
              endIcon={<EastRoundedIcon />}
              onClick={onSave}
              disabled={!fileUploadUrl && !isValidEditorContent}
            >
              {i18n('getStarted')}
            </Button>
          </Box>

          <Box
            display={{ xs: 'block', md: 'none' }}
            component={Paper}
            p={2}
            className={styles.mobGetStartedButton}
          >
            <Button
              variant="contained"
              // color="primary"
              className={globalStyles.btnBlackColor}
              endIcon={<EastRoundedIcon />}
              onClick={onSave}
              disabled={!fileUploadUrl && !isValidEditorContent}
            >
              {i18n('getStarted')}
            </Button>
          </Box>
        </Box>
      </Box>
    );
  }
);

export default withLoader(ResumeUploadForm);
