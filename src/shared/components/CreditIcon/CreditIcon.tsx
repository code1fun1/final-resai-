import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useTranslation } from 'react-i18next';
import { useStyles } from './CreditIconStyles';
interface CreditButtonProps {
  creditPoints: string;
}

const CreditIcon = (props: CreditButtonProps) => {
  const { creditPoints } = props;
  const styles = useStyles();

  const { t: i18n } = useTranslation();

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1}
      py={{ xs: 1, sm: '10px' }}
      px={{ xs: '10px', sm: 2 }}
      className={styles.creditsWrapper}
    >
      {/* <Icon name="diamondIcon" /> */}
      <Image
        src="/image/Resai-black-logo-header.png"
        alt="Brand Logo"
        height={19}
        width={22}
        priority={true}
      />
      <Box display={{ xs: 'none', sm: 'block' }}>
        <Typography>{i18n('header.credits', { ns: 'common' })} </Typography>
      </Box>
      <Typography>{creditPoints}</Typography>
    </Box>
  );
};
export default CreditIcon;
