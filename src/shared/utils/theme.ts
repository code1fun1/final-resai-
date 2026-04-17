import { createTheme } from '@mui/material/styles';

// Create a theme instance.
const theme = createTheme({
  palette: {
    primary: {
      main: '#556cd6'
    },
    secondary: {
      main: '#19857b'
    },
    background: {
      default: '#fff'
    },
    success: {
      main: '#bfffbf'
    },
    warning: {
      main: '#FDE4C7'
    },
    info: {
      main: '#C2EDFE'
    },
    error: {
      main: '#FDE4E1'
    }
  }
});

export default theme;
