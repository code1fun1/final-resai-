import { Box, TextField, Typography, useTheme, Stack } from '@mui/material';
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
  onBack?: () => void;
  onCancel?: () => void;
}

const JDForm: React.FC<JDFormProps> = ({
  value,
  onChange,
  editorState,
  onEditorChange,
  onSubmit,
  onBack,
  onCancel
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
    <>
      {/* Mobile Black Card - Only visible on xs screens - Figma Perfect */}
      <Box
        sx={{
          display: { xs: 'flex', md: 'none' },
          flexDirection: 'column',
          gap: '24px',
          bgcolor: '#04040E',
          color: '#ffffff',
          p: '32px 20px',
          minHeight: 'auto',
          textAlign: 'center',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}
      >
        {/* Top Section */}
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '20px', width: '100%' }}>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#DABF67',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '140%',
              letterSpacing: '-0.28px'
            }}
          >
            Your AI Powered Career Engineer
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: '36px',
              fontWeight: 700,
              lineHeight: '100%',
              letterSpacing: '0px'
            }}
          >
            Let&apos;s Get Started
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              fontSize: '16px',
              fontWeight: 400,
              lineHeight: '140%',
              color: '#9CA3AF'
            }}
          >
            Create resumes, plan growth, and unlock better opportunities in few simple steps
          </Typography>

          {/* Step Indicator Progress Bar */}
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              gap: '12px',
              mt: '12px',
              justifyContent: 'center',
              flexDirection: 'column',
              width: '100%'
            }}
          >
            <Box
              sx={{
                width: '120px',
                height: '6px',
                backgroundColor: 'rgba(255,255,255,0.15)',
                borderRadius: '3px',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <Box
                sx={{
                  position: 'absolute',
                  left: 0,
                  top: 0,
                  height: '100%',
                  width: '25%',
                  backgroundColor: '#DABF67',
                  borderRadius: '3px',
                  transition: 'width 0.3s ease'
                }}
              />
            </Box>
            <Typography
              sx={{
                fontSize: '14px',
                color: '#9CA3AF',
                fontWeight: 400,
                lineHeight: '140%'
              }}
            >
              1/4 completed
            </Typography>
          </Box>
        </Box>
      </Box>

      <Box className={styles.jdPanelWrapper}>
        {/* Top: title + progress */}
        <Box className={styles.jdPanelHeader}>
          <Box sx={{ flex: 1, pr: 2 }}>
            <Typography
              className={styles.jdPanelTitle}
              sx={{
                fontFamily: 'Satoshi, sans-serif !important',
                fontSize: { xs: '16px', sm: '20px', md: '24px' },
                fontWeight: '700 !important',
                color: '#04040E !important',
                lineHeight: '100% !important',
                letterSpacing: '0 !important',
                width: { xs: '100%', sm: '100%', md: '600px' },
                height: { xs: 'auto', sm: 'auto', md: '32px' },
                mb: '6px'
              }}
            >
              Tailor your resume apt for a specific role
            </Typography>
            <Typography
              className={styles.jdPanelSubtitle}
              sx={{
                fontFamily: 'Inter, sans-serif !important',
                fontSize: { xs: '14px', sm: '16px' },
                fontWeight: '400 !important',
                color: '#04040E !important',
                lineHeight: '1.5 !important',
                letterSpacing: '0px !important',
                maxWidth: '520px'
              }}
            >
              Paste the job description and we&apos;ll automatically align your resume&apos;s
              language to match what hiring managers want to see.
            </Typography>
          </Box>
          <Box className={styles.jdProgressBlock}>
            <Box className={styles.jdProgressBarTrack}>
              <Box className={styles.jdProgressBarFill} />
            </Box>
            <Typography className={styles.jdProgressLabel}>1/4 completed</Typography>
          </Box>
        </Box>

        {/* Form */}
        <Box className={styles.jdPanelContent}>
          <form onSubmit={handleFormSubmit} id="jd-form">
            <Stack spacing={2.5}>
              {/* Role + Company row */}
              <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                <Stack spacing={0.5} sx={{ flex: 1 }}>
                  <Typography
                    className={styles.jdFieldLabel}
                    sx={{
                      fontFamily: 'Satoshi, sans-serif !important',
                      fontWeight: '500 !important',
                      color: '#04040E !important',
                      fontSize: '14px !important'
                    }}
                  >
                    Role you&apos;re applying for
                  </Typography>
                  <TextField
                    placeholder="e.g. Senior Product Manager"
                    variant="outlined"
                    fullWidth
                    name="jobTitle"
                    onChange={handleChange}
                    onFocus={() => formik.setFieldTouched('jobTitle', true)}
                    onBlur={() => formik.setFieldTouched('jobTitle', true)}
                    value={formik.values.jobTitle}
                    error={formik.touched.jobTitle && Boolean(formik.errors.jobTitle)}
                    helperText={
                      formik.touched.jobTitle && formik.errors.jobTitle
                        ? formik.errors.jobTitle
                        : ''
                    }
                    FormHelperTextProps={{ style: { color: theme.palette.error.main } }}
                    className={`${styles.jdTextField} ${globalStyles.focusedTextField}`}
                  />
                </Stack>

                <Stack spacing={0.5} sx={{ flex: 1 }}>
                  <Typography
                    className={styles.jdFieldLabel}
                    sx={{
                      fontFamily: 'Satoshi, sans-serif !important',
                      fontWeight: '500 !important',
                      color: '#04040E !important',
                      fontSize: '14px !important'
                    }}
                  >
                    Company
                  </Typography>
                  <TextField
                    placeholder="e.g. Acme Corp"
                    variant="outlined"
                    fullWidth
                    name="companyName"
                    onChange={handleChange}
                    onFocus={() => formik.setFieldTouched('companyName', true)}
                    onBlur={() => formik.setFieldTouched('companyName', true)}
                    value={formik.values.companyName}
                    error={formik.touched.companyName && Boolean(formik.errors.companyName)}
                    helperText={
                      formik.touched.companyName && formik.errors.companyName
                        ? formik.errors.companyName
                        : ''
                    }
                    FormHelperTextProps={{ style: { color: theme.palette.error.main } }}
                    className={`${styles.jdTextField} ${globalStyles.focusedTextField}`}
                  />
                </Stack>
              </Stack>

              {/* Job description */}
              <Stack spacing={0.5}>
                <Typography
                  sx={{
                    fontFamily: 'Satoshi, sans-serif',
                    fontWeight: 500,
                    color: '#04040E',
                    fontSize: '14px',
                    mb: '4px',
                    display: 'block'
                  }}
                >
                  Job description
                </Typography>
                <Box className={`${styles.jdEditorContainer} jd-editor-container`}>
                  <Editor
                    editorData={editorState}
                    onChange={handleEditorChange}
                    placeholder="Copy and paste the full job posting here. The more detail the better match."
                  />
                </Box>
                {formik.touched.jobDesc && formik.errors.jobDesc && (
                  <Typography variant="caption" sx={{ color: theme.palette.error.main, mt: 0.5 }}>
                    {formik.errors.jobDesc}
                  </Typography>
                )}
              </Stack>
            </Stack>
          </form>
        </Box>

        {/* Footer buttons */}
        <Box className={styles.jdPanelFooter}>
          <Button
            type="button"
            onClick={onCancel}
            className={styles.jdCancelBtn}
            disableRipple
            sx={{
              fontFamily: 'Satoshi, sans-serif !important',
              fontSize: { xs: '14px', sm: '18px' },
              fontWeight: '500 !important',
              color: '#FF3B30 !important',
              lineHeight: '1.5 !important',
              letterSpacing: '-0.36px !important'
            }}
          >
            Cancel
          </Button>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              type="button"
              variant="outlined"
              onClick={onBack}
              className={styles.jdBackBtn}
              sx={{
                fontFamily: 'Satoshi, sans-serif !important',
                fontSize: { xs: '14px', sm: '18px' },
                fontWeight: '500 !important',
                color: '#04040E !important',
                backgroundColor: '#ffffff !important',
                borderColor: '#DABF67 !important',
                borderRadius: '999px !important',
                padding: { xs: '10px 20px', sm: '12px 32px' },
                height: { xs: '42px', sm: '50px' },
                lineHeight: '1.5 !important',
                letterSpacing: '-0.36px !important'
              }}
            >
              Back
            </Button>
            <Button
              variant="contained"
              type="submit"
              form="jd-form"
              className={styles.jdSubmitBtn}
              sx={{
                fontFamily: 'Satoshi, sans-serif !important',
                fontSize: { xs: '14px', sm: '18px' },
                fontWeight: '500 !important',
                color: '#04040E !important',
                backgroundColor: '#DABF67 !important',
                borderRadius: '999px !important',
                padding: { xs: '10px 20px', sm: '12px 32px' },
                height: { xs: '42px', sm: '50px' },
                lineHeight: '1.5 !important',
                letterSpacing: '-0.36px !important',
                '&:hover': { backgroundColor: '#C8AD55 !important' }
              }}
            >
              Analyse &amp; continue
            </Button>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default JDForm;
