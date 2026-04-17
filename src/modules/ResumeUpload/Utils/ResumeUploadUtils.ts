// import { GetObjectCommand, PutObjectCommand, PutObjectCommandInput, S3 } from '@aws-sdk/client-s3';
// import getConfig from 'next/config';
import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import { FILE_TYPE_MIME, RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';

// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// const { publicRuntimeConfig: configs = {} } = getConfig() || {};

export interface FileDetails {
  fileName: string;
  fileSize: string;
  fileType: string;
  showSpinner: boolean;
  spinTimer: number;
  fileUploadUrl: string | undefined;
  errorMessage: string;
}

export const handleFileUpload = async (file: File) => {
  const filename: string = file?.name;
  const fileType: string = file?.type;

  try {
    // Convert file to base64
    const arrayBuffer = await file.arrayBuffer();
    const base64String = Buffer.from(arrayBuffer).toString('base64');

    // Send to our API endpoint
    const response = await fetch('/api/s3-upload', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        file: base64String,
        fileName: filename,
        fileType: fileType
      })
    });

    const result = await response.json();

    if (result.status === 'success') {
      return { status: API_STATUS.SUCCESS, data: result.data, message: 'success' };
    } else {
      return { status: API_STATUS.FAILED, message: result.message };
    }
  } catch (error: unknown) {
    if (error === 'Region is missing') {
      return {
        status: API_STATUS.FAILED,
        message: 'We\'re experiencing a technical issue. Kindly try again shortly.'
      };
    } else {
      return { status: API_STATUS.FAILED, message: (error as Error).message };
    }
  }
};

interface SaveFileReqType {
  resume_url: string;
  resume_content: string;
  designation: null;
  target_job: null;
  is_onboarding: boolean;
}

export const handleSaveFile = async (fileUrl: string, editorText: string) => {
  const { RESUME_PARSE } = APIS;
  const request: RequestBodyType<SaveFileReqType> = {
    url: RESUME_PARSE,
    method: API_METHOD.POST,
    body: {
      req_param: {
        resume_url: fileUrl?.split('?')[0],
        resume_content: editorText,
        designation: null,
        target_job: null,
        is_onboarding: false
      }
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data,
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

export const deleteDocument = async () => {
  const { DELETE_RESUME } = APIS;
  const request: RequestBodyType<{}> = {
    url: DELETE_RESUME,
    method: API_METHOD.DELETE
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data,
      message: response[0]?.res_data?.message
    };
  } else {
    const errorMessage = response[1]?.err?.response?.responseMessage;
    return {
      data: null,
      status: API_STATUS.FAILED,
      message: errorMessage ? errorMessage?.message : response[1]?.err?.message
    };
  }
};

export const VALID_FILES = [FILE_TYPE_MIME.PDF, FILE_TYPE_MIME.DOCX, FILE_TYPE_MIME.WPS_DOC];

export const getFileTypeByExtension = (fileName: string | undefined) => {
  if (!fileName) return '';
  const parts = fileName.split('.');
  const fileExtension = parts.length > 1 ? parts.pop()!.toLowerCase() : '';
  switch (fileExtension) {
    case 'pdf':
      return FILE_TYPE_MIME.PDF;
    case 'docx':
      return FILE_TYPE_MIME.DOCX;
    case 'doc':
      return FILE_TYPE_MIME.WPS_DOC;
    default:
      return '';
  }
};

export const isValidFileType = (fileType: string | undefined) => {
  return fileType && VALID_FILES.includes(fileType);
};

export interface JDFormRequest {
  jobTitle: string;
  companyName: string;
  jobDesc: string;
}
interface SaveFileReqTypeWithJDForm {
  resume_url: string;
  resume_content: string;
  designation: null;
  target_job: null;
  is_onboarding: boolean;
  // job_description: {
  //   job_title: string;
  //   company: string;
  //   description: string;
  // };
  job_description: any; // eslint-disable-line @typescript-eslint/no-explicit-any
}
export const handleSaveFileWithJDForm = async (
  fileUrl: string,
  editorText: string,
  data: JDFormRequest
) => {
  const { RESUME_PARSE } = APIS;
  const request: RequestBodyType<SaveFileReqTypeWithJDForm> = {
    url: RESUME_PARSE,
    method: API_METHOD.POST,
    body: {
      req_param: {
        resume_url: fileUrl?.split('?')[0],
        resume_content: editorText,
        designation: null,
        target_job: null,
        is_onboarding: false,
        job_description:
          data.jobTitle && data.companyName && data.jobDesc
            ? {
                job_title: data.jobTitle,
                company: data.companyName,
                description: data.jobDesc
              }
            : ''
      }
    }
  };
  const response = await httpRequest(request);
  if (response[0] !== null) {
    return {
      status: API_STATUS.SUCCESS,
      data: response[0]?.res_data?.data,
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
