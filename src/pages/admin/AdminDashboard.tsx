// ~/modules/admin/AdminDashboard.tsx

import {
  Box,
  Container,
  Divider,
  Grid,
  Typography,
  Card,
  Tooltip,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  TableSortLabel
} from '@mui/material';
import { useTranslation } from 'next-i18next';
import { useEffect, useState, useMemo } from 'react';
import { useRouter } from 'next/router';
import withLoader from '~/shared/components/HOC/withLoader';
import LoadingIndicator from '~/shared/components/LoadingIndicator';
import { APIS, API_METHOD } from '~/shared/constants/apiConstants';
import httpRequest from '~/shared/utils/axios';
import { GetStaticProps } from 'next';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';

interface User {
  id?: string;
  email: string;
  first_name: string | null;
  last_name: string | null;
  user_current_credit?: number | null;
  user_total_credit?: number | null;
  user_used_credit?: number | null;
  amount?: number | null;
  created_at: string;
  users_aggregate?: {
    aggregate?: {
      count?: number;
    };
  };
  users?: {
    phone?: string | null;
    resume_url?: string | null;
  }[];
}

interface AdminDashboardProps {
  setLoadWithoutMount: (value: boolean) => void;
}

type SortOrder = 'asc' | 'desc';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ setLoadWithoutMount }) => {
  const { t: i18n } = useTranslation('admin');
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState<boolean | null>(null);

  const [totalUsers, setTotalUsers] = useState<number>(0);
  const [totalPaidUsers, setTotalPaidUsers] = useState<number>(0);
  const [totalActiveUsers, setTotalActiveUsers] = useState<number>(0);

  const [paidUsers, setPaidUsers] = useState<User[]>([]);
  const [allUsers, setAllUsers] = useState<User[]>([]);
  const [allActiveUsers, setAllActiveUsers] = useState<User[]>([]);

  const [selectedView, setSelectedView] = useState<'all' | 'paid' | 'active'>('all');

  const [sortState, setSortState] = useState({
    all: { sortBy: 'name' as 'name' | 'created_at', sortOrder: 'asc' as SortOrder },
    paid: { sortBy: 'name' as 'name' | 'created_at', sortOrder: 'asc' as SortOrder },
    active: { sortBy: 'name' as 'name' | 'created_at', sortOrder: 'asc' as SortOrder }
  });

  const { ADMIN_DASHBOARD } = APIS;
  const allowedEmails = ['shoaib.khan@galaxyweblinks.in', 'nileshsuss@gmail.com'];

  // Authorization check
  useEffect(() => {
    if (typeof window === 'undefined') return;
    try {
      const rootDataString = localStorage.getItem('persist:root');
      if (rootDataString) {
        const rootData = JSON.parse(rootDataString);
        if (rootData.user) {
          const userData = JSON.parse(rootData.user);
          const email = userData.loggedInUser?.email;
          if (email && allowedEmails.includes(email.trim().toLowerCase())) {
            setIsAuthorized(true);
            return;
          }
        }
      }
    } catch {}
    setIsAuthorized(false);
    router.push('/unauthorized');
  }, []);

  // Fetch dashboard data
  useEffect(() => {
    if (isAuthorized) fetchDashboardData();
  }, [isAuthorized]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setLoadWithoutMount(true);
      const [response] = await httpRequest({
        url: ADMIN_DASHBOARD,
        method: API_METHOD.GET
      });
      if (response?.res_data) {
        const data = response.res_data.data;
        setTotalUsers(data.total_users);
        setTotalPaidUsers(data.total_paid_users);
        setTotalActiveUsers(data.total_active_users);

        // Replace state instead of appending
        setPaidUsers(data.paid_users || []);
        setAllUsers(data.all_users || []);
        setAllActiveUsers(data.all_active_users || []);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
      setLoadWithoutMount(false);
    }
  };

  // Handle view change
  const handleViewChange = (view: 'all' | 'paid' | 'active') => {
    setSelectedView(view);
  };

  // Handle sorting
  const handleSort = (column: 'name' | 'created_at') => {
    setSortState((prev) => {
      const current = prev[selectedView];
      const isSame = current.sortBy === column;
      const sortOrder = isSame ? (current.sortOrder === 'asc' ? 'desc' : 'asc') : 'asc';
      return { ...prev, [selectedView]: { sortBy: column, sortOrder } };
    });
  };

  const { sortBy, sortOrder } = sortState[selectedView];

  // Compute displayed users (copy and sort, do not mutate state)
  const displayedUsers = useMemo(() => {
    let users: User[] = [];
    if (selectedView === 'all') users = [...allUsers];
    else if (selectedView === 'active') users = [...allActiveUsers];
    else users = [...paidUsers];

    return users.sort((a, b) => {
      if (sortBy === 'name') {
        const nameA = `${a.first_name || ''} ${a.last_name || ''}`.trim().toLowerCase();
        const nameB = `${b.first_name || ''} ${b.last_name || ''}`.trim().toLowerCase();
        return sortOrder === 'asc' ? nameA.localeCompare(nameB) : nameB.localeCompare(nameA);
      } else {
        return sortOrder === 'asc'
          ? new Date(a.created_at).getTime() - new Date(b.created_at).getTime()
          : new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
      }
    });
  }, [selectedView, sortBy, sortOrder, paidUsers, allUsers, allActiveUsers]);

  if (isAuthorized === null || loading) return <LoadingIndicator />;

  if (!isAuthorized)
    return (
      <Container maxWidth="lg" sx={{ py: 4 }}>
        <Typography variant="h6" color="error">
          You are not authorized to view this page.
        </Typography>
      </Container>
    );

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>
        {i18n('adminDashboardTitle')}
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        {i18n('adminDashboardSubtitle')}
      </Typography>

      <Grid container spacing={2} sx={{ mb: 4 }}>
        {['all', 'paid', 'active'].map((view, idx) => {
          const title =
            view === 'all'
              ? i18n('totalUsers')
              : view === 'paid'
                ? i18n('totalPaidUsers')
                : i18n('totalActiveUsers');
          const count =
            view === 'all' ? totalUsers : view === 'paid' ? totalPaidUsers : totalActiveUsers;
          return (
            <Grid item xs={12} sm={4} key={idx}>
              <Tooltip title={i18n(`tooltip${title.replace(/\s+/g, '')}`)}>
                <Card
                  sx={{
                    textAlign: 'center',
                    p: 2,
                    cursor: 'pointer',
                    bgcolor: selectedView === view ? 'primary.light' : 'background.paper'
                  }}
                  onClick={() => handleViewChange(view as 'all' | 'paid' | 'active')}
                >
                  <Typography variant="h6">{title}</Typography>
                  <Typography variant="h4">{count}</Typography>
                </Card>
              </Tooltip>
            </Grid>
          );
        })}
      </Grid>

      <Divider sx={{ mb: 3 }} />

      <Typography variant="h6" gutterBottom>
        {selectedView === 'all'
          ? i18n('allUsers')
          : selectedView === 'paid'
            ? i18n('totalPaidUsers')
            : i18n('totalActiveUsers')}
      </Typography>

      <Box sx={{ overflowX: 'auto' }}>
        <Table key={selectedView}>
          <TableHead>
            <TableRow>
              <TableCell>{i18n('id')}</TableCell>
              <TableCell>{i18n('email')}</TableCell>
              <TableCell sortDirection={sortBy === 'name' ? sortOrder : false}>
                <TableSortLabel
                  active={sortBy === 'name'}
                  direction={sortBy === 'name' ? sortOrder : 'asc'}
                  onClick={() => handleSort('name')}
                >
                  {i18n('name')}
                </TableSortLabel>
              </TableCell>
              {selectedView === 'all' && <TableCell>{i18n('Phone')}</TableCell>}
              {selectedView !== 'paid' && (
                <>
                  <TableCell>{i18n('userCurrentCredit')}</TableCell>
                  <TableCell>{i18n('userTotalCredit')}</TableCell>
                  <TableCell>{i18n('userUsedCredit')}</TableCell>
                </>
              )}
              {selectedView === 'active' && <TableCell>{i18n('resumeCreated')}</TableCell>}
              {selectedView === 'paid' && <TableCell>{i18n('paymentAmount')}</TableCell>}
              <TableCell sortDirection={sortBy === 'created_at' ? sortOrder : false}>
                <TableSortLabel
                  active={sortBy === 'created_at'}
                  direction={sortBy === 'created_at' ? sortOrder : 'asc'}
                  onClick={() => handleSort('created_at')}
                >
                  {i18n('createdAt')}
                </TableSortLabel>
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {displayedUsers.map((user, idx) => (
              <TableRow
                key={selectedView === 'paid' ? `${user.id}-${user.created_at}` : (user.id ?? idx)}
              >
                <TableCell>{idx + 1}</TableCell>
                <TableCell>{user.email}</TableCell>
                <TableCell>{`${user.first_name || ''} ${user.last_name || ''}`.trim()}</TableCell>
                {selectedView === 'all' && <TableCell>{user.users?.[0]?.phone ?? '-'}</TableCell>}
                {selectedView !== 'paid' && (
                  <>
                    <TableCell>{user.user_current_credit ?? 0}</TableCell>
                    <TableCell>{user.user_total_credit ?? 0}</TableCell>
                    <TableCell>{user.user_used_credit ?? 0}</TableCell>
                  </>
                )}
                {selectedView === 'active' && (
                  <TableCell>{user.users_aggregate?.aggregate?.count ?? 0}</TableCell>
                )}
                {selectedView === 'paid' && <TableCell>{user.amount ?? 0}</TableCell>}
                <TableCell>{user.created_at.split('T')[0]}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Box>
    </Container>
  );
};

export const getStaticProps: GetStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale || 'en', ['common', 'admin'])) }
});

export default withLoader(AdminDashboard);
