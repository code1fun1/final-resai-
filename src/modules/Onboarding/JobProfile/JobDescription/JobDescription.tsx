import { Box, FormControl, TextField, Typography, useTheme } from '@mui/material';
import { EditorState } from 'draft-js';
import { useFormik } from 'formik';
import { useTranslation } from 'next-i18next';
import { useMemo } from 'react';
import Editor from '~/shared/components/Editor';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { jobDetailsFormSchema } from '~/shared/validations/validationSchema';
import { useStyles } from './JobDescriptionStyles';

interface JobDescriptionProps {
  onEditorChange: (data: EditorState) => void;
  editorState: EditorState;
  jobDetailsData: { title: string; company: string; role: string };
  onFormValuesChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  disableInputs: boolean;
  recommendedJobs: boolean;
}

const JobDescription: React.FC<JobDescriptionProps> = ({
  onEditorChange,
  editorState,
  jobDetailsData,
  onFormValuesChange,
  disableInputs,
  recommendedJobs
}) => {
  const { t: i18n, i18n: i18nextInstance } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const styles = useStyles();
  const theme = useTheme();
  const formik = useFormik({
    enableReinitialize: true,
    initialValues: jobDetailsData,
    validationSchema: jobDetailsFormSchema(i18n),
    onSubmit: () => {}
  });

  const editorPlaceholder = recommendedJobs
    ? i18n('editorPlaceholder')
    : i18n('pasteJobDescriptionHere');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    if (onFormValuesChange) {
      jobDetailsData.role = jobDetailsData.title; //RG Work
      onFormValuesChange(e);
    }
  };
  const editorKey = useMemo(() => i18nextInstance.language, [i18nextInstance.language]);
  return (
    <Box display="flex" flexDirection="column" gap={2}>
      {recommendedJobs ? (
        <Typography className={styles.subTitle}>{i18n('jobDescription')}</Typography>
      ) : (
        ''
      )}
      <Typography className={styles.title}>{i18n('createYourJobDescription')}</Typography>
      <Box display="flex" gap={2}>
        <Box display="flex" flexDirection="column" alignItems="flex-start" gap={2} width="100%">
          <FormControl fullWidth>
            <TextField
              id="standard-basic"
              required
              placeholder={i18n('jobTitlePlaceholder')}
              variant="standard"
              name="title"
              onChange={handleChange}
              onFocus={() => formik.setFieldTouched('title', true)}
              onBlur={() => formik.setFieldTouched('title', true)}
              value={formik?.values?.title || ''}
              helperText={formik.touched.title && formik.errors.title ? formik.errors.title : ''}
              error={formik.touched.title && Boolean(formik.errors.title)}
              FormHelperTextProps={{
                style: {
                  color: theme.palette.error.main
                }
              }}
              InputProps={{
                readOnly: disableInputs
              }}
              className={styles.textfieldStyle}
            />
          </FormControl>
          <FormControl fullWidth>
            <TextField
              id="standard-basic"
              placeholder={i18n('companyNamePlaceholder')}
              variant="standard"
              name="company"
              onChange={handleChange}
              onFocus={() => formik.setFieldTouched('company', true)}
              onBlur={() => formik.setFieldTouched('company', true)}
              value={formik?.values?.company || ''}
              helperText={
                formik.touched.company && formik.errors.company ? formik.errors.company : ''
              }
              error={formik.touched.company && Boolean(formik.errors.company)}
              FormHelperTextProps={{
                style: {
                  color: theme.palette.error.main
                }
              }}
              InputProps={{
                readOnly: disableInputs
              }}
              className={styles.textfieldStyle}
            />
          </FormControl>
        </Box>
        {/* <FormControl fullWidth>
          <TextField
            id="standard-basic"
            required
            placeholder={i18n('jobRolePlaceholder')}
            variant="standard"
            name="role"
            onChange={handleChange}
            value={formik?.values?.role || ''}
            helperText={`${formik?.errors?.role !== undefined ? formik?.errors?.role : ''}`}
            error={formik.touched.role && Boolean(formik.errors.title)}
            FormHelperTextProps={{
              style: {
                color: theme.palette.error.main
              }
            }}
            InputProps={{
              readOnly: disableInputs
            }}
            className={styles.textfieldStyle}
          />
        </FormControl> */}
      </Box>
      <Editor
        editorData={editorState}
        onChange={onEditorChange}
        placeholder={editorPlaceholder}
        key={editorKey}
      />
    </Box>
  );
};

export default JobDescription;
