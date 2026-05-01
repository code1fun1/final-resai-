import { NextRouter, useRouter } from 'next/router';
import { useSelector, useStore } from 'react-redux';
import { REDIRECTION_MAPPINGS, ROUTES } from '~/shared/constants/routes'; // eslint-disable-line @typescript-eslint/no-unused-vars
import { RootState } from '~/shared/redux/reducers';
import { useTranslation } from 'next-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';

const useLoginRedirect = (setLoadWithoutMount?: (value: boolean, message?: string) => void) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const router: NextRouter = useRouter();
  const store = useStore<RootState>();
  const { loggedInUser } = useSelector((state: RootState) => state?.user);

  const handleUserRedirection = (userStep?: number) => {
    if (setLoadWithoutMount) {
      setLoadWithoutMount(true, i18n('loaderMessages.pleaseWait', { ns: 'common' }));
    }

    let step = userStep;

    if (!step && loggedInUser && 'user_step' in loggedInUser) {
      const { user_step: loggedInUserStep } = loggedInUser;
      step = loggedInUserStep;
    }

    // Ensure `step` is a valid number
    if (typeof step === 'undefined') {
      step = 0; // Default step if no user step is found
    }

    // Add a small delay to ensure Redux state is updated after API call
    setTimeout(() => {
      // Get fresh Redux state after the delay
      const currentState = store.getState();
      const currentDownloadableResumeIds =
        currentState?.downloadedResumeIds?.downloadable_resume_ids;

      // Check if we have resume data loaded from API
      if (currentDownloadableResumeIds && Array.isArray(currentDownloadableResumeIds)) {
        const hasResumes = currentDownloadableResumeIds.length > 0;
        const route = hasResumes ? ROUTES.MY_RESUMES : ROUTES.RESUME_UPLOAD;
        router.push(route);
      } else {
        router.push(ROUTES.RESUME_UPLOAD);
      }
    }, 300); // 300ms delay to ensure Redux state is updated
  };

  return { handleUserRedirection };
};
export default useLoginRedirect;
