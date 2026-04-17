import {
  Card,
  Box,
  Typography,
  Stack,
  TableCell,
  TableContainer,
  Table,
  TableHead,
  TableRow,
  Paper,
  TableBody,
  tableCellClasses
} from '@mui/material';
import { styled } from '@mui/material/styles';
import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import withLoader from '~/shared/components/HOC/withLoader';
import { LOCALE_PAGE } from '~/shared/constants/constants';
import { useStylesCreditHistory } from './CreditHistoryStyles';
import Divider from '@mui/material/Divider';
import Link from 'next/link';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CreditIcon from '~/shared/components/CreditIcon';
import { UserCreditDetails } from '~/shared/redux/actions';
import { RootState } from '~/shared/redux/reducers';
import { useSelector } from 'react-redux';
import { CreditHistoryRow, getCreditHistory } from './Utils/CreditHistoryUtils';

interface CreditHistoryProps {
  setLoadWithoutMount: (value: boolean, message?: string) => void;
}

const CreditHistory: React.FC<CreditHistoryProps> = ({ setLoadWithoutMount }) => {
  const { t: i18n } = useTranslation(LOCALE_PAGE.MY_PROFILE);
  const stylesCreditHistory = useStylesCreditHistory();
  const { userCreditData } = useSelector(
    (state: RootState) => state?.user as { userCreditData: UserCreditDetails }
  );
  const userCredits = userCreditData?.user_current_credit ?? 0;

  const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
      backgroundColor: 'rgba(0, 0, 0, 0.04)',
      color: theme.palette.common.black
    },
    [`&.${tableCellClasses.body}`]: {
      fontSize: 14
    }
  }));

  const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '& td, & th': {
      borderBottom: `1px solid ${theme.palette.divider}` // Add border after every cell
    }
  }));
  // Define the structure of the row data including icons

  const [rows, setRows] = useState<CreditHistoryRow[]>([]);
  const [page, setPage] = useState(0); // Start from page 0
  const [hasMore, setHasMore] = useState(true);
  const [totalDataCount, setTotalDataCount] = useState(0); // Track the total data count

  useEffect(() => {
    fetchData(page);
  }, [page]);

  // Simulated fetch data function
  const fetchData = async (page: number) => {
    // Simulate fetching data (icons show dynamically here)
    let allRows: CreditHistoryRow[] = [];
    const getCredList = await getCreditHistory();
    if (getCredList.status === 'success') {
      allRows = getCredList?.data;
    }

    // Get 3 rows based on current page
    const start = page * 3;
    const newRows = allRows.slice(start, start + 3); // Fetch 3 rows per page

    // Update the total count of available data
    setTotalDataCount(allRows.length);

    // Simulate a condition where there's no more data to fetch
    const moreDataAvailable = start + 3 < allRows.length;

    // Append new rows to the existing ones
    setRows((prevRows) => [...prevRows, ...newRows]);

    // Update `hasMore` based on whether more data is available
    setHasMore(moreDataAvailable);
  };

  const loadMore = () => {
    if (hasMore) {
      setLoadWithoutMount(true);
      setTimeout(() => {
        setPage((prevPage) => prevPage + 1); // Increment the page number
        setLoadWithoutMount(false);
      }, 1000); // 1 seconds delay
    }
  };
  //replace - symbol
  const formatActions = (inputString: string | null | undefined): string => {
    // If input is null, undefined, or an empty string, return it as is
    if (!inputString) {
      return inputString ?? ''; // returns empty string for null or undefined
    }
    // Capitalize each word and replace hyphens with spaces
    return inputString.replace(/-/g, ' '); // Replace hyphens with spaces
  };
  // utils/formatDate.js

  const formatDateTime = (inputDate: string) => {
    const dateObj = new Date(inputDate);
    // Ensure that the date is valid
    if (isNaN(dateObj.getTime())) {
      throw new Error('Invalid date');
    }
    // Extract the day, month, year, hour, minute, and second from the date object
    const day = String(dateObj.getDate()).padStart(2, '0');
    const month = String(dateObj.getMonth() + 1).padStart(2, '0'); // Month is zero-indexed
    const year = dateObj.getFullYear();
    const hour = String(dateObj.getHours()).padStart(2, '0');
    const minute = String(dateObj.getMinutes()).padStart(2, '0');
    const second = String(dateObj.getSeconds()).padStart(2, '0');
    // Return the formatted date-time string
    return `${day}-${month}-${year} - ${hour}:${minute}:${second}`;
  };

  return (
    <Box className={stylesCreditHistory.personalInfoWrapper}>
      <Card variant="outlined">
        <Box sx={{ p: 2 }}>
          <Stack direction="row" justifyContent="space-between" alignItems="center">
            <Typography
              gutterBottom
              variant="h6"
              component="div"
              className={stylesCreditHistory.customHeaderTitle}
            >
              {i18n('creditformTitle')}
            </Typography>
            <Typography gutterBottom variant="h6" component="div">
              <CreditIcon creditPoints={String(userCredits)} />
            </Typography>
          </Stack>
        </Box>
        <Divider />
        <Box sx={{ p: 2 }} className={stylesCreditHistory.cardWrapper}>
          <TableContainer component={Paper}>
            <Table sx={{ minWidth: 700 }} aria-label="customized table">
              <TableHead>
                <TableRow>
                  <StyledTableCell>{i18n('creditTableHeadingOfTimestamp')}</StyledTableCell>
                  <StyledTableCell align="left">
                    {i18n('creditTableHeadingOfDetail')}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {i18n('creditTableHeadingOfCredit')}
                  </StyledTableCell>
                  <StyledTableCell align="left">
                    {i18n('creditTableHeadingOfStatus')}
                  </StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.length > 0 ? (
                  rows.map((row) => (
                    <StyledTableRow key={row.id}>
                      <StyledTableCell component="th" scope="row">
                        {formatDateTime(row.created_at)}
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ textTransform: 'capitalize' }}>
                        <Link
                          href="javascript:void(0)"
                          style={{ color: '#424246', fontWeight: 'bold', cursor: 'default' }}
                        >
                          {formatActions(row.actions)}
                        </Link>
                      </StyledTableCell>
                      <StyledTableCell align="left">
                        <Box display="flex" alignItems="center">
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {row.credits}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                      <StyledTableCell align="left" sx={{ textTransform: 'capitalize' }}>
                        <Box display="flex" alignItems="center">
                          {row.status === 'success' && (
                            <CheckCircleOutlineIcon style={{ color: 'rgb(11 229 193)' }} />
                          )}
                          {row.status == 'failed' && <ErrorOutlineIcon color="error" />}
                          <Typography variant="body2" sx={{ ml: 1 }}>
                            {row.status}
                          </Typography>
                        </Box>
                      </StyledTableCell>
                    </StyledTableRow>
                  ))
                ) : (
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} component="th" scope="row">
                      <Typography variant="body1" color="textSecondary" align="center">
                        {i18n('noRecordsFound')}
                      </Typography>
                    </StyledTableCell>
                  </StyledTableRow>
                )}

                {/* Display the Load More button with remaining row count */}
                {hasMore && (
                  <StyledTableRow>
                    <StyledTableCell colSpan={4} component="th" scope="row">
                      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                        <Typography
                          color="black"
                          sx={{ cursor: 'pointer', fontWeight: 'bold' }}
                          onClick={loadMore}
                        >
                          {i18n('creditLoadMore')} ({totalDataCount - rows.length})
                        </Typography>
                        &nbsp;
                      </Box>
                    </StyledTableCell>
                  </StyledTableRow>
                )}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      </Card>
    </Box>
  );
};

export default withLoader(CreditHistory);
