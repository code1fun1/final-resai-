import { Box, IconButton, Typography } from '@mui/material';
import { useStyles } from './PaginationStyles';
import KeyboardArrowLeftRoundedIcon from '@mui/icons-material/KeyboardArrowLeftRounded';
import KeyboardArrowRightRoundedIcon from '@mui/icons-material/KeyboardArrowRightRounded';
interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPreviousButtonClick: () => void;
  onNextButtonClick: () => void;
}

const Pagination = (props: PaginationProps) => {
  const styles = useStyles();
  const { currentPage, totalPages, onPreviousButtonClick, onNextButtonClick } = props;
  const FIRST_PAGE = 1;
  return (
    <Box display="flex" alignItems="center" gap={1}>
      <IconButton
        className={`${styles.iconBtn} ${!(currentPage !== FIRST_PAGE) && styles.disabled} ${currentPage > FIRST_PAGE && styles.darkIconBtn}`}
        onClick={onPreviousButtonClick}
        disabled={!(currentPage !== FIRST_PAGE)}
      >
        <KeyboardArrowLeftRoundedIcon />
      </IconButton>
      <Typography className={styles.pageNumber}>
        {currentPage} / {totalPages}
      </Typography>
      <IconButton
        className={`${styles.iconBtn} ${!(currentPage !== totalPages) && styles.disabled} ${currentPage < totalPages && styles.darkIconBtn}`}
        onClick={onNextButtonClick}
        disabled={!(currentPage !== totalPages)}
      >
        <KeyboardArrowRightRoundedIcon />
      </IconButton>
    </Box>
  );
};

export default Pagination;
