import { Box, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import CircularProgressbar from '~/shared/components/CircularProgressBar';
import { TEXT_FONT_SIZE } from '~/shared/components/CircularProgressBar/CircularProgressBar';
import { useStyles } from './ScoreCardStyles';
import { LOCALE_PAGE } from '~/shared/constants/constants';
// import EditIcon from '@mui/icons-material/Edit';

interface ScoreCardProps {
  scorePercent: number;
}

const ScoreCard = (props: ScoreCardProps) => {
  const styles = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.MY_RESUMES);
  const { scorePercent } = props;
  return (
    <Box className={styles.circularBarWrapper}>
      <Typography sx={{ marginLeft: '25px', textAlign: 'center' }}>
        <CircularProgressbar
          strokeWidth={8}
          percentage={scorePercent}
          width="48px"
          height="48px"
          textFontSize={TEXT_FONT_SIZE.LARGE}
        />
      </Typography>
      <Typography className={styles.scoreTitle}>{i18n('similarityScore')}</Typography>
    </Box>
  );
};
export default ScoreCard;
