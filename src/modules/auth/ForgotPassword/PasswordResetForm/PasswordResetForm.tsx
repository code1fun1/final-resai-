import React from 'react';
import { useStyles } from './PasswordResetFormStyles';
import { Box, Button, TextField, Typography, FormControl } from '@mui/material';
import { FormikProps } from 'formik';
import { isEmailOrPhone } from '~/shared/utils/utils';
import { useStylesGoldTheme } from '~/modules/globalStyles';
interface PasswordResetFormProps {
  label: string;
  placeholder?: string;
  buttonName: string;
  onClick: (value: string) => void;
  formik: FormikProps<{ emailAndPhone: string }>;
}

const PasswordResetForm: React.FC<PasswordResetFormProps> = ({
  label,
  placeholder,
  buttonName,
  onClick,
  formik
}) => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
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
            className={styles.textfieldStyle}
            onChange={handleChange}
            value={formik.values.emailAndPhone}
            name="emailAndPhone"
            helperText={`${
              formik?.errors?.emailAndPhone !== undefined ? formik?.errors?.emailAndPhone : ''
            }`}
            error={formik.touched.emailAndPhone && Boolean(formik.errors.emailAndPhone)}
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
    </Box>
  );
};

export default PasswordResetForm;
