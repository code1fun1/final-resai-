import { Container, Typography } from '@mui/material';

const Unauthorized = () => {
  return (
    <Container maxWidth="md" sx={{ py: 4, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Access Denied
      </Typography>
      <Typography variant="body1">You do not have permission to view this page.</Typography>
    </Container>
  );
};

export default Unauthorized;
