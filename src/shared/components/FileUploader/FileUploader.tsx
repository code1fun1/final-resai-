import React, { useRef, useMemo } from 'react';
import { Stack, Box, Typography, CircularProgress, IconButton } from '@mui/material';
import InputLabel from '@mui/material/InputLabel';
import CloudUploadIcon from './CloudUploadIcon';
import UploadedResumeIcon from './UploadedResumeIcon';
import Icon from '../Icon';
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
    const styles = useStyles();
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (onDrop) onDrop(event);
    };

    const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();
      if (onDragOver) onDragOver(event);
      if (fileInputRef.current) fileInputRef.current.disabled = false;
    };

    const onDeleteClick = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
      onDelete();
    };

    const fileUploaderContent = useMemo(() => {
      if (selectedFileName) {
        const StatusIcon = showSpinner ? CloudUploadIcon : UploadedResumeIcon;
        return (
          <Box className={styles.selectedWrap}>
            <Box className={styles.selectedTopRow}>
              <StatusIcon size={40} className={styles.uploadIcon} />
              <Box className={styles.selectedAction}>
                {showSpinner ? (
                  <CircularProgress
                    size={20}
                    variant="determinate"
                    value={spinTimer}
                    style={{ color: '#DABF67' }}
                  />
                ) : (
                  <IconButton onClick={onDeleteClick} size="small">
                    <Icon name="trashIcon" />
                  </IconButton>
                )}
              </Box>
            </Box>
            <Typography className={styles.selectedFileName}>{selectedFileName}</Typography>
          </Box>
        );
      }

      return (
        <Box display="flex" flexDirection="column" alignItems="center" gap={0.5}>
          <CloudUploadIcon size={36} color="#735302" className={styles.uploadIcon} />
          <Typography className={styles.uploadText}>
            <span className={styles.clickHereText}>Click here</span>
            {' '}to upload or Drag and drop
          </Typography>
          <Typography component="p" className={styles.pdfText}>
            PDF or DOC &nbsp;(Maximum size: 5MB)
          </Typography>
        </Box>
      );
    }, [selectedFileName, showSpinner, spinTimer, onDelete, styles]);

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
