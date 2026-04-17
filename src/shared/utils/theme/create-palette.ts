import {
  neutral,
  primary,
  secondary,
  success,
  warning,
  error,
  warm,
  cool,
  tertiary
} from './color';

export function createPalette() {
  return {
    background: {
      default: '#F5F7F9',
      paper: '#F0F2F5'
    },
    divider: '#F2F4F7',
    mode: 'light',
    neutral,
    primary: primary,
    secondary: secondary,
    success: success,
    warning: warning,
    danger: error,
    warm,
    cool,
    tertiary
  };
}
