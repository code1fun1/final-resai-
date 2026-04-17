import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { setAuthData } from '~/modules/auth/Utils/AuthUtils';
import { handleSetUserCreditData, handleSetUserResumeData } from '~/modules/auth/Utils/CreditUtils';
import WithLoader from '~/shared/components/HOC/withLoader';
import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import {
  NULL,
  RequestBodyType,
  SEARCH_PARAMS_KEYS,
  SEARCH_PARAMS_VALUES
} from '~/shared/constants/constants';
import { ROUTES } from '~/shared/constants/routes';
import useLoginRedirect from '~/shared/hooks/useLoginRedirect';
import { setLoginErrorMessage } from '~/shared/redux/actions';
import httpRequest from '~/shared/utils/axios';

interface GoogleAuthorizeProps {
  setLoadWithoutMount: (loading: boolean) => void;
}

const GoogleAuthorize = (props: GoogleAuthorizeProps) => {
  const { setLoadWithoutMount } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const { handleUserRedirection } = useLoginRedirect();
  const searchParams = useSearchParams();

  const authCode: string =
    useMemo(() => {
      if (searchParams.get(SEARCH_PARAMS_KEYS.CODE) !== '') {
        return searchParams.get(SEARCH_PARAMS_KEYS.CODE);
      }
    }, [searchParams]) || NULL;

  const isLoginCancelled: boolean =
    searchParams.get(SEARCH_PARAMS_KEYS.ERROR) === SEARCH_PARAMS_VALUES.USER_CANCELLED_LOGIN;

  useEffect(() => {
    if (isLoginCancelled) {
      router.push(ROUTES.LOGIN);
    }

    setLoadWithoutMount(true);
    if (authCode) {
      (async () => {
        const { GOOGLE_ADD_USER } = APIS;
        const request: RequestBodyType<{ google_code: string }> = {
          url: GOOGLE_ADD_USER,
          method: API_METHOD.POST,
          body: {
            req_param: { google_code: authCode }
          }
        };
        const response = await httpRequest(request);
        if (response[0]) {
          const {
            res_data: { data }
          } = response[0];
          // Set profile_pic to null in the user_details before dispatching to handle AA avatar name gfhfg
          if (data?.user_details?.profile_pic) {
            data.user_details.profile_pic = null;
          }
          dispatch(setLoginErrorMessage(''));
          setAuthData(data, dispatch);
          const { user_step: userStep } = data?.user_details;
          //set UserCreditDetails start
          await handleSetUserCreditData(dispatch);
          await handleSetUserResumeData(dispatch);
          //end
          // Call handleUserRedirection after resume data is loaded
          handleUserRedirection(userStep);
          setLoadWithoutMount(false);
        } else {
          setTimeout(() => {
            router.push(ROUTES.LOGIN);
            setLoadWithoutMount(false);
          }, 2000);
          dispatch(setLoginErrorMessage(response[1].err.message));
        }
      })();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authCode, isLoginCancelled]);
};

export default WithLoader(GoogleAuthorize);
