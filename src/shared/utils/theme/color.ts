interface Color {
  [key: number | string]: string;
}

export const neutral: Color = {
  0: '#F6F6F6',
  5: '#F7F8FB',
  10: '#E2E2E3',
  20: '#C7C7C9',
  30: '#ACADAF',
  40: '#919295',
  50: '#787C80',
  60: '#5C5D61',
  70: '#424246',
  80: '#27282C',
  90: '#222327',
  100: '#1D1E22',
  110: '#18191C',
  120: '#131417',
  130: '#0E0F11',
  140: '#0A0A0C',
  150: '#050506',
  160: '#000001',
  170: '#787878',
  180: '#363636',
  190: '#000322',
  200: '#B2B7BA',
  201: '#FFC802',
  300: '#FAFAFA',
  400: '#131802',
  500: '#F7F6F4',
  600: '#10191f40',
  700: '#FFFFFF',
  800: '#000'
};

export const primary: Color = {
  main: '#3F6AFF',
  light: '#F7F8FB',
  dark: '#9EACFF'
};

export const secondary: Color = {
  main: '#00BEBF',
  light: '#E6F9F9',
  dark: '#259B9C'
};

export const success: Color = {
  main: '#56BA08'
};

export const warning: Color = {
  main: '#FFC83D',
  dark: '#FFDF6C'
};

export const error: Color = {
  main: '#FF3A28'
};
export const Info: Color = {
  main: '#7D6E38'
};

export const warm: Color = {
  main: 'rgba(255, 223, 107, 1)',
  light: 'rgba(255, 223, 108, 0.4)',
  dark: 'rgba(96, 75, 0, 1)'
};
export const cool: Color = {
  main: '#3F6AFF',
  medium: '#000E61',
  dark: '#000842',
  light: '#BDC5FF33',
  extraLight: '#E3E4F099'
};
export const tertiary: Color = {
  main: '#01D392',
  dark: '#000322'
};
