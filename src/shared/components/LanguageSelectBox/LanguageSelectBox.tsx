// import TranslateIcon from '@mui/icons-material/Translate';
import { Box, FormControl, InputAdornment, InputLabel, MenuItem } from '@mui/material';
import Select from '@mui/material/Select';
import { setCookie } from 'cookies-next';
import { useRouter } from 'next/router';
import { useEffect } from 'react';
// import { ICON_COLORS } from '~/shared/constants/constants';
import { useStyles } from './LanguageSelectBoxStyle';

interface Language {
  key: string;
  value: string;
  initial: string;
}

// interface LanguageSelectBoxProp {
//   renderValueInitials: boolean;
//   iconColor?: ICON_COLORS;
// }
interface LanguageSelectBoxProp {
  iconColor?: string; // Accept string for custom color
  renderValueInitials: boolean;
  style?: React.CSSProperties; // Allow custom styles
}
const LanguageSelectBox = (props: LanguageSelectBoxProp) => {
  const styles = useStyles();
  const router = useRouter();
  const { locale = '', asPath } = router;
  const languages: Language[] = [
    { key: 'en', value: 'English', initial: 'En' },
    // { key: 'es', value: 'Español', initial: 'Es' },
    { key: 'hi', value: 'हिंदी', initial: 'हिं' }
  ];

  useEffect(() => {
    setCookie('NEXT_LOCALE', locale);
  }, [locale]);

  const handleChange = (nextLocale: string) => {
    router.push(`${nextLocale}${asPath}`, `${nextLocale}${asPath}`, {
      locale: false
    });
  };

  const { iconColor, renderValueInitials } = props; // eslint-disable-line @typescript-eslint/no-unused-vars

  const renderValue = (selected: string) => {
    const { initial = '', value = '' } =
      languages.find((lang: Language) => lang['key'] === selected) || {};
    return renderValueInitials ? initial : value;
  };

  return (
    <Box width="130px">
      <FormControl fullWidth className={styles.selectBoxWrap}>
        <InputLabel id="demo-simple-select-label">Language</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={locale}
          renderValue={renderValue}
          label="language"
          onChange={(e) => handleChange(e.target.value)}
          defaultValue={locale}
          startAdornment={
            <InputAdornment position="start">
              {/* <TranslateIcon style={{ color: iconColor }} /> */}
            </InputAdornment>
          }
        >
          {languages?.map((language: Language) => {
            return (
              <MenuItem key={language.key} value={language.key} className={styles.selectList}>
                {language.value}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
    </Box>
  );
};

export default LanguageSelectBox;
