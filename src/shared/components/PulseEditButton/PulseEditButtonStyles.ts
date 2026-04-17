import { makeStyles } from '@mui/styles';

export const usePulseEditButtonStyles = makeStyles(() => ({
  wrapper: {
    position: 'fixed',
    bottom: 80,
    right: 20,
    zIndex: 999
  },

  fab: {
    backgroundColor: '#3F6AFF !important',
    color: '#fff',
    padding: '0 18px',
    height: 46,
    minWidth: 140,
    borderRadius: 30,
    boxShadow: '0 0 0 0 rgba(66,66,70, 0.6)',
    animation: '$pulse 2s infinite',
    '&:hover': {
      backgroundColor: '#3F6AFF'
    }
  },

  content: {
    display: 'flex',
    alignItems: 'center',
    gap: 8
  },

  text: {
    fontSize: 16,
    fontWeight: 600,
    textTransform: 'none',
    whiteSpace: 'nowrap'
  },

  '@keyframes pulse': {
    '0%': {
      transform: 'scale(1)'
    },
    '50%': {
      transform: 'scale(1.1)'
    },
    '100%': {
      transform: 'scale(1)'
    }
  }
}));
