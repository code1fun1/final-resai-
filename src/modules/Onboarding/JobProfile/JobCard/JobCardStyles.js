import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  jobCardWrapper: {
    '&.MuiPaper-root.MuiPaper-outlined ': {
      borderColor: theme.palette.neutral[10],
      borderRadius: '6px',
      boxShadow: 'none'
    },
    '& .MuiCardContent-root': {
      padding: 0,
      flex: 1,
      '&:last-child': {
        paddingBottom: 0
      }
    },
    '& .MuiCardActions-root': {
      padding: '0 64px 16px',
      [theme.breakpoints.down('sm')]: {
        padding: '0 58px 16px'
      }
    },
    '& .MuiButtonBase-root.MuiCardActionArea-root': {
      '&:hover': {
        '& .MuiCardActionArea-focusHighlight': {
          opacity: 0
        }
      }
    }
  },
  jobCard: {
    borderRadius: '6px'
  },
  jobCompanyName: {
    '&.MuiTypography-root': {
      ...theme.typography.buttonLg,
      color: theme.palette.neutral[190]
    }
  },
  subTitles: {
    '&.MuiTypography-root': {
      fontSize: theme.typography.body3.fontSize,
      fontWeight: theme.typography.body2.fontWeight,
      lineHeight: theme.typography.body3.lineHeight,
      color: theme.palette.neutral[50]
    }
  },
  jobBtnStyle: {
    '&.MuiButton-root.MuiButton-text': {
      ...theme.typography.captionLg,
      padding: 0,
      justifyContent: 'left',
      [theme.breakpoints.down('sm')]: {
        ...theme.typography.buttonRg
      },
      color: '#424246'
    },
    '& .MuiButton-icon.MuiButton-endIcon': {
      marginLeft: 0
    }
  },
  jobCardSelected: {
    '&.MuiPaper-root.MuiPaper-outlined ': {
      borderColor: '#424246',
      backgroundColor: theme.palette.neutral[5]
    }
  },
  wrapSubTitles: {
    '&.MuiTypography-root': {
      [theme.breakpoints.only('md')]: {
        width: '68px',
        wordWrap: 'break-word'
      }
    }
  }
}));
