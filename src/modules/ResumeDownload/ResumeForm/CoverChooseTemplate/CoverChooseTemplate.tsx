import React, { useState } from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStyles } from './CoverChooseTemplateStyles';
interface ChooseTemplateProps {
  data: {
    templateId: string;
  };
  onChange: (value: { templateId: string }) => void;
}
const CoverChooseTemplate: React.FC<ChooseTemplateProps> = ({ data, onChange }) => {
  const styles = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const templateId = data.templateId; //currently its static/same templatedId
  const handleCardClick = (index: number, templateId: string) => {
    setSelectedIndex(index);
    onChange({ templateId });
  };
  return (
    <>
      <Box className={styles.mainWrapper}>
        {/* All templates without checked to checked and seleted replace css 'cardWrapper' to 'chekedCardWrapper' and status true CheckCircleIcon true  */}
        {['template_1', 'template_2', 'template_3', 'template_4'].map((template, index) => (
          <Card
            key={index}
            className={selectedIndex === index + 1 ? styles.chekedCardWrapper : styles.cardWrapper}
            onClick={() => handleCardClick(index + 1, templateId)}
          >
            <CardMedia
              component="img"
              image={`/templates/${template}.png`}
              alt={`template image ${index + 1}`}
            />
            {selectedIndex === index + 1 && (
              <CheckCircleIcon color="primary" className={styles.checkedIconClass} />
            )}
          </Card>
        ))}
      </Box>
    </>
  );
};
export default CoverChooseTemplate;
