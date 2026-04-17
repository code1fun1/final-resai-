import { createTheme as createMuiTheme } from '@mui/material';
import { createPalette } from './create-palette';
import { createTypography } from './createTypography';

export function createTheme() {
  const palette = createPalette();
  const typography = createTypography();

  return createMuiTheme({
    breakpoints: {
      values: {
        xs: 0,
        sm: 600,
        md: 900,
        lg: 1200,
        xl: 1440,
        xxl: 1500
      }
    },
    palette,
    shape: {
      borderRadius: 8
    },
    typography,
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            ...typography.buttonLg,
            textTransform: 'none',
            padding: '15px 48px'
          }
        }
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            backgroundColor: palette.neutral[700],
            boxShadow: 'rgba(0, 0, 0, 0.1) 0px 4px 12px'
          }
        }
      }
    }
  });
}
