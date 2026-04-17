import makeStyles from '@mui/styles/makeStyles';

export const useStyles = makeStyles((theme) => ({
  chip: {
    '&.MuiButtonBase-root': {
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'space-between',
      padding: '4px 10px 4px 4px',
      height: '40px'
    },
    '& .MuiChip-deleteIcon': {
      stroke: theme.palette.neutral[190],
      width: '14px',
      height: '14px'
    },
    '& .MuiChip-label': {
      ...theme.typography.captionRg,
      width: '-webkit-fill-available',
      marginTop: '2px'
    },
    '&.MuiChip-filled': {
      backgroundColor: theme.palette.cool.extraLight,
      color: theme.palette.neutral[190]
    },
    '&.MuiChip-outlined': {
      borderColor: theme.palette.neutral[10],
      '& .MuiChip-label': {
        fontSize: theme.typography.body3.fontSize,
        fontWeight: theme.typography.body2.fontWeight,
        lineHeight: theme.typography.body3.lineHeight,
        color: theme.palette.neutral[80]
      }
    },
    '&.MuiChip-root': {
      borderRadius: '6px',
      padding: '4px 10px 4px 4px'
    }
  },
  emptyBlock: {
    '&.MuiChip-avatar': {
      display: 'none'
    }
  }
}));
