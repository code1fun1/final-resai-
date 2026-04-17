import { Box } from '@mui/material';
import { CircularProgressbarWithChildren } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
//import Icon from '../Icon';
import { useStyles } from './CircularProgressBarStyles';
declare module '@mui/material' {
  interface Palette {
    tertiary: Palette['primary'];
    neutral: {
      [key: number]: string;
    };
  }
}

export enum STROKE_LINE_CAP {
  ROUND = 'round',
  BUTT = 'butt'
}

export enum TEXT_FONT_SIZE {
  MIDDLE = 'middle',
  LARGE = 'large'
}

interface CircularProgressBarProps {
  strokeWidth: number;
  percentage: number;
  strokeLinecap?: STROKE_LINE_CAP;
  semiCircular?: boolean;
  width?: string;
  height?: string;
  subTitle?: string;
  textFontSize?: TEXT_FONT_SIZE;
}

const DEFAULT_WIDTH: string = '200px';
const DEFAULT_HEIGHT: string = '200px';
const CIRCLE_RATIO: { SEMI: number; FULL: number } = { SEMI: 0.7, FULL: 1 };
const ROTATE_TRANSFORM: { SEMI: string; FULL: string } = {
  SEMI: 'rotate(-126deg)',
  FULL: 'rotate(-180deg)'
};
const FONT_SIZE: { LARGE: string; MEDIUM: string; SMALL: string } = {
  LARGE: '40px',
  MEDIUM: '33px',
  SMALL: '20px'
};
const CircularProgressBar = (props: CircularProgressBarProps) => {
  const {
    strokeWidth,
    percentage,
    strokeLinecap = STROKE_LINE_CAP.BUTT,
    width = DEFAULT_WIDTH,
    height = DEFAULT_HEIGHT,
    semiCircular = false,
    subTitle,
    textFontSize
  } = props;
  // const theme = useTheme();
  // const strokeColor = percentage > 70 ? theme.palette.tertiary.main : theme.palette.neutral[201];
  const strokeColor = percentage > 70 ? '#01d392' : '#DABF67';
  const circleRatio = semiCircular === true ? CIRCLE_RATIO.SEMI : CIRCLE_RATIO.FULL;
  const rotateTransform = semiCircular === true ? ROTATE_TRANSFORM.SEMI : ROTATE_TRANSFORM.FULL;
  const textFontSizes =
    textFontSize === TEXT_FONT_SIZE.LARGE
      ? FONT_SIZE.LARGE
      : textFontSize === TEXT_FONT_SIZE.MIDDLE
        ? FONT_SIZE.MEDIUM
        : FONT_SIZE.SMALL;
  const styles = useStyles();

  return (
    <Box width={width} height={height} className={styles.progressBarWrapper} position="relative">
      <CircularProgressbarWithChildren
        value={percentage}
        text={`${percentage}`}
        circleRatio={circleRatio}
        styles={{
          trail: {
            strokeLinecap: `${strokeLinecap}`,
            transform: `${rotateTransform}`,
            transformOrigin: 'center center'
          },
          path: {
            stroke: `${strokeColor}`,
            strokeLinecap: `${strokeLinecap}`,
            transform: `${rotateTransform}`,
            transformOrigin: 'center center'
          },
          text: {
            fontSize: `${textFontSizes}`,
            fontWeight: 500
          }
        }}
        strokeWidth={strokeWidth}
        className={styles.circluarProgressBar}
      >
        {subTitle && (
          <span className={styles.titleText}>
            {subTitle}
            {/* <Tooltip 
              title={subTitle} 
              arrow
              placement="bottom"
              enterTouchDelay={0}
              componentsProps={{
                tooltip: {
                  sx: {
                    bgcolor: 'common.black',
                    '& .MuiTooltip-arrow': {
                      color: 'common.black'
                    }
                  }
                }
              }}
            >
              <span style={{ 
                display: 'inline-flex', 
                marginLeft: '8px',
                cursor: 'pointer'
              }}>
                <Icon 
                  name="infoCircleIcon" 
                  sx={{ fontSize: '16px' }} 
                />
              </span>
            </Tooltip> */}
          </span>
        )}
      </CircularProgressbarWithChildren>
    </Box>
  );
};
export default CircularProgressBar;
