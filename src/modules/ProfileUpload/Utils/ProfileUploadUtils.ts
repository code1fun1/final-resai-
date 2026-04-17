// import { GetObjectCommand, PutObjectCommand, PutObjectCommandInput, S3 } from '@aws-sdk/client-s3';
// import getConfig from 'next/config';
import { APIS, API_METHOD, API_STATUS } from '~/shared/constants/apiConstants';
import { IMAGE_TYPE_MIME, RequestBodyType } from '~/shared/constants/constants';
import httpRequest from '~/shared/utils/axios';

// const { getSignedUrl } = require('@aws-sdk/s3-request-presigner');

// const { publicRuntimeConfig: configs = {} } = getConfig() || {};

export interface ImageDetails {
  fileName: string;
  fileSize: string;
  fileType: string;
  fileUploadUrl: string | undefined;
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
    return { status: API_STATUS.FAILED, message: (error as Error).message };
  }
};

interface SaveFileReqType {
  profile_url: string;
}

export const handleSaveFile = async (fileUrl: string) => {
  const { PROFILE_IMAGE_UPLOAD } = APIS; // eslint-disable-line @typescript-eslint/no-explicit-any
  const request: RequestBodyType<SaveFileReqType> = {
    url: PROFILE_IMAGE_UPLOAD,
    method: API_METHOD.POST,
    body: {
      req_param: {
        profile_url: fileUrl?.split('?')[0]
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

export const VALID_FILES = [IMAGE_TYPE_MIME.JPG, IMAGE_TYPE_MIME.PNG, IMAGE_TYPE_MIME.JPEG];

export const getFileTypeByExtension = (fileName: string | undefined) => {
  if (!fileName) return '';
  const parts = fileName.split('.');
  const fileExtension = parts.length > 1 ? parts.pop()!.toLowerCase() : '';
  switch (fileExtension) {
    case 'png':
      return IMAGE_TYPE_MIME.PNG;
    case 'jpg':
      return IMAGE_TYPE_MIME.JPG;
    case 'jpeg':
      return IMAGE_TYPE_MIME.JPEG;
    default:
      return '';
  }
};

export const isValidFileType = (fileType: string | undefined) => {
  return fileType && VALID_FILES.includes(fileType);
};
