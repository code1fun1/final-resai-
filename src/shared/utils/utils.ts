import getConfig from 'next/config';
// import { API_END_POINT } from '~/shared/constants/apiConstants';
import {
  STORAGE_TYPES,
  getStorageItem,
  getStorageType,
  setStorageItem
} from '~/shared/utils/storage';
import {
  PasswordData,
  STORAGE_HEADERS,
  SetPasswordValidity,
  ToastMessage
} from '../constants/constants';
import { Dispatch, SetStateAction } from 'react';

const { publicRuntimeConfig: configs = {} } = getConfig() || {};

export const getBaseUrl: () => string = () => {
  const { apiUrl } = configs;
  if (apiUrl) {
    return apiUrl;
  }
  const storedUrl = getStoredApiUrl();
  if (storedUrl) {
    return storedUrl;
  }
  return 'https://dev.resai.co/api/v1/';
};

export const isEmptyObject: (obj: object) => boolean = (obj: object) => {
  return obj && !Object.keys(obj).length;
};

export const capitalizeText: (str: string) => string = (str: string) => {
  const arr: string[] = str.split(' ');
  for (let i = 0; i < arr.length; i++) {
    arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
  }
  const str2: string = arr.join(' ');
  return str2;
};

export const hasCountryCode: (phoneNumber: string) => boolean = (phoneNumber: string) => {
  // Regular expression for a common format of international phone numbers
  var regex: RegExp = /^\+(\d{1,4})?[ -]?\d{6,}$/;

  // Test the phone number against the regular expression
  return regex.test(phoneNumber);
};

export const removeCountryCode: (value: string) => string = (value: string) => {
  const hasCountry: boolean = hasCountryCode(value);
  if (hasCountry) {
    const regex: RegExp = /^(\+?\d{1,2})(.*)/;
    const [, restOfNumber] = value?.match(regex) || [];
    return restOfNumber;
  } else {
    return value;
  }
};

export const smoothScrollTop: () => void = () => {
  if (isBrowser()) {
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
};

const isBrowser: () => boolean = () => {
  return typeof window !== 'undefined';
};

export const isUserExistsOnSession: () => boolean = () => {
  const storageType: STORAGE_TYPES = getStorageType();
  const userId: string | null = getStorageItem({ key: STORAGE_HEADERS.userID, storageType });
  return !!userId;
};

export const filterArrayBySubstring = (
  arr: { id: string; name: string }[],
  searchString: string
) => {
  return arr.filter((item) => item?.name?.toLowerCase().includes(searchString?.toLowerCase()));
};

export const generateUniqueNumber: () => number = () => {
  return Math.floor(Math.random() * Date.now());
};

export const removeSpecialChars: (str: string, addTimeStamp?: boolean) => string = (
  str,
  addTimeStamp
) => {
  let newString: string = str;
  if (isContainsSpecialCharsOrSpace(str)) {
    const regex: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/g;
    const extension: string = str.slice(str.lastIndexOf('.'));
    let filenameWithoutSpecialChars: string = str.slice(0, str.lastIndexOf('.')).replace(regex, '');
    filenameWithoutSpecialChars = addTimeStamp
      ? `${filenameWithoutSpecialChars}-${Date.now()}`
      : filenameWithoutSpecialChars;
    newString = filenameWithoutSpecialChars + extension;
  }
  return newString;
};

export const isContainsSpecialCharsOrSpace: (str: string) => boolean = (str: string) => {
  const regex: RegExp = /[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?\s]/;
  const removeFileExtension: string = str?.slice(0, str.lastIndexOf('.'));
  return regex.test(removeFileExtension);
};

export const areAllValuesFilled: (obj: object) => boolean = (obj) => {
  if (obj === null) {
    return false;
  }
  return Object.values(obj).every((value) => value !== null && value !== undefined && value !== '');
};

export const generateRandomColor: () => string = () => {
  return '#' + Math.floor(Math.random() * 16777215).toString(16);
};

const colors: { [key: string]: string } = {};
export const getColorFromLetter: (letter: string) => string = (letter) => {
  if (!colors[letter.toUpperCase()]) {
    colors[letter.toUpperCase()] = generateRandomColor();
  }
  return colors[letter.toUpperCase()];
};

export const handleToast: (
  data: Omit<ToastMessage, 'open'>,
  setToastState: Dispatch<SetStateAction<ToastMessage>>,
  toastState: ToastMessage
) => void = (data, setToastState, toastState) => {
  const { severity, message } = data;
  setToastState({
    open: true,
    severity: severity,
    message: message
  });
  hideToast(setToastState, toastState);
};

export const hideToast: (
  setToastState: Dispatch<SetStateAction<ToastMessage>>,
  toastState: ToastMessage
) => void = (setToastState, toastState) => {
  setTimeout(() => {
    setToastState({
      ...toastState,
      open: false
    });
  }, 6000);
};

export const isEmailId: (str: string) => boolean = (str: string) => {
  const regex: RegExp = /^[\w-]+(\.[\w-]+)*@[a-zA-Z0-9-]+(\.[a-zA-Z0-9-]+)*(\.[a-zA-Z]{2,})$/;
  return regex.test(str);
};

export const maskedStringFromLast: (str: string, numCharToBeMasked: number) => string = (
  str: string,
  numCharToBeMasked: number
) => {
  if (typeof str !== 'string' || numCharToBeMasked <= 0) {
    return str;
  }
  const stringLength: number = str.length;
  const maskedPart: string = '*'.repeat(Math.min(numCharToBeMasked, stringLength));
  return str.slice(0, -numCharToBeMasked) + maskedPart;
};

export const isEmailOrPhone: (str: string) => boolean = (str: string) => {
  const regex: RegExp =
    /^(?:[0]?[6789]\d{9}|(?:\+[0-9]{1,3})?[0-9]{10}|[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,})$/;
  return regex.test(str);
};

const MIN_PASSWORD_LENGTH: number = 8;
const MAX_PASSWORD_LENGTH: number = 24;
export const checkPasswordValidity = (
  formData: PasswordData,
  setPasswordValidity: SetPasswordValidity
): void => {
  const { password, confirmPassword } = formData;
  setPasswordValidity((prevState) => ({
    ...prevState,
    validLength: password.length >= MIN_PASSWORD_LENGTH && password.length <= MAX_PASSWORD_LENGTH,
    hasNumber: /\d/.test(password),
    specialChar: /[!@#$%^&*()_+\-=\]{};':"\\|,.<>?~]/.test(password),
    matchingPassword:
      password.length > 0 && confirmPassword.length > 0 && confirmPassword === password
  }));
};

export const isItemExistsOnSession: (key: string) => boolean = (key: string) => {
  return sessionStorage.getItem(key) !== null;
};

export const isDataAvailable = (arr: { id: string; name: string }[], searchString: string) => {
  const lowerCaseSearch = searchString.toLowerCase();
  return arr.some((obj) => {
    if (obj?.name.toLowerCase() === lowerCaseSearch) {
      return true;
    } else {
      return false;
    }
  });
};

export const removeDuplicateObjectsInArray = (
  arr1: { id: string; name: string }[],
  arr2: { job_id: string; name: string }[]
) => {
  if (arr2.length === 0) {
    return arr1;
  } else {
    return arr1.filter(
      (obj1) => !arr2.some((obj2) => obj1.id === obj2.job_id && obj1.name === obj2.name)
    );
  }
};
export const OTP_FIELD_LENGTH: number = 6;
export const SECONDS_IN_A_MINUTE: number = 60;
export const RESEND_OTP_TIMER: number = 900; //change 50 seconds to 15 minuts i.e.900 seconds
export const MASKED_STRING_NUMBER: number = 4;

export const calculateTimeRemaining = (
  timeLeft: number,
  SECONDS_IN_A_MINUTE: number
): { minutes: number; seconds: number } => {
  const minutes: number = Math.floor(timeLeft / SECONDS_IN_A_MINUTE);
  const seconds: number = timeLeft % SECONDS_IN_A_MINUTE;
  return { minutes, seconds };
};

export const storeApiUrl = async () => {
  try {
    const response = await fetch('/api/get-ApiUrls');
    const data = await response.json();

    if (data.apiUrl) {
      setStorageItem('apiUrl', data.apiUrl, STORAGE_TYPES.LOCAL);
      return true;
    }
    return false;
  } catch (error) {
    console.error('Error storing API URL:', error);
    return false;
  }
};

export const getStoredApiUrl = () => {
  return localStorage.getItem('apiUrl');
};
