import { Box, Typography, List, ListItem, ListItemText } from '@mui/material';
import React from 'react';
import {
  EducationalDetails,
  ResumeContent,
  WorkExperienceDetails,
  ProfessionalDevelopmentDetails,
  FinalProjectDetails,
  // AchievementsDetails,
  ReactiveResumeContent,
  RRAwardDetails,
  RRCertificationDetails
  // RRLanguageDetails,
  // RRProjectDetails
} from '~/modules/ResumeDownload/Utils/ResumeDownloadUtils';
//import { LINKEDIN } from '~/shared/constants/constants';
import { useStyles } from './DefaultTemplateReactiveResumeStyles';

import {
  getYear,
  areAllFieldsFilled,
  isValidValue,
  formatPhoneNumberNineOne
} from '../TemplateHelper';
//import EditIcon from '~/shared/components/EditIcon';
import PulseEditButton from '~/shared/components/PulseEditButton';
// import LocationOnOutlinedIcon from '@mui/icons-material/LocationOnOutlined';
// import CallIcon from '@mui/icons-material/Call';
// import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
// import Image from 'next/image'; // Correct import for Next.js

// Define the Project interface

interface TemplateProps {
  resumeContent: ResumeContent;
  reactiveResumeContent: ReactiveResumeContent;
}

// Initialize FinalProjects with the correct type
// const FinalProjects1: Project[] = []; // Explicitly define the type

const DefaultTemplateReactiveResume: React.FC<TemplateProps> = ({
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
    project_details,
    FinalProjects,
    // projects,
    professional_development
    // achievements_details
    // language
  },
  //reactive resume -start
  reactiveResumeContent: {
    basics: { headline, location },
    sections: {
      awards,
      certifications
      // profiles
      // references
      // projects,
    }
  }
}) => {
  const styles = useStyles();

  // ----------------------------------TEST DUMMY DATA -START ----------------------------------

  // const degreeAllBlank = education_details.every((detail) => detail.degree_name === '');
  // const getSkillLevel = (level: string) => {
  //   const chnagelevel = Number(level);
  //   const skillLevels = [
  //     'Beginner', // 0
  //     'Developing', // 1
  //     'Intermediate', // 2
  //     'Advanced', // 3
  //     'Expert', // 4
  //     'Mastery' // 5
  //   ];

  //   // Check if the level is within the valid range (0-5)
  //   return chnagelevel >= 0 && chnagelevel <= 5 ? skillLevels[chnagelevel] : '------';
  // };

  // console.log('project_details',project_details)
  const projects = project_details;

  // Function to convert a string to title case
  const toTitleCase = (str: string): string => {
    return str
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
  };

  // Function to format date
  // const formatDate = (dateString: string): string => {
  //   const date = new Date(dateString);
  //   const options: Intl.DateTimeFormatOptions = { month: 'long', year: 'numeric' };
  //   return date.toLocaleDateString('en-US', options);
  // };

  // Function to build project description
  /* eslint-disable */
  const buildDescription = (project: any): string => {
    /* eslint-enable */

    const starFormat: string[] = project.star_format || [];
    const company = toTitleCase(project.company || '');
    const role = toTitleCase(project.role || '');
    // const isCurrent = toTitleCase(project.is_current || '');
    const teamSize = toTitleCase(project.team_size || '');

    const description = starFormat.filter((bp) => bp).join(', ');
    let finalDescription = '';

    if (company) finalDescription += `${company}\n `;
    if (role) finalDescription += `${role}\n `;
    // if (isCurrent) finalDescription += `Is current project? ${isCurrent}\n `;
    if (teamSize) finalDescription += `Team size ${teamSize}\n `;
    if (description) finalDescription += description.trim();

    return finalDescription.replace(/\n+$/, ''); // Remove trailing newlines
  };

  // Function to process projects
  /* eslint-disable */
  const processProjects = (projects: any[]) => {
    /* eslint-enable */

    const FinalProjects1: any[] = []; // eslint-disable-line @typescript-eslint/no-explicit-any

    projects.forEach((project) => {
      const title = toTitleCase(project.title || '');
      const startDate = project.start_date || '';
      const endDate = project.end_date || '';
      // const date = (startDate || endDate)
      //   ? `${formatDate(startDate)} ${formatDate(endDate)}`.trim()
      //   : "";
      const date = startDate ? `${startDate} - ${endDate}`.trim() : '';

      const finalDescription = buildDescription(project);

      // Process technologies into keywords
      const technologies: string[] = project.technologies || [];
      const keywords = technologies.filter((tech) => tech).join(', ');

      // Merge bullet_points with responsibility if they exist
      const responsibility: string[] = project.responsibility || [];
      const bulletPoints: string[] = [...(project.bullet_points || []), ...responsibility];

      // Append the new project entry to FinalProjects1
      FinalProjects1.push({
        name: title ? `\n${title}` : '',
        date: date,
        keywords: keywords,
        description: finalDescription,
        bullet_points: bulletPoints
      });
    });

    return FinalProjects1;
  };

  // Check if projects are empty
  // if (projects) {
  //   const allEmpty = projects.every((project) =>
  //     Object.values(project).every((value) => String(value).trim() === '')
  //   );

  // if (allEmpty) {
  //   const is_Projects = false; // Handle the case where all projects are empty
  // }

  // Process the projects and assign to FinalProjects
  if (projects) {
    FinalProjects = processProjects(projects);
  }
  // console.log('FinalProjects', FinalProjects);

  return (
    <Box className={styles.container}>
      <PulseEditButton />
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
          {headline && isValidValue(headline) && (
            <Box className={styles.displayColumn} gap="15px">
              <Box>
                <Typography variant="body1" className={styles.headlineSection}>
                  {headline}
                </Typography>
              </Box>
            </Box>
          )}
          {designation && isValidValue(designation) && (
            <Box className={styles.displayColumn} gap="15px">
              <Box>
                <Typography variant="body1" className={styles.headlineSection}>
                  {designation}
                </Typography>
              </Box>
            </Box>
          )}

          {location && isValidValue(location) && (
            <Box className={styles.displayColumn} gap="15px">
              <Box>
                <Typography variant="body1" className={styles.locationSection}>
                  {location}
                </Typography>
              </Box>
            </Box>
          )}
          <Box className={`${styles.personalDetail} ${styles.displayColumn}`}>
            {email && (
              <Typography variant="body1" className={styles.emailSection}>
                {/* Align icon with text and set green color */}
                {/* <AlternateEmailIcon sx={{ color: 'green', marginRight: 1 }} /> */}
                {isValidValue(email) && email}
              </Typography>
            )}
            {phone && (
              <Typography variant="body1" className={styles.emailSection}>
                {/* Align icon with text and set green color */}
                {/* <CallIcon sx={{ color: 'green', marginRight: 1 }} /> */}
                {isValidValue(phone) && formatPhoneNumberNineOne(phone)}
              </Typography>
            )}
          </Box>

          {/* Profiles start */}
          {/* {profiles && areAllFieldsFilled(profiles?.items) && (
            <Box className={styles.divider}></Box>
          )}
          {areAllFieldsFilled(profiles?.items) && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="h5" className={styles.sectionHeading}>
                {typeof profiles != 'undefined' &&
                profiles != null &&
                profiles.items?.length != null &&
                profiles.items?.length > 0
                  ? 'Profiles'
                  : ''}
              </Typography>
              <Box className={styles.profileInfo}>
                {profiles.items.map(
                  (profile) =>
                    profile.username && (
                      <>
                        <Box key={profile.id} className={styles.profileIcon}>

                          {profile.network === 'LinkedIn' && (
                            <Image
                              src={profile.icon} 
                              alt={`${profile.network} icon`}
                              width={24} 
                              height={24}
                            />
                          )}
                          {profile.network === 'GitHub' && (
                            <Image
                              src={profile.icon}
                              alt={`${profile.network} icon`}
                              width={24} 
                              height={24}
                            />
                          )}
                          {profile.network === 'StackOverflow' && (
                            <Image
                              src={profile.icon}
                              alt={`${profile.network} icon`}
                              width={24} 
                              height={24}
                            />
                          )}
                        </Box>
                        <Typography variant="body1">
                          {profile.username}
                        </Typography>
                      </>
                    )
                )}
              </Box>
            </Box>
          )} */}
          {/* Profiles end */}

          {/* Summary Start */}
          {professional_summary && <Box className={styles.divider}></Box>}
          <Box className={styles.displayColumn} gap="15px">
            <Typography variant="body1" className={styles.sectionHeading}>
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

          {/* Experience Start */}
          {areAllFieldsFilled(work_experience) && <Box className={styles.divider}></Box>}
          {areAllFieldsFilled(work_experience) && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="body1" className={styles.sectionHeading}>
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
                    { bullet_points, company, title, location, date }: WorkExperienceDetails,
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
                            {company}
                          </Typography>
                        )}
                        {location && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionCompany}
                            textAlign="justify"
                          >
                            {location}
                          </Typography>
                        )}

                        {date && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionCompany}
                            textAlign="justify"
                            mb={1}
                          >
                            {date}
                          </Typography>
                        )}

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

          {/* Project Start */}
          {typeof FinalProjects != 'undefined' &&
            FinalProjects != null &&
            FinalProjects.length != null &&
            FinalProjects.length > 0 && <Box className={styles.divider}></Box>}
          {FinalProjects && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="body1" className={styles.sectionHeading}>
                {typeof FinalProjects != 'undefined' &&
                FinalProjects != null &&
                FinalProjects.length != null &&
                FinalProjects.length > 0
                  ? 'Projects'
                  : ''}
              </Typography>

              <Box className={styles.workDetail}>
                {FinalProjects.map(
                  (
                    { bullet_points, date, name, keywords, description }: FinalProjectDetails,
                    index: number
                  ) => {
                    return (
                      <Box key={`${index}-${name}`} mb={1}>
                        {name && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionTitle}
                            textAlign="justify"
                          >
                            {' '}
                            {name}
                          </Typography>
                        )}

                        {date && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionCompany}
                            textAlign="justify"
                            mb={1}
                          >
                            {date}
                          </Typography>
                        )}
                        {keywords && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionCompany}
                            textAlign="justify"
                          >
                            {keywords}
                          </Typography>
                        )}

                        {description && (
                          <Typography
                            variant="body1"
                            className={styles.experinceSectionDesc}
                            textAlign="justify"
                          >
                            {description.split('\n').map((line: string, index: number) => (
                              <span key={index}>
                                {line}
                                <br />
                              </span>
                            ))}
                          </Typography>
                        )}
                        <List>
                          {bullet_points
                            ?.filter((item: string) => item && item.trim() !== '') // Filter out empty or blank bullet points
                            .map((item: string, idx: number) => (
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
          {/* Project End */}

          {/* Education Start */}
          {areAllFieldsFilled(education_details) && <Box className={styles.divider}></Box>}
          {areAllFieldsFilled(education_details) && (
            <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
              <Typography variant="body1" className={styles.sectionHeading}>
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
                      {/* {degree_name && (
                        <> */}
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
                      {/* </>
                      )} */}
                    </Box>
                  );
                }
              )}
            </Box>
          )}
          {/* Education End */}

          {/* Professional Development Start */}
          {areAllFieldsFilled(professional_development) && <Box className={styles.divider}></Box>}
          {areAllFieldsFilled(professional_development) && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="body1" className={styles.sectionHeading}>
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

          {/* Custom Section Start */}

          {/* Custom Section End */}

          {/* Skills Start */}
          {skills &&
            (skills.professional_skills.length > 0 || skills.technical_skills.length > 0) && (
              <Box className={styles.divider}></Box>
            )}

          {skills && [...skills.professional_skills, ...skills.technical_skills].length > 0 && (
            <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
              <Typography variant="body1" className={styles.sectionHeading}>
                {'Skills'}
              </Typography>
              {/* <Typography
                variant="body1"
                className={styles.techandProfesSkill}
                key={'sf-4445'}
                sx={{ textAlign: 'justify' }}
              >
                {[...skills.technical_skills, ...skills.professional_skills].join(', ')}
              </Typography> */}
              {skills.technical_skills.length > 0 && (
                <Box className={styles.professionalSkillsRow}>
                  <Typography
                    variant="body1"
                    className={styles.ProfTechSkillTitle}
                    textAlign="justify"
                  >
                    {'Technical Skills:'}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={styles.techandProfesSkill}
                    key={'sf-4445'}
                    sx={{ textAlign: 'justify' }}
                  >
                    {[...skills.technical_skills].join(', ')}
                  </Typography>
                </Box>
              )}
              {skills.professional_skills.length > 0 && (
                <Box className={styles.professionalSkillsRow}>
                  <Typography
                    variant="body1"
                    className={styles.ProfTechSkillTitle}
                    textAlign="justify"
                  >
                    {'Professional Skills:'}
                  </Typography>
                  <Typography
                    variant="body1"
                    className={styles.techandProfesSkill}
                    key={'sf-4445'}
                    sx={{ textAlign: 'justify' }}
                  >
                    {[...skills.professional_skills].join(', ')}
                  </Typography>
                </Box>
              )}
            </Box>
          )}

          {/* Skills End */}
          {/* Certifications Section Start */}
          {areAllFieldsFilled(certifications?.items) && certifications?.items[0].name != '' && (
            <Box className={styles.divider}></Box>
          )}
          {areAllFieldsFilled(certifications?.items) && certifications?.items[0].name != '' && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="body1" className={styles.sectionHeading}>
                {typeof certifications != 'undefined' &&
                certifications != null &&
                certifications?.items.length != null &&
                certifications?.items.length > 0 &&
                certifications?.items[0].name != ''
                  ? 'Certifications'
                  : ''}
              </Typography>
              <Box className={styles.workDetail}>
                {certifications &&
                  certifications?.items.map(
                    ({ name, issuer, date, summary }: RRCertificationDetails, index: number) => {
                      const isValidYear = (date: string) => {
                        const year = parseInt(date, 10);
                        return year > 0 && !isNaN(year);
                      };
                      return (
                        <Box key={`${index}-${summary}`} mb={3}>
                          {name && (
                            <Typography
                              className={styles.achievementSectionSummary}
                              textAlign="justify"
                            >
                              {name}
                            </Typography>
                          )}
                          {/* {title && (
                            <Typography
                              className={styles.educationSectionPassing}
                              textAlign="justify"
                            >
                              {title}
                            </Typography>
                          )} */}
                          {(issuer || (date && isValidYear(date))) && (
                            <Typography
                              variant="body1"
                              className={styles.educationSectionPassing}
                              textAlign="justify"
                            >
                              {isValidYear(date) ? date : ''}
                              {issuer && isValidYear(date) && ' - '}
                              {issuer}
                            </Typography>
                          )}
                          {summary && (
                            <Typography
                              className={styles.educationSectionPassing}
                              textAlign="justify"
                              mt={1}
                            >
                              {summary}
                            </Typography>
                          )}
                        </Box>
                      );
                    }
                  )}
              </Box>
            </Box>
          )}
          {/* Certifications Section End */}

          {/* Awards Section Start */}
          {areAllFieldsFilled(awards?.items) && awards?.items[0].name != '' && (
            <Box className={styles.divider}></Box>
          )}
          {areAllFieldsFilled(awards?.items) && awards?.items[0].name != '' && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="body1" className={styles.sectionHeading}>
                {typeof awards != 'undefined' &&
                awards != null &&
                awards?.items.length != null &&
                awards?.items.length > 0 &&
                awards?.items[0].name != ''
                  ? 'Awards / Achievements'
                  : ''}
              </Typography>
              <Box className={styles.workDetail}>
                {awards &&
                  awards?.items.map(
                    ({ name, awarder, date, summary }: RRAwardDetails, index: number) => {
                      const isValidYear = (date: string) => {
                        const year = parseInt(date, 10);
                        return year > 0 && !isNaN(year);
                      };
                      return (
                        <Box key={`${index}-${summary}`} mb={3}>
                          {name && (
                            <Typography
                              className={styles.achievementSectionSummary}
                              textAlign="justify"
                            >
                              {name}
                            </Typography>
                          )}
                          {/* {title && (
                            <Typography
                              className={styles.achievementSectionSummary}
                              textAlign="justify"
                            >
                              {title}
                            </Typography>
                          )} */}
                          {(awarder || (date && isValidYear(date))) && (
                            <Typography
                              variant="body1"
                              className={styles.educationSectionPassing}
                              textAlign="justify"
                            >
                              {isValidYear(date) ? date : ''}
                              {awarder && isValidYear(date) && ' - '}
                              {awarder}
                            </Typography>
                          )}
                          {summary && (
                            <Typography
                              className={styles.educationSectionPassing}
                              textAlign="justify"
                              mt={1}
                            >
                              {summary}
                            </Typography>
                          )}
                        </Box>
                      );
                    }
                  )}
              </Box>
            </Box>
          )}
          {/* Awards Section End */}

          {/* References Section Start */}
          {/* {references?.items?.length > 0 && <Box className={styles.divider}></Box>}
          {references?.items?.length > 0 && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="body1" className={styles.sectionHeading}>
                {typeof references !== 'undefined' &&
                references != null &&
                references?.items?.length > 0
                  ? 'References'
                  : ''}
              </Typography>
              <Box className={styles.workDetail}>
                {references?.items.map((reference, index) => (
                  <Box key={index} mb={3}>
                    <Typography className={styles.techandProfesSkill} textAlign="justify">
                      {reference}
                    </Typography>
                  </Box>
                ))}
              </Box>
            </Box>
          )} */}

          {/* References Section End */}

          {/* Language Section Start */}
          {/* {areAllFieldsFilled(languages?.items) && (<Box className={styles.divider}></Box>)} */}
          {/* {areAllFieldsFilled(languages?.items) && (
            <Box className={styles.displayColumn} gap="15px">
              <Typography variant="h5" className={styles.sectionHeading}>
                {typeof languages != 'undefined' &&
                  languages != null &&
                  languages?.items.length != null &&
                  languages?.items.length > 0
                  ? 'Language'
                  : ''}
              </Typography>
              <Box className={styles.workDetail}>
                {languages &&
                  languages?.items.map(({ languages, level, description, name }: RRLanguageDetails, index: number) => {
                    return (
                      <Box key={`${index}-${languages}`} mb={3}>
                        {languages && (
                          <Typography className={styles.achievementSectionSummary} textAlign="justify">
                            {languages}
                          </Typography>
                        )}
                        {level && (
                          <Typography
                            variant="body1"
                            className={styles.languageSectionLevel}
                            textAlign="justify"
                          >
                            {getSkillLevel(level)}
                          </Typography>
                        )}
                      </Box>
                    );
                  })}
              </Box>
            </Box>
          )} */}
          {/* Language Section End */}

          {/* Achievments/Awards Start */}
          {/* {areAllFieldsFilled(achievements_details) && <Box className={styles.divider}></Box>} */}
          {/* {areAllFieldsFilled(achievements_details) && (
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
          )} */}
          {/* Achievments/Awards End */}
        </Box>
      </Box>
    </Box>
  );
};

export default DefaultTemplateReactiveResume;
