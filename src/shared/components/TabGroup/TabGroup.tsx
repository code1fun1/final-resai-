import EastRoundedIcon from '@mui/icons-material/EastRounded';
import WestRoundedIcon from '@mui/icons-material/WestRounded';
import { Box, IconButton, Tab, Tabs } from '@mui/material';
import { ChangeEvent } from 'react';
import { useStyles } from './TabGroupStyles';

interface TabGroupProps {
  tabBtnName: string[];
  value: number;
  onChange: (event: ChangeEvent<{}>, newValue: number) => void;
  singleTabs?: boolean;
}

const a11yProps = (index: number) => {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`
  };
};

const TabGroup = (props: TabGroupProps) => {
  const { tabBtnName, value, onChange, singleTabs } = props;
  const styles = useStyles();

  return (
    <Box>
      <Tabs
        value={value}
        onChange={onChange}
        aria-label="basic tabs example"
        className={`${singleTabs === true ? `${styles.gapTabBtn}` : ''} ${styles.tabBtnWrapper}`}
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
              style={{ opacity: other.disabled ? 0 : 1 }}
              {...other}
              className={`${styles.IconStyle} ${styles.prevIcon}`}
            >
              <WestRoundedIcon />
            </IconButton>
          ) : (
            <IconButton
              onClick={onClick}
              aria-label="scroll right"
              style={{ opacity: other.disabled ? 0 : 1 }}
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
              label={item}
              {...a11yProps(index)}
              className={`${singleTabs === true ? `${styles.outlinedTabBtn}` : `${styles.containedTabBtn}`} ${styles.tabBtn}`}
            />
          );
        })}
      </Tabs>
    </Box>
  );
};
export default TabGroup;
