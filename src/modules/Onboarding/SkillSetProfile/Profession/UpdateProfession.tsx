import {
  Box,
  FormControl,
  IconButton,
  InputAdornment,
  InputLabel,
  ListSubheader,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useMemo, useRef, useState, useEffect } from 'react';
import withLoader from '~/shared/components/HOC/withLoader';
import Icon from '~/shared/components/Icon';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { DataItem } from '../../Utils/OnboardingUtils';
import { useStyles } from './ProfessionStyles';
import { useStylesGoldTheme } from '~/modules/globalStyles';

interface UpdateProfessionProps {
  targetJob: DataItem;
  targetJobList: DataItem[];
  CurrentJobEdit: boolean;
  onTargetJobChange: (targetJob: DataItem) => void;
}

const UpdateProfession: React.FC<UpdateProfessionProps> = ({
  targetJobList,
  targetJob,
  CurrentJobEdit,
  onTargetJobChange
}) => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const { t: i18n } = useTranslation(LOCALE_PAGE.ONBOARDING);
  // const capitalizeWords = (str: string) => {
  //   //Capitalise work(RG)
  //   return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  // };
  const capitalizeWords = (str: string) => {
    // Check if the input is a valid string
    if (!str || typeof str !== 'string') {
      return '';
    }

    // Capitalize the first letter of each word
    return str.replace(/\b\w/g, (char: string) => char.toUpperCase());
  };

  const [open, setOpen] = useState<boolean>(false);
  const [searchText, setSearchText] = useState<string>('');
  const [isEditing, setisEditing] = useState<boolean>(false);

  const [TargetName, setTargetName] = useState<string>(capitalizeWords(targetJob.name)); //Capitalise work(RG)
  const [CurrentJobEditStatus, setCurrentJobEditStatus] = useState<boolean>(CurrentJobEdit);
  const selectRef = useRef(null);
  const [localJobTitle, setLocalJobTitle] = useState<string>('');

  const handleJobChange = async (e: SelectChangeEvent<string>) => {
    if (localJobTitle !== '') {
      return false;
    }
    // return false;
    setCurrentJobEditStatus(false);
    setTargetName(e.target.value);
    setisEditing(false);
    const { id = '' } = targetJobList.find((obj: DataItem) => obj.name === e.target.value) || {};
    onTargetJobChange({ id, name: e.target.value });
    setOpen(false);

    // alert(setCurrentJobEditStatus);
  };
  const handleJobChangeEdit = async (targetJobName: string) => {
    // console.log('targetJobName', targetJobName);
    if (localJobTitle !== '') {
      return false;
    }
    // return false;
    if (targetJob.name !== targetJobName) {
      const { id = '' } = targetJobList.find((obj: DataItem) => obj.name === targetJobName) || {};
      onTargetJobChange({ id, name: targetJobName });
    }
  };

  const displayedTargetJobs = useMemo(
    () =>
      targetJobList?.filter((option: { name: string }) => {
        const optionName = option.name.toLowerCase();
        const search = searchText.toLowerCase();
        return optionName.includes(search);
      }),
    [searchText, targetJobList]
  );

  const handleEditClickTargetJob = () => {
    setisEditing(true);
    setOpen(!open);
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('jdFormValue');
      if (stored) {
        try {
          const parsed = JSON.parse(stored);
          if (parsed.jobTitle && parsed.jobTitle.trim() !== '') {
            // console.log('parsed.jobTitle', parsed.jobTitle);
            setLocalJobTitle(parsed.jobTitle);
            // return false;
            // jobTitle = parsed.jobTitle;
          }
        } catch (e) {
          // ignore parse errors
        }
      }
    }
    if (localJobTitle != '') {
      setTargetName(localJobTitle);
    }
    setCurrentJobEditStatus(CurrentJobEdit);
  }, [CurrentJobEditStatus, localJobTitle]);

  useEffect(() => {
    {
      TargetName.split(' ')
        .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
    }
  }, [targetJob.name]);
  // const handleEnter = (event: React.KeyboardEvent<HTMLInputElement>) => {
  //   const enteredValue = (event.target as HTMLInputElement).value;
  //   handleJobChangeEdit(enteredValue);
  // };

  const handleFormSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = event.currentTarget;
    const input = form.querySelector('input') as HTMLInputElement;
    if (input) {
      handleJobChangeEdit(input.value);
    }
  };

  return (
    <Box display="flex" alignItems="center" position="relative">
      <FormControl fullWidth className={styles.jobTextfield}>
        {!CurrentJobEditStatus ? (
          isEditing && localJobTitle === '' ? (
            <form onSubmit={handleFormSubmit}>
              <TextField
                size="small"
                defaultValue={TargetName}
                onBlur={(e) => handleJobChangeEdit(e.target.value)}
                className={`${styles.jobTextfield} ${globalStyles.focusedTextField}`}
                autoFocus={true}
                // onKeyDown={handleEnter}
              />
            </form>
          ) : (
            <Typography className={styles.jobTextfield}>{TargetName}</Typography>
          )
        ) : (
          ''
        )}

        <InputLabel id="search-select-label">{i18n('suggestRole')}</InputLabel>
        <Select
          sx={{
            '.MuiSelect-select.MuiSelect-outlined.MuiInputBase-input': {
              display: CurrentJobEditStatus ? 'block' : 'none'
            }
          }}
          MenuProps={{
            PaperProps: {
              className: styles.customMenuList
            },
            autoFocus: false,
            anchorEl: selectRef.current,
            open: open,
            onClose: () => setOpen(false)
          }}
          labelId="search-select-label"
          id="search-select"
          label="Options"
          value={targetJob?.name && targetJobList.length > 0 ? targetJob?.name : ''}
          onChange={(e) => handleJobChange(e)}
          onClose={() => setSearchText('')}
          className={styles.jobSelection}
          ref={selectRef}
        >
          <ListSubheader className={`${styles.searchTargetJob} ${styles.itemList}`}>
            <TextField
              size="small"
              autoFocus={false}
              placeholder="Type to search..."
              fullWidth
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Icon name="searchIcon" />
                  </InputAdornment>
                )
              }}
              onChange={(e) => setSearchText(e.target.value)}
              onKeyDown={(e) => {
                if (e.key !== 'Escape') {
                  e.stopPropagation();
                }
              }}
            />
            {displayedTargetJobs && displayedTargetJobs.length ? (
              <Typography className={styles.roleText}>{i18n('suggestRole')}</Typography>
            ) : (
              ''
            )}
          </ListSubheader>
          {displayedTargetJobs?.map((option: DataItem) => (
            <MenuItem key={option.id} value={option.name} className={styles.itemList}>
              {option.name}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      {localJobTitle === '' && (
        <IconButton onClick={handleEditClickTargetJob}>
          <Icon name="editPenIcon" className={styles.editIcon} />
        </IconButton>
      )}
    </Box>
  );
};

export default withLoader(UpdateProfession);
