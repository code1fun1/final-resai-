import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import { RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';
import { AIPromptData, Question, Suggestion } from '../../Utils/OnboardingUtils';
const { USER_AI_QUESTION, USER_LOAD_MORE_SUGGESTION, GET_AI_QUESTION } = APIS;

export const getAIQuestions = async (jobDescription?: string, jd_id?: string) => {
  const request: RequestBodyType<{ job_description?: string | null; jd_id?: string | null }> = {
    url: GET_AI_QUESTION,
    method: API_METHOD.POST,
    body: {
      req_param: {
        job_description: !!jobDescription ? jobDescription : null,
        jd_id: !!jd_id ? jd_id : null
      }
    }
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      data: response[0]?.res_data?.data,
      status: API_STATUS.SUCCESS,
      message: response[0]?.res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};

export const mapSuggestionsByCurrentQuestionIndex = (
  onboardingData: AIPromptData
): Suggestion[] => {
  const { questionList, currentQuestionIndex } = onboardingData;
  if (currentQuestionIndex < 0 || currentQuestionIndex >= questionList.length) {
    return [];
  }

  const currentQuestion: Question = questionList[currentQuestionIndex];
  return currentQuestion.suggestions;
};

export const DEFAULT_PAGE_INDEX: number = 1;
export const DEFAULT_SUGGESTION_PER_PAGE: number = 2;

interface SaveAnswerRequest {
  question: string;
  answer: string | undefined;
  update_user_step?: boolean;
  attempt: number; //attempt change
}

export const saveAnswer = async ({ question, answer, update_user_step }: SaveAnswerRequest) => {
  const attemptValue = localStorage.getItem('lastAttempt'); //attempt change
  const request: RequestBodyType<SaveAnswerRequest> = {
    url: USER_AI_QUESTION,
    method: API_METHOD.POST,
    body: {
      req_param: {
        question: question,
        answer: answer,
        update_user_step: update_user_step,
        attempt: Number(attemptValue) || 1 //attempt change
      }
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      data: response[0]?.res_data?.data,
      status: API_STATUS.SUCCESS,
      message: response[0]?.res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};

interface GetSuggestionRequest {
  question: string;
  skill_name: string;
  suggestions: { description: string; title: string }[];
}

export const getSuggestion = async (reqData: GetSuggestionRequest) => {
  const request: RequestBodyType<GetSuggestionRequest> = {
    url: USER_LOAD_MORE_SUGGESTION,
    method: API_METHOD.POST,
    body: {
      req_param: reqData
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      data: response[0]?.res_data?.data.questions[0],
      status: API_STATUS.SUCCESS,
      message: response[0]?.res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};

interface SaveAIQuestionRequest {
  question: string;
  answer: string;
  update_user_step?: boolean;
  attempt: number;
}

export const saveAIQuestions = async (req: SaveAIQuestionRequest) => {
  const request: RequestBodyType<SaveAIQuestionRequest> = {
    url: USER_AI_QUESTION,
    method: API_METHOD.POST,
    body: {
      req_param: req
    }
  };

  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      data: response[0]?.res_data?.data,
      status: API_STATUS.SUCCESS,
      message: response[0]?.res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.error?.message : response[1]?.err?.message
    };
  }
};
