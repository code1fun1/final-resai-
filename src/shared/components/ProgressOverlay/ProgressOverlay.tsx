import { Backdrop, Box, LinearProgress, Typography } from '@mui/material';
import React from 'react';

interface ProgressOverlayProps {
  open: boolean;
  message: string;
  progress: number; // 0–100
}

const ProgressOverlay: React.FC<ProgressOverlayProps> = ({ open, message, progress }) => {
  return (
    <Backdrop
      open={open}
      sx={{
        zIndex: 1300,
        color: '#fff',
        backgroundColor: 'rgba(0,0,0,0.55)'
      }}
    >
      <Box
        bgcolor="#fff"
        color="#000"
        p={3}
        borderRadius={2}
        width={{ xs: '85%', sm: 420 }}
        textAlign="center"
      >
        <Typography variant="body1" mb={2} fontWeight={500}>
          {message}
        </Typography>

        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 8,
            borderRadius: 5,

            // Track (background)
            backgroundColor: '#a0a0a0',

            // Filled bar
            '& .MuiLinearProgress-bar': {
              backgroundColor: '#424246'
            }
          }}
        />

        <Typography variant="body1" mt={1} display="block" fontWeight={500}>
          {progress}%
        </Typography>
      </Box>
    </Backdrop>
  );
};

export default ProgressOverlay;
