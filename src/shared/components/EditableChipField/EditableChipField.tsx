import { TextField as MUITextField } from '@mui/material';
import React, { ChangeEvent, useEffect, useRef, useState } from 'react';
import { useStyles } from './EditableChipFieldStyle';
import { useStylesGoldTheme } from '~/modules/globalStyles';
// import AddTaskIcon from '@mui/icons-material/AddTask';

interface TextFieldProps {
  placeholder: string;
  name?: string;
  onSave: (text: string) => void;
  onChange: (text: string) => void;
  value: string;
}

const TextField: React.FC<TextFieldProps> = ({
  placeholder,
  name = 'TextField',
  onSave,
  onChange,
  value
}) => {
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const [text, setText] = useState(value);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (value) {
      setText('');
    }
  }, [value]);

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
    if (onChange) {
      onChange(e.target.value);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onSave(text);
      setText('');
    }
  };

  const handleClickOutside = (e: MouseEvent) => {
    if (inputRef.current && !inputRef.current.contains(e.target as Node)) {
      onSave(text);
      setText('');
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [text]);

  return (
    <MUITextField
      variant="outlined"
      type="text"
      name={name}
      value={text}
      placeholder={placeholder}
      onChange={handleInputChange}
      onKeyDown={handleKeyDown}
      className={`${styles.chipTextfield} ${globalStyles.focusedTextField}`}
      // sx={{ paddingRight: '2px' }} // Apply padding-right using sx prop
      // InputProps={{
      //   endAdornment: text ? ( // Conditionally render the icon
      //     <InputAdornment position="end" style={{ margin: 0 }}>
      //       <div
      //         style={{
      //           display: 'flex',
      //           alignItems: 'center',
      //           cursor: 'pointer',
      //           padding: '0 2px' // Adjust padding to fit the icon nicely
      //         }}
      //         onClick={() => {
      //           onSave(text); // Call onSave with the current text
      //           setText(''); // Clear the text field after saving
      //         }}
      //       >
      //         <AddTaskIcon className={`${globalStyles.focusedTextField}`} />
      //       </div>
      //     </InputAdornment>
      //   ) : null // Render nothing if text is empty
      // }}
    />
  );
};

export default TextField;
