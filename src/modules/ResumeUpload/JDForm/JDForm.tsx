import { Box, TextField, Typography, useTheme, Stack, Card } from '@mui/material';
import { EditorState } from 'draft-js';
import Editor from '~/shared/components/Editor';
import { useStyles } from './JobDescriptionStyles';
import { useFormik } from 'formik';
import { jobDetailsJDFormSchema } from '~/shared/validations/validationSchema';
import { useTranslation } from 'next-i18next';
import { Button } from '@mui/material';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStylesGoldTheme } from '~/modules/globalStyles';

interface JDFormProps {
  value: {
    jobTitle: string;
    companyName: string;
    jobDesc: string;
    editorState: EditorState;
  };
  onChange: (value: {
    jobTitle: string;
    companyName: string;
    jobDesc: string;
    editorState: EditorState;
  }) => void;
  editorState: EditorState;
  onEditorChange: (editorState: EditorState) => void;
  onSubmit?: () => void;
}

const JDForm: React.FC<JDFormProps> = ({
  value,
  onChange,
  editorState,
  onEditorChange,
  onSubmit
}) => {
  const styles = useStyles();
  const theme = useTheme();
  const globalStyles = useStylesGoldTheme();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_UPLOAD);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      jobTitle: value.jobTitle,
      companyName: value.companyName,
      jobDesc: value.jobDesc
    },
    validationSchema: jobDetailsJDFormSchema(i18n),
    onSubmit: () => {
      if (onSubmit) onSubmit();
    }
  });

  const handleEditorChange = (editorState: EditorState) => {
    const desc = editorState.getCurrentContent().getPlainText();
    formik.setFieldValue('jobDesc', desc);
    formik.setFieldTouched('jobDesc', true, false);
    onEditorChange(editorState);
    onChange({ ...value, editorState, jobDesc: desc });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
    const { name, value: val } = e.target;
    onChange({ ...value, [name]: val });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    formik.setTouched({
      jobTitle: true,
      companyName: true,
      jobDesc: true
    });
    formik.handleSubmit(e as unknown as React.FormEvent<HTMLFormElement>);
  };

  return (
    <Box className={styles.jdFormWrapper}>
      <form onSubmit={handleFormSubmit}>
        <Card variant="outlined" className={styles.jdFormCard}>
          {/* Header */}
          <Box className={styles.jdFormHeader}>
            <Typography variant="h5" className={styles.jdFormTitle}>
              {i18n('createYourJobDescription')}
            </Typography>
            <Typography variant="body2" className={styles.jdFormSubtitle}>
              {i18n('optionalButRecommended')}
            </Typography>
          </Box>

          {/* Content */}
          <Box className={styles.jdFormContent}>
            <Stack spacing={3}>
              {/* Job Title and Company Name Row */}
              <Stack direction={{ xs: 'column', md: 'row' }} spacing={3}>
                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography variant="caption" className={styles.jdFormFieldLabel}>
                    {i18n('jobTitlePlaceholder')}
                  </Typography>
                  <TextField
                    placeholder={i18n('jobTitlePlaceholder')}
                    variant="outlined"
                    fullWidth
                    name="jobTitle"
                    onChange={handleChange}
                    onFocus={() => formik.setFieldTouched('jobTitle', true)}
                    onBlur={() => formik.setFieldTouched('jobTitle', true)}
                    value={formik.values.jobTitle}
                    error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                    inputProps={{ style: { color: 'black' } }}
                    helperText={
                      formik.touched.jobTitle && formik.errors.jobTitle
                        ? formik.errors.jobTitle
                        : ''
                    }
                    FormHelperTextProps={{
                      style: {
                        color: theme.palette.error.main
                      }
                    }}
                    className={`${styles.jdFormTextField} ${globalStyles.focusedTextField}`}
                  />
                </Stack>

                <Stack spacing={1} sx={{ flex: 1 }}>
                  <Typography variant="caption" className={styles.jdFormFieldLabel}>
                    {i18n('companyNamePlaceholder')}
                  </Typography>
                  <TextField
                    placeholder={i18n('companyNamePlaceholder')}
                    variant="outlined"
                    fullWidth
                    name="companyName"
                    onChange={handleChange}
                    onFocus={() => formik.setFieldTouched('companyName', true)}
                    onBlur={() => formik.setFieldTouched('companyName', true)}
                    value={formik.values.companyName}
                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                    inputProps={{ style: { color: 'black' } }}
                    helperText={
                      formik.touched.companyName && formik.errors.companyName
                        ? formik.errors.companyName
                        : ''
                    }
                    FormHelperTextProps={{
                      style: {
                        color: theme.palette.error.main
                      }
                    }}
                    className={`${styles.jdFormTextField} ${globalStyles.focusedTextField}`}
                  />
                </Stack>
              </Stack>

              {/* Job Description */}
              <Stack spacing={1}>
                <Typography variant="caption" className={styles.jdFormFieldLabel}>
                  {i18n('jobDescription')}
                </Typography>
                <Box className={styles.jdFormEditorContainer}>
                  <Editor
                    editorData={editorState}
                    onChange={handleEditorChange}
                    placeholder={i18n('pasteJobDescriptionHere')}
                  />
                </Box>
                {formik.touched.jobDesc && formik.errors.jobDesc && (
                  <Typography color="error" variant="caption" className={styles.jdFormErrorText}>
                    {formik.errors.jobDesc}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </Box>

          {/* Button Container */}
          <Box className={styles.jdFormButtonContainer} display={{ xs: 'none', md: 'block' }}>
            <Button
              variant="contained"
              className={`${globalStyles.btnBlackColor} ${styles.jdFormButton}`}
              type="submit"
            >
              {i18n('continue')}
            </Button>
          </Box>
          {/* Save Button */}

          {/* <Box
            display={{ xs: 'none', md: 'block' }}
            component={Paper}
            p={2}
            className={styles.mobGetStartedButton}
          >
            <Button
              variant="contained"
              // color="primary"
              className={globalStyles.btnBlackColor}
              type="submit"
              style={{ width: 164, float: 'right' }}
            >
              {i18n('continue')}
            </Button>
          </Box> */}

          {/* <Box
            display={{ xs: 'block', md: 'none' }}
            component={Paper}
            p={2}
            className={styles.mobGetStartedButton}
          >
            <Button
              variant="contained"
              // color="primary"
              className={globalStyles.btnBlackColor}
              type="submit"
            >
              {i18n('continue')}
            </Button>
          </Box> */}
        </Card>
      </form>
    </Box>
  );
};

export default JDForm;
