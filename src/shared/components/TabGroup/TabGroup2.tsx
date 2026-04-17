import EastRoundedIcon from '@mui/icons-material/EastRounded';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import { ChangeEvent } from 'react';
import { useStyles } from './TabGroupStyles2';

interface TabGroupProps {
  tabBtnName: string[];
  value: number;
  onChange: (event: ChangeEvent<{}>, newValue: number) => void;
  singleTabs?: boolean;
  singleData?: boolean;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const TabGroup2 = (props: TabGroupProps) => {
  const { tabBtnName, value, onChange, singleTabs, singleData } = props;
  const styles = useStyles();
  const capitalize = (s: string) => (s.length > 0 ? s.charAt(0).toUpperCase() + s.slice(1) : s);
  return (
    <Box>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="basic tabs example"
        className={`${singleTabs === true ? `${styles.gapTabBtn}` : ''}   ${singleData === true ? `${styles.tabBtnWrapper}` : `${styles.tabBtnWrapper}`}`}
        variant="scrollable"
        scrollButtons="auto"
        ScrollButtonComponent={({
          direction,
          onClick,
          ...other
        }: {
          direction: string;
          onClick: () => void;
          disabled: boolean;
        }) =>
          direction === 'left' ? (
            <IconButton
              onClick={onClick}
              aria-label="scroll left"
              style={{ opacity: other.disabled ? 0.5 : 1 }}
              {...other}
              className={`${styles.IconStyle} ${styles.prevIcon}`}
            >
              <WestRoundedIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={onClick}
              aria-label="scroll right"
              style={{ opacity: other.disabled ? 0.5 : 1 }}
              {...other}
              className={`${styles.IconStyle} ${styles.nextIcon}`}
            >
              <EastRoundedIcon />
            </IconButton>
          )
        }
      >
        {tabBtnName.map((item: string, index: number) => {
          return (
            <Tab
              key={`${item}-${index}`}
              label={capitalize(item)}
              {...a11yProps(index)}
              className={`${singleTabs === true ? `${styles.outlinedTabBtn}` : `${styles.containedTabBtn}`} ${styles.tabBtn}`}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};
export default TabGroup2;
