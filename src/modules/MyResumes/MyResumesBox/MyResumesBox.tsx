import {
  Card,
  Grid,
  Box,
  Typography,
  MenuItem,
  Menu,
  IconButton,
  ListItemIcon,
  CardContent,
  Button,
  Divider
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import useMediaQuery from '@mui/material/useMediaQuery';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import withLoader from '~/shared/components/HOC/withLoader';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStyles } from './MyResumesBoxStyles';
import { useRouter } from 'next/router';
import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';
import { useStylesGoldTheme } from '~/modules/globalStyles';
import ScoreCard from './ScoreCard';
import { STORAGE_TYPES, setStorageItem } from '~/shared/utils/storage';
import Image from 'next/image';
import { ROUTES } from '~/shared/constants/routes';
// Define the interface for the resume items
interface ResumeItem {
  id: string;
  date: string;
  resume_content: {
    target_job: string;
  };
  company: string;
  similarity_score: number;
}

interface MyResumesBoxProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
  handleMenuClick: (url: string, resId: string) => void;
}

const MyResumesBox: React.FC<MyResumesBoxProps> = ({ setLoadWithoutMount }) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.MY_RESUMES);
  const styles = useStyles();
  const globalStyles = useStylesGoldTheme();
  const router = useRouter();
  const { asPath } = router;
  const { USER_CV } = APIS;
  const [ResumeData, setResumeData] = useState<ResumeItem[]>([]);
  const [selectedItem, setSelectedItem] = useState<ResumeItem | null>(null);
  const [loading, setLoading] = useState(true);
  const isMobile = useMediaQuery('(max-width:1200px)');
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  // const getCvData = async () => {
  //   setLoading(true);
  //   setLoadWithoutMount(true, 'Loading...');
  //   const [response] = await httpRequest({
  //     url: USER_CV,
  //     method: API_METHOD.GET
  //   });
  //   if (response && response.length !== null) {
  //     const ResData = response?.res_data?.data;
  //     setResumeData(ResData);
  //   }
  //   setLoading(false);
  //   setLoadWithoutMount(false, '');
  // };
  const getCvData = async () => {
    try {
      // Start loading
      setLoading(true);
      // setLoadWithoutMount(true, 'Loading...');

      // Fetch data from API
      const [response] = await httpRequest({
        url: USER_CV,
        method: API_METHOD.GET
      });

      if (response && response.length !== null) {
        const resData = response?.res_data?.data;
        setResumeData(resData);
      }
    } catch (error) {
      console.error('Error fetching resume data', error);
      // Handle error (optional, show an error message or retry)
      setLoading(false);
      // setLoadWithoutMount(false, '');
    } finally {
      // Ensure that both loading states are set to false
      setLoading(false);
      // setLoadWithoutMount(false, '');
    }
  };

  useEffect(() => {
    getCvData();
  }, [setLoadWithoutMount]);

  const handleClick = (event: React.MouseEvent<HTMLElement>, item: ResumeItem) => {
    setAnchorEl(event.currentTarget);
    setSelectedItem(item);
  };

  const handleClose = () => {
    setAnchorEl(null);
    setSelectedItem(null);
  };

  const handleCreateNewResume = () => {
    // router.push('/onboarding');
    setLoadWithoutMount(true, i18n('loaderMessages.pleaseWait', { ns: 'common' }));
    router.push(ROUTES.RESUME_UPLOAD); //QA ISSUE #397
    if (asPath === ROUTES.RESUME_UPLOAD) {
      setLoadWithoutMount(false, '');
    }
  };

  const handleMenuClick = (url: string, resId: string) => {
    if (resId) {
      setLoadWithoutMount(true, i18n('loaderMessages.pleaseWait', { ns: 'common' }));
      setStorageItem('lastResumeId', resId, STORAGE_TYPES.LOCAL);
      router.push(url);
      if (asPath === url) {
        setLoadWithoutMount(false, '');
      }
    }
  };

  return (
    <>
      {loading ? (
        // setLoadWithoutMount(true, '')
        <Box className={styles.personalInfoWrapper} sx={{ textAlign: 'center', padding: '50px' }}>
          {/* <CircularProgress />
           */}
          <Typography variant="h6" sx={{ marginTop: '20px' }}>
            {i18n('loaderMessages.pleaseWait', { ns: 'common' })}
          </Typography>
        </Box>
      ) : ResumeData.length > 0 ? (
        <Box className={styles.personalInfoWrapper}>
          <Grid container spacing={2} sx={{ paddingBottom: '200px', overflow: 'auto' }}>
            {ResumeData.map((item: ResumeItem) => (
              <Grid item xs={12} sm={12} md={12} lg={6} key={item.id}>
                <Card>
                  <CardContent sx={{ padding: '24px', position: 'relative' }}>
                    {isMobile && (
                      <IconButton
                        style={{ position: 'absolute', right: '0', top: '0' }}
                        aria-label="more"
                        aria-controls="long-menu"
                        aria-haspopup="true"
                        onClick={(event) => handleClick(event, item)}
                      >
                        <MoreVertIcon />
                      </IconButton>
                    )}
                    <Grid container spacing={2} alignItems="center">
                      <Grid item xs={8} sm={9} md={10}>
                        <Typography
                          gutterBottom
                          variant="h6"
                          component="div"
                          className={styles.dateTitle}
                        >
                          {i18n('Datecreated')}: {item.date}
                        </Typography>
                        <Typography
                          sx={{ marginTop: '16px' }}
                          gutterBottom
                          variant="h6"
                          component="div"
                          className={styles.customHeaderTitle}
                        >
                          {item.resume_content.target_job}
                        </Typography>
                        <Typography
                          sx={{ marginTop: '10px' }}
                          gutterBottom
                          variant="h6"
                          component="div"
                          className={styles.customHeaderCompany}
                        >
                          {item.company}
                        </Typography>
                      </Grid>
                      <Grid item xs={4} sm={2} md={2}>
                        <ScoreCard scorePercent={item.similarity_score} />
                      </Grid>
                    </Grid>
                    {!isMobile && (
                      <>
                        <Divider sx={{ marginBottom: '10px', marginTop: '10px' }} />
                        <Box display="flex" alignItems="center">
                          {/* <MenuItem className={styles.menuTitle}>
                            <ListItemIcon style={{ minWidth: '20px' }}>
                              <Image src="/image/Group.png" width={16} height={16} alt="Image 1" />
                            </ListItemIcon>
                            {i18n('Customise')}
                          </MenuItem> */}
                          {/* <Divider orientation="vertical" flexItem /> */}
                          {/* <MenuItem className={styles.menuTitle}>
                            <ListItemIcon style={{ minWidth: '20px' }}>
                              <Image
                                src="/image/Interview.png"
                                width={16}
                                height={16}
                                alt="Image 2"
                              />
                            </ListItemIcon>
                            {i18n('TakeMockInterview')}
                          </MenuItem> */}
                          {/* <Divider orientation="vertical" flexItem /> */}
                          {/* <MenuItem className={styles.menuTitle}>
                            <ListItemIcon style={{ minWidth: '20px' }}>
                              <Image
                                src="/image/Materials.png"
                                width={16}
                                height={16}
                                alt="Custom Icon 1"
                              />
                            </ListItemIcon>
                            {i18n('InterviewMaterials')}
                          </MenuItem>
                          <Divider orientation="vertical" flexItem /> */}
                          <MenuItem
                            className={styles.menuTitle}
                            onClick={() => {
                              handleMenuClick('/resume-download', item.id);
                              handleClose();
                            }}
                          >
                            <ListItemIcon style={{ minWidth: '20px' }}>
                              <Image
                                src="/image/preview.png"
                                alt="Custom Icon 2"
                                width={16}
                                height={16}
                              />
                            </ListItemIcon>
                            {i18n('Preview')}
                          </MenuItem>
                        </Box>
                      </>
                    )}
                  </CardContent>
                </Card>
                {isMobile && (
                  <Box display="flex" alignItems="center">
                    <Menu
                      anchorEl={anchorEl}
                      open={open}
                      onClose={handleClose}
                      MenuListProps={{
                        'aria-labelledby': 'more-button'
                      }}
                    >
                      {/* <MenuItem className={styles.menuTitleMobile} onClick={handleClose}>
                        <ListItemIcon>
                          <Image
                            src="/image/Group.png"
                            alt="Custom Icon 1"
                            width={16}
                            height={16}
                          />
                        </ListItemIcon>
                        {i18n('Customise')}
                      </MenuItem> */}
                      {/* <Divider orientation="vertical" flexItem /> */}
                      {/* <MenuItem className={styles.menuTitleMobile} onClick={handleClose}>
                        <ListItemIcon>
                          <Image
                            src="/image/Interview.png"
                            alt="Custom Icon 2"
                            width={16}
                            height={16}
                          />
                        </ListItemIcon>
                        {i18n('TakeMockInterview')}
                      </MenuItem> */}
                      {/* <Divider orientation="vertical" flexItem /> */}
                      {/* <MenuItem className={styles.menuTitleMobile} onClick={handleClose}>
                        <ListItemIcon>
                          <Image
                            src="/image/Materials.png"
                            alt="Custom Icon 1"
                            width={16}
                            height={16}
                          />
                        </ListItemIcon>
                        {i18n('InterviewMaterials')}
                      </MenuItem> */}
                      {/* <Divider orientation="vertical" flexItem /> */}
                      <MenuItem
                        className={styles.menuTitleMobile}
                        onClick={() => {
                          handleMenuClick('/resume-download', selectedItem ? selectedItem?.id : '');
                          handleClose();
                        }}
                      >
                        <ListItemIcon>
                          <Image
                            src="/image/preview.png"
                            alt="Custom Icon 2"
                            width={16}
                            height={16}
                          />
                        </ListItemIcon>
                        {i18n('Preview')}
                      </MenuItem>
                    </Menu>
                  </Box>
                )}
              </Grid>
            ))}
          </Grid>
        </Box>
      ) : (
        <Box className={styles.personalInfoWrapper}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={12} md={12} lg={6} sx={{ margin: 'auto' }}>
              <Card>
                <CardContent sx={{ padding: '24px', position: 'relative', textAlign: 'center' }}>
                  <Typography variant="h6" component="div" sx={{ marginBottom: '10px' }}>
                    {i18n('Noresumedata')}
                  </Typography>
                  <Button
                    variant="contained"
                    className={`${styles.primaryBtn} ${globalStyles.btnBlackColor}`}
                    onClick={handleCreateNewResume}
                  >
                    {i18n('CreateNewResume')}
                  </Button>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      )}
    </>
  );
};

export default withLoader(MyResumesBox);
