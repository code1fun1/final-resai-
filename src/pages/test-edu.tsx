import React, { useState } from 'react';
import { Box } from '@mui/material';
import PersonalDetailsForm from '~/shared/components/PersonalDetailsForm';
import { Sidebar } from '~/shared/components/Sidebar/Sidebar';

interface SidebarStep {
  label: string;
  state: 'completed' | 'active' | 'pending';
}

const PERSONAL_DETAILS_SIDEBAR_STEPS: SidebarStep[] = [
  { label: 'Resume Upload', state: 'completed' },
  { label: 'Target Job Role', state: 'completed' },
  { label: 'Skills & Strengths', state: 'completed' },
  { label: 'Personal Details', state: 'active' }
];

export default function TestEduPage() {
  const [data, setData] = useState<{ additionalData: { stepData: Record<string, unknown> } }>({
    additionalData: {
      stepData: {}
    }
  });

  return (
    <Box sx={{ display: 'flex', width: '100%', minHeight: '100vh' }}>
      <Sidebar steps={PERSONAL_DETAILS_SIDEBAR_STEPS} />

      {/* ── Main Content ── */}
      <Box
        sx={{
          flex: 1,
          minWidth: 0,
          display: 'flex',
          flexDirection: 'column',
          bgcolor: '#f3f4f6',
          px: { xs: 0, sm: 3 },
          py: { xs: 0, sm: 3 },
          minHeight: '100vh'
        }}
      >
        <PersonalDetailsForm onSave={setData} additionalData={data.additionalData} />
      </Box>
    </Box>
  );
}
