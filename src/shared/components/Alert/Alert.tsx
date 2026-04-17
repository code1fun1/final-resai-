import { Box, IconButton, Typography } from '@mui/material';
import Icon from '../Icon';
import { useStyles } from './AlertStyles';

interface AlertBarProps {
  title: string;
  color: 'success' | 'warning';
  onClose: () => void;
}

const Alert = (props: AlertBarProps) => {
  const styles = useStyles();
  const { title, color, onClose } = props;

  return (
    <Box
      width="100%"
      className={` ${
        color === 'success' ? `${styles.toastSuccessContainer}` : `${styles.toastWarningContainer}`
      } ${styles.toastContainer}`}
      display="flex"
      alignItems={{ xs: 'flex-start', sm: 'center' }}
      justifyContent="space-between"
      gap={1}
    >
      <Box display="flex" alignItems={{ xs: 'flex-start', sm: 'center' }} gap={1}>
        <Box width="24px" height="24px">
          <Icon name="roundTickIcon" />
        </Box>
        <Typography>{title}</Typography>
      </Box>
      <Box component={IconButton} p={0} onClick={onClose}>
        <Icon name="crossIcon" className={styles.toastCrossIcon} />
      </Box>
    </Box>
  );
};
export default Alert;
