import { TextField } from '@mui/material';
import React, { useEffect, useRef } from 'react';
import { useStyles } from './OTPInputStyles';
import { useStylesGoldTheme } from '~/modules/globalStyles';
interface OTPInputProps {
  otp: string[];
  otpFieldLength: number;
  onSetOtp: (newOTP: string[]) => void;
}

const OTPInput: React.FC<OTPInputProps> = ({ otp, otpFieldLength, onSetOtp }) => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const inputRefs = useRef<(HTMLInputElement | null)[]>(new Array(otpFieldLength).fill(null));

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  const handleKeyDown = (index: number, event: React.KeyboardEvent<HTMLDivElement>) => {
    if (event.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
      const newOTP: string[] = [...otp];
      newOTP[index - 1] = '';
      onSetOtp(newOTP);
    }
  };

  const handleInput = (index: number, value: string) => {
    if (/\D/.test(value)) return;
    const newOTP: string[] = [...otp];
    newOTP[index] = value;
    onSetOtp(newOTP);
    inputRefs.current[index + 1]?.focus();
  };
  const handlePaste = (index: number, event: React.ClipboardEvent<HTMLDivElement>) => {
    if (!navigator?.clipboard) {
      console.error('Clipboard API is not supported');
      return;
    }
    event.preventDefault();
    navigator.clipboard
      .readText()
      .then((pastedData) => {
        const otpArray = pastedData.split('').filter((char: string) => !isNaN(Number(char)));
        const remainingLength = otpFieldLength - index;
        const slicedData = otpArray.slice(0, remainingLength);
        const newOTP: string[] = [...otp];
        newOTP.splice(index, slicedData.length, ...slicedData);
        onSetOtp(newOTP);
        inputRefs.current[index + slicedData.length - 1]?.focus();
      })
      .catch((error) => {
        console.error('Failed to read clipboard contents:', error);
      });
  };

  return (
    <>
      {otp.map((value, index) => (
        <TextField
          inputRef={(el) => (inputRefs.current[index] = el)}
          key={index}
          value={value}
          onChange={(e) => handleInput(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e as React.KeyboardEvent<HTMLInputElement>)}
          size="small"
          sx={{ width: '50px', marginRight: '20px' }}
          inputProps={{ maxLength: 1 }}
          onPaste={(e) => handlePaste(index, e as React.ClipboardEvent<HTMLInputElement>)}
          className={`${styles.verifyCodeText} ${styles.textfieldStyle} ${globalStyles.focusedTextField}`}
        />
      ))}
    </>
  );
};

export default OTPInput;
