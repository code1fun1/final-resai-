import { Box, Grid } from '@mui/material';
import { ChangeEvent, useEffect, useState } from 'react';
import CourseTile from '../CourseTile';
import TabGroup from '../TabGroup/TabGroup2';
import { useStyles } from './SkillCoursesStyles';
import { useTranslation } from 'next-i18next';
import { LOCALE_PAGE } from '~/shared/constants/constants';
// import Link from 'next/link';
interface SkillCoursesProps {
  // skillsCardData: { cardData: { id: number; title: string; subTitle: string; image: string }[] }[];
  skillsCardData: {
    id: number; //chnage string to number
    title: string;
    subTitle: string;
    image: string;
    skills: string;
    course_link: string;
    course_type: string;
  }[];
  skillsToggle: string[];
}

const SkillCourses: React.FC<SkillCoursesProps> = ({ skillsCardData, skillsToggle }) => {
  // console.log('skillsToggle',skillsToggle);
  // console.log('skillsCardData',skillsCardData);
  const [alignment, setAlignment] = useState(0);
  const [skillCoures, setSkillCourses] = useState<SkillCoursesProps['skillsCardData']>([]);
  const { t: i18n } = useTranslation(LOCALE_PAGE.AUTH);
  const handleChange = (event: ChangeEvent<{}>, newAlignment: number) => {
    setAlignment(newAlignment);
  };
  const styles = useStyles();
  useEffect(() => {
    const findAndSetCourses = () => {
      const findSkill = skillsToggle.find((item, index) => {
        if (index === alignment) {
          return item;
        }
      });

      if (findSkill) {
        const courses = skillsCardData.filter((item) => {
          // Convert both `findSkill` and `item.skills` to lowercase for comparison
          return item.skills.toLowerCase() === findSkill.toLowerCase();
        });
        setSkillCourses(courses);
      } else {
        setSkillCourses([]);
      }
    };
    findAndSetCourses();
  }, [skillsToggle, alignment, skillsCardData]);
  // useEffect(() => {
  //   const findAndSetCourses = () => {
  //     const findSkill = skillsToggle.find((item, index) => {
  //       if (index == alignment) {
  //         return item;
  //       }
  //     });
  //     console.log("findSkill",findSkill)
  //     const courses = skillsCardData.filter((item) => {
  //       console.log("itemSkill",item.skills.toLowerCase())
  //       return item.skills == findSkill;
  //     });
  //     console.log("courses",courses)
  //     if (courses) {
  //       setSkillCourses(courses);
  //     } else {
  //       setSkillCourses([]);
  //     }
  //   };
  //   findAndSetCourses();

  //   // console.log(alignment, 'alignment');
  // }, [skillsToggle, alignment]);
  useEffect(() => {
    for (let i = 0; i <= skillsToggle.length; i++) {
      for (let j = 0; j <= skillCoures.length; j++) {
        if (skillsToggle[i] && skillCoures[j] && skillsToggle[i] == skillCoures[j].skills) {
          setAlignment(i);
          break;
        }
      }
    }
  }, []);
  const handleRedirectCourse = (url: string) => {
    window.open(url, '_blank');
  };
  return (
    <>
      {skillsToggle && skillsToggle.length > 0 && (
        <>
          <TabGroup
            value={alignment}
            onChange={handleChange}
            tabBtnName={skillsToggle}
            singleTabs={true}
            singleData={skillsToggle.length > 2 ? false : true}
          />

          {skillCoures && skillCoures.length > 0 ? (
            <Box className={styles.cardBoxWrapper}>
              <Grid container spacing={2}>
                {skillCoures.map((item, index) => (
                  <Grid
                    item
                    xs={12}
                    sm={6}
                    key={index}
                    onClick={() => handleRedirectCourse(`${item.course_link}`)}
                  >
                    <CourseTile title={item.title} subTitle={item.course_type} image={item.image} />
                  </Grid>
                ))}
              </Grid>
            </Box>
          ) : (
            <Box className={styles.cardWrapper}>
              {' '}
              {i18n('loaderMessages.noCoursefound', { ns: 'common' })}
            </Box>
          )}

          {/* {skillsCardData.map((item, index) => {
        const { cardData } = item;
        return (
          <Box key={index} display="flex" flexWrap="wrap" gap={2} className={styles.cardBoxWrapper}>
            <>
              {cardData.map(
                (data: { id: number; title: string; subTitle: string; image: string }) => {
                  const { id, title, subTitle, image } = data;
                  return (
                    <Box
                      key={id}
                      display={alignment === index ? 'block' : 'none'}
                      className={styles.cardWrapper}
                    >
                      <CourseTile title={title} subTitle={subTitle} image={image} />
                    </Box>
                  );
                }
              )}
            </>
          </Box>
        );
      })} */}
        </>
      )}
    </>
  );
};
export default SkillCourses;
