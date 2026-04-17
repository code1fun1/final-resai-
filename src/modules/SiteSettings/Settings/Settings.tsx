import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setSiteSettingsData } from '~/shared/redux/actions';
import httpRequest from '~/shared/utils/axios';
import { RequestBodyType } from '~/shared/constants/constants';
import { API_STATUS } from '~/shared/constants/apiConstants';

interface SettingsProps {}

const Settings: React.FC<SettingsProps> = ({}) => {
  const dispatch = useDispatch();
  const siteSettingsAPICall = async () => {
    const request: RequestBodyType<Request> = {
      url: 'sitesettings',
      method: 'GET'
    };
    const response = await httpRequest(request);
    if (response[0] !== null) {
      dispatch(setSiteSettingsData(response[0]?.res_data?.data));
      return {
        status: 'success',
        data: response[0]?.res_data?.data,
        message: response[0]?.res_data?.message
      };
    } else {
      const errorMessage = response[1]?.err?.response?.responseMessage;
      return {
        data: null,
        status: API_STATUS.FAILED,
        message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
      };
    }
  };

  // Use useEffect to dispatch only once when the component mounts
  useEffect(() => {
    siteSettingsAPICall();
    // Set user data in Redux store
  }, []); // Empty dependencies ensures it runs only once on mount

  return <></>;
};

export default Settings;
