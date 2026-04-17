import makeStyles from '@mui/styles/makeStyles';

export const useStylesGoldTheme = makeStyles((theme) => ({
  btnBlackColor: {
    backgroundColor: '#424246',
    '&:hover': {
      backgroundColor: '#424246' // Keeps the hover background color the same
    },
    '&.Mui-disabled': {
      backgroundColor: theme.palette.action.disabled, // Use disabled color from theme
      color: theme.palette.text.disabled // Use disabled text color from theme
    }
  },
  btnBlackColorWithWhite: {
    backgroundColor: '#424246',
    color: 'white',
    '&:hover': {
      backgroundColor: '#424246' // Keeps the hover background color the same
    }
  },
  textColorBlack: {
    backgroundColor: '#424246',
    '&:hover': {
      backgroundColor: '#424246' // Keeps the hover background color the same
    }
  },
  stepperModified: {
    '& .MuiStepIcon-root': {
      color: '#424246' // Change the default icon color
    },
    '& .MuiStepIcon-active': {
      color: '#424246 !important' // Change the color of active step icon
    },
    '& .MuiStepIcon-completed': {
      color: '#424246 !important' // Change the color of completed step icon
    },
    '& .MuiStepLabel-label': {
      color: '#424246' // Change label color for non-active steps
    },
    '& .MuiStepLabel-active': {
      color: '#424246 !important' // Change label color for active steps
    }
  },
  focusedTextField: {
    '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#424246' // Change the border color to black when focused
    },
    '& .MuiInputLabel-outlined.Mui-focused': {
      color: '#424246' // Change the label color to black(#424246) when focused
    }
  }
}));
