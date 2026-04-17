import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import {
  EducationalDetails,
  ResumeContent,
  WorkExperienceDetails,
  ProfessionalDevelopmentDetails,
  AchievementsDetails
} from '~/modules/ResumeDownload/Utils/ResumeDownloadUtils';
//import { LINKEDIN } from '~/shared/constants/constants';
import { useStyles } from './TemplateFourStyles';

import { getYear, formatPhoneNumber, areAllFieldsFilled, isValidValue } from '../TemplateHelper';
import EditIcon from '~/shared/components/EditIcon';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
import CallIcon from '@mui/icons-material/Call';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';

interface TemplateProps {
  resumeContent: ResumeContent;
}
const TemplateFour: React.FC<TemplateProps> = ({
  resumeContent: {
    basic_details: {
      first_name: firstName,
      last_name: lastName,
      designation,
      phone,
      email
      // state,
      // country
      // additional_links
    },
    education_details,
    skills,
    professional_summary,
    work_experience,
    // projects,
    professional_development,
    achievements_details
    // language
  }
}) => {
  const styles = useStyles();

  const degreeAllBlank = education_details.every((detail) => detail.degree_name === '');
  return (
    <Box className={styles.container}>
      <EditIcon />
      <Box className={styles.mainWrapper}>
        {/* ----------------------------Full Width Content Start from Here------------------- */}
        <Box className={styles.fullWidthClass}>
          <Typography variant="h4">
            {firstName && isValidValue(firstName) && firstName}{' '}
            {lastName && isValidValue(lastName) && lastName}
          </Typography>
          {designation && isValidValue(designation) && (
            <Typography variant="h6" textTransform="uppercase">
              {designation}
            </Typography>
          )}
          <Box className={styles.addBorderBottom}></Box>
          <Box className={styles.contactInfo}>
            {phone && isValidValue(phone) && (
              <>
                <Box className={styles.circleIcon}>
                  <CallIcon />
                </Box>
                <Typography variant="body1"> {formatPhoneNumber(phone)}</Typography>
              </>
            )}
            {email && isValidValue(email) && (
              <>
                <Box className={styles.circleIcon}>
                  <AlternateEmailIcon />
                </Box>
                <Typography variant="body1"> {email}</Typography>
              </>
            )}
            <Typography variant="h6"></Typography>
            {/* {country && isValidValue(country) ||
                            (state && isValidValue(state) && (
                                <><Box className={styles.circleIcon}><LocationOnOutlinedIcon /></Box><Typography variant="body1">
                                    {' '}
                                    {state && country ? `${state}/ ${country}` : state || country}
                                </Typography></>
                            ))} */}
          </Box>
          <Box className={styles.addBorderBottom}></Box>
        </Box>
        {/* ----------------------------Full Width Content End Here------------------- */}

        {/* ----------------------------Left Sidebar Content Start from Here------------------- */}
        <Box className={styles.leftSidebarDetail}>
          {/* //Education start */}
          {areAllFieldsFilled(education_details) && !degreeAllBlank && (
            <>
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
                      <>
                        <Box key={`${index}-${passing_year}`} mb={2}>
                          {degree_name && (
                            <>
                              {degree_name && <Typography variant="h6">{degree_name}</Typography>}
                              {degree_type && <Typography variant="h6">{degree_type}</Typography>}
                              {(institute || passing_year) && (
                                <Typography variant="body1">
                                  {institute ? institute : ''}
                                  {passing_year && institute && ' - '}
                                  {passing_year}
                                </Typography>
                              )}
                              {/* {(institute) && (
                                                        <Typography
                                                            variant="body1"
                                                        >
                                                            {institute}
                                                        </Typography>
                                                    )}
                                                    {(passing_year) && (
                                                        <Typography
                                                            variant="body1"
                                                        >
                                                            {passing_year}
                                                        </Typography>
                                                    )} */}
                            </>
                          )}
                        </Box>
                      </>
                    );
                  }
                )}
              </Box>
              <Box className={styles.addBorderBottom} />
            </>
          )}
          {/* Education End */}

          {/* Skill Start */}

          {/* {(skills.professional_skills.length > 0 || skills.technical_skills.length > 0) && (
                        <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
                            <Typography variant="h5">
                                {'Skills'}
                            </Typography>
                            {skills.professional_skills.length > 0 && (
                                <>
                                    <Typography variant="h6" >
                                        {'Professional'}
                                    </Typography>
                                    {skills.professional_skills.map((skill: string, index: number) => (
                                        <Typography variant="body1" key={`professional-${index}`}>
                                            {skill}
                                        </Typography>
                                    ))}
                                </>
                            )}

                            {skills.technical_skills.length > 0 && (
                                <>
                                    <Typography variant="h6">
                                        {'Technical'}
                                    </Typography>
                                    {skills.technical_skills.map((skill: string, index: number) => (
                                        <Typography variant="body1" key={`technical-${index}`}>
                                            {skill}
                                        </Typography>
                                    ))}
                                </>
                            )}
                            <Box className={styles.addBorderBottom}></Box>
                        </Box>
                    )} */}
          {(skills.professional_skills.length > 0 || skills.technical_skills.length > 0) && (
            <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
              <Typography variant="h5">{'Skills'}</Typography>
              {skills.professional_skills.length > 0 && (
                <>
                  <Typography variant="h6">{'Professional'}</Typography>
                  <Typography variant="body1">{skills.professional_skills.join(', ')}</Typography>
                </>
              )}

              {skills.technical_skills.length > 0 && (
                <>
                  <Typography variant="h6">{'Technical'}</Typography>
                  <Typography variant="body1">{skills.technical_skills.join(', ')}</Typography>
                </>
              )}
              <Box className={styles.addBorderBottom}></Box>
            </Box>
          )}

          {/* Skill End */}
          {/* Acheivements Start */}
          {areAllFieldsFilled(achievements_details) && (
            <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
              <Typography variant="h5">
                {typeof achievements_details != 'undefined' &&
                achievements_details != null &&
                achievements_details.length != null &&
                achievements_details.length > 0
                  ? 'Achievements'
                  : ''}
              </Typography>
              <Box>
                {achievements_details &&
                  achievements_details.map(
                    (
                      { achievement_date, location, summary }: AchievementsDetails,
                      index: number
                    ) => {
                      const isValidYear = (date: string) => {
                        const year = parseInt(date, 10);
                        return year > 0 && !isNaN(year);
                      };
                      return (
                        <Box key={`${index}-${summary}`} mb={3}>
                          {summary && <Typography variant="h6">{summary}</Typography>}
                          {(location || (achievement_date && isValidYear(achievement_date))) && (
                            <Typography variant="body1">
                              {isValidYear(achievement_date) ? achievement_date : ''}
                              {location && isValidYear(achievement_date) && ' - '}
                              {location}
                            </Typography>
                          )}
                          {/* {location && (
                                                        <Typography
                                                            variant="body1"
                                                        >
                                                            {location}
                                                        </Typography>
                                                    )} */}
                        </Box>
                      );
                    }
                  )}
              </Box>
              {/* <Box className={styles.addBorderBottom} /> */}
            </Box>
          )}
          {/* Acheivements End */}
        </Box>

        {/* ----------------------------Left Sidebar Content END Here------------------- */}

        {/* ----------------------------Right Sidebar Content Start from Here------------------- */}
        <Box className={styles.rightSidebarDetail}>
          {/* Professionl Summary Start */}
          {professional_summary && (
            <>
              <Box className={styles.displayColumn} gap="15px" mt={-1}>
                <Typography variant="h5">
                  {typeof professional_summary != 'undefined' &&
                  professional_summary != null &&
                  professional_summary.length != null &&
                  professional_summary.length > 0
                    ? 'Professional Summary'
                    : ''}
                </Typography>
                {professional_summary && (
                  <Typography variant="body1" textAlign="justify">
                    {professional_summary}
                  </Typography>
                )}
              </Box>
            </>
          )}
          {/* Professionl Summary End */}

          {/* Work Experince Start */}
          {areAllFieldsFilled(work_experience) && (
            <>
              {/* this border show when profesion summary is exist becuase its just below ps */}
              {professional_summary && <Box className={styles.addBorderBottom} />}
              <Box className={styles.displayColumn} gap="15px">
                <Typography variant="h5">
                  {typeof work_experience != 'undefined' &&
                  work_experience != null &&
                  work_experience.length != null &&
                  work_experience.length > 0
                    ? 'Experiences'
                    : ''}
                </Typography>

                <Box className={styles.workDetail}>
                  {work_experience.map(
                    (
                      { bullet_points, company, title, location }: WorkExperienceDetails,
                      index: number
                    ) => {
                      return (
                        <Box key={`${index}-${title}`} mb={1}>
                          {title && (
                            <Typography variant="body1" textAlign="justify">
                              {' '}
                              {title}
                            </Typography>
                          )}
                          {company && (
                            <Typography variant="body1" textAlign="justify">
                              {company}
                            </Typography>
                          )}
                          {location && (
                            <Typography variant="body1" textAlign="justify">
                              {location}
                            </Typography>
                          )}

                          <List>
                            {bullet_points
                              ?.filter((item) => item && item.trim() !== '') // Filter out empty or blank bullet points
                              .map((item, idx) => (
                                <ListItem
                                  className={styles.listItemDefaultModified}
                                  disableGutters
                                  key={`${idx}-${item}`}
                                >
                                  <ListItemText
                                    primary={item}
                                    className={styles.experinceSectionBullets}
                                  />
                                </ListItem>
                              ))}
                          </List>
                        </Box>
                      );
                    }
                  )}
                </Box>
              </Box>
            </>
          )}
          {/* Work Experince End */}

          {/* Professional Development */}
          {areAllFieldsFilled(professional_development) && (
            <>
              <Box className={styles.addBorderBottom} />
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
                        {
                          date,
                          university,
                          workshop,
                          title,
                          description,
                          company
                        }: ProfessionalDevelopmentDetails,
                        index: number
                      ) => {
                        return (
                          <Box key={`${index}-${university}`} mb={3}>
                            {title && (
                              <Typography variant="h6" textAlign="justify">
                                {' '}
                                {title}
                              </Typography>
                            )}
                            {workshop && workshop !== title && (
                              <Typography variant="body1" textAlign="justify">
                                {' '}
                                {workshop}
                              </Typography>
                            )}
                            {university && (
                              <Typography textAlign="justify">{university}</Typography>
                            )}
                            {company && <Typography textAlign="justify">{company}</Typography>}
                            {description && (
                              <Typography variant="body1" mb={1} textAlign="justify">
                                {description}
                              </Typography>
                            )}
                            {date && (
                              <Typography variant="body1" mb={1} textAlign="justify">
                                {getYear(date)}
                              </Typography>
                            )}
                          </Box>
                        );
                      }
                    )}
                </Box>
              </Box>
            </>
          )}
          {/* Close Professional Development */}
        </Box>
        {/* ----------------------------Right Sidebar Content End Here------------------- */}
      </Box>
    </Box>
  );
};

export default TemplateFour;
