import { Document, Page, Text, View } from '@react-pdf/renderer';
import React from 'react';
//import { LINKEDIN } from '~/shared/constants/constants';
import {
  EducationalDetails,
  ResumeContent,
  WorkExperienceDetails,
  ProjectsDetails,
  ProfessionalDevelopmentDetails
} from '../../../Utils/ResumeDownloadUtils';
import { styles } from './ResumeTemplateOneStyles';
interface ResumeProps {
  resumeContent: ResumeContent;
}

const ResumeTemplateOne: React.FC<ResumeProps> = ({
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
  return (
    <Document>
      <Page size="A4" style={{ ...styles.page, ...styles.pdfSpace }}>
        {/* sidebar details */}
        <View style={styles.sidebarDetail}>
          <Text style={{ ...styles.pdfNameStyle, ...styles.sidebarHeading }}>{firstName}</Text>
          <Text
            style={{ ...styles.pdfNameStyle, ...styles.sidebarHeading, ...styles.lastNameStyle }}
          >
            {lastName}
          </Text>
          <Text style={{ ...styles.pdfRoleTextStyle, ...styles.sidebarSubHeading }}>
            {designation}
          </Text>
          <View style={styles.sidebarDivider}></View>
          <View style={{ ...styles.pdfPersonalDetail, ...styles.personalDetail }}>
            {phone && (
              <Text style={{ ...styles.pdfContactStyle, ...styles.personalHeading }}>{phone}</Text>
            )}
            {email && (
              <Text style={{ ...styles.pdfContactStyle, ...styles.personalHeading }}>{email}</Text>
            )}

            {additional_links &&
              additional_links.map((item, i) => {
                return (
                  <Text
                    key={i}
                    style={{
                      ...styles.pdfContactStyle,
                      ...styles.personalHeading,
                      ...styles.additionalUrl
                    }}
                  >
                    {item.social_url}
                  </Text>
                );
              })}

            {country ||
              (state && (
                <Text style={{ ...styles.pdfContactStyle, ...styles.personalHeading }}>
                  {state && `${state} ,`}
                  {country}
                </Text>
              ))}
          </View>
          <View style={styles.educationDetail}>
            {education_details.length > 0 && (
              <>
                <Text style={{ ...styles.pdfDetailHeading, ...styles.detailHeading }}>
                  {typeof education_details != 'undefined' &&
                  education_details != null &&
                  education_details.length != null &&
                  education_details.length > 0
                    ? 'Education'
                    : ''}
                </Text>
                {education_details.map(
                  (
                    { degree_type, degree_name, institute, passing_year }: EducationalDetails,
                    index: number
                  ) => {
                    return (
                      <View
                        style={styles.personalDetail}
                        key={`${degree_type}-${degree_name}-${index}`}
                      >
                        <Text style={{ ...styles.pdfContactStyle, ...styles.detailSubHeading }}>
                          {degree_type}
                        </Text>
                        <Text style={{ ...styles.pdfContactStyle, ...styles.detailText }}>
                          {degree_name}
                        </Text>
                        <Text style={{ ...styles.pdfContactStyle, ...styles.detailText }}>
                          {institute}
                        </Text>
                        <Text style={{ ...styles.pdfContactStyle, ...styles.detailText }}>
                          {passing_year}
                        </Text>
                      </View>
                    );
                  }
                )}
              </>
            )}
          </View>
          <View style={styles.educationDetail}>
            {[...skills.professional_skills, ...skills.technical_skills].length < 11 ? (
              <>
                <Text style={{ ...styles.pdfDetailHeading, ...styles.detailHeading }}>
                  {typeof skills != 'undefined' && skills != null ? 'Expertise' : ''}
                </Text>
                <View style={styles.expertiseDetail}>
                  {[...skills.professional_skills, ...skills.technical_skills].map(
                    (skills: string, index: number) => {
                      return (
                        <>
                          <Text
                            style={{ ...styles.pdfContactStyle, ...styles.detailText }}
                            key={`${skills}-${index}`}
                          >
                            {skills}
                          </Text>
                        </>
                      );
                    }
                  )}
                </View>
              </>
            ) : (
              <>
                <Text style={{ ...styles.pdfDetailHeading, ...styles.detailHeading }}>
                  {typeof skills != 'undefined' && skills != null ? 'Expertise' : ''}
                </Text>
                <View style={styles.expertiseDetail}>
                  <Text
                    style={{ ...styles.pdfContactStyle, ...styles.detailTextAlign }}
                    key={'professional_skills-544'}
                  >
                    {[...skills.professional_skills, ...skills.technical_skills].join(', ')}
                  </Text>
                </View>
              </>
            )}
          </View>
        </View>
        {/* professional details */}
        <View style={styles.column}>
          <View style={styles.contentDetail}>
            <View style={styles.profileWork}>
              <Text style={{ ...styles.pdfDetailHeading, ...styles.detailHeading }}>
                {typeof professional_summary != 'undefined' &&
                professional_summary != null &&
                professional_summary.length != null &&
                professional_summary.length > 0
                  ? 'professional profile'
                  : ''}
              </Text>
              <Text style={{ ...styles.pdfContactStyle, ...styles.detailText }}>
                {professional_summary}
              </Text>
            </View>
            <View style={styles.divider}></View>
            <View style={styles.profileWork}>
              <Text style={{ ...styles.pdfDetailHeading, ...styles.detailHeading }}>
                {typeof work_experience != 'undefined' &&
                work_experience != null &&
                work_experience.length != null &&
                work_experience.length > 0
                  ? 'work experience'
                  : ''}
              </Text>
              {work_experience.map(
                (
                  { bullet_points, company, date, description, title }: WorkExperienceDetails,
                  index: number
                ) => {
                  return (
                    <View style={styles.profileWorkDetail} key={`${company}-${date}-${index}`}>
                      <Text style={{ ...styles.pdfContactStyle, ...styles.detailSubHeading }}>
                        {title} / {company}
                      </Text>
                      <Text style={{ ...styles.pdfContactStyle, ...styles.companyDetailText }}>
                        {date}
                      </Text>
                      <View style={styles.aboutWorktext}>
                        <Text style={{ ...styles.pdfContactStyle, ...styles.contentWorkDetail }}>
                          {description}
                        </Text>
                        {bullet_points?.map((item: string, index: number) => {
                          return (
                            <View style={styles.listItem} key={`bulletPoints-${index}`}>
                              <View style={styles.bullet} />
                              <Text style={{ ...styles.pdfListItemText, ...styles.listItemText }}>
                                {item}
                              </Text>
                            </View>
                          );
                        })}
                      </View>
                    </View>
                  );
                }
              )}
            </View>

            {/* Projects */}

            <View style={styles.divider}></View>
            <View style={styles.profileWork}>
              <Text style={{ ...styles.pdfDetailHeading, ...styles.detailHeading }}>
                {typeof projects != 'undefined' &&
                projects != null &&
                projects.length != null &&
                projects.length > 0
                  ? 'Projects'
                  : ''}
              </Text>
              {projects.map(({ bullet_points, detail, name }: ProjectsDetails, index: number) => {
                return (
                  <View style={styles.profileWorkDetail} key={`${name}-${index}`}>
                    <Text style={{ ...styles.pdfContactStyle, ...styles.detailSubHeading }}>
                      {name}
                    </Text>
                    <View style={styles.aboutWorktext}>
                      <Text style={{ ...styles.pdfContactStyle, ...styles.contentWorkDetail }}>
                        {detail}
                      </Text>
                      {bullet_points?.map((item: string, index: number) => {
                        return (
                          <View style={styles.listItem} key={`bulletPoints-${index}`}>
                            <View style={styles.bullet} />
                            <Text style={{ ...styles.pdfListItemText, ...styles.listItemText }}>
                              {item}
                            </Text>
                          </View>
                        );
                      })}
                    </View>
                  </View>
                );
              })}
            </View>

            {/* Project close */}

            {/* Professional development */}
            <View style={styles.divider}></View>
            <View style={styles.profileWork}>
              <Text style={{ ...styles.pdfDetailHeading, ...styles.detailHeading }}>
                {typeof professional_development != 'undefined' &&
                professional_development != null &&
                professional_development.length != null &&
                professional_development.length > 0
                  ? 'Professional Development'
                  : ''}
              </Text>
              {professional_development &&
                professional_development.map(
                  (
                    { company, date, university, workshop }: ProfessionalDevelopmentDetails,
                    index: number
                  ) => {
                    return (
                      <View style={styles.profileWorkDetail} key={`${university}-${date}-${index}`}>
                        <Text style={{ ...styles.pdfContactStyle, ...styles.detailSubHeading }}>
                          {university ? university : ''}
                          {university && company ? '/' : ''} {company ? company : ''}
                        </Text>
                        <Text style={{ ...styles.pdfContactStyle, ...styles.companyDetailText }}>
                          {date}
                        </Text>
                        <View style={styles.aboutWorktext}>
                          <Text
                            style={{
                              ...styles.pdfContactStyleProfessional,
                              ...styles.contentWorkDetail
                            }}
                          >
                            {workshop}
                          </Text>
                        </View>
                      </View>
                    );
                  }
                )}
            </View>
            {/*  Professional development Close */}
          </View>
        </View>
      </Page>
    </Document>
  );
};

export default ResumeTemplateOne;
