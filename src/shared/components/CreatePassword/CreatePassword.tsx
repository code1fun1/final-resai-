import GppGoodIcon from '@mui/icons-material/GppGood';
import ShieldOutlinedIcon from '@mui/icons-material/ShieldOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import {
  Box,
  Button,
  FormControl,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import React, { ChangeEvent, useState } from 'react';
import { LOCALE_PAGE, PasswordValidityType } from '~/shared/constants/constants';
import { useStyles } from './CreatePasswordStyles';
import { useStylesGoldTheme } from '~/modules/globalStyles';
interface CreatePasswordProps {
  buttonName: string;
  onClick: () => void;
  passwordValidity: PasswordValidityType;
  onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  disableSignUpBtn: boolean;
  passwordValidationRules: { type: string; label: string }[];
}

const CreatePassword: React.FC<CreatePasswordProps> = ({
  buttonName,
  onClick,
  onChange,
  passwordValidity,
  disableSignUpBtn = true,
  passwordValidationRules
}) => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [confirmShowPassword, setConfirmShowPassword] = useState<boolean>(false);
  return (
    <>
      <FormControl fullWidth>
        <Box display="flex" flexDirection="column" gap="5px">
          <Typography className={styles.labelText}>
            {i18n('createPassword.password', { ns: 'common' })}
          </Typography>
          <TextField
            variant="outlined"
            type={showPassword ? 'text' : 'password'}
            placeholder={i18n('createPassword.password', { ns: 'common' })}
            name="password"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setShowPassword((show) => !show);
                    }}
                    onMouseDown={(event: React.SyntheticEvent<Element, Event>) => {
                      event.preventDefault();
                    }}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOffOutlinedIcon /> : <VisibilityOutlinedIcon />}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={onChange}
            className={`${styles.textfieldStyle} ${globalStyles.focusedTextField}`}
          />
        </Box>
      </FormControl>
      <FormControl fullWidth>
        <Box display="flex" flexDirection="column" gap="5px">
          <Typography className={styles.labelText}>
            {i18n('createPassword.confirmPassword', { ns: 'common' })}
          </Typography>
          <TextField
            variant="outlined"
            type={confirmShowPassword ? 'text' : 'password'}
            name="confirmPassword"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() => {
                      setConfirmShowPassword((show) => !show);
                    }}
                    onMouseDown={(event: React.SyntheticEvent<Element, Event>) => {
                      event.preventDefault();
                    }}
                    edge="end"
                  >
                    {confirmShowPassword ? (
                      <VisibilityOffOutlinedIcon />
                    ) : (
                      <VisibilityOutlinedIcon />
                    )}
                  </IconButton>
                </InputAdornment>
              )
            }}
            onChange={onChange}
            placeholder={i18n('createPassword.repeatPassword', { ns: 'common' })}
            className={`${styles.textfieldStyle} ${globalStyles.focusedTextField}`}
          />
        </Box>
      </FormControl>
      <List className={styles.listGrup}>
        {passwordValidationRules.map((item, index) => {
          const { type, label } = item;
          const isValid = passwordValidity[type as keyof typeof passwordValidity];
          return (
            <ListItem key={index}>
              <ListItemIcon>
                {isValid ? <GppGoodIcon className={styles.selectIcon} /> : <ShieldOutlinedIcon />}
              </ListItemIcon>
              <ListItemText primary={label} className={`${isValid && styles.selectList}`} />
            </ListItem>
          );
        })}
      </List>
      <Button
        variant="contained"
        // color="primary"
        className={globalStyles.btnBlackColor}
        disabled={disableSignUpBtn}
        onClick={onClick}
      >
        {buttonName}
      </Button>
    </>
  );
};
export default CreatePassword;
