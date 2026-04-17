import {
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  IconButton,
  Tabs,
  Tab
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useStyles } from './resumeFormStyles';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ChooseTemplate from './ChooseTemplate';
import PersonalInformation from './PersonalInformation';
import ContactInformation from './ContactInformation';
import EducationInformation from './EducationInformation';
import { useTranslation } from 'react-i18next';
import SummaryStatement from './SummaryStatement';
import WorkExperience from './WorkExperience';
import Expertise from './Expertise';
import { useStylesResumeCustomize } from './ResumeCustomizationstyles';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { useMediaQuery, useTheme } from '@mui/material';
import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';
import { getStorageItem } from '~/shared/utils/storage';
import Acheivement from './Achievement';
import ProfessionalDevelopment from './ProfessionalDevelopment';
// import LanguageInformation from './LanguageInformation';
import { ROUTES } from '~/shared/constants/routes';
import { LOCALE_PAGE, SEVERITY, ToastMessage } from '~/shared/constants/constants';
import { handleToast } from '~/shared/utils/utils';
// import { useRouter } from 'next/navigation';
import { useRouter } from 'next/router';
import withLoader from '~/shared/components/HOC/withLoader';
// import CoverChooseTemplate from './CoverChooseTemplate';
import CoverPersonalInformation from './CoverPersonalInformation';
import CoverContactInformation from './CoverContactInformation';
interface MyProfileProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}
const ResumeForm: React.FC<MyProfileProps> = ({ setLoadWithoutMount }) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.RESUME_CUSTOMIZE);
  const stylesExpert = useStylesResumeCustomize();
  // const [activeTab, setActiveTab] = useState(0);
  const theme = useTheme();
  const isXsScreen = useMediaQuery(theme.breakpoints.only('xs'));
  const [activeTab, setActiveTab] = useState(0);
  const [activeStep, setActiveStep] = useState(0);
  const [isOpenStepperResume, setIsOpenResume] = useState(false);
  const router = useRouter();
  const { asPath } = router;
  const { CREATE_CV } = APIS;
  const { SUCCESS } = API_STATUS;
  const { ERROR } = SEVERITY;
  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });
  type EducationDetail = {
    degree_name?: string; // Make degree_name optional with ?
    degree_type?: string;
    institute?: string;
    marks?: string;
    marks_type?: string;
    passing_year?: string;
  };
  type WorkExperinceDetail = {
    description?: string;
    location?: string;
    title?: string;
    date?: string;
    company?: string;
    bullet_points?: string[];
  };
  type AcheivementsDetail = {
    achievement_date?: string;
    location?: string;
    summary?: string;
  };
  type ProfessionalDevelopmentDetails = {
    company: string;
    date: string;
    university: string;
    workshop: string;
    title: string; //new add
    description: string; //new add
  };
  // type LanguageDetails = {
  //   language: string;
  //   level: string;
  // };
  const [PersonalInfoFormData, setPersonalInfoFormData] = useState({
    firstName: '',
    lastName: ''
    // professionalTitle: ''
  });
  const [contactInfoFormData, setContactInfoFormData] = useState({
    phone: '',
    email: ''
    // linkedin: ''
    // address: ''
  });
  const [educationInfoFormData, setEducationInfoFormData] = useState([
    {
      degree_name: '',
      degree_type: '',
      institute: '',
      marks: '',
      marks_type: '',
      passing_year: ''
    }
  ]);
  const [summaryFormData, setSummaryFormData] = useState({
    professionalSummary: ''
  });
  const [skillFormData, setSkillsFormData] = useState<{
    professionalSkills: string[];
    technicalSkills: string[];
  }>({
    professionalSkills: [''],
    technicalSkills: ['']
  });
  const [workInfoFormData, setWorkInfoFormData] = useState([
    {
      description: '',
      location: '',
      title: '',
      date: '',
      company: '',
      bullet_points: ['']
    }
  ]);
  //new Changes start
  const [acheivementsFormData, setAcheivementsFormData] = useState([
    {
      achievement_date: '',
      location: '',
      summary: ''
    }
  ]);
  const [professionalDevelopmentFormData, setProfessionalDevelopmentFormData] = useState([
    {
      company: '',
      date: '',
      university: '',
      workshop: '',
      title: '',
      description: ''
    }
  ]);
  // const [languageFormData, setLanguageFormData] = useState([
  //   {
  //     language: '',
  //     level: ''
  //   }
  // ]);
  const [resumeTemplateData, setResumeTemplateData] = useState({
    id: '',
    name: '',
    is_active: true
  });
  //cover Letter
  // const [coverTemplateData, setCoverTemplateData] = useState({
  //   templateId: ''
  // });
  const [CoverPersonalInfoFormData, setCoverPersonalInfoFormData] = useState({
    firstName: '',
    lastName: ''
    // professionalTitle: ''
  });
  const [CoverContactInfoFormData, setCoverContactInfoFormData] = useState({
    phone: '',
    email: ''
    // linkedin: ''
    // address: ''
  });
  const [noUpdateFormData, setNoUpdateFormData] = useState({
    coverBody: '',
    coverDesignation: '',
    coverEmpName: '',
    coverEmpEmail: '',
    coverEmpTitle: '',
    coverEmpCompany: '',
    coverEmpLocation: '',
    coverEmpFname: '',
    coverEmpLname: '',
    coverSaluation: '',
    resId: '',
    resTargetjob: '',
    resSimilarityScore: '',
    resCompany: '',
    resDownloadUrl: {},
    resDesignation: '',

    resTemplateName: '',
    resRole: '',
    resPortalJobDetailsId: '',
    resLocation: '',
    resDate: '',
    csmScore: '',
    resCsmScore: '',
    resfullName: '',
    resState: '',
    resCountry: '',
    resume_url: '',
    coverLinkedin: '',
    resadditionaLinks: ''
  });
  //get Predefined Resume Data
  const getResumeData = async () => {
    const lastResumeId = getStorageItem({ key: 'lastResumeId', useCombineStorage: true });
    const [response] = await httpRequest({
      url: `${CREATE_CV}/${lastResumeId}`,
      method: API_METHOD.GET
    });
    if (response && response.length !== null) {
      const resData = response?.res_data?.data;
      setResumeTemplateData({
        id: resData?.template_id,
        name: resData?.template_name,
        is_active: true
      });
      //setDatainPersonalInfo
      setPersonalInfoFormData({
        firstName: resData?.resume_content?.basic_details?.first_name,
        lastName: resData?.resume_content?.basic_details?.last_name
        // professionalTitle: resData?.resume_content?.basic_details?.designation
      });

      setContactInfoFormData({
        phone: resData?.resume_content?.basic_details?.phone,
        email: resData?.resume_content?.basic_details?.email
        // linkedin: resData?.resume_content?.basic_details?.additional_links[0]?.social_url || []
        // address: fullAddress
      });
      const educationDetails = resData?.resume_content?.education_details || [];
      // Map the education details array to the state structure
      const formattedEducationDetails =
        educationDetails.length > 0
          ? educationDetails.map((education: EducationDetail) => ({
              degree_name: education?.degree_name || '',
              degree_type: education?.degree_type || '',
              institute: education?.institute || '',
              marks: education?.marks || '',
              marks_type: education?.marks_type || '',
              passing_year: education?.passing_year || ''
            }))
          : [educationInfoFormData];
      setEducationInfoFormData(formattedEducationDetails);
      //setsummary Data
      setSummaryFormData({
        professionalSummary: resData?.resume_content?.professional_summary
      });
      //set Skills Data
      setSkillsFormData({
        professionalSkills: resData.resume_content.skills.professional_skills || [],
        technicalSkills: resData.resume_content.skills.technical_skills || []
      });
      //set work exp
      const workDetails = resData?.resume_content?.work_experience || [];
      // Map the work details array to the state structure
      const formattedWorkDetails =
        workDetails.length > 0
          ? workDetails.map((wrk: WorkExperinceDetail) => ({
              description: wrk?.description || '',
              location: wrk?.location || '',
              title: wrk?.title || '',
              date: wrk?.date || '',
              company: wrk?.company || '',
              bullet_points: wrk?.bullet_points || ''
            }))
          : [workInfoFormData];
      setWorkInfoFormData(formattedWorkDetails);
      //set acheivemnst sdata
      const achDetails = resData?.resume_content?.achievements_details || [];
      // Map the education details array to the state structure
      const formattedAchDetails =
        achDetails.length > 0
          ? achDetails.map((ach: AcheivementsDetail) => ({
              achievement_date: ach?.achievement_date || '',
              location: ach?.location || '',
              summary: ach?.summary || ''
            }))
          : [acheivementsFormData];
      setAcheivementsFormData(formattedAchDetails);
      //set Professional Development
      const professionalDevDetails = resData?.resume_content?.professional_development || [];
      // If the array is empty, return an array with a single default object
      const formattedProfessionalDevDetails =
        professionalDevDetails.length > 0
          ? professionalDevDetails.map((prfl: ProfessionalDevelopmentDetails) => ({
              company: prfl?.company ?? '',
              date: prfl?.date ?? '',
              description: prfl?.description ?? '',
              title: prfl?.title ?? '',
              university: prfl?.university ?? '',
              workshop: prfl?.workshop ?? ''
            }))
          : [professionalDevelopmentFormData];
      setProfessionalDevelopmentFormData(formattedProfessionalDevDetails);
      setCoverPersonalInfoFormData({
        firstName: resData?.resume_content?.basic_details?.first_name,
        lastName: resData?.resume_content?.basic_details?.last_name
        // professionalTitle: resData?.resume_content?.basic_details?.designation
      });
      setCoverContactInfoFormData({
        phone: resData?.resume_content?.basic_details?.phone,
        email: resData?.resume_content?.basic_details?.email
        // linkedin: resData?.cover_letter?.user_details?.linkedin
      });
      //no chnages/update required for this start
      setNoUpdateFormData({
        coverBody: resData?.cover_letter?.body,
        coverDesignation: resData?.cover_letter?.user_details?.designation,
        coverEmpName: resData?.cover_letter?.employer?.name,
        coverEmpEmail: resData?.cover_letter?.employer?.email,
        coverEmpTitle: resData?.cover_letter?.employer?.title,
        coverEmpCompany: resData?.cover_letter?.employer?.company,
        coverEmpLocation: resData?.cover_letter?.employer?.location,
        coverEmpFname: resData?.cover_letter?.employer?.first_name,
        coverEmpLname: resData?.cover_letter?.employer?.last_name,
        coverSaluation: resData?.cover_letter?.salutation,
        resId: resData?.id,
        resTargetjob:
          (resData?.resume_content?.target_job &&
            resData?.resume_content?.target_job.length > 0 &&
            resData?.resume_content?.target_job) ||
          '', //assign single tarfget job
        resSimilarityScore: resData?.resume_content?.similarity_score,
        resCompany: resData?.company,
        resDownloadUrl: resData?.download_urls,
        resDesignation: resData?.resume_content?.basic_details?.designation,
        resTemplateName: resData?.template_name,
        resRole: resData?.role,
        resPortalJobDetailsId: resData?.portal_job_details_id,
        resLocation: resData?.location,
        resDate: resData?.date,
        csmScore: resData?.csm_score,
        resCsmScore: resData?.resume_content?.csm_score,
        resfullName: resData?.resume_content?.basic_details?.name,
        resState: resData?.resume_content?.basic_details?.state,
        resCountry: resData?.resume_content?.basic_details?.country,
        resume_url: resData?.resume_url,
        coverLinkedin: resData?.cover_letter?.basic_details?.linkedin,
        resadditionaLinks:
          resData?.resume_content?.basic_details?.additional_links[0]?.social_url || ''
      });
      //end
      return { status: 'success', data: resData };
    } else {
      return { status: 'failed', message: response?.err?.response?.message };
    }
  };
  useEffect(() => {
    getResumeData();
  }, []);

  const handlePersonalInfoChange = (data: {
    firstName: string;
    lastName: string;
    // professionalTitle: string;
  }) => {
    setPersonalInfoFormData(data);
  };
  const handleContactInfoChange = (data: {
    phone: string;
    email: string;
    // linkedin: string;
    // address: string;
  }) => {
    setContactInfoFormData(data);
  };
  const handleEducationInfoChange = (
    data: {
      degree_name: string;
      degree_type: string;
      institute: string;
      marks: string;
      marks_type: string;
      passing_year: string;
    }[]
  ) => {
    setEducationInfoFormData(data);
  };
  const handleSummaryInfoChange = (data: { professionalSummary: string }) => {
    setSummaryFormData(data);
  };
  const handleSkillsChange = (data: {
    professionalSkills: string[];
    technicalSkills: string[];
  }) => {
    setSkillsFormData(data);
  };
  const handleWorkInfoChange = (
    data: {
      description: string;
      location: string;
      title: string;
      date: string;
      company: string;
      bullet_points: string[];
    }[]
  ) => {
    setWorkInfoFormData(data);
  };
  const handleAcheivementsChange = (
    data: {
      achievement_date: string;
      location: string; //new add
      summary: string; //new add
    }[]
  ) => {
    setAcheivementsFormData(data);
  };
  const handleProfessionalChange = (
    data: {
      company: string;
      date: string;
      university: string;
      workshop: string;
      title: string; //new add
      description: string;
    }[]
  ) => {
    setProfessionalDevelopmentFormData(data);
  };

  const handleResumeTemplateChange = (data: { id: string; name: string; is_active: boolean }) => {
    setResumeTemplateData(data);
  };
  //cover Letter Start
  // const handleCoverTemplateChange = (data: {
  //   templateId: string;
  // }) => {
  //   setCoverTemplateData(data);
  // };
  const handleCoverPersonalInfoChange = (data: {
    firstName: string;
    lastName: string;
    // professionalTitle: string;
  }) => {
    setCoverPersonalInfoFormData(data);
  };
  const handleCoverContactInfoChange = (data: {
    phone: string;
    email: string;
    // linkedin: string;
    // address: string;
  }) => {
    setCoverContactInfoFormData(data);
  };
  const handleTabChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    setActiveTab(newValue);
    // setIsOpenResume(!isOpenStepperResume); // Toggle dropdown on tab click
  };

  const handleOpenStepperResume = () => {
    setIsOpenResume(!isOpenStepperResume);
  };
  const steps = [
    {
      label: i18n('resumeStepper.chooseTemplate'),
      description: 'This is the Choose template description for step 1.',
      page: <ChooseTemplate data={resumeTemplateData} onChange={handleResumeTemplateChange} />
    },
    {
      label: i18n('resumeStepper.personalInformation'),
      description: 'This is the Personal description for step 2.',
      page: <PersonalInformation data={PersonalInfoFormData} onChange={handlePersonalInfoChange} />
    },
    {
      label: i18n('resumeStepper.contactInformation'),
      description: 'This is the Contact description for step 3.',
      page: <ContactInformation data={contactInfoFormData} onChange={handleContactInfoChange} />
    },
    {
      label: i18n('resumeStepper.education'),
      description: 'This is the Education description for step 4.',
      page: (
        <EducationInformation data={educationInfoFormData} onChange={handleEducationInfoChange} />
      )
    },
    {
      label: i18n('resumeStepper.expertise'),
      description: 'This is the description for step 5.',
      page: <Expertise data={skillFormData} onChange={handleSkillsChange} />
    },
    {
      label: i18n('resumeStepper.summaryStatement'),
      description: 'This is the description for step 6.',
      page: <SummaryStatement data={summaryFormData} onChange={handleSummaryInfoChange} />
    },
    {
      label: i18n('resumeStepper.workExperience'),
      description: 'This is the description for step 7.',
      page: <WorkExperience data={workInfoFormData} onChange={handleWorkInfoChange} />
    },
    {
      label: i18n('resumeStepper.achievement'),
      description: 'This is the description for step 8.',
      page: <Acheivement data={acheivementsFormData} onChange={handleAcheivementsChange} />
    },
    {
      label: i18n('resumeStepper.professionalDevelopment'),
      description: 'This is the description for step 9.',
      page: (
        <ProfessionalDevelopment
          data={professionalDevelopmentFormData}
          onChange={handleProfessionalChange}
        />
      )
    },
    //cover Letter Start
    // {
    //   label: i18n('coverStepper.chooseTemplate'),
    //   description: 'This is the description for step 10.',
    //   page: (
    //     <CoverChooseTemplate
    //       data={coverTemplateData}
    //       onChange={handleCoverTemplateChange}
    //     />
    //   )
    // },
    {
      label: i18n('coverStepper.personalInformation'),
      description: 'This is the description for step 11.',
      page: (
        <CoverPersonalInformation
          data={CoverPersonalInfoFormData}
          onChange={handleCoverPersonalInfoChange}
        />
      )
    },
    {
      label: i18n('coverStepper.contactInformation'),
      description: 'This is the description for step 12.',
      page: (
        <CoverContactInformation
          data={CoverContactInfoFormData}
          onChange={handleCoverContactInfoChange}
        />
      )
    }
    // {
    //   label: i18n('resumeStepper.languageInformation'),
    //   description: 'This is the description for step 10.',
    //   page: <LanguageInformation data={languageFormData} onChange={handleLanguageChange} />
    // }
  ];

  const styles = useStyles();

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  // const isObjectEmpty = (obj: Record<string, unknown>) => {
  //   return Object.values(obj).every(
  //     (value) => (Array.isArray(value) && value.length === 0) || value === ''
  //   );
  // };
  // Filter the array if the only object in it is empty
  // const filterworkInfoFormData = workInfoFormData.every(isObjectEmpty) ? [] : workInfoFormData;
  // const filtereducationInfoFormData = educationInfoFormData.every(isObjectEmpty)
  //   ? []
  //   : educationInfoFormData;
  // const filterprofessionalDevelopmentFormData = professionalDevelopmentFormData.every(isObjectEmpty)
  //   ? []
  //   : professionalDevelopmentFormData;
  // const filteracheivementsFormData = acheivementsFormData.every(isObjectEmpty)
  //   ? []
  //   : acheivementsFormData;
  const removeExtraArrayLayer = (data: unknown[]): unknown[] => {
    // Check if data is an array with a single element which is also an array
    if (Array.isArray(data) && data.length === 1 && Array.isArray(data[0])) {
      return data[0]; // Remove one level of array nesting
    }
    return data; // Return the original data if no extra array exists
  };
  const filterworkInfoFormData = removeExtraArrayLayer(workInfoFormData);

  const filtereducationInfoFormData = removeExtraArrayLayer(educationInfoFormData);

  const filterprofessionalDevelopmentFormData = removeExtraArrayLayer(
    professionalDevelopmentFormData
  );

  const filteracheivementsFormData = removeExtraArrayLayer(acheivementsFormData);
  // const modifiedAdditionalLinks = noUpdateFormData.resadditionaLinks || noUpdateFormData.resadditionaLinks !=""?
  //   {
  //     social_link_type: "linkedin",
  //     social_url: noUpdateFormData.resadditionaLinks
  //   }
  //   : [];
  // console.log(filteredWorkDetails);
  const handleSaveAndClose = async () => {
    // console.log(
    // 'StoreData:',
    // workInfoFormData,
    // noUpdateFormData,
    // PersonalInfoFormData,
    // modifiedAdditionalLinks,
    //   contactInfoFormData,
    //   educationInfoFormData,
    //   summaryFormData,
    // skillFormData
    // workInfoFormData
    // formatWorkDetails(workInfoFormData)
    //   acheivementsFormData,
    //   professionalDevelopmentFormData
    //   workInfoFormData,
    // CoverContactInfoFormData,
    // CoverPersonalInfoFormData,

    // );

    const normalizeSkills = (skills: string[] | string) => {
      return Array.isArray(skills) ? skills.filter((skill) => skill !== '') : skills;
    };
    // const normalizeSkills = (skills: any) => {
    //   return (Array.isArray(skills) && skills.length === 1 && skills[0] === '') ? [] : skills;
    // };
    const techskills = normalizeSkills(skillFormData?.technicalSkills);
    const professionalskills = normalizeSkills(skillFormData?.professionalSkills);
    // Implement save logic here
    const userResumeId = noUpdateFormData?.resId;
    // console.log('saveResumeFormattedData', req_param);
    //store data
    setLoadWithoutMount(true, 'Please wait...');
    //send data via api
    const request = {
      url: `${CREATE_CV}/${userResumeId}`,
      method: API_METHOD.PUT,
      body: {
        req_param: {
          template_id: resumeTemplateData?.id,
          // resume_url: noUpdateFormData.resume_url,
          resume_url: 'url',
          similarity_score: noUpdateFormData.resSimilarityScore,
          // id: noUpdateFormData.resId,
          // role: noUpdateFormData.resRole,
          // template_name: resumeTemplateData?.name,
          // portal_job_details_id: noUpdateFormData.resPortalJobDetailsId,
          // location: noUpdateFormData.resLocation,
          // csm_score: noUpdateFormData.csmScore,
          // date: noUpdateFormData.resDate,
          download_urls: {
            docx_cover_letter_url: '',
            docx_resume_url: ''
          },
          resume_content: {
            skills: {
              technical_skills: techskills || [],
              professional_skills: professionalskills || []
            },
            basic_details: {
              first_name: PersonalInfoFormData?.firstName,
              last_name: PersonalInfoFormData?.lastName,
              phone: contactInfoFormData?.phone,
              email: contactInfoFormData?.email,
              designation: noUpdateFormData.resDesignation,
              additional_links: [], //currently its singgle sho its show static
              country: noUpdateFormData.resCountry,
              state: noUpdateFormData.resState,
              name: PersonalInfoFormData.firstName + ' ' + PersonalInfoFormData.lastName
            },
            // work_experience: filterworkInfoFormData || [],
            work_experience: filterworkInfoFormData,
            education_details: filtereducationInfoFormData,
            achievements_details: filteracheivementsFormData,
            professional_summary: summaryFormData?.professionalSummary,
            professional_development: filterprofessionalDevelopmentFormData,
            target_job: noUpdateFormData.resTargetjob,
            company: noUpdateFormData.resCompany,
            similarity_score: noUpdateFormData.resSimilarityScore,
            csm_score: noUpdateFormData.resCsmScore
          },
          cover_letter: {
            body: noUpdateFormData.coverBody,
            employer: {
              name: noUpdateFormData.coverEmpName,
              email: noUpdateFormData.coverEmpEmail,
              title: noUpdateFormData.coverEmpTitle,
              company: noUpdateFormData.coverEmpCompany,
              location: noUpdateFormData.coverEmpLocation,
              last_name: noUpdateFormData.coverEmpLname,
              first_name: noUpdateFormData.coverEmpFname
            },
            salutation: noUpdateFormData.coverSaluation,
            user_details: {
              name: CoverPersonalInfoFormData.firstName + ' ' + CoverPersonalInfoFormData.lastName,
              email: CoverContactInfoFormData.email,
              phone: CoverContactInfoFormData.phone,
              linkedin: noUpdateFormData.coverLinkedin,
              last_name: CoverPersonalInfoFormData.lastName,
              first_name: CoverPersonalInfoFormData.firstName,
              designation: noUpdateFormData.coverDesignation
            }
          }
        }
      }
    };
    const response = await httpRequest(request);
    if (response[0] !== null) {
      const res = {
        status: API_STATUS.SUCCESS,
        data: response[0]?.res_data?.data,
        message: response[0]?.res_data?.message
      };
      const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
      if (res?.status == SUCCESS) {
        handleToast({ severity, message: res.message }, setToastState, toastState);
        router.push(ROUTES.MY_RESUMES);
        if (asPath === ROUTES.MY_RESUMES) {
          // Stop the loader when the URL matches
          setLoadWithoutMount(false, '');
        }
      }
    } else {
      const errorMessage = response[1]?.err?.response?.responseMessage;
      const res = {
        data: null,
        status: API_STATUS.FAILED,
        message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
      };
      setLoadWithoutMount(false, '');
      const severity: SEVERITY = res?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
      if (res?.status !== SUCCESS) {
        handleToast({ severity, message: res.message }, setToastState, toastState);
        setLoadWithoutMount(false, '');
      }
    }

    // Close logic here, e.g., redirect or close modal
  };

  // const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: e.target.value
  //   });
  // };
  //cover letter handle code start
  // const [activeStepCover, setActiveStepCover] = useState(0);
  // const activeStepCover = -1;
  // const formDataCover = {
  //   step8: '',
  //   step9: '',
  //   step10: ''
  // };
  // const stepsCover = [
  //   {
  //     label: i18n('coverStepper.chooseTemplate'),
  //     description: 'This is the description for step 10.',
  //     page: (
  //       <CoverChooseTemplate
  //         data={coverTemplateData}
  //         onChange={handleCoverTemplateChange}
  //       />
  //     )
  //   },
  //   {
  //     label: i18n('coverStepper.personalInformation'),
  //     description: 'This is the description for step 11.',
  //     page: (
  //       <CoverPersonalInformation data={CoverPersonalInfoFormData} onChange={handleCoverPersonalInfoChange} />
  //     )
  //   },
  //   {
  //     label: i18n('coverStepper.contactInformation'),
  //     description: 'This is the description for step 12.',
  //     page: (
  //       <CoverContactInformation data={CoverContactInfoFormData} onChange={handleCoverContactInfoChange} />
  //     )
  //   },
  // ];
  const currentStepLabel = steps[activeStep].label;
  const currentComponent = steps[activeStep].page;
  return (
    <Box className={styles.container}>
      {/* Full-width Heading */}
      <Box className={styles.fullWidthHeading}>
        {/* Tabs Start */}
        <>
          {isXsScreen && (
            <Tabs
              value={activeTab}
              onChange={handleTabChange}
              TabIndicatorProps={{
                style: { display: 'none' } // Hide default indicator
              }}
              className={stylesExpert.tabStyle}
            >
              <Tab
                label={
                  <Box display="flex" alignItems="center" onClick={handleOpenStepperResume}>
                    Resume
                    {activeTab === 0 && (
                      <Box className={`tab-counter ${activeTab === 0 ? '' : ''}`}>
                        {activeStep + 1}
                      </Box>
                    )}
                    <KeyboardArrowDownIcon className="down-arrow" />
                  </Box>
                }
              />
              {/* <Tab
                label={
                  <Box display="flex" alignItems="center">
                    Cover Letter
                    {activeTab === 1 && (
                      <Box className={`tab-counter ${activeTab === 1 ? '' : ''}`}>0</Box>
                    )}
                    <KeyboardArrowDownIcon className="down-arrow" />
                  </Box>
                }
              /> */}
            </Tabs>
          )}
        </>
        {/* Tabs End */}
        {/* Dropdown for Stepper Start */}
        {isOpenStepperResume && isXsScreen && (
          <Box
            sx={{
              position: 'absolute',
              zIndex: 20,
              mt: '5px', // Ensures the dropdown is always 5px below the tabs
              bgcolor: 'white', // Set background color to white
              boxShadow: 3,
              borderRadius: 1,
              width: '300px',
              overflow: 'hidden'
            }}
            className={styles.stepperClassDetails}
          >
            <Stepper
              activeStep={activeStep}
              orientation="vertical"
              className={styles.stepperClassDetails}
              sx={{ p: 2 }}
            >
              {steps.map((step, index) => (
                <Step key={index}>
                  <StepLabel>{step.label}</StepLabel>
                </Step>
              ))}
            </Stepper>
          </Box>
        )}
        {/* Dropdown for Stepper End */}
        {!isXsScreen && <Typography variant="h5">{i18n('pageHeading')}</Typography>}
      </Box>
      <Box className={styles.divider}></Box>
      <Box className={styles.mainWrapper}>
        {/* left sidebar Start */}
        <Box className={styles.sidebarDetail}>
          {!isXsScreen && (
            <>
              <Box className={`${styles.personalDetail} ${styles.displayColumn}`}>
                <Box>
                  <Typography variant="h5">{i18n('resumeHeading')}</Typography>
                </Box>
              </Box>
              <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
                <Stepper
                  activeStep={activeStep}
                  orientation="vertical"
                  className={styles.stepperClassDetails}
                >
                  {steps.map((step) => (
                    <Step key={step.label}>
                      <StepLabel sx={{ padding: 0 }}>
                        <Typography variant="h5">{step.label}</Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box>
              {/* <Box className={`${styles.personalDetail} ${styles.displayColumn}`}>
                <Box>
                  <Typography variant="h5">{i18n('coverHeading')}</Typography>
                </Box>
              </Box>
              <Box className={`${styles.educationDetail} ${styles.displayColumn}`}>
                <Stepper
                  activeStep={activeStepCover}
                  orientation="vertical"
                  className={styles.stepperClassDetails}
                >
                  {stepsCover.map((step) => (
                    <Step key={step.label}>
                      <StepLabel sx={{ padding: 0 }}>
                        <Typography variant="h5">{step.label}</Typography>
                      </StepLabel>
                    </Step>
                  ))}
                </Stepper>
              </Box> */}
            </>
          )}
        </Box>
        {/* left sidebar end */}
        {/* Right div start */}
        <Box className={styles.contentDetail}>
          <Box className={styles.displayColumn} gap="15px">
            <Typography variant="h5">{currentStepLabel}</Typography>
          </Box>
          <Box className={styles.displayColumn} gap="15px">
            {currentComponent}
          </Box>
          <Box className={styles.divider}></Box>

          <Box
            display="flex"
            justifyContent="space-between"
            gap={2}
            alignSelf="stretch"
            sx={{ mt: '15px' }}
          >
            <Box display="flex" width="29%" justifyContent="center" gap={2}>
              <Box width="100%">
                <Box
                  display="flex"
                  justifyContent="center"
                  borderRadius={1}
                  border="1px solid"
                  borderColor="grey.400"
                  p={0.5}
                >
                  <IconButton disabled={activeStep === 0} onClick={handleBack}>
                    <ArrowBackIosNewIcon />
                  </IconButton>
                </Box>
              </Box>

              <Box width="100%">
                <Box
                  display="flex"
                  justifyContent="center"
                  borderRadius={1}
                  border="1px solid"
                  borderColor="grey.400"
                  p={0.5}
                  style={{ transform: 'rotate(360deg)' }}
                >
                  <IconButton onClick={handleNext} disabled={activeStep === steps.length - 1}>
                    <ArrowForwardIosIcon />
                  </IconButton>
                </Box>
              </Box>
            </Box>
            {activeStep === steps.length - 1 && (
              <Button
                onClick={handleSaveAndClose}
                variant="outlined"
                color="inherit"
                type="submit"
                className={styles.saveAndClose}
                sx={{
                  minWidth: 136,
                  backgroundColor: '#f7f8fb',
                  borderColor: 'grey.300',
                  fontWeight: 'bold',
                  px: { sm: 2 },
                  color: '#5b5c60'
                }}
              >
                {i18n('saveAndCloseBtnName')}
              </Button>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default withLoader(ResumeForm);
