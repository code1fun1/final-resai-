import { Box, Grid, Typography } from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useState } from 'react';

import JobCard from '~/modules/Onboarding/JobProfile/JobCard';
import { getJobList, JobListResponse } from '~/modules/Onboarding/JobProfile/Utils/JobProfileUtils';

const RecommendedJobs = () => {
  const { t: i18n } = useTranslation('onboarding');

  const [jobs, setJobs] = useState<JobListResponse[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [targetJob, setTargetJob] = useState<string | null>(null);

  // Read targetJob safely on client
  useEffect(() => {
    if (typeof window === 'undefined') return;

    const storedTargetJob = sessionStorage.getItem('recommendedTargetJob');
    setTargetJob(storedTargetJob);
  }, []);

  // Fetch jobs once targetJob is available
  useEffect(() => {
    if (!targetJob) return;

    const fetchRecommendedJobs = async () => {
      try {
        setLoading(true);
        const res = await getJobList(targetJob);
        setJobs(res?.data || []);
      } catch (error) {
        console.error('Failed to fetch recommended jobs', error);
        setJobs([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecommendedJobs();
  }, [targetJob]);

  return (
    <Box px={{ xs: 2, md: 6 }} pt={4} pb={{ xs: 8, md: 12 }} minHeight="calc(100vh - 160px)">
      <Typography variant="h4" fontWeight={600} mb={1}>
        {i18n('recommendedJobs')}
      </Typography>

      <Typography color="text.secondary" mb={4}>
        {jobs.length ? i18n('jobSuggestions') : i18n('jobSuggestionsNoRecord')}
      </Typography>

      {loading && <Typography color="text.secondary">Loading recommended jobs...</Typography>}

      <Grid container spacing={3}>
        {jobs.map((job, index) => (
          <Grid item xs={12} sm={6} md={4} key={`${job.id}-${index}`}>
            <JobCard
              companyLogo={job.company_logo ?? '/image/companyDefalut.svg'}
              companyName={job.company}
              role={job.role}
              location={job.location}
              buttonName={i18n('buttonTexts.viewJob', { ns: 'common' })}
              onButtonClick={() => window.open(job.job_detail_url, '_blank')}
              onCardClick={() => {}}
              isJobSelected={false}
            />
          </Grid>
        ))}
      </Grid>

      {!loading && jobs.length === 0 && (
        <Box mt={6} textAlign="center">
          <Typography color="text.secondary">{i18n('jobSuggestionsNoRecord')}</Typography>
        </Box>
      )}
    </Box>
  );
};

export default RecommendedJobs;
