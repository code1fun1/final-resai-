import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  Typography
} from '@mui/material';
// import Image from 'next/image';
import { useStyles } from './JobCardStyles';

interface JobCardProps {
  companyLogo: string;
  companyName: string;
  role: string;
  location: string;
  buttonName: string;
  onButtonClick: () => void;
  onCardClick: () => void;
  isJobSelected: boolean;
}

const JobCard = (props: JobCardProps) => {
  const styles = useStyles();
  const {
    companyLogo,
    companyName,
    role,
    location,
    buttonName,
    onButtonClick,
    onCardClick,
    isJobSelected
  } = props;

  return (
    <Card
      variant="outlined"
      className={`${isJobSelected === true ? `${styles.jobCardSelected}` : ''} ${styles.jobCardWrapper}`}
    >
      <CardActionArea onClick={onCardClick}>
        <Box
          display="flex"
          alignItems="flex-start"
          gap={{ xs: 1, sm: 2 }}
          padding={2}
          className={styles.jobCard}
          position="relative"
        >
          <Box width="32px" height="32px">
            {/* <Image src={companyLogo} alt={companyName} width={32} height={32} /> */}

            <img src={companyLogo} alt={companyName} width="32" height="32" />
          </Box>
          <CardContent>
            <Box display="flex" flexDirection="column" alignItems="start" gap={1}>
              <Typography className={styles.jobCompanyName}>{companyName}</Typography>
              <Box
                display="flex"
                alignItems={{ xs: 'left', sm: 'center' }}
                justifyContent="space-between"
                flexDirection={{ xs: 'column', sm: 'row' }}
                gap={{ xs: 0, sm: 1 }}
              >
                <Typography className={`${styles.subTitles} ${styles.wrapSubTitles}`}>
                  {role}
                </Typography>
                <Typography className={styles.subTitles}>-</Typography>
                <Typography className={`${styles.subTitles} ${styles.wrapSubTitles}`}>
                  {location}
                </Typography>
              </Box>
            </Box>
          </CardContent>
        </Box>
      </CardActionArea>
      <CardActions>
        <Button
          endIcon={<KeyboardArrowRightRoundedIcon />}
          onClick={onButtonClick}
          className={styles.jobBtnStyle}
        >
          {buttonName}
        </Button>
      </CardActions>
    </Card>
  );
};
export default JobCard;
