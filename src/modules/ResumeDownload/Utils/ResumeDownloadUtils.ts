import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import { API_STATUS } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';
const { CREATE_CV } = APIS;

export interface ResumeContent {
  basic_details: {
    country: string;
    designation: string;
    email: string;
    name: string;
    phone: string;
    state: string;
    first_name: string;
    last_name: string;
    additional_links?: {
      social_link_type: string;
      social_url: string;
    }[];
  };
  education_details: {
    degree_name: string;
    degree_type: string;
    institute: string;
    marks: string;
    marks_type: string;
    passing_year: string;
  }[];
  language: {
    language: string;
    level: string;
  }[];
  professional_development: {
    company: string;
    date: string;
    university: string;
    workshop: string;
    title: string; //new add
    description: string; //new add
  }[];
  professional_summary: string;
  projects: {
    name: string;
    detail: string;
    bullet_points: string[];
  }[];
  project_details: {
    name: string;
    detail: string;
    bullet_points: string[];
    company: string;
    duration: string;
    end_date: string;
    is_current: string;
    responsibility: string[];
    role: string;
    star_format: string[];
    start_date: string;
    team_size: string;
    technologies: string[];
    title: string;
  }[];
  FinalProjects: {
    name: string;
    date: string;
    keywords: string;
    description: string;
    bullet_points: string[];
  }[];
  work_experience: {
    bullet_points: string[];
    company: string;
    date: string;
    description: string;
    location: string;
    title: string;
  }[];
  similarity_score: number;
  skills: { professional_skills: string[]; technical_skills: string[] };
  target_job: string;
  traning_plan_pdf_url: string;
  role: string;
  achievements_details: {
    achievement_date: string;
    location: string;
    summary: string;
  }[];
}

export interface CoverLetterContent {
  user_details: {
    designation: string;
    email: string;
    linkedin: string;
    name: string;
    phone: string;
    state?: string;
    country?: string;
  };
  salutation: string;
  employer: {
    company: string;
    email: string;
    location: string;
    name: string;
    title: string;
  };

  body: { text: string }[];
}

export interface ResumeResponse {
  id: string;
  download_urls: DownloadUrls;
  resume_content: ResumeContent;
  cover_letter: CoverLetterContent;
  rr_content: ReactiveResumeContent;
}

export interface EducationalDetails {
  degree_type: string;
  degree_name: string;
  institute: string;
  passing_year: string;
}
export interface WorkExperienceDetails {
  bullet_points: string[];
  company: string;
  date: string;
  description: string;
  location: string;
  title: string;
}
export interface FinalProjectDetails {
  name: string;
  date: string;
  keywords: string;
  description: string;
  bullet_points: string[];
}
export interface ProfessionalDevelopmentDetails {
  company: string;
  date: string;
  university: string;
  workshop: string;
  title: string; //new add
  description: string; //new add
}
export interface AchievementsDetails {
  achievement_date: string;
  location: string; //new add
  summary: string; //new add
}
export interface LanguageDetails {
  language: string;
  level: string;
}
export interface AdditionallinksDetails {
  social_link_type: string;
  social_url: string;
}
export interface ProjectsDetails {
  bullet_points: string[];
  detail: string;
  name: string;
}
export interface DownloadUrls {
  //Download Docx format
  docx_cover_letter_url: string;
  docx_resume_url: string;
  pdf_resume_url: string;
}
export interface CoverLetterBodyDetails {
  text: string;
}
export const DEFAULT_RESUME_RESPONSE = {
  id: '',
  resume_content: {
    basic_details: {
      country: '',
      designation: '',
      email: '',
      name: '',
      phone: '',
      state: '',
      first_name: '',
      last_name: '',
      additional_links: [
        {
          social_link_type: '',
          social_url: ''
        }
      ]
    },
    education_details: [
      {
        degree_name: '',
        degree_type: '',
        institute: '',
        marks: '',
        marks_type: '',
        passing_year: ''
      }
    ],
    language: [],
    professional_development: [],
    professional_summary: '',
    projects: [
      {
        name: '',
        detail: '',
        bullet_points: []
      }
    ],
    project_details: [
      {
        name: '',
        detail: '',
        bullet_points: [],
        company: '',
        duration: '',
        end_date: '',
        is_current: '',
        responsibility: [],
        role: '',
        star_format: [],
        start_date: '',
        team_size: '',
        technologies: [],
        title: ''
      }
    ],
    FinalProjects: [
      {
        name: '',
        date: '',
        keywords: '',
        description: '',
        bullet_points: []
      }
    ],
    work_experience: [
      {
        bullet_points: [],
        company: '',
        date: '',
        description: '',
        location: '',
        title: ''
      }
    ],
    similarity_score: 0,
    skills: { professional_skills: [], technical_skills: [] },
    target_job: '',
    traning_plan_pdf_url: '',
    role: '',
    achievements_details: []
  },
  download_urls: {
    //Download Docx format
    docx_resume_url: '',
    docx_cover_letter_url: '',
    pdf_resume_url: ''
  },
  cover_letter: {
    user_details: {
      designation: '',
      email: '',
      linkedin: '',
      name: '',
      phone: '',
      state: '',
      country: ''
    },
    salutation: '',
    employer: {
      company: '',
      email: '',
      location: '',
      name: '',
      title: ''
    },

    body: []
  },
  //reactive resume -start
  rr_content: {
    basics: {
      headline: '',
      location: '',
      phone: '',
      email: '',
      name: ''
    },
    sections: {
      awards: {
        items: [
          {
            id: '', // string
            // visible: false, // boolean
            name: '', // string
            title: '', // string
            awarder: '', // string
            date: '', // string
            summary: '' // string
            // url: {
            //   label: '', // string
            //   href: '' // string
            // }
          }
        ]
      },
      certifications: {
        items: [
          {
            id: '', // string
            // visible: false, // boolean
            name: '', // string
            title: '', // string
            issuer: '', // string
            date: '', // string
            summary: '' // string
            // url: {
            //   label: '', // string
            //   href: '' // string
            // }
          }
        ]
      },
      profiles: {
        items: [
          {
            id: '',
            network: '',
            username: '',
            icon: ''
          }
        ]
      },
      languages: {
        items: [
          {
            id: '',
            name: '',
            languages: '',
            description: '',
            level: ''
            // url: {
            //   label: string;
            //   href: string
            // };
          }
        ]
      },
      projects: {
        items: [
          {
            id: '',
            name: '',
            date: '',
            description: '',
            keywords: [],
            summary: ''
          }
        ]
      },
      references: {
        items: [] as string[]
      }
    }
  }
};

export const getResumeInformation = async (id: string) => {
  const [response] = await httpRequest({
    url: `${CREATE_CV}/${id}`,
    method: API_METHOD.GET
  });
  if (response !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response?.res_data?.data,
      message: response?.res_data?.message
    };
  } else {
    const errorMessage = response?.err?.response?.responseMessage;
    return {
      status: API_STATUS.FAILED,
      data: null,
      message: errorMessage ? errorMessage?.error?.message : response?.err?.message
    };
  }
};
//REACTIVE RESUME CONTENT
export interface ReactiveResumeContent {
  basics: {
    headline: string;
    location: string;
    phone: string;
    email?: string;
    name?: string;
  };
  sections: {
    awards: {
      items: {
        id: string;
        // visible: boolean;
        name: string;
        title: string;
        awarder: string;
        date: string;
        summary: string;
        // url: {
        //   label: string;
        //   href: string
        // };
      }[];
    };
    certifications: {
      items: {
        id: string;
        // visible: boolean;
        name: string;
        title: string;
        issuer: string;
        date: string;
        summary: string;
        // url: {
        //   label: string;
        //   href: string
        // };
      }[];
    };
    profiles: {
      items: {
        id: string;
        // visible: boolean;
        network: string;
        username: string;
        icon: string;
        // url: {
        //   label: string;
        //   href: string
        // };
      }[];
    };
    languages: {
      items: {
        id: string;
        // visible: boolean;
        name: string;
        languages: string;
        description: string;
        level: string;
      }[];
    };
    projects: {
      items: {
        id: string;
        // visible: boolean;
        name: string;
        description: string;
        date: string;
        keywords: string[];
        summary: string;
        // url: {
        //   label: string;
        //   href: string
        // };
      }[];
    };
    references: {
      items: string[];
    };
  };
}
export interface RRAwardDetails {
  id: string;
  // visible: boolean;
  name: string;
  title: string;
  awarder: string;
  date: string;
  summary: string;
}
export interface RRCertificationDetails {
  id: string;
  // visible: boolean;
  name: string;
  title: string;
  issuer: string;
  date: string;
  summary: string;
}
export interface RRProjectDetails {
  id: string;
  // visible: boolean;
  name: string;
  description: string;
  date: string;
  keywords: string[];
  summary: string;
}
export interface RRLanguageDetails {
  id: string;
  // visible: boolean;
  name: string;
  languages: string;
  description: string;
  level: string;
}
