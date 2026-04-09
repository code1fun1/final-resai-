import { appConfig } from "../config/config";
import { getHeader } from "./header"
import axios from "axios";
// import * as auth from '../actions-reducers/auth-action-reducer';


export const sendEmailAsync = (data) => {
  return (dispatch) => {
    axios.post(appConfig.emailApiUrl + `/check_email`, { email: data.email, is_tma: data.is_tma })
      .then((response) => {
        if (response) {
          dispatch(auth.emailVerificationAction(response));
        }
      })
      .catch((reason) => {
        dispatch(auth.emailVerificationErrorAction(reason.response));
      });
  };
};



