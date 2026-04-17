import React, { createContext, useContext, useState, ReactNode } from 'react';

type LoaderContextType = {
  loading: boolean;
  message: string;
  setLoading: (show: boolean, msg?: string) => void;
};

const LoaderContext = createContext<LoaderContextType | undefined>(undefined);

export const LoaderProvider = ({ children }: { children: ReactNode }) => {
  const [loading, setLoadingState] = useState(false);
  const [message, setMessage] = useState('');

  const setLoading = (show: boolean, msg = '') => {
    setLoadingState(show);
    setMessage(msg);
  };

  return (
    <LoaderContext.Provider value={{ loading, message, setLoading }}>
      {children}
    </LoaderContext.Provider>
  );
};

export const useLoader = () => {
  const ctx = useContext(LoaderContext);
  if (!ctx) throw new Error('useLoader must be used inside LoaderProvider');
  return ctx;
};
