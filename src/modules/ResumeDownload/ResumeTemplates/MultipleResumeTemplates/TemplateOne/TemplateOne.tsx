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
import { useStyles } from './TemplateOneStyles';

import { getYear, formatPhoneNumber, areAllFieldsFilled, isValidValue } from '../TemplateHelper';
import EditIcon from '~/shared/components/EditIcon';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import CallIcon from '@mui/icons-material/Call';
// import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
interface TemplateProps {
  resumeContent: ResumeContent;
}
const TemplateOne: React.FC<TemplateProps> = ({
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
        <Box className={styles.contentDetail}>
          <Box className={styles.displayColumn} gap="15px">
            <Box>
              <Typography variant="h4" className={styles.nameSection}>
                {firstName && isValidValue(firstName) && firstName}{' '}
                {lastName && isValidValue(lastName) && lastName}
              </Typography>
            </Box>
          </Box>
          {designation && isValidValue(designation) && (
            <Box className={styles.displayColumn} gap="15px">
              <Box>
                <Typography variant="h4" className={styles.designationSection}>
                  {designation}
                </Typography>
              </Box>
            </Box>
          )}
          <Box className={`${styles.personalDetail} ${styles.displayColumn}`}>
            {email && (
              <Typography variant="body1" className={styles.emailSection}>
                {email && isValidValue(email) && email}
              </Typography>
            )}
            {phone && (
              <Typography variant="body1" mt={1} className={styles.emailSection}>
                {phone && isValidValue(phone) && formatPhoneNumber(phone)}
              </Typography>
            )}
          </Box>
          {/* //Social Link Url start */}
          {/* {areAllFieldsFilled(additional_links || []) && (
            <Box className={`${styles.personalDetail} ${styles.displayColumn}`}>
              {additional_links?.map(({ social_url }: AdditionallinksDetails, index: number) => {
                return (
                  <Typography key={index} variant="body1" className={styles.socialLinkSection}>
                    {additional_links.length > 1 && index !== 0 && ' / '}
                    {social_url}
                  </Typography>
                );
              })}
            </Box>
          )} */}
          {/* Social Link Url end */}
          {/* Summary Start */}
          {professional_summary && <Box className={styles.divider}></Box>}
          <Box className={styles.displayColumn} gap="15px">
            <Typography variant="h5" className={styles.sectionHeading}>
              {typeof professional_summary != 'undefined' &&
              professional_summary != null &&
              professional_summary.length != null &&
              professional_summary.length > 0
                ? 'Professional Summary'
                : ''}
            </Typography>
            {/* <Typography variant="body1" textAlign="justify">
              {professional_summary}
            </Typography> */}
            {professional_summary && (
              <Typography
                variant="body1"
                className={styles.childContentProfessionalandSkill}
                textAlign="justify"
              >
                {professional_summary}
              </Typography>
            )}
          </Box>
          {/* Summary end */}

          {/* Skills Start */}
          {skills &&
            (skills.professional_skills.length > 0 || skills.technical_skills.length > 0) && (
              <Box className={styles.divider}></Box>
            )}

          {skills && [...skills.professional_skills, ...skills.technical_skills].length > 0 && (
            <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
              <Typography variant="h5" className={styles.sectionHeading}>
                {'Skills'}
              </Typography>
              <Typography
                variant="body1"
                className={styles.techandProfesSkill}
                key={'sf-4445'}
                sx={{ textAlign: 'justify' }}
              >
                {[...skills.technical_skills, ...skills.professional_skills].join(', ')}
              </Typography>
            </Box>
          )}

          {/* Skills End */}

          {/* Experience Start */}
          {areAllFieldsFilled(work_experience) && <Box className={styles.divider}></Box>}
          {areAllFieldsFilled(work_experience) && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="h5" className={styles.sectionHeading}>
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
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionTitle}
                            textAlign="justify"
                          >
                            {' '}
                            {title}
                          </Typography>
                        )}
                        {company && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionCompany}
                            textAlign="justify"
                          >
                            <em>{company}</em>
                          </Typography>
                        )}
                        {location && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionCompany}
                            textAlign="justify"
                          >
                            <em>{location}</em>
                          </Typography>
                        )}

                        {/* {date && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionCompany}
                            textAlign="justify"
                            mb={1}
                          >
                            {date}
                          </Typography>
                        )} */}

                        {/* {description && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionDesc}
                            textAlign="justify"
                          >
                            {' '}
                            {description}
                          </Typography>
                        )} */}
                        {/* <List>
                          {bullet_points?.map((item, idx) => (
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
                        </List> */}
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
          )}
          {/* Experience End */}

          {/* Projects Start */}
          {/* {areAllFieldsFilled(projects) && (<Box className={styles.divider}></Box>)}
          {areAllFieldsFilled(projects) &&
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="h5" className={styles.sectionHeading}>
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
                      {name && (
                        <Typography
                          variant="h6"
                          className={styles.projectSectionTitle}
                          textAlign="justify"
                        >
                          {' '}
                          {name}
                        </Typography>
                      )}

                      {detail && (
                        <Typography className={styles.projectSectionDetails} textAlign="justify">
                          {' '}
                          {detail}
                        </Typography>
                      )}
                      <List>
                        {bullet_points?.map((item, idx) => (
                          <ListItem
                            className={styles.listItemDefaultModified}
                            disableGutters
                            key={`${idx}-${item}`}
                          >
                            <ListItemText primary={item} className={styles.projectSectionBullets} />
                          </ListItem>
                        ))}
                      </List>
                    </Box>
                  );
                })}
              </Box>
            </Box>
          } */}
          {/* Projects End */}

          {/* Professional Development Start */}
          {areAllFieldsFilled(professional_development) && <Box className={styles.divider}></Box>}
          {areAllFieldsFilled(professional_development) && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="h5" className={styles.sectionHeading}>
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
                            <Typography
                              variant="body1"
                              className={styles.workshopSectionTitle}
                              textAlign="justify"
                            >
                              {' '}
                              {title}
                            </Typography>
                          )}
                          {workshop && workshop !== title && (
                            <Typography
                              variant="body1"
                              className={styles.workshopSectionTitle}
                              textAlign="justify"
                            >
                              {' '}
                              {workshop}
                            </Typography>
                          )}
                          {university && (
                            <Typography
                              className={styles.workshopSectionUniversityCompany}
                              textAlign="justify"
                            >
                              {university}
                            </Typography>
                          )}
                          {company && (
                            <Typography
                              className={styles.workshopSectionUniversityCompany}
                              textAlign="justify"
                            >
                              {company}
                            </Typography>
                          )}
                          {description && (
                            <Typography
                              variant="body1"
                              className={styles.workshopSectionDate}
                              mb={1}
                              textAlign="justify"
                            >
                              {description}
                            </Typography>
                          )}
                          {date && (
                            <Typography
                              variant="body1"
                              className={styles.workshopSectionDate}
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
            </Box>
          )}
          {/* Professional Development end */}
          {/* Achievments/Awards Start */}
          {areAllFieldsFilled(achievements_details) && <Box className={styles.divider}></Box>}
          {areAllFieldsFilled(achievements_details) && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="h5" className={styles.sectionHeading}>
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
                        <Box key={`${index}-${summary}`} mb={3}>
                          {summary && (
                            <Typography
                              className={styles.achievementSectionSummary}
                              textAlign="justify"
                            >
                              {summary}
                            </Typography>
                          )}

                          {/* {isValidYear(achievement_date) && (
                            <Typography
                              className={styles.achievementSectionDate}
                              textAlign="justify"
                            >
                              {isValidYear(achievement_date) ? achievement_date : ''}
                            </Typography>
                          )}
                          {location && (
                            <Typography
                              className={styles.achievementSectionLocation}
                              textAlign="justify"
                            >
                              {location}
                            </Typography>
                          )} */}
                          {(location || (achievement_date && isValidYear(achievement_date))) && (
                            <Typography
                              variant="body1"
                              className={styles.educationSectionPassing}
                              textAlign="justify"
                            >
                              {isValidYear(achievement_date) ? achievement_date : ''}
                              {location && isValidYear(achievement_date) && ' - '}
                              {location}
                            </Typography>
                          )}
                        </Box>
                      );
                    }
                  )}
              </Box>
            </Box>
          )}
          {/* Achievments/Awards End */}
          {/* Education Start */}
          {areAllFieldsFilled(education_details) && !degreeAllBlank && (
            <Box className={styles.divider}></Box>
          )}
          {areAllFieldsFilled(education_details) && !degreeAllBlank && (
            <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
              <Typography variant="h5" className={styles.sectionHeading}>
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
                      {degree_name && (
                        <>
                          {(degree_type || degree_name) && (
                            <Typography
                              variant="body1"
                              className={styles.educationSectionDegree}
                              textAlign="justify"
                            >
                              {degree_name} {degree_name && degree_type && ' - '} {degree_type}
                            </Typography>
                          )}
                          {(institute || passing_year) && (
                            <Typography
                              variant="body1"
                              className={styles.educationSectionPassing}
                              textAlign="justify"
                            >
                              {institute} {institute && passing_year && ' - '} {passing_year}
                            </Typography>
                          )}
                        </>
                      )}
                    </Box>
                  );
                }
              )}
            </Box>
          )}
          {/* Education End */}

          {/* Language Section Start */}
          {/* {areAllFieldsFilled(language) && (<Box className={styles.divider}></Box>)} */}
          {/* {areAllFieldsFilled(language) && (
            <Box className={styles.displayColumn} gap="15px"> */}
          {/* <Typography variant="h5" className={styles.sectionHeading}>
                {typeof language != 'undefined' &&
                  language != null &&
                  language.length != null &&
                  language.length > 0
                  ? 'Language'
                  : ''}
              </Typography> */}
          {/* <Box className={styles.workDetail}>
                {language && (
                  <Box mb={3}>
                    <Typography className={styles.languageSectionTitle} textAlign="justify">
                      {'Language :'} &nbsp;
                      {language
                        .map(({ language }: LanguageDetails) => language)
                        .filter((lang) => lang)
                        .join(', ')}
                    </Typography>
                  </Box>
                )} */}
          {/* {language &&
                  language.map(({ language, level }: LanguageDetails, index: number) => {
                    return (
                      <Box key={`${index}-${language}`} mb={3}>
                        {language && (
                          <Typography className={styles.languageSectionTitle} textAlign="justify">
                            {'Language :'} &nbsp;{language}
                          </Typography>
                        )}
                        {level && (
                          <Typography
                            variant="body1"
                            className={styles.languageSectionLevel}
                            textAlign="justify"
                          >
                            {level}
                          </Typography>
                        )}
                      </Box>
                    );
                  })} */}
          {/* </Box>
            </Box>
          )} */}
          {/* Language Section End */}
        </Box>
      </Box>
    </Box>
  );
};

export default TemplateOne;
