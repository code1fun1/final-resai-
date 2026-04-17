import { Box, Typography } from '@mui/material';
import { useStyles } from './HeadingStyles';

export enum HEADING_TYPE {
  AUTH = 'auth',
  MODAL = 'modal'
}

export enum TEXT_ALIGNMENT {
  LEFT = 'left',
  CENTER = 'center',
  RIGHT = 'right',
  JUSTIFY = 'justify'
}

interface HeadingProps {
  title?: string;
  subTitle?: string;
  textTitleAlign?: TEXT_ALIGNMENT;
  headingType?: string;
}
const Heading = (props: HeadingProps) => {
  const { title, subTitle, textTitleAlign, headingType } = props;
  const styles = useStyles();

  return (
    <Box
      display="flex"
      flexDirection="column"
      className={headingType === HEADING_TYPE.AUTH ? styles.primaryBox : ''}
    >
      <Typography
        textAlign={textTitleAlign}
        className={headingType === HEADING_TYPE.AUTH ? styles.authTitle : styles.title}
      >
        {title && title}
      </Typography>
      {subTitle && (
        <Typography
          className={headingType === HEADING_TYPE.AUTH ? styles.authSubTitle : styles.subTitle}
        >
          {subTitle}
        </Typography>
      )}
    </Box>
  );
};
export default Heading;
