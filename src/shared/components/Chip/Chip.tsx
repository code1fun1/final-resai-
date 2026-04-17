import { Avatar, Box } from '@mui/material';
import Chip from '@mui/material/Chip';
import React from 'react';
import Icon from '../Icon';
import { useStyles } from './ChipStyles';

interface ChipProps {
  label?: string;
  badgeContent?: number;
  onDelete?: (value: { name: string; id: string }) => void;
  isDeletable?: boolean;
  onClick?: (value: { name: string; id: string }) => void;
  id?: string;
  chipName?: string;
  variant: 'filled' | 'outlined';
  chipData: { name: string; id: string };
  disabled?: boolean;
}

const ChipComponent: React.FC<ChipProps> = React.memo(
  ({ badgeContent, onDelete, onClick, variant = 'filled', chipData, disabled }) => {
    const styles = useStyles();

    const handleClick = () => {
      if (onClick) {
        onClick(chipData);
      }
    };

    const handleDelete = () => {
      if (onDelete) {
        onDelete(chipData);
      }
    };

    const renderBadge = () => (
      <Box position="relative">
        <Avatar alt="Natacha" src="/image/bg.svg" />
        <span>{badgeContent}</span>
      </Box>
    );

    return (
      <Chip
        label={chipData?.name}
        classes={{ root: styles.chip }}
        onClick={onClick ? handleClick : undefined}
        onDelete={onDelete ? handleDelete : undefined}
        deleteIcon={onDelete && <Icon name="crossIcon" />}
        avatar={badgeContent ? renderBadge() : <span className={styles.emptyBlock}></span>}
        variant={variant}
        disabled={disabled}
      />
    );
  }
);

export default ChipComponent;
