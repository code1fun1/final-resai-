import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  menuWrapper: {
    '& .MuiPaper-root': {
      backgroundColor: theme.palette.neutral[700],
      '& .MuiTypography-root': {
        ...theme.typography.title3,
        color: theme.palette.neutral[80]
      },
      '& .MuiListItemIcon-root': {
        '&>svg': {
          stroke: theme.palette.neutral[80]
        }
      },
      '& .MuiButtonBase-root.MuiMenuItem-root': {
        '&:hover': {
          backgroundColor: 'transparent',
          '& .MuiListItemIcon-root': {
            '&>svg': {
              stroke: theme.palette.cool.main
            }
          },
          '& .MuiTypography-root': {
            color: theme.palette.cool.main
          }
        }
      }
    }
  }
}));
