import { useState, useEffect } from 'react';
import { Box, Divider, Paper, Typography, Skeleton } from '@mui/material';
import { useTranslation } from 'next-i18next';
import SkillCourses from '~/shared/components/SkillCourses';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import ProfessionalHelp from '../ProfessionalHelp';
import { useStyles } from './BridgeSkillGapsStyles';
// import { getUserData } from '../../Onboarding/Utils/OnboardingUtils';
import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';
import { getStorageItem } from '~/shared/utils/storage';

// Helper function to check if image has valid extension and return dummy if not
const getValidImageUrl = (imageUrl: string): string => {
  const validExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg', '.bmp'];
  const dummyImage = '/image/default-course.png'; // Default dummy image path

  if (!imageUrl || typeof imageUrl !== 'string') {
    return dummyImage;
  }

  const hasValidExtension = validExtensions.some((ext) => imageUrl.toLowerCase().includes(ext));

  return hasValidExtension ? imageUrl : dummyImage;
};

export interface SkillGapsInter {
  id: string;
  skill: string;
}

// export interface SkillCoursesInter {
//   id: string;
//   title: string;
//   subTitle: string;
//   image: string;
//   skills: string;
//   course_link: string;
//   course_type: string;
// }
export interface SkillCoursesInterRapid {
  id: number;
  metadata: {
    name: string;
    description: string;
    image: string;
    url: string;
    category: string;
  }[];
  skill: string;
}

interface Course {
  id: number;
  title: string;
  subTitle: string;
  image: string;
  skills: string;
  course_link: string;
  course_type: string;
}
const BridgeSkillGaps = () => {
  const styles = useStyles();
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_DOWNLOAD);
  const [skillsToggle, setSkillsToggle] = useState<string[]>([]);
  // const [skillCourses, setSkillCourses] = useState([]);
  const [skillCourses, setSkillCourses] = useState<Course[]>([]);

  const dummyData2 = [
    {
      courses: [
        {
          course_link: 'https://www.youtube.com/watch?v=z9oEbG1GhqM',
          course_type: 'Career Development',
          created_at: '2025-04-24T15:32:22.832444',
          id: 'db5ad28a-4411-4b36-8c3e-ca0eaf2b1fd3',
          image: 'https://i.ytimg.com/vi/z9oEbG1GhqM/hqdefault.jpg',
          instructor_name: null,
          matched_skills: ['how to create a resume'],
          provider: null,
          ratings: null,
          sector: null,
          skills: 'how to create a resume',
          title: 'Resume Writing Help (Full Tutorial with Templates, Tips, Examples)'
        }
      ]
    }
  ];

  // → the same array shape, but each .courses array now only has
  //   courses that include "Time Management"

  // → an array of all courses where matched_skills contains "Data Analysis"

  // useEffect(() => {
  //   const fetchUserDetails = async () => {
  //     const res = await getUserData();
  //     if (res.status === API_STATUS.SUCCESS) {
  //       if (res.data && res.data.user_skill_gaps) {
  //         const skillsGaps = res.data.user_skill_gaps.map((item: SkillGapsInter) => {
  //           return item.name;
  //         });
  //         setSkillsToggle(skillsGaps);
  //       }
  //     }
  //   };
  //   fetchUserDetails();
  // }, []);

  // useEffect(() => {
  //   const fetchUserCourses = async () => {
  //     const res = await getUserCourses();
  //     // console.log(res, 'res');
  //     if (res.status === API_STATUS.SUCCESS) {
  //       if (res.data && res.data.length) {
  //         const courses = res.data.map((item: SkillCoursesInter) => {
  //           // console.log(item, 'item');
  //           const reqireObj = {
  //             id: item.id,
  //             title: item.title,
  //             subTitle: item.title,
  //             image: item.image,
  //             skills: item.skills,
  //             course_link: item.course_link,
  //             course_type: item.course_type
  //           };
  //           return reqireObj;
  //         });

  //         setSkillCourses(courses);
  //       }
  //     }
  //   };
  //   fetchUserCourses();
  // }, []);
  //get Course using Rapid API
  // const queryStringSkill = skillsToggle.map((skl) => `skills=${encodeURIComponent(skl)}`).join('&');
  // const apiUrl = `${APIS.RAPID_COURSES_API}?${queryStringSkill}`;
  // const getUserCourseRapid = async () => {
  //   const request = {
  //     url: apiUrl,
  //     method: API_METHOD.GET
  //   };
  //   const response = await httpRequest(request);
  //   if (response[0] !== null) {
  //     return {
  //       status: API_STATUS.SUCCESS,
  //       data: response[0]?.res_data?.data,
  //       message: response[0]?.res_data?.message
  //     };
  //   } else {
  //     const errorMessage = response[1]?.err?.response?.responseMessage;
  //     return {
  //       status: API_STATUS.FAILED,
  //       data: null,
  //       message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
  //     };
  //   }
  // };
  //end

  useEffect(() => {
    if (skillsToggle.length == 0) {
      /* eslint-disable */
      const lastResumeId: any = getStorageItem({ key: 'lastResumeId', useCombineStorage: true });
      const getapiUrl = `${APIS.RAPID_COURSES_API}?user_resume_id=${encodeURIComponent(lastResumeId)}`;
      /* eslint-enable */
      const fetchUserCourses = async () => {
        // const queryStringSkill = skillsToggle
        //   .map((skl) => `skills=${encodeURIComponent(skl)}`)
        //   .join('&');
        const apiUrl = getapiUrl;
        // const apiUrl = `${APIS.RAPID_COURSES_API}`;
        const request = {
          url: apiUrl,
          method: API_METHOD.GET
        };
        const res = await httpRequest(request);
        // console.log('res[0]?.res_data?.data', res[0]?.res_data?.data.courses);
        if (res[0] !== null && res[0]?.res_data?.data.courses.length > 0) {
          /* eslint-disable */

          // console.log('res[0].res_data.data[0]',res[0].res_data.data)
          const allCourses = res[0].res_data.data.courses.flatMap((item: any) => item);

          // 2) gather each unique skill
          const uniqueSkills = Array.from(
            new Set(allCourses.flatMap((c: any) => c.matched_skills))
          );

          // 3) assign each skill an index-based ID (starting from 1, or whatever offset you like)
          const skillToId: any = uniqueSkills.reduce((map: any, skill: any, idx: any) => {
            map[skill] = idx + 1; // or idx if you prefer zero-based
            return map;
          }, {});

          // 4) now produce your final array
          const formatted = Object.entries(
            allCourses.reduce(
              (acc: Record<string, any[]>, course: { matched_skills: string[] }) => {
                course.matched_skills.forEach((skill: string) => {
                  if (!acc[skill]) acc[skill] = [];
                  acc[skill].push(course);
                });
                return acc;
              },
              {}
            )
          ).flatMap(([skill, courses]: [string, any]) => {
            const id = skillToId[skill];
            return courses.map((course: any) => ({
              id,
              title: course.title,
              subTitle: course.skills,
              image: getValidImageUrl(course.image),
              skills: skill.toLowerCase(),
              course_link: course.course_link,
              course_type: course.course_type
            }));
          });

          // 1) extract the raw array of skills (with duplicates)
          const skillsGaps = formatted.map((item) => item.skills);
          // 2) use a Set to drop duplicates, then back to an array
          const getuniqueSkills = Array.from(new Set(skillsGaps));
          setSkillsToggle(getuniqueSkills);
          /* eslint-enable */
          // console.log('courses', formatted);
          setSkillCourses(formatted);
        } else {
          // Use dummy data if res does not have data
          /* eslint-disable */
          const allCourses = dummyData2.flatMap((item: any) => item.courses);

          // 2) gather each unique skill
          const uniqueSkills = Array.from(
            new Set(allCourses.flatMap((c: any) => c.matched_skills))
          );

          // 3) assign each skill an index-based ID (starting from 1, or whatever offset you like)
          const skillToId: any = uniqueSkills.reduce((map: any, skill: any, idx: any) => {
            map[skill] = idx + 1; // or idx if you prefer zero-based
            return map;
          }, {});

          // 4) now produce your final array
          const formatted = Object.entries(
            allCourses.reduce(
              (acc: Record<string, any[]>, course: { matched_skills: string[] }) => {
                course.matched_skills.forEach((skill: string) => {
                  if (!acc[skill]) acc[skill] = [];
                  acc[skill].push(course);
                });
                return acc;
              },
              {}
            )
          ).flatMap(([skill, courses]: [string, any]) => {
            const id = skillToId[skill];
            return courses.map((course: any) => ({
              id,
              title: course.title,
              subTitle: course.skills,
              image: getValidImageUrl(course.image),
              skills: skill.toLowerCase(),
              course_link: course.course_link,
              course_type: course.course_type
            }));
          });

          // 1) extract the raw array of skills (with duplicates)
          const skillsGaps = formatted.map((item) => item.skills);
          // 2) use a Set to drop duplicates, then back to an array
          const getuniqueSkills = Array.from(new Set(skillsGaps));
          setSkillsToggle(getuniqueSkills);
          /* eslint-enable */
          // console.log('formatted', formatted);

          setSkillCourses(formatted); // Set dummy data
        }
      };
      fetchUserCourses();
    }
  }, []);
  //End

  return (
    <Box component={Paper} display="flex" flexDirection={'column'} gap={2} p={2} height="100%">
      <Typography className={styles.heading}>{i18n('bridgeYourSkill')}</Typography>
      <Typography className={styles.subtitle}>{i18n('recommendedCourses')}</Typography>
      {skillsToggle.length === 0 ? (
        <>
          <Skeleton />
          <Skeleton animation="wave" />
          <Skeleton animation={false} />
        </>
      ) : (
        <SkillCourses skillsCardData={skillCourses} skillsToggle={skillsToggle} />
      )}
      <Divider />
      <ProfessionalHelp />
    </Box>
  );
};
export default BridgeSkillGaps;
