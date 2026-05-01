import React, { useEffect, useRef, useState } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import AddExperienceModal, { ExperienceFormData } from './AddExperienceModal';
import {
  createExperience,
  deleteExperience,
  getExperience,
  updateExperience
} from '~/modules/Onboarding/AdditionalDetails/Utils/ProfileTabsUtils';

type Experience = ExperienceFormData;

type ApiExperience = {
  id?: number | string;
  experience_id?: number | string;
  job_title?: string;
  company_name?: string;
  location?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
  currently_working?: boolean;
};

const getRecordId = (record: ApiExperience) => record.id ?? record.experience_id;

const normalizeExperience = (record: ApiExperience): Experience => ({
  id: getRecordId(record),
  jobTitle: record.job_title ?? '',
  companyName: record.company_name ?? '',
  location: record.location ?? '',
  startDate: record.start_date ?? '',
  endDate: record.end_date ?? '',
  description: record.description ?? '',
  currentlyWorking: !!record.currently_working
});

const toPayload = (experience: Experience) => ({
  job_title: experience.jobTitle,
  company_name: experience.companyName,
  location: experience.location,
  start_date: experience.startDate,
  end_date: experience.currentlyWorking ? '' : experience.endDate,
  description: experience.description,
  currently_working: experience.currentlyWorking
});

const EditIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);

const TrashIcon = () => (
  <svg
    width="16"
    height="16"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="1.8"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="3 6 5 6 21 6" />
    <path d="M19 6l-1 14a2 2 0 0 1-2 2H8a2 2 0 0 1-2-2L5 6" />
    <path d="M10 11v6M14 11v6" />
    <path d="M9 6V4a1 1 0 0 1 1-1h4a1 1 0 0 1 1 1v2" />
  </svg>
);

interface ExperienceCardProps {
  experience: Experience;
  onEdit: (experience: Experience) => void;
  onDelete: (id?: number | string) => void;
}

const ExperienceCard = ({ experience, onEdit, onDelete }: ExperienceCardProps) => (
  <Box
    sx={{
      width: '100%',
      boxSizing: 'border-box',
      bgcolor: 'white',
      borderRadius: '12px',
      p: '22px 24px',
      position: 'relative',
      mb: '12px',
      border: '1px solid #ede8e0'
    }}
  >
    <Box sx={{ pr: '88px' }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '16px',
          color: '#1a1a1a',
          mb: '2px',
          fontFamily: 'Satoshi, sans-serif'
        }}
      >
        {experience.jobTitle || 'Work Experience'}
      </Typography>
      <Typography sx={{ color: '#888', fontSize: '13.5px', mb: '10px' }}>
        {experience.companyName}
        {experience.location ? ` - ${experience.location}` : ''}
        {experience.startDate || experience.endDate
          ? ` | ${experience.startDate}${experience.startDate || experience.endDate ? ' - ' : ''}${
              experience.currentlyWorking ? 'Present' : (experience.endDate ?? '')
            }`
          : ''}
      </Typography>
      {experience.description && (
        <Typography sx={{ color: '#444', fontSize: '13.5px', lineHeight: 1.7 }}>
          {experience.description}
        </Typography>
      )}
    </Box>
    <Box sx={{ display: 'flex', gap: '8px', position: 'absolute', right: '20px', top: '20px' }}>
      <Box
        component="button"
        onClick={() => onEdit(experience)}
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid #ddd',
          bgcolor: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#555',
          '&:hover': { bgcolor: '#f5f5f5' }
        }}
      >
        <EditIcon />
      </Box>
      <Box
        component="button"
        onClick={() => onDelete(experience.id)}
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          border: '1.5px solid #ddd',
          bgcolor: 'white',
          cursor: 'pointer',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#555',
          '&:hover': { bgcolor: '#f5f5f5' }
        }}
      >
        <TrashIcon />
      </Box>
    </Box>
  </Box>
);

export const ExperienceSection = () => {
  const [experienceList, setExperienceList] = useState<Experience[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingExperience, setEditingExperience] = useState<Experience | null>(null);
  const hasFetched = useRef(false);

  useEffect(() => {
    if (hasFetched.current) return;
    hasFetched.current = true;
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getExperience();
      if (res.status === 'success' && Array.isArray(res.data)) {
        setExperienceList(res.data.map(normalizeExperience));
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  const handleAdd = () => {
    setEditingExperience(null);
    setIsModalOpen(true);
  };

  const handleEdit = (experience: Experience) => {
    setEditingExperience(experience);
    setIsModalOpen(true);
  };

  const handleDelete = async (id?: number | string) => {
    if (!id) return;
    const res = await deleteExperience(id);
    if (res.status === 'success') {
      setExperienceList((prev) => prev.filter((experience) => experience.id !== id));
    }
  };

  const handleSave = async (savedExperience: Experience) => {
    const payload = toPayload(savedExperience);
    if (savedExperience.id) {
      const res = await updateExperience(savedExperience.id, payload);
      if (res.status === 'success') {
        setExperienceList((prev) =>
          prev.map((experience) =>
            experience.id === savedExperience.id ? savedExperience : experience
          )
        );
      }
    } else {
      const res = await createExperience(payload);
      if (res.status === 'success') {
        const newEntry = res.data
          ? normalizeExperience(res.data as ApiExperience)
          : savedExperience;
        setExperienceList((prev) => [...prev, newEntry]);
      }
    }
  };

  return (
    <Box>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          mb: '20px'
        }}
      >
        <Box>
          <Typography
            sx={{
              fontSize: '18px',
              fontWeight: 700,
              color: '#1a1a1a',
              mb: '3px',
              fontFamily: 'Satoshi, sans-serif'
            }}
          >
            Work Experience
          </Typography>
          <Typography sx={{ color: '#888', fontSize: '13.5px', fontFamily: 'Satoshi, sans-serif' }}>
            Review your professional experience.
          </Typography>
        </Box>
        <Box
          component="button"
          onClick={handleAdd}
          sx={{
            padding: '10px 28px',
            borderRadius: '24px',
            border: '1.5px solid #1a1a1a',
            bgcolor: 'white',
            fontFamily: 'Satoshi, sans-serif',
            fontWeight: 500,
            fontSize: '14px',
            cursor: 'pointer',
            color: '#1a1a1a',
            '&:hover': { bgcolor: '#f5f5f5' }
          }}
        >
          Add
        </Box>
      </Box>

      {isLoading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
          <CircularProgress size={28} sx={{ color: '#C9A84C' }} />
        </Box>
      ) : experienceList.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography
            sx={{ color: '#9ca3af', fontSize: '14px', fontFamily: 'Satoshi, sans-serif' }}
          >
            No work experience yet. Click Add to get started.
          </Typography>
        </Box>
      ) : (
        experienceList.map((experience, index) => (
          <ExperienceCard
            key={experience.id ?? index}
            experience={experience}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        ))
      )}

      <AddExperienceModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        initialData={editingExperience}
      />
    </Box>
  );
};
