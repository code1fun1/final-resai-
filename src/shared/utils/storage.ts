import { getCookie } from 'cookies-next';
// import { STORAGE_HEADERS } from '../constants/constants';

export const getCommonHeaderValues: () => {
  locale: string;
} = () => {
  const locale: string = getCookie('NEXT_LOCALE') || 'en';
  return {
    locale: locale
  };
};
export const getHeaderValues: () => Promise<unknown> = async () => {
  const commonHeader: {
    locale: string;
  } = getCommonHeaderValues();
  return new Promise((resolve) => {
    try {
      resolve({ ...commonHeader });
      return { commonHeader };
    } catch (error) {
      resolve({ ...commonHeader });
      return { commonHeader };
    }
    // eslint-disable-next-line no-empty-function
  }).catch(() => {});
};

export enum STORAGE_TYPES {
  SESSION = 'session',
  LOCAL = 'local'
}

const getStorage: (type?: STORAGE_TYPES) => Storage = (type?: STORAGE_TYPES) => {
  return type === STORAGE_TYPES.LOCAL ? localStorage : sessionStorage;
};

export const setStorageItem: (key: string, data: string, type: STORAGE_TYPES) => void = (
  key: string,
  data: string,
  type: STORAGE_TYPES
) => {
  const storage: Storage = getStorage(type);
  storage.setItem(key, data);
};

export const getStorageItem = ({
  key,
  storageType,
  useCombineStorage
}: {
  key: string;
  storageType?: STORAGE_TYPES;
  useCombineStorage?: boolean;
}) => {
  if (useCombineStorage) {
    return sessionStorage.getItem(key) || localStorage.getItem(key);
  }
  const storage: Storage = getStorage(storageType);
  return storage.getItem(key);
};

export const removeStorageItem: (key: string, type: STORAGE_TYPES) => void = (
  key: string,
  type: STORAGE_TYPES
) => {
  const storage: Storage = getStorage(type);
  storage.removeItem(key);
};

export const clearStorage: (type: STORAGE_TYPES) => void = (type: STORAGE_TYPES) => {
  const storage: Storage = getStorage(type);
  storage.clear();
};

export const getStorageType: () => STORAGE_TYPES = () => {
  // const stayLoggedIn = getStorageItem({
  //   key: STORAGE_HEADERS.stayLoggedIn,
  //   storageType: STORAGE_TYPES.LOCAL
  // });
  const stayLoggedIn = true;

  const storageType: STORAGE_TYPES = Boolean(stayLoggedIn)
    ? STORAGE_TYPES.LOCAL
    : STORAGE_TYPES.SESSION;

  return storageType;
};
