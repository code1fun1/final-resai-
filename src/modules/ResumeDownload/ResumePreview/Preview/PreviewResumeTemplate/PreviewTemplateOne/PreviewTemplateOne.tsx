import { Box, Typography } from '@mui/material';
import React from 'react';
import {
  EducationalDetails,
  ResumeContent,
  WorkExperienceDetails,
  ProjectsDetails,
  ProfessionalDevelopmentDetails
} from '~/modules/ResumeDownload/Utils/ResumeDownloadUtils';
//import { LINKEDIN } from '~/shared/constants/constants';
import { useStyles } from './PreviewTemplateOneStyles';

interface TemplateProps {
  resumeContent: ResumeContent;
}

const PreviewTemplateOne: React.FC<TemplateProps> = ({
  resumeContent: {
    basic_details: {
      first_name: firstName,
      last_name: lastName,
      designation,
      phone,
      email,
      state,
      country,
      additional_links
    },
    education_details,
    skills,
    professional_summary,
    work_experience,
    projects,
    professional_development
  }
}) => {
  const styles = useStyles();

  return (
    <Box className={styles.container}>
      <Box className={styles.mainWrapper}>
        <Box className={styles.sidebarDetail}>
          <Box className={`${styles.personalDetail} ${styles.displayColumn}`}>
            <Box>
              <Typography variant="h4">{firstName}</Typography>
              <Typography variant="h4">{lastName}</Typography>
            </Box>
            <Typography variant="h6" textTransform="capitalize">
              {designation}
            </Typography>
          </Box>
          <Box display="flex" justifyContent="center">
            <Box className={styles.divider}></Box>
          </Box>
          <Box className={`${styles.personalDetail} ${styles.displayColumn}`}>
            {phone && <Typography variant="body1"> {phone}</Typography>}
            {email && <Typography variant="body1"> {email}</Typography>}
            {/* {linkedInUrl && (
              <Typography variant="body1"> {linkedInUrl && linkedInUrl.split('')}</Typography>
            )} */}

            {additional_links &&
              additional_links.map((item, i) => {
                return (
                  <Typography variant="body1" key={i}>
                    {' '}
                    {item.social_url}
                  </Typography>
                );
              })}

            {country ||
              (state && (
                <Typography variant="body1">
                  {' '}
                  {state && `${state} ,`}
                  {country}
                </Typography>
              ))}
          </Box>
          <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
            {/* Education Start */}
            <Typography variant="h5">
              {typeof education_details != 'undefined' &&
              education_details != null &&
              education_details.length != null &&
              education_details.length > 0
                ? 'Education'
                : ''}
            </Typography>
            {education_details.map(
              (
                { degree_type, degree_name, institute, passing_year }: EducationalDetails,
                index: number
              ) => {
                return (
                  <Box key={`${index}-${passing_year}`}>
                    <Typography variant="h6"> {degree_type}</Typography>
                    <Typography variant="body1"> {degree_name}</Typography>
                    <Typography variant="body1"> {institute}</Typography>
                    <Typography variant="body1"> {passing_year}</Typography>
                  </Box>
                );
              }
            )}
          </Box>
          {[...skills.professional_skills, ...skills.technical_skills].length < 11 ? (
            <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
              <Typography variant="h5">
                {typeof skills != 'undefined' && skills != null ? 'Expertise' : ''}
              </Typography>
              {[...skills.professional_skills, ...skills.technical_skills].map(
                (skills: string, index: number) => {
                  skills;
                  return (
                    <Typography variant="body1" key={`${index}-${skills}`}>
                      {' '}
                      {skills}
                    </Typography>
                  );
                }
              )}
            </Box>
          ) : (
            <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
              <Typography variant="h5">
                {typeof skills != 'undefined' && skills != null ? 'Expertise' : ''}
              </Typography>
              <Typography variant="body1" key={'sf-4445'} sx={{ textAlign: 'justify' }}>
                {' '}
                {[...skills.professional_skills, ...skills.technical_skills].join(', ')}
              </Typography>
            </Box>
          )}
        </Box>

        <Box className={styles.contentDetail}>
          <Box className={styles.displayColumn} gap="15px">
            <Typography variant="h5">
              {typeof professional_summary != 'undefined' &&
              professional_summary != null &&
              professional_summary.length != null &&
              professional_summary.length > 0
                ? 'professional profile'
                : ''}
            </Typography>
            <Typography variant="body1" textAlign="justify">
              {professional_summary}
            </Typography>
          </Box>
          <Box className={styles.divider}></Box>
          <Box className={styles.displayColumn} gap="15px">
            <Typography variant="h5">
              {typeof work_experience != 'undefined' &&
              work_experience != null &&
              work_experience.length != null &&
              work_experience.length > 0
                ? 'work experience'
                : ''}
            </Typography>
            <Box className={styles.workDetail}>
              {work_experience.map(
                (
                  { bullet_points, company, date, description, title }: WorkExperienceDetails,
                  index: number
                ) => {
                  return (
                    <Box key={`${index}-${title}`} mb={1}>
                      <Typography variant="h6">
                        {' '}
                        {title} / {company}
                      </Typography>
                      <Typography variant="body1" mb={1}>
                        <em> {date}</em>
                      </Typography>
                      <Typography variant="body1" textAlign="justify">
                        {' '}
                        {description}
                      </Typography>
                      <ul>
                        {bullet_points?.map((item: string, index: number) => {
                          return <li key={`${index}-${item}`}>{item}</li>;
                        })}
                      </ul>
                    </Box>
                  );
                }
              )}
            </Box>
          </Box>

          {/* Projects */}
          <Box className={styles.divider}></Box>
          <Box className={styles.displayColumn} gap="15px">
            <Typography variant="h5">
              {typeof projects != 'undefined' &&
              projects != null &&
              projects.length != null &&
              projects.length > 0
                ? 'Projects'
                : ''}
            </Typography>
            <Box className={styles.workDetail}>
              {projects.map(({ bullet_points, detail, name }: ProjectsDetails, index: number) => {
                return (
                  <Box key={`${index}-${name}`} mb={1}>
                    <Typography variant="h6"> {name}</Typography>

                    <Typography variant="body1" textAlign="justify">
                      {' '}
                      {detail}
                    </Typography>
                    <ul>
                      {bullet_points?.map((item: string, index: number) => {
                        return <li key={`${index}-${item}`}>{item}</li>;
                      })}
                    </ul>
                  </Box>
                );
              })}
            </Box>
          </Box>
          {/* Projects Close */}

          {/* Profession Development */}
          <Box className={styles.divider}></Box>
          <Box className={styles.displayColumn} gap="15px">
            <Typography variant="h5">
              {typeof professional_development != 'undefined' &&
              professional_development != null &&
              professional_development.length != null &&
              professional_development.length > 0
                ? 'Professional Development'
                : ''}
            </Typography>
            <Box className={styles.workDetail}>
              {professional_development &&
                professional_development.map(
                  (
                    { company, date, university, workshop }: ProfessionalDevelopmentDetails,
                    index: number
                  ) => {
                    return (
                      <Box key={`${index}-${university}`} mb={1}>
                        <Typography variant="h6">
                          {' '}
                          {university ? university : ''}
                          {university && company ? '/' : ''} {company ? company : ''}
                        </Typography>
                        <Typography variant="body1" mb={1}>
                          <em> {date}</em>
                        </Typography>
                        <Typography variant="body1" textAlign="justify" fontSize="15px">
                          {' '}
                          {workshop}
                        </Typography>
                      </Box>
                    );
                  }
                )}
            </Box>
          </Box>

          {/* Close Profession Development */}
        </Box>
      </Box>
    </Box>
  );
};

export default PreviewTemplateOne;
