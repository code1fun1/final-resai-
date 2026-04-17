import { Box } from '@mui/material';

const LoadingIndicator = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: '50px'
      }}
    >
      <h1>Loading...</h1>
    </Box>
  );
};

export default LoadingIndicator;
