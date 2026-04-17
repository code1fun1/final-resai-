import { Box, Typography } from '@mui/material';
import React from 'react';
import ChipComponent from '~/shared/components/Chip/Chip';
import EditableChipField from '../EditableChipField';
import { useStyles } from './SkillsTabStyles';
import { isDataAvailable } from '~/shared/utils/utils';

interface SkillsTabProps {
  placeholder: string;
  tabName?: string;
  suggestedItems: { name: string; id: string }[];
  selectedItems?: { name: string; id: string }[];
  isHideTabName?: boolean;
  suggestTitle: string;
  onAddItem: (item: { name: string; id: string }) => void;
  onRemoveItem: (item: { name: string; id: string }) => void;
}

const SkillsTab: React.FC<SkillsTabProps> = ({
  suggestedItems,
  tabName,
  placeholder,
  isHideTabName = false,
  selectedItems,
  suggestTitle,
  onAddItem,
  onRemoveItem
}) => {
  const styles = useStyles();
  const selectedItemsLength: number = selectedItems?.length || 0;

  const handleSaveText = (text: string) => {
    if (text) {
      const isAlreadySelected: boolean = isDataAvailable(selectedItems || [], text);
      if (!isAlreadySelected) {
        onAddItem({ id: '', name: text });
      }
    }
  };

  const handleChipClick = (data: { name: string; id: string }) => {
    onAddItem(data);
  };

  const handleDelete = (data: { name: string; id: string }) => {
    onRemoveItem(data);
  };

  return (
    <>
      <Box>
        {!isHideTabName && (
          <Typography className={styles.content}>
            {tabName}{' '}
            {selectedItemsLength > 0 && (
              <span className={styles.totalStrengthStyle}>{selectedItemsLength}</span>
            )}
          </Typography>
        )}

        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSaveText('');
          }}
        >
          <EditableChipField
            onSave={handleSaveText}
            placeholder={placeholder}
            onChange={(text) => ({ text, isValid: true })}
            value=""
          />
        </form>
        <Box
          display="flex"
          mt={2}
          pb={{ xs: 1, md: 0 }}
          flexDirection="column"
          gap={2}
          className={styles.skillsChipWrapper}
        >
          <Box display="flex" alignItems={'center'} flexWrap="wrap" gap={1}>
            {selectedItems?.map((item: { id: string; name: string }, id: number) => {
              return (
                <ChipComponent
                  key={`${item.id}-${id}`}
                  chipData={item}
                  onDelete={handleDelete}
                  variant="filled"
                />
              );
            })}
          </Box>
          <Typography className={styles.suggestTitle}>{suggestTitle}</Typography>
          <Box display="flex" flexWrap="wrap" gap={1}>
            {suggestedItems?.map((item: { name: string; id: string }, i: number) => {
              const isSelected: boolean | undefined = selectedItems?.some(
                (data: { name: string; id: string }) =>
                  data.name.toLowerCase() === item.name.toLowerCase()
              );
              return (
                <ChipComponent
                  key={`${item.id}-${i}`}
                  onClick={handleChipClick}
                  variant="outlined"
                  chipData={item}
                  disabled={isSelected}
                />
              );
            })}
          </Box>
        </Box>
      </Box>
    </>
  );
};
export default SkillsTab;
