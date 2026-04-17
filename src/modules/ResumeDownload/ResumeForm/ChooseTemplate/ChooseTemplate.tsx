import React, { useEffect, useState } from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { useStyles } from './ChooseTemplateStyles';
import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';
interface ChooseTemplateProps {
  data: {
    id: string;
    name: string;
    is_active: boolean;
  };
  onChange: (value: { id: string; name: string; is_active: boolean }) => void;
}
interface TemplatesData {
  id: string;
  name: string;
  is_active: boolean;
}
const Choosetemplate: React.FC<ChooseTemplateProps> = ({ data, onChange }) => {
  const styles = useStyles();
  const [selectedIndex, setSelectedIndex] = useState<number | null>(); //change null to 1 for default first selected
  const [templates, setTemplates] = useState<TemplatesData[]>([]);
  const handleCardClick = (index: number, id: string, name: string, is_active: boolean) => {
    setSelectedIndex(index);
    onChange({ id, name, is_active });
  };
  const { GET_TEMPLATE_LIST } = APIS;
  const geTemplateList = async () => {
    const [response] = await httpRequest({
      url: `${GET_TEMPLATE_LIST}`,
      method: API_METHOD.GET
    });
    if (response && response.length !== null) {
      const resData = response?.res_data?.data;
      setTemplates(resData);
      return { status: 'success', data: resData };
    } else {
      return { status: 'failed', message: response?.err?.response?.message };
    }
  };
  useEffect(() => {
    geTemplateList();
  }, []);
  useEffect(() => {
    const potentialNumber = data.name.replace('Template', '');
    const selectedNumber = parseInt(potentialNumber, 10);
    setSelectedIndex(selectedNumber);
  }, [data]);
  const getImagePath = (templateName: string) => {
    // Adjust the following mapping based on your actual naming convention
    const imageMapping: { [key: string]: string } = {
      'Template 1': 'template_1',
      'Template 2': 'template_2',
      'Template 3': 'template_3',
      'Template 4': 'template_4'
    };

    return imageMapping[templateName] || 'template_1'; // Provide a default image path if not found
  };
  return (
    <>
      <Box className={styles.mainWrapper}>
        {/* All templates without checked to checked and seleted replace css 'cardWrapper' to 'chekedCardWrapper' and status true CheckCircleIcon true  */}
        {templates.map((template, index) => (
          <Card
            key={index}
            className={selectedIndex === index + 1 ? styles.chekedCardWrapper : styles.cardWrapper}
            onClick={() =>
              handleCardClick(index + 1, template.id, template.name, template.is_active)
            }
          >
            <CardMedia
              component="img"
              image={`/templates/${getImagePath(template.name)}.png`}
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
export default Choosetemplate;
