import { useStyles } from './SignUpStyles';
import { useTranslation } from 'next-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { Box, Button, TextField, Typography, FormControl } from '@mui/material';
import { signUpFormSchema } from '~/shared/validations/validationSchema';
import { useFormik } from 'formik';
import { isEmailOrPhone } from '~/shared/utils/utils';
import Link from 'next/link';
import { ROUTES } from '~/shared/constants/routes';
import { useStylesGoldTheme } from '~/modules/globalStyles';
interface SignUpFromProps {
  label: string;
  placeholder?: string;
  buttonName: string;
  showSubtitle?: boolean;
  onClick: (value: string) => void;
  defaultValue?: string;
}

const SignUpFrom: React.FC<SignUpFromProps> = ({
  label,
  placeholder,
  buttonName,
  showSubtitle = false,
  onClick,
  defaultValue
}) => {
  const initialValues = { emailAndPhone: defaultValue || '' };
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  const formik = useFormik({
    enableReinitialize: true,
    initialValues,
    validationSchema: signUpFormSchema(i18n),
    onSubmit: () => {}
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    formik.handleChange(e);
  };

  return (
    <Box display="flex" flexDirection="column" gap={3} height={{ xs: '100%', md: 'auto' }}>
      <FormControl fullWidth>
        <Box display="flex" flexDirection="column" gap="5px">
          <Typography className={styles.labelText}>{label}</Typography>
          <TextField
            variant="outlined"
            placeholder={placeholder}
            className={`${styles.textfieldStyle} ${globalStyles.focusedTextField}`}
            onChange={handleChange}
            value={formik.values.emailAndPhone}
            name="emailAndPhone"
            helperText={`${
              formik?.errors?.emailAndPhone !== undefined ? formik?.errors?.emailAndPhone : ''
            }`}
            error={Boolean(formik?.errors?.emailAndPhone)}
            onKeyDown={(event) => {
              if (event.key === 'Enter') {
                onClick(formik.values.emailAndPhone);
                event.preventDefault();
              }
            }}
            FormHelperTextProps={{
              style: {
                color: 'red'
              }
            }}
          />
        </Box>
      </FormControl>
      <Button
        variant="contained"
        // color="primary"
        className={globalStyles.btnBlackColor}
        onClick={() => onClick(formik.values.emailAndPhone)}
        disabled={!isEmailOrPhone(formik.values.emailAndPhone)}
      >
        {buttonName}
      </Button>
      {showSubtitle && (
        <Typography component="p" className={styles.linkWrap} textAlign="center">
          {i18n('alreadyAccount')}{' '}
          <strong>
            <Link href={ROUTES.LOGIN}>
              <Button variant="text" className={styles.linkText}>
                {i18n('logIn')}
              </Button>
            </Link>
          </strong>
        </Typography>
      )}
    </Box>
  );
};

export default SignUpFrom;
