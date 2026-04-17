import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import {
  EducationalDetails,
  ResumeContent,
  WorkExperienceDetails,
  // ProjectsDetails,
  ProfessionalDevelopmentDetails,
  AchievementsDetails
  // LanguageDetails,
  // AdditionallinksDetails
} from '~/modules/ResumeDownload/Utils/ResumeDownloadUtils';
//import { LINKEDIN } from '~/shared/constants/constants';
import { useStyles } from './PreviewTemplateTwoStyles';
import Fab from '@mui/material/Fab';
import { makeStyles } from '@mui/styles';
const useStylesEdit = makeStyles(() => ({
  fabIcon: {
    position: 'fixed',
    bottom: '80px',
    right: '20px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#424246 ',
    '&:hover': {
      backgroundColor: '#424246 '
    }
  },
  iconContainer: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center'
  },
  image: {
    position: 'absolute',
    width: '55px',
    height: '25px'
  }
}));
import Image from 'next/image';
import Link from 'next/link';
import { ROUTES } from '~/shared/constants/routes';
interface TemplateProps {
  resumeContent: ResumeContent;
}
interface Experience {
  bullet_points?: string[];
  [key: string]: string | string[] | undefined; // Allow other fields of type string or string[]
}
const PreviewTemplateTwo: React.FC<TemplateProps> = ({
  resumeContent: {
    basic_details: {
      first_name: firstName,
      last_name: lastName,
      designation,
      phone,
      email,
      state,
      country
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
  const classes = useStylesEdit();
  const getYear = (dateString: string): number | null => {
    const date = new Date(dateString);
    return isNaN(date.getFullYear()) ? null : date.getFullYear();
  };
  const formatPhoneNumber = (phoneNumber: string) => {
    const cleaned = phoneNumber.replace(/\D/g, '');
    if (cleaned.length !== 10) {
      return phoneNumber;
    }
    // Extract parts of the phone number
    const countryCode = '+91';
    const areaCode = cleaned.substring(0, 3);
    const part1 = cleaned.substring(3, 5);
    const part2 = cleaned.substring(5, 7);
    const remaining = cleaned.substring(7);
    // Format the phone number
    return `${countryCode}-(${areaCode})-${part1}-${part2} ${remaining}`;
  };
  //replace None or none from array
  const replaceNoneValues = (obj: Record<string, unknown>): Record<string, unknown> => {
    // Iterate over the object properties
    for (const key in obj) {
      if (obj.hasOwnProperty(key)) {
        const value = obj[key];

        // Check if the value is a string
        if (typeof value === 'string') {
          // Convert value to lowercase for case-insensitive comparison
          const lowerCaseValue = value.toLowerCase();

          // Replace if the value is exactly "none", "n/a", or contains these patterns (e.g., "None - None")
          if (lowerCaseValue === 'none' || lowerCaseValue === 'n/a') {
            obj[key] = '';
          } else if (lowerCaseValue.includes('none') || lowerCaseValue.includes('n/a')) {
            // If the string contains "none" or "n/a", replace those with empty strings
            obj[key] = lowerCaseValue
              .replace(/none|n\/a/gi, '') // Replace "none" and "n/a"
              .trim()
              .replace(/\s*-\s*/g, ' ') // Replace " - " with a space (you can change this to another character)
              .replace(/\s+/g, ' '); // Ensure no extra spaces are left
          }
        } else if (typeof value === 'object' && value !== null) {
          // Recursively call the function if it's an object (but not null)
          replaceNoneValues(value as Record<string, unknown>);
        } else if (Array.isArray(value)) {
          // If it's an array, iterate over its elements
          obj[key] = value.map((item: unknown) => {
            // Check if the item is a string
            if (typeof item === 'string') {
              const itemValue = item.toLowerCase();
              if (itemValue === 'none' || itemValue === 'n/a') {
                return '';
              } else if (itemValue.includes('none') || itemValue.includes('n/a')) {
                // Replace "none" or "n/a" within the string
                return itemValue
                  .replace(/none|n\/a/gi, '') // Replace "none" and "n/a"
                  .trim()
                  .replace(/\s*-\s*/g, ' ') // Replace " - " with a space (or another character)
                  .replace(/\s+/g, ' '); // Ensure no extra spaces are left
              }
            } else if (typeof item === 'object' && item !== null) {
              // Recursively call the function for nested objects
              return replaceNoneValues(item as Record<string, unknown>);
            }
            return item; // Return non-string items unchanged
          });
        }
      }
    }
    return obj;
  };

  const areAllFieldsFilled = (arrayData: Experience[]): boolean => {
    // Modify each experience object in the array
    const modifiedArray = arrayData.map((experience) => replaceNoneValues(experience));

    // Check if the modified array is valid
    if (!Array.isArray(modifiedArray) || modifiedArray.length === 0) {
      return false;
    }

    // Function to check if all fields in an object are empty
    const isAllFieldsEmpty = (experience: Experience): boolean => {
      return Object.entries(experience).every(([key, value]) => {
        if (key === 'bullet_points') {
          return Array.isArray(value) && value.every((item) => item === '');
        } else {
          return value === '';
        }
      });
    };

    // Check each experience object in the array
    return modifiedArray.some((experience) => {
      // Check if experience is defined and is an object
      if (!experience || typeof experience !== 'object') {
        return false;
      }
      // Return true if at least one experience has non-empty fields
      return !isAllFieldsEmpty(experience as Experience); // Assert as Experience type
    });
  };

  //handle 'none', 'n/a','na'
  const isValidValue = (value: string | undefined | null): string | null => {
    const invalidValues = ['none', 'n/a', 'na'];
    return value && !invalidValues.includes(value.toLowerCase()) ? value : null;
  };
  const degreeAllBlank = education_details.every((detail) => detail.degree_name === '');
  return (
    <Box className={styles.container}>
      <Link href={ROUTES.RESUME_CUSTOMIZE}>
        <Fab color="primary" aria-label="edit" className={classes.fabIcon}>
          <div className={classes.iconContainer}>
            <Image
              src="/image/editIcon.svg"
              alt="Edit Icon Missing"
              width={5}
              height={10}
              className={classes.image}
            />
          </div>
        </Fab>
      </Link>
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
            {(email || phone || country || state) && (
              <Typography variant="body1" className={styles.emailSection}>
                {email && isValidValue(email) && email}
                {phone && isValidValue(phone) && ` / ${formatPhoneNumber(phone)}`}
                {state && isValidValue(state) && `${state},`}
                {country && isValidValue(country) && ` / ${country}`}
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
                        description
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
                          {/* {company && (
                            <Typography
                              className={styles.workshopSectionUniversityCompany}
                              textAlign="justify"
                            >
                              {company}
                            </Typography>
                          )} */}
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

                          {isValidYear(achievement_date) && (
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
                          )}
                          {/* {(location || (achievement_date && isValidYear(achievement_date))) && (
                            <Typography
                              variant="body1"
                              className={styles.achievementSectionLocation}
                              textAlign="justify"
                            >
                              {location}
                              {location && isValidYear(achievement_date) && ' - '}
                              {isValidYear(achievement_date) ? achievement_date : ''}
                            </Typography>
                          )} */}
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

export default PreviewTemplateTwo;
