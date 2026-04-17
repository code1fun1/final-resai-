import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  sliderWrapper: {
    '&.slick-slider': {
      width: '363px',
      [theme.breakpoints.only('xs')]: {
        width: '250px'
      },
      '& .slick-list': {
        padding: '20px 0'
      }
    },
    '& .slick-dots': {
      marginLeft: '50px',
      bottom: '-35%',
      textAlign: 'left',
      '&> li button::before': {
        color: theme.palette.neutral[700]
      },
      [theme.breakpoints.down('md')]: {
        textAlign: 'center',
        marginLeft: '0px'
      },
      [theme.breakpoints.down('sm')]: {
        marginLeft: '0px'
      }
    }
  },
  sliderContentWrapper: {
    '&.MuiBox-root': {
      display: 'flex !important',
      flexDirection: 'column',
      gap: theme.spacing(2)
    },
    paddingLeft: theme.spacing(2), // xs padding
    paddingRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      paddingLeft: theme.spacing(4), // sm padding
      paddingRight: theme.spacing(4)
    },
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing(6), // md padding
      paddingRight: theme.spacing(6)
    }
  },
  title: {
    '&.MuiTypography-root': {
      ...theme.typography.h3,
      [theme.breakpoints.down('md')]: {
        ...theme.typography.h5
      }
    }
  },
  subTitle: {
    '&.MuiTypography-root': {
      ...theme.typography.title3
    }
  }
}));
