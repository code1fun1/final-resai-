import React, { useCallback, useRef, useState } from 'react';
import ReactCrop, { centerCrop, makeAspectCrop, Crop, convertToPixelCrop } from 'react-image-crop';
import { Button, Typography, Box } from '@mui/material';
import 'react-image-crop/dist/ReactCrop.css';
import { useTranslation } from 'react-i18next';
import { API_STATUS } from '~/shared/constants/apiConstants';
import { LOCALE_PAGE, SEVERITY, ToastMessage } from '~/shared/constants/constants';
import { handleToast, removeSpecialChars } from '~/shared/utils/utils';
import { useStyles } from './ImageCropperStyles';
import CropIcon from '@mui/icons-material/Crop';
import UploadIcon from '@mui/icons-material/Upload'; // Importing the Upload icon
import {
  ImageDetails,
  getFileTypeByExtension,
  handleFileUpload,
  handleSaveFile,
  isValidFileType
} from '~/modules/ProfileUpload/Utils/ProfileUploadUtils';
// import * as Sentry from '@sentry/nextjs';
import Toast from '~/shared/components/Toast';
import sentryCaptureError from '~/sentryCaptureError';
const ASPECT_RATIO = 1;
const MIN_DIMENSION = 150;

interface ImageCropperProps {
  closeModal: () => void;
  // updateAvatar: (dataUrl: string) => void;
}

const ImageCropper: React.FC<ImageCropperProps> = ({}) => {
  const styles = useStyles();
  const imgRef = useRef<HTMLImageElement | null>(null);
  const previewCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const [imgSrc, setImgSrc] = useState<string>('');
  const [crop, setCrop] = useState<Crop | undefined>(undefined);
  // const [error, setError] = useState<string>('');
  const [croppedDataUrl, setCroppedDataUrl] = useState<string>('');
  const { t: i18n } = useTranslation(LOCALE_PAGE.MY_PROFILE);
  const { SUCCESS } = API_STATUS;
  const { ERROR } = SEVERITY;

  const [toastState, setToastState] = useState<ToastMessage>({
    open: false,
    severity: SEVERITY.SUCCESS,
    message: ''
  });
  const [fileDetails, setFileDetails] = useState<ImageDetails>({
    fileName: '',
    fileSize: '',
    fileType: '',
    fileUploadUrl: ''
  });

  const isValidFile = (file: File | undefined): boolean => {
    const severity: SEVERITY = ERROR;
    if (!file) {
      setImgSrc('');
      setFileDetails((prevState: ImageDetails) => ({
        ...prevState
      }));
      return false;
    }

    const fileTypeByExtension: string | null | undefined = getFileTypeByExtension(file?.name);
    const maxSizeInBytes = 5 * 1024 * 1024;

    if (typeof fileTypeByExtension === 'string' && isValidFileType(fileTypeByExtension)) {
      if (file.size <= maxSizeInBytes) {
        return true;
      } else {
        setImgSrc('');
        setFileDetails((prevState: ImageDetails) => ({
          ...prevState
        }));
        handleToast(
          { severity, message: 'File size exceeds 5MB. Please upload a smaller file.' },
          setToastState,
          toastState
        );
        return false;
      }
    } else {
      setImgSrc('');
      setFileDetails((prevState: ImageDetails) => ({
        ...prevState
      }));
      handleToast(
        {
          severity,
          message: 'Invalid file type. Please upload a valid file type (e.g., JPG, PNG, JPEG).'
        },
        setToastState,
        toastState
      );
      return false;
    }
  };

  const onSelectFile = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file: File | undefined = event.target.files?.[0];
      if (file && isValidFile(file)) {
        setCrop(undefined);
        const reader = new FileReader();
        reader.addEventListener('load', () => {
          setImgSrc(reader.result?.toString() || '');
        });
        reader.readAsDataURL(file);
        setFileDetails((prevState) => ({
          ...prevState,
          fileName: file.name
        }));
      }
    },
    [setCrop, setImgSrc, setFileDetails]
  );

  const updateFileDetails = useCallback(
    async (file: File) => {
      const { size, type, name } = file ?? {};
      const fileSizeKb = size ? size / 1024 : 0;

      const sanitizedFileName = new File(
        [new Blob([file], { type })],
        removeSpecialChars(name, true),
        { type }
      );
      setFileDetails((prevState) => ({
        ...prevState,
        fileName: name,
        fileSize: `${fileSizeKb} kb`,
        fileType: type
      }));

      const res = await handleFileUpload(sanitizedFileName);
      if (res.status === API_STATUS.FAILED) {
        handleToast({ severity: ERROR, message: res.message }, setToastState, toastState);
        setFileDetails((prevState) => ({
          ...prevState,
          fileName: ''
        }));
        return;
      }

      if (res.status === API_STATUS.SUCCESS) {
        setFileDetails((prevState) => ({
          ...prevState,
          fileUploadUrl: res.data
        }));
        const resProfile = await handleSaveFile(res.data!);
        const severity: SEVERITY = resProfile?.status === SUCCESS ? SEVERITY.SUCCESS : ERROR;
        if (resProfile?.status !== SUCCESS) {
          handleToast({ severity, message: resProfile.message }, setToastState, toastState);
          sentryCaptureError(resProfile.message, 'profile-image-upload'); //capture error (only pass error message and Api inside this function)
        }
        if (resProfile?.status === SUCCESS) {
          // closeModal()
        }
      }
    },
    [handleFileUpload, setFileDetails, handleToast, setToastState, toastState]
  );

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
    const target = e.currentTarget as HTMLImageElement;
    const { width, height } = target;
    const cropWidthInPercent = (MIN_DIMENSION / width) * 100;

    const crop = makeAspectCrop(
      {
        unit: '%',
        width: cropWidthInPercent
      },
      ASPECT_RATIO,
      width,
      height
    );
    const centeredCrop = centerCrop(crop, width, height);
    setCrop(centeredCrop);
  };

  const setCanvasPreview = (
    image: HTMLImageElement,
    canvas: HTMLCanvasElement,
    pixelCrop: { x: number; y: number; width: number; height: number }
  ) => {
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;

    canvas.width = pixelCrop.width;
    canvas.height = pixelCrop.height;

    ctx.drawImage(
      image,
      pixelCrop.x * scaleX,
      pixelCrop.y * scaleY,
      pixelCrop.width * scaleX,
      pixelCrop.height * scaleY,
      0,
      0,
      pixelCrop.width,
      pixelCrop.height
    );
  };
  const dataUrlToFile = (dataUrl: string, fileName: string): File => {
    const byteString = atob(dataUrl.split(',')[1]);
    const arrayBuffer = new ArrayBuffer(byteString.length);
    const uint8Array = new Uint8Array(arrayBuffer);

    for (let i = 0; i < byteString.length; i++) {
      uint8Array[i] = byteString.charCodeAt(i);
    }

    const blob = new Blob([uint8Array]); // Adjust the mime type if needed
    return new File([blob], fileName); // You can adjust the file name and type
  };
  const handleCrop = async () => {
    if (imgRef.current && previewCanvasRef.current && crop) {
      try {
        const pixelCrop = convertToPixelCrop(crop, imgRef.current.width, imgRef.current.height);
        setCanvasPreview(imgRef.current, previewCanvasRef.current, pixelCrop);

        const dataUrl = previewCanvasRef.current.toDataURL();
        setCroppedDataUrl(dataUrl);
      } catch (error) {
        console.error('Error during cropping or file upload:', error);
      }
    }
  };

  const handleUpload = async () => {
    const croppedFile = dataUrlToFile(croppedDataUrl, fileDetails.fileName);
    if (croppedFile) {
      await updateFileDetails(croppedFile);
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: 2, padding: 2 }}>
        <Typography variant="h6" component={'div'} color="textSecondary" align="center">
          {i18n('imageUploader.title')}
        </Typography>
        <Button
          variant="outlined"
          component="label"
          fullWidth
          sx={{
            marginTop: 2
          }}
          className={styles.btnBlackColor}
        >
          <input
            type="file"
            accept=".jpg,.jpeg,.png" // Accept only JPG, JPEG, PNG files
            onChange={onSelectFile}
            hidden
          />
          <UploadIcon sx={{ marginRight: 1 }} /> {/* Adding the Upload icon */}
          {i18n('imageUploader.uploadFileBtnName')}
        </Button>
        <Typography component="p" align="center" sx={{ marginTop: 1 }}>
          {i18n('imageUploader.fileSupported')} | {i18n('imageUploader.fileSize')}
        </Typography>
      </Box>

      {imgSrc && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
          <ReactCrop
            crop={crop}
            onChange={(pixelCrop, percentCrop) => setCrop(percentCrop)}
            keepSelection
            aspect={ASPECT_RATIO} // Keeping the aspect ratio
            minWidth={MIN_DIMENSION} // Min width for crop
            style={{
              position: 'relative',
              maxWidth: '100%',
              borderRadius: '4px', // Changed to rectangular
              overflow: 'hidden',
              border: '2px solid rgba(255, 255, 255, 0.6)'
            }}
          >
            <img
              ref={imgRef}
              src={imgSrc}
              alt="Upload"
              style={{
                maxHeight: '70vh',
                width: '100%',
                borderRadius: '4px' // Changed to rectangular
              }}
              onLoad={onImageLoad}
            />
          </ReactCrop>

          <Button
            variant="contained"
            className={styles.btnBlackColor}
            sx={{
              marginTop: 2
            }}
            onClick={handleCrop}
          >
            <CropIcon sx={{ marginRight: 1 }} /> {/* Adding the Crop icon */}
            {i18n('imageUploader.cropFileBtnName')}
          </Button>
        </Box>
      )}

      {crop && (
        <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: 2 }}>
          <Typography variant="body2" color="textSecondary" sx={{ marginBottom: 1 }}>
            Cropped Image Preview:
          </Typography>
          <canvas
            ref={previewCanvasRef}
            style={{
              border: '1px solid black',
              objectFit: 'contain',
              width: '150px',
              height: '150px'
            }}
          />
          {croppedDataUrl && (
            <Button
              variant="contained"
              sx={{
                marginTop: 2
              }}
              className={styles.btnBlackColor}
              onClick={handleUpload}
            >
              {i18n('imageUploader.saveFileBtnName')}
            </Button>
          )}
          {fileDetails?.fileUploadUrl && (
            <>
              <Typography variant="h5" color="textSecondary" sx={{ marginBottom: 1 }}>
                S3 FILE URL :
              </Typography>
              <Typography
                variant="h6"
                component="div"
                color="textSecondary"
                sx={{ marginLeft: 25 }}
              >
                {fileDetails?.fileUploadUrl}
              </Typography>
            </>
          )}
        </Box>
      )}
      {toastState.open && <Toast toastState={toastState} />}
    </>
  );
};

export default ImageCropper;
