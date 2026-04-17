import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  heading: {
    '&.MuiTypography-root': {
      ...theme.typography.title1,
      color: theme.palette.tertiary.dark,
      [theme.breakpoints.between('md', 'lg')]: {
        '&.MuiTypography-root': {
          fontSize: theme.typography.title2.fontSize,
          fontWeight: theme.typography.title1.fontWeight,
          lineHeight: theme.typography.title2.lineHeight
        }
      }
    }
  },
  subtitle: {
    color: theme.palette.neutral[60],
    [theme.breakpoints.down('lg')]: {
      '&.MuiTypography-root': {
        fontSize: theme.typography.title3.fontSize,
        fontWeight: theme.typography.body1.fontWeight,
        lineHeight: theme.typography.title3.lineHeight
      }
    }
  },
  customProgressBar: {
    height: 'auto'
  },
  circularBarWrapper: {
    '&>div': {
      [theme.breakpoints.between('md', 'lg')]: {
        width: '56px',
        height: '56px'
      }
    }
  },
  downloadIcon: {
    '& path:nth-child(1)': {
      animation: '$arrowMove 1.2s ease-in-out infinite'
    },
    '& path:nth-child(2)': {
      animation: '$arrowMove 1.2s ease-in-out infinite',
      animationDelay: '0.05s'
    }
  },

  recommendedIcon: {
    animation: '$diagonalMove 1.2s ease-in-out infinite'
  },

  '@keyframes arrowMove': {
    '0%': {
      transform: 'translateY(-2px)',
      opacity: 0.4
    },
    '50%': {
      transform: 'translateY(4px)',
      opacity: 1
    },
    '100%': {
      transform: 'translateY(8px)',
      opacity: 0.4
    }
  },
  recommendedIcon: {
    animation: '$diagonalSlide 1.4s ease-in-out infinite'
  },

  '@keyframes diagonalSlide': {
    '0%': {
      transform: 'translate(0, 0) scale(1)',
      opacity: 0.6
    },
    '50%': {
      transform: 'translate(4px, -4px) scale(1.05)',
      opacity: 1
    },
    '100%': {
      transform: 'translate(0, 0) scale(1)',
      opacity: 0.6
    }
  },
  animatedButton: {
    position: 'relative',
    animation: '$clearPulse 1s ease-in-out infinite'
  },

  '@keyframes clearPulse': {
    '0%': {
      boxShadow: '0 0 0 0 rgba(77, 54, 208, 0.45)'
    },
    '50%': {
      boxShadow: '0 0 0 4px rgba(77, 54, 208, 0.18)'
    },
    '100%': {
      boxShadow: '0 0 0 0 rgba(77, 54, 208, 0.45)'
    }
  }
}));
