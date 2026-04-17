import React, { useRef, useMemo } from 'react';
import { Stack, Box, Typography, CircularProgress, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import Icon from '../Icon';
import { useTranslation } from 'react-i18next';
import { useStyles } from './FileUploaderStyle';
interface FileUploaderProps {
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onDrop?: (event: React.DragEvent<HTMLDivElement>) => void;
  onDragOver?: (event: React.DragEvent<HTMLDivElement>) => void;
  selectedFileName: string;
  showSpinner: boolean;
  spinTimer: number;
  onDelete: () => void;
  errorMessage: string;
}

const FileUploader: React.FC<FileUploaderProps> = React.memo(
  ({
    onDrop,
    onChange,
    onDragOver,
    selectedFileName,
    showSpinner = false,
    spinTimer = 0,
    onDelete,
    errorMessage
  }) => {
    const { t: i18n } = useTranslation();
    const styles = useStyles();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (onDrop) {
        onDrop(event);
      }
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (onDragOver) {
        onDragOver(event);
      }
      if (fileInputRef.current) {
        fileInputRef.current.disabled = false;
      }
    };

    const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onDelete();
    };

    const fileUploaderContent = useMemo(() => {
      if (selectedFileName) {
        return (
          <Box className={styles.spinnerWrap}>
            <Typography
              component="strong"
              style={{
                color: '#424246',
                whiteSpace: 'normal',
                paddingLeft: '10px'
              }}
            >
              {selectedFileName}
            </Typography>
            {showSpinner ? (
              <CircularProgress
                size={20}
                variant="determinate"
                value={spinTimer}
                style={{ color: '#424246' }}
              />
            ) : (
              <>
                <IconButton onClick={(event) => onDeleteClick(event)}>
                  <Icon name="trashIcon" />
                </IconButton>
              </>
            )}
          </Box>
        );
      }

      return (
        <Box display="flex" alignItems="center" gap={1}>
          <Icon name="arrowCircleUpIcon" className={styles.arrowIcon} />
          {/* <Typography component="h3" className={styles.viewDesktop}>
            {i18n('fileUploader.dragAndDrop', { ns: 'common' })}
            <Typography component="span" style={{ color: '#000000' }}>
              {i18n('fileUploader.uploadFile', { ns: 'common' })}
            </Typography>
          </Typography> */}
          {/* Desktop View - Drag and Drop + Upload File */}
          <Typography component="h3" className={styles.viewDesktop}>
            <span style={{ color: '#000000' }}>
              {i18n('fileUploader.dragAndDrop', { ns: 'common' })}
            </span>
            <span style={{ color: '#000000' }}>
              {i18n('fileUploader.uploadFile', { ns: 'common' })}
            </span>
          </Typography>
          {/* mobile device */}
          <Typography component="h3" className={styles.viewMob}>
            <Typography component="span" style={{ color: '#424246' }}>
              {i18n('fileUploader.uploadResume', { ns: 'common' })}
            </Typography>
          </Typography>
        </Box>
      );
    }, [selectedFileName, showSpinner, spinTimer, onDelete, i18n, styles]);

    return (
      <Stack direction="column" alignItems="center" spacing={2}>
        <InputLabel htmlFor="contained-button-file" className={styles.inputWrap}>
          <input
            onChange={onChange}
            accept=".pdf,.doc,.docx"
            id="contained-button-file"
            type="file"
            className={styles.inputFile}
            ref={fileInputRef}
            disabled={!!selectedFileName}
          />
          <Box className={styles.boxWrap} onDrop={handleDrop} onDragOver={handleDragOver}>
            {fileUploaderContent}
            <Typography component="p">
              {i18n('fileUploader.fileSupported', { ns: 'common' })} |{' '}
              {i18n('fileUploader.fileSize', { ns: 'common' })}
            </Typography>
            {errorMessage.length > 0 && (
              <Typography className="errorMessage">{errorMessage}</Typography>
            )}
          </Box>
        </InputLabel>
      </Stack>
    );
  }
);

export default FileUploader;
