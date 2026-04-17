import { Box, Grid, Paper } from '@mui/material';
import React, { ReactNode } from 'react';
import { useStyles } from './SplitViewListingEditorStyles';

type SplitViewListingEditorProps = {
  editor: ReactNode;
  listing: ReactNode;
};

const SplitViewListingEditor: React.FC<SplitViewListingEditorProps> = ({ editor, listing }) => {
  const styles = useStyles();
  return (
    <Box>
      <Grid container className={styles.detailsWrapper}>
        <Grid item xs={12} md={8}>
          <Box
            component={Paper}
            display="flex"
            flexDirection="column"
            p={{ xs: 2, sm: 4 }}
            m={{ xs: 2, sm: 4 }}
            gap={2}
          >
            {editor}
          </Box>
        </Grid>
        <Grid item xs={12} md={4} className={styles.sidebarSuggestion}>
          <Box display="flex" flexDirection="column" gap={{ xs: 1, md: 3 }}>
            {listing}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default SplitViewListingEditor;
