import { appConfig } from "../config/config";
import { getHeader } from "./header";
import axios from "axios";
import { Dispatch } from '@reduxjs/toolkit';

interface EmailData {
  email: string;
  is_tma?: boolean;
}

interface EmailResponse {
  data: any;
}

/**
 * Async action to send email verification request
 * @param data - Email data containing email and optional is_tma flag
 */
export const sendEmailAsync = (data: EmailData) => {
  return async (dispatch: Dispatch) => {
    try {
      const response = await axios.post(
        `${appConfig.env.apiBaseUrl}v1/check_email`, 
        { email: data.email, is_tma: data.is_tma },
        { headers: getHeader("beforeLogin") }
      );
      
      if (response) {
        // dispatch(auth.emailVerificationAction(response));
        console.log("Email verification successful:", response);
      }
    } catch (error: any) {
      // dispatch(auth.emailVerificationErrorAction(error.response));
      console.error("Email verification error:", error);
    }
  };
};