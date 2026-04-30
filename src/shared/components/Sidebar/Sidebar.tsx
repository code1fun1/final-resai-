import React from 'react';
import { Box, Typography } from '@mui/material';
import Image from 'next/image';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

export type SidebarStep = {
  label: string;
  state: 'completed' | 'active' | 'pending';
};

interface SidebarProps {
  steps: SidebarStep[];
}

export const Sidebar: React.FC<SidebarProps> = ({ steps }) => {
  return (
    <Box
      sx={{
        width: '340px',
        minWidth: '340px',
        minHeight: '100vh',
        display: { xs: 'none', md: 'flex' },
        flexDirection: 'column',
        justifyContent: 'space-between',
        bgcolor: '#04040E',
        pl: '24px',
        pr: '24px',
        pt: '40px',
        pb: '40px'
      }}
    >
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        <Image
          src="/image/ResAi-white-Logo.png"
          alt="ResAI"
          width={90}
          height={32}
          style={{ objectFit: 'contain' }}
        />
        <Box>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#DABF67',
              fontSize: '18px',
              fontWeight: 500,
              lineHeight: '125%',
              letterSpacing: '-0.36px',
              textTransform: 'capitalize',
              mb: '10px'
            }}
          >
            Your AI Powered Career Engineer
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#ffffff',
              fontSize: '36px',
              fontWeight: 700,
              lineHeight: '100%',
              mb: '10px'
            }}
          >
            Let&apos;s Get Started
          </Typography>
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#9CA3AF',
              fontSize: '14px',
              fontWeight: 400,
              lineHeight: '125%'
            }}
          >
            Create resumes, plan growth, and unlock better opportunities in few simple steps
          </Typography>
        </Box>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
          {steps.map((step) => (
            <Box
              key={step.label}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                pt: '10px',
                pb: '10px',
                pr: '8px',
                pl: '8px',
                minHeight: '44px',
                borderRadius: '6px',
                bgcolor: step.state === 'active' ? 'rgba(255,255,255,0.08)' : 'transparent'
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                {step.state === 'completed' && (
                  <CheckCircleIcon sx={{ color: '#DABF67', fontSize: 22 }} />
                )}
                {step.state === 'active' && (
                  <img
                    src="/image/figma/logo1.png"
                    alt=""
                    style={{ width: 20, height: 20, objectFit: 'contain' }}
                  />
                )}
                {step.state === 'pending' && (
                  <RadioButtonUncheckedIcon sx={{ color: 'rgba(255,255,255,0.3)', fontSize: 22 }} />
                )}
                <Typography
                  sx={{
                    fontFamily: 'Satoshi, sans-serif',
                    fontSize: '14px',
                    fontWeight: step.state === 'active' ? 600 : 400,
                    color:
                      step.state === 'active'
                        ? '#ffffff'
                        : step.state === 'completed'
                          ? 'rgba(255,255,255,0.75)'
                          : 'rgba(255,255,255,0.45)'
                  }}
                >
                  {step.label}
                </Typography>
              </Box>
              {step.state === 'active' && (
                <ChevronRightIcon sx={{ color: 'rgba(255,255,255,0.4)', fontSize: 20 }} />
              )}
            </Box>
          ))}
        </Box>

        <Typography
          sx={{
            fontFamily: 'Satoshi, sans-serif',
            color: '#FFFFFF',
            fontSize: '16px',
            fontWeight: 400,
            lineHeight: '100%',
            width: '292px',
            height: '44px',
            mt: '16px',
            display: 'flex',
            alignItems: 'center'
          }}
        >
          Reengineer your career based on today&apos;s hiring
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Typography
          sx={{
            fontFamily: 'Satoshi, sans-serif',
            color: '#7B7B7B',
            fontSize: '14px',
            fontWeight: 500,
            lineHeight: '14px',
            width: '162px'
          }}
        >
          Copyright © 2024 ResAI
        </Typography>
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            borderRadius: '8px',
            padding: '8px',
            gap: '8px',
            height: '40px'
          }}
        >
          <Image
            src="/image/figma/image.png"
            alt="Need help"
            width={24}
            height={24}
            style={{ objectFit: 'contain' }}
          />
          <Typography
            sx={{
              fontFamily: 'Satoshi, sans-serif',
              color: '#7B7B7B',
              fontSize: '14px',
              fontWeight: 500,
              lineHeight: '14px'
            }}
          >
            Need help?
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};
