import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import { Typography } from '@mui/material';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { useRouter } from 'next/router';
import React from 'react';
import { useStyles } from './BreadCrumbStyle';

interface BreadcrumbItem {
  label: string;
  link?: string;
}

interface BreadcrumbWrapperProps {
  breadcrumbs: BreadcrumbItem[];
  className?: string;
  navigateBeforeIcon?: boolean;
  activeIndex: number;
}
const Breadcrumb: React.FC<BreadcrumbWrapperProps> = ({
  breadcrumbs,
  className,
  navigateBeforeIcon,
  activeIndex
}) => {
  const styles = useStyles();
  const router = useRouter();

  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      separator={
        navigateBeforeIcon ? (
          <NavigateBeforeIcon className={styles.breadcrumbIcon} />
        ) : (
          <NavigateNextIcon className={styles.breadcrumbIcon} />
        )
      }
      className={className ? className : styles.breadcrumb}
    >
      {breadcrumbs.map((content: BreadcrumbItem, index: number) => (
        <Typography
          key={index}
          className={index === activeIndex ? styles.activeBreadcrumb : styles.customLink}
          onClick={() => index !== activeIndex && router.push(content.link || '#')}
        >
          {content.label}
        </Typography>
      ))}
    </Breadcrumbs>
  );
};
export default Breadcrumb;
