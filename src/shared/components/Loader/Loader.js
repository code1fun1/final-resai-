import { Box, Typography } from '@mui/material';
import Backdrop from '@mui/material/Backdrop';
import CircularProgress from '@mui/material/CircularProgress';
import PropTypes from 'prop-types';
import useStyles from './LoaderStyle';

/**
 * Name: Loader
 * Desc: show loader
 * @param {bool} pageLoader
 */

const Loader = ({ pageLoader = false, message = '' }) => {
  const classes = useStyles();

  return (
    <Backdrop
      className={`${classes.backdrop} ${classes.root}`}
      open={pageLoader}
      sx={{ backgroundColor: 'rgba(0,0,0,0.2)' }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center'
        }}
      >
        <CircularProgress color="inherit" />
        {!!message && (
          <Typography variant="h6" component="h6">
            {message}
          </Typography>
        )}
      </Box>
    </Backdrop>
  );
};

Loader.propTypes = {
  pageLoader: PropTypes.bool
};

export default Loader;
