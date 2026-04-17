import { Box, Typography } from '@mui/material';
import { ContentState, EditorState } from 'draft-js';
import { useTranslation } from 'next-i18next';
import { Dispatch, SetStateAction, useCallback, useEffect, useState } from 'react';
import withLoader from '~/shared/components/HOC/withLoader';
import SplitViewListingEditor from '~/shared/components/SplitViewListingEditor';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { JobData, OnboardingData, SimilarityScoreData } from '../Utils/OnboardingUtils';
import JobCard from './JobCard';
import JobsDescription from './JobDescription';
import { useStyles } from './JobProfileStyles';
import SimilarityScore from './SimilarityScore';
import { JobListResponse, getJobList } from './Utils/JobProfileUtils';

interface JobProfileProps {
  // setLoadWithoutMount: (value: boolean) => void;
  setLoadWithoutMount: (value: boolean, message?: string) => void;
  userJobData: JobData;
  targetJob: string;
  similarityData: SimilarityScoreData;
  onSave: Dispatch<SetStateAction<OnboardingData>>;
  setActiveSteps: Dispatch<SetStateAction<number>>;
}

type SelectedJobDetails = JobData['jobForm'] & { job_description: string };

const JobProfile: React.FC<JobProfileProps> = ({
  targetJob,
  userJobData,
  similarityData,
  onSave,
  setActiveSteps,
  setLoadWithoutMount
}) => {
  const styles = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
  const [jobList, setJobList] = useState<JobListResponse[]>([]);
  const [selectedJobDetails, setSelectedJobDetails] = useState<SelectedJobDetails | null>({
    ...userJobData.jobForm,
    job_description: userJobData.editorState.getCurrentContent().getPlainText()
  });

  useEffect(() => {
    const fetchUserJob = async () => {
      // setLoadWithoutMount(true);
      setLoadWithoutMount(true, i18n('loaderMessages.pleaseWait', { ns: 'common' }));
      const res = await getJobList(targetJob);
      setJobList(res?.data);
      setLoadWithoutMount(false, '');
    };
    fetchUserJob();
  }, []);

  const handleCardClick = (jobDetails: JobListResponse) => {
    setSelectedJobDetails((prevState) => (prevState === jobDetails ? null : jobDetails));
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jdFormValue');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (
            (parsed.jobTitle || parsed.companyName || parsed.jobDesc) &&
            (selectedJobDetails === null ||
              selectedJobDetails.title === '' ||
              selectedJobDetails.company === '')
          ) {
            setSelectedJobDetails({
              title: parsed.jobTitle || '',
              company: parsed.companyName || '',
              role: parsed.jobDesc || '',
              job_description: parsed.jobDesc || '',
              id: parsed.id || ''
            });
          }
        } catch {}
      }
    }

    onSave((prevState: OnboardingData) => ({
      ...prevState,
      jobData: {
        jobForm: {
          title: selectedJobDetails?.title || '',
          company: selectedJobDetails?.company || '',
          role: selectedJobDetails?.role || '',
          job_detail_url: selectedJobDetails?.job_detail_url || '',
          location: selectedJobDetails?.location || '',
          portal_job_details_id: selectedJobDetails?.portal_job_details_id || '',
          portal_name: selectedJobDetails?.portal_name || '',
          post_date: selectedJobDetails?.post_date || '',
          company_logo: selectedJobDetails?.company_logo || '',
          employment_type: selectedJobDetails?.employment_type || '',
          notice_period: selectedJobDetails?.notice_period || '',
          work_site: selectedJobDetails?.work_site || '',
          id: selectedJobDetails?.id
        },
        editorState: EditorState.createWithContent(
          ContentState?.createFromText(selectedJobDetails?.job_description || '')
        )
      }
    }));
  }, [selectedJobDetails]);
  const handleJobFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    onSave((prev) => {
      return {
        ...prev,
        jobData: {
          ...prev.jobData,
          jobForm: {
            ...prev.jobData?.jobForm,
            [name]: value
          }
        }
      };
    });
  };

  const handleEditorChange = useCallback(
    (value: EditorState) => {
      onSave((prev) => {
        return {
          ...prev,
          jobData: {
            ...prev.jobData,
            editorState: value
          }
        };
      });
    },
    [EditorState]
  );

  const handleSimilarityModalClose = () => {
    onSave((prev: OnboardingData) => {
      return {
        ...prev,
        similarityScoreData: {
          ...prev.similarityScoreData,
          isModalOpen: false
        }
      };
    });
  };

  const handelRedirect = (redirectUrl: string) => {
    window.open(redirectUrl, '_blank');
  };

  return (
    <>
      <SplitViewListingEditor
        editor={
          <JobsDescription
            onEditorChange={handleEditorChange}
            editorState={userJobData?.editorState}
            onFormValuesChange={handleJobFormChange}
            jobDetailsData={userJobData?.jobForm}
            disableInputs={false} //change "!!selectedJobDetails?.job_detail_url" to "false"
            recommendedJobs={jobList && jobList.length ? true : false}
          />
        }
        listing={
          <>
            <Box display="flex" alignItems="center" gap={1}>
              <Typography className={styles.sidebarTitle}>{i18n('recommendedJobs')}</Typography>
            </Box>
            <Typography className={styles.sidebarSubtitle}>
              {jobList?.length > 0 ? i18n('jobSuggestions') : i18n('jobSuggestionsNoRecord')}
            </Typography>
            <Box height={{ xs: 'calc(498px - 242px)', md: '600px' }} overflow="auto">
              <Box display="flex" flexDirection="column" gap={2} marginRight={1}>
                {jobList?.length > 0 &&
                  jobList?.map((jobDetails, index: number) => {
                    const {
                      company,
                      company_logo: companyLogo,
                      role,
                      location,
                      job_detail_url: jobDetailsUrl
                    } = jobDetails;
                    return (
                      <JobCard
                        key={`${role}-${company}-${index}`}
                        companyLogo={
                          companyLogo !== null ? companyLogo : '/image/companyDefalut.svg'
                        }
                        companyName={company}
                        role={role}
                        location={location}
                        buttonName={i18n('buttonTexts.viewJob', { ns: 'common' })}
                        onCardClick={() => handleCardClick(jobDetails)}
                        onButtonClick={() => handelRedirect(jobDetailsUrl)}
                        isJobSelected={
                          selectedJobDetails !== null &&
                          selectedJobDetails.id === jobDetails.id &&
                          selectedJobDetails.title === jobDetails.title
                        }
                      />
                    );
                  })}
              </Box>
            </Box>
          </>
        }
      />
      <SimilarityScore
        userJobData={userJobData}
        similarityData={similarityData}
        setActiveSteps={setActiveSteps}
        onSimilarityModalClose={handleSimilarityModalClose}
      />
    </>
  );
};
export default withLoader(JobProfile);
