import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import { useStyles } from './CourseTileStyles';

interface CourseTileProps {
  title: string;
  subTitle: string;
  image: string;
}
const CourseTile = (props: CourseTileProps) => {
  const styles = useStyles();
  const { title, subTitle, image } = props;
  return (
    <Box display="flex" flexDirection={'column'} gap={2} className={styles.cardBoxCursor}>
      <Image src={image} alt={title} width={100} height={100} className={styles.cardImage} />
      <Box display="flex" flexDirection={'column'} gap={1}>
        <Typography className={styles.title}>{title}</Typography>
        <Typography className={styles.subTitle}>{subTitle}</Typography>
      </Box>
    </Box>
  );
};
export default CourseTile;
