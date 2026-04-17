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
import { useStyles } from './TemplateThreeStyles';
import { getYear, formatPhoneNumber, areAllFieldsFilled, isValidValue } from '../TemplateHelper';

import EditIcon from '~/shared/components/EditIcon';
interface TemplateProps {
  resumeContent: ResumeContent;
}
const TemplateThree: React.FC<TemplateProps> = ({
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
        {/* ----------------------------Left Sidebar Content Start from Here------------------- */}
        <Box className={styles.leftSidebarDetail}>
          <Box className={`${styles.personalDetail} ${styles.displayColumn}`}>
            <Box>
              <Typography variant="h4">
                {firstName && isValidValue(firstName) && firstName}{' '}
              </Typography>
              <Typography variant="h4">{lastName && isValidValue(lastName) && lastName}</Typography>
            </Box>
            {designation && isValidValue(designation) && (
              <Typography variant="h6" textTransform="capitalize">
                {designation}
              </Typography>
            )}
          </Box>
          <Box display="flex" justifyContent="center">
            <Box className={styles.divider}></Box>
          </Box>
          {/* <Box className={styles.addBorderBottom}></Box> */}

          <Box className={`${styles.personalDetail} ${styles.displayColumn}`}>
            {phone && isValidValue(phone) && (
              <Typography variant="body1"> {formatPhoneNumber(phone)}</Typography>
            )}
            {email && isValidValue(email) && <Typography variant="body1"> {email}</Typography>}
            {/* {linkedInUrl && (
              <Typography variant="body1"> {linkedInUrl && linkedInUrl.split('')}</Typography>
            )} */}

            {/* {country && isValidValue(country) ||
                            (state && isValidValue(state) && (
                                <Typography variant="body1">
                                    {' '}
                                    {state && `${state} ,`}
                                    {country}
                                </Typography>
                            ))} */}
          </Box>
          {/* <Box className={styles.addBorderBottom}></Box> */}
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
                        <Box key={`${index}-${passing_year}`}>
                          {degree_name && (
                            <>
                              {(degree_type || degree_name) && (
                                <Typography variant="h6">
                                  {degree_name} {degree_name && degree_type && ' - '} {degree_type}
                                </Typography>
                              )}
                              {(institute || passing_year) && (
                                <Typography variant="body1">
                                  {institute} {institute && passing_year && ' - '} {passing_year}
                                </Typography>
                              )}
                              {/* {institute && <Typography variant="body1">{institute}</Typography>}
                              {passing_year && (
                                <Typography variant="body1">{passing_year}</Typography>
                              )} */}
                            </>
                          )}
                        </Box>
                      </>
                    );
                  }
                )}
              </Box>
            </>
          )}
          {/* Education End */}

          {/* Skill Start */}

          {/* {skills && [...skills.professional_skills, ...skills.technical_skills].length > 0 && (
                        <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
                            <Typography variant="h5" >
                                {'Expertise'}
                            </Typography>
                            {[...skills.technical_skills, ...skills.professional_skills].map(
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
            </Box>
          )}
          {/* Skill End */}
          {/* <Box className={styles.addBorderBottom}></Box> */}
        </Box>

        {/* ----------------------------Left Sidebar Content END Here------------------- */}

        {/* ----------------------------Right Sidebar Content Start from Here------------------- */}
        <Box className={styles.rightSidebarDetail}>
          {/* Professionl Summary Start */}
          {professional_summary && (
            <>
              <Box className={styles.displayColumn} gap="15px">
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
              {/* <Box className={styles.addBorderBottom} /> */}
            </>
          )}
          {/* Professionl Summary End */}

          {/* Work Experince Start */}
          {areAllFieldsFilled(work_experience) && (
            <Box className={styles.displayColumn} gap="15px" mt={2}>
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
                          <Typography variant="h6" textAlign="justify">
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
              {/* <Box className={styles.addBorderBottom} /> */}
            </Box>
          )}
          {/* Work Experince End */}

          {/* Professional Development */}
          {areAllFieldsFilled(professional_development) && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="h5">
                {typeof professional_development != 'undefined' &&
                professional_development != null &&
                professional_development.length != null &&
                professional_development.length > 0
                  ? 'Professional Development'
                  : ''}
              </Typography>
              <Box className={styles.workDetail} mb={2}>
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
                        <Box key={`${index}-${university}`} mb={1}>
                          {title && (
                            <Typography
                              variant="h6"
                              style={{ textTransform: 'capitalize' }}
                              textAlign="justify"
                            >
                              {' '}
                              {title}
                            </Typography>
                          )}
                          {workshop && workshop !== title && (
                            <Typography
                              variant="body1"
                              style={{ textTransform: 'capitalize' }}
                              textAlign="justify"
                            >
                              {' '}
                              {workshop}
                            </Typography>
                          )}

                          {university && (
                            <Typography
                              variant="body1"
                              style={{ textTransform: 'capitalize' }}
                              textAlign="justify"
                            >
                              {university}
                            </Typography>
                          )}
                          {company && (
                            <Typography style={{ textTransform: 'capitalize' }} textAlign="justify">
                              {company}
                            </Typography>
                          )}
                          {description && (
                            <Typography
                              variant="body1"
                              style={{ textTransform: 'capitalize' }}
                              mb={1}
                              textAlign="justify"
                            >
                              {description}
                            </Typography>
                          )}
                          {date && (
                            <Typography
                              variant="body1"
                              style={{ textTransform: 'capitalize' }}
                              mb={1}
                              textAlign="justify"
                            >
                              {getYear(date)}
                            </Typography>
                          )}
                        </Box>
                      );
                    }
                  )}
              </Box>
              {/* <Box className={styles.addBorderBottom} /> */}
            </Box>
          )}
          {/* Close Professional Development */}
          {/* Achievments/Awards Start */}
          {areAllFieldsFilled(achievements_details) && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="h5">
                {typeof achievements_details != 'undefined' &&
                achievements_details != null &&
                achievements_details.length != null &&
                achievements_details.length > 0
                  ? 'Achievements'
                  : ''}
              </Typography>
              <Box className={styles.workDetail}>
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
                        <Box key={`${index}-${summary}`} mb={2}>
                          {summary && (
                            <Typography textAlign="justify" variant="h6">
                              {summary}
                            </Typography>
                          )}
                          {(location || (achievement_date && isValidYear(achievement_date))) && (
                            <Typography variant="body1" textAlign="justify">
                              {isValidYear(achievement_date) ? achievement_date : ''}
                              {location && isValidYear(achievement_date) && ' - '}
                              {location}
                            </Typography>
                          )}
                          {/* {isValidYear(achievement_date) && location && (
                                                        <Typography textAlign="justify">
                                                            {`${location}${achievement_date && location ? ' - ' : ''}${achievement_date}`}
                                                        </Typography>
                                                    )} */}
                          {/* {isValidYear(achievement_date) && (
                                                        <Typography
                                                            textAlign="justify"
                                                        >
                                                        </Typography>
                                                    )}
                                                    {location && (
                                                        <Typography
                                                            textAlign="justify"
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
          {/* Achievments/Awards End */}
        </Box>
        {/* ----------------------------Right Sidebar Content End Here------------------- */}
      </Box>
    </Box>
  );
};

export default TemplateThree;
