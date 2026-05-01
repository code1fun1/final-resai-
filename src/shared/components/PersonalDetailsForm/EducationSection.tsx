import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import AddEducationModal from './AddEducationModal';
import {
  getEducation,
  createEducation,
  updateEducation,
  deleteEducation
} from '~/modules/Onboarding/AdditionalDetails/Utils/ProfileTabsUtils';

// ── Types ──────────────────────────────────────────────────────────────────
interface Education {
  id?: number | string;
  degree: string;
  institution: string;
  score?: string;
  year?: string;
  project?: string;
  bullets?: string[];
  tech?: string;
}

interface EducationCardProps {
  edu: Education;
  onEdit: (edu: Education) => void;
  onDelete: (id?: number | string) => void;
}

type ApiEducation = {
  id?: number | string;
  education_id?: number | string;
  degree?: string;
  institution_name?: string;
  institution?: string;
  field_of_study?: string;
  start_date?: string;
  end_date?: string;
  description?: string;
};

const normalizeEducation = (education: ApiEducation): Education => {
  const degree = education.field_of_study
    ? `${education.degree ?? ''} in ${education.field_of_study}`.trim()
    : (education.degree ?? '');

  return {
    id: education.id ?? education.education_id,
    degree,
    institution: education.institution_name ?? education.institution ?? '',
    year: education.end_date ?? education.start_date ?? '',
    bullets: education.description ? education.description.split('\n').filter(Boolean) : []
  };
};

const toEducationPayload = (education: Education) => {
  const [degree, ...fieldParts] = education.degree.split(' in ');
  // Combine project details and bullet points into a single description
  const descriptionParts: string[] = [];
  if (education.project) descriptionParts.push(education.project);
  if (education.tech) descriptionParts.push(`Technologies: ${education.tech}`);
  if (education.bullets && education.bullets.length > 0) {
    descriptionParts.push(education.bullets.join('\n'));
  }
  return {
    degree: degree.trim(),
    institution_name: education.institution,
    field_of_study: fieldParts.join(' in ').trim(),
    end_date: education.year,
    description: descriptionParts.join('\n\n'),
    score: education.score
  };
};

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

const EducationCard = ({ edu, onEdit, onDelete }: EducationCardProps) => {
  return (
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
        <Box sx={{ flex: 1, pr: '88px' }}>
          <Typography
            sx={{
              fontWeight: 600,
              fontSize: '16px',
              color: '#1a1a1a',
              mb: '2px',
              fontFamily: 'Satoshi, sans-serif'
            }}
          >
            {edu.degree}&nbsp;–&nbsp;{edu.score}
          </Typography>

          <Typography
            sx={{
              color: '#888',
              fontSize: '13.5px',
              mb: '12px',
              fontFamily: 'Satoshi, sans-serif'
            }}
          >
            {edu.institution} &mdash; {edu.year}
          </Typography>

          {edu.project && (
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: '14px',
                color: '#1a1a1a',
                mb: '6px',
                fontFamily: 'Satoshi, sans-serif'
              }}
            >
              {edu.project}
            </Typography>
          )}

          <Box
            component="ul"
            sx={{
              pl: '18px',
              color: '#444',
              fontSize: '13.5px',
              lineHeight: 1.75,
              fontFamily: 'Satoshi, sans-serif',
              m: 0
            }}
          >
            {edu.bullets?.map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
          </Box>

          {edu.tech && (
            <Typography
              sx={{
                mt: '8px',
                color: '#555',
                fontSize: '13px',
                fontStyle: 'italic',
                fontFamily: 'Satoshi, sans-serif'
              }}
            >
              Technologies Used: {edu.tech}
            </Typography>
          )}
        </Box>

        <Box sx={{ display: 'flex', gap: '8px', position: 'absolute', right: '20px', top: '20px' }}>
          <Box
            component="button"
            onClick={() => onEdit(edu)}
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
            onClick={() => edu.id !== undefined && onDelete(edu.id)}
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
    </Box>
  );
};

export const EducationSection = () => {
  const [eduList, setEduList] = useState<Education[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingEdu, setEditingEdu] = useState<Education | null>(null);
  const hasFetched = useRef(false);

  // ── Fetch on mount ──────────────────────────────────────────
  useEffect(() => {
    if (hasFetched.current) return; // prevent double-fire in React StrictMode
    hasFetched.current = true;
    const fetchData = async () => {
      setIsLoading(true);
      const res = await getEducation();
      if (res.status === 'success' && Array.isArray(res.data)) {
        setEduList(res.data.map((item) => normalizeEducation(item as ApiEducation)));
      }
      setIsLoading(false);
    };
    fetchData();
  }, []);

  // ── Handlers ───────────────────────────────────────────────
  const handleDelete = async (id?: number | string) => {
    if (!id) return;
    const res = await deleteEducation(id);
    if (res.status === 'success') {
      setEduList((prev) => prev.filter((e) => e.id !== id));
    }
  };

  const handleEdit = (edu: Education) => {
    setEditingEdu(edu);
    setIsAddModalOpen(true);
  };

  const handleAdd = () => {
    setEditingEdu(null);
    setIsAddModalOpen(true);
  };

  const handleSaveEducation = async (savedEdu: Education) => {
    const payload = toEducationPayload(savedEdu);
    if (savedEdu.id) {
      const res = await updateEducation(savedEdu.id, payload);
      if (res.status === 'success') {
        setEduList((prev) => prev.map((e) => (e.id === savedEdu.id ? savedEdu : e)));
      }
    } else {
      const res = await createEducation(payload);
      if (res.status === 'success') {
        const newEntry = res.data
          ? normalizeEducation(res.data as ApiEducation)
          : { ...savedEdu, id: Date.now() };
        setEduList((prev) => [...prev, newEntry]);
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
            Education
          </Typography>
          <Typography sx={{ color: '#888', fontSize: '13.5px', fontFamily: 'Satoshi, sans-serif' }}>
            Review your education history.
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
      ) : eduList.length === 0 ? (
        <Box sx={{ textAlign: 'center', py: 4 }}>
          <Typography
            sx={{ color: '#9ca3af', fontSize: '14px', fontFamily: 'Satoshi, sans-serif' }}
          >
            No education entries yet. Click Add to get started.
          </Typography>
        </Box>
      ) : (
        eduList.map((edu) => (
          <EducationCard key={edu.id} edu={edu} onEdit={handleEdit} onDelete={handleDelete} />
        ))
      )}

      <AddEducationModal
        isOpen={isAddModalOpen}
        onClose={() => setIsAddModalOpen(false)}
        onSave={handleSaveEducation}
        initialData={editingEdu}
      />
    </Box>
  );
};
