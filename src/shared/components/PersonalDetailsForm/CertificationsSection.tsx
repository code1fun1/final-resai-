import React, { useState, useEffect, useRef } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import AddCertificationModal from './AddCertificationModal';
import AddAwardModal from './AddAwardModal';
import {
  getCertificates,
  createCertificate,
  updateCertificate,
  deleteCertificate,
  getAwards,
  createAward,
  updateAward,
  deleteAward
} from '~/modules/Onboarding/AdditionalDetails/Utils/ProfileTabsUtils';

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

interface Certification {
  id?: number | string;
  title: string;
  issuer: string;
  year: string;
}

interface Award {
  id?: number | string;
  awardName: string;
  issuingOrganization: string;
  awardDate: string;
  description: string;
}

interface CertCardProps {
  cert: Certification;
  onEdit: (cert: Certification) => void;
  onDelete: (id?: number | string) => void;
}

interface AwardCardProps {
  award: Award;
  onEdit: (award: Award) => void;
  onDelete: (id?: number | string) => void;
}

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  onAdd: () => void;
}

const CertCard = ({ cert, onEdit, onDelete }: CertCardProps) => (
  <Box
    sx={{
      width: '100%',
      boxSizing: 'border-box',
      bgcolor: '#FAFAFA',
      borderRadius: '12px',
      p: '22px 24px',
      position: 'relative',
      mb: '12px'
    }}
  >
    <Box sx={{ pr: '88px' }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '15px',
          color: '#1a1a1a',
          mb: '6px',
          fontFamily: 'Satoshi, sans-serif'
        }}
      >
        {cert.title}
      </Typography>
      <Typography sx={{ color: '#666', fontSize: '13.5px', fontFamily: 'Satoshi, sans-serif' }}>
        {cert.issuer} — {cert.year}
      </Typography>
    </Box>
    <Box sx={{ display: 'flex', gap: '8px', position: 'absolute', right: '20px', top: '20px' }}>
      <Box
        component="button"
        onClick={() => onEdit(cert)}
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
        onClick={() => cert.id !== undefined && onDelete(cert.id)}
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

const AwardCard = ({ award, onEdit, onDelete }: AwardCardProps) => (
  <Box
    sx={{
      width: '100%',
      boxSizing: 'border-box',
      bgcolor: '#FAFAFA',
      borderRadius: '12px',
      p: '22px 24px',
      position: 'relative',
      mb: '12px'
    }}
  >
    <Box sx={{ pr: '88px' }}>
      <Typography
        sx={{
          fontWeight: 600,
          fontSize: '15px',
          color: '#1a1a1a',
          mb: '4px',
          fontFamily: 'Satoshi, sans-serif'
        }}
      >
        {award.awardName}
      </Typography>
      <Typography
        sx={{
          color: '#666',
          fontSize: '13.5px',
          mb: '12px',
          fontFamily: 'Satoshi, sans-serif'
        }}
      >
        {award.issuingOrganization} — {award.awardDate}
      </Typography>
      {award.description && (
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
          {award.description
            .split('\n')
            .filter(Boolean)
            .map((b: string, i: number) => (
              <li key={i}>{b}</li>
            ))}
        </Box>
      )}
    </Box>
    <Box sx={{ display: 'flex', gap: '8px', position: 'absolute', right: '20px', top: '20px' }}>
      <Box
        component="button"
        onClick={() => onEdit(award)}
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
        onClick={() => award.id !== undefined && onDelete(award.id)}
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

const SectionHeader = ({ title, subtitle, onAdd }: SectionHeaderProps) => (
  <Box
    sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: '16px' }}
  >
    <Box>
      <Typography
        sx={{
          fontSize: '17px',
          fontWeight: 700,
          color: '#1a1a1a',
          mb: '3px',
          fontFamily: 'Satoshi, sans-serif'
        }}
      >
        {title}
      </Typography>
      <Typography sx={{ color: '#888', fontSize: '13.5px', fontFamily: 'Satoshi, sans-serif' }}>
        {subtitle}
      </Typography>
    </Box>
    <Box
      component="button"
      onClick={onAdd}
      sx={{
        padding: '8px 26px',
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
);

type ApiCertification = {
  id?: number | string;
  certificate_id?: number | string;
  certificate_name?: string;
  title?: string;
  issuing_organization?: string;
  issuer?: string;
  issue_date?: string;
  year?: string;
};

type ApiAward = {
  id?: number | string;
  award_id?: number | string;
  award_name?: string;
  issuing_organization?: string;
  award_date?: string;
  description?: string;
  bullets?: string[];
};

const normalizeCertification = (cert: ApiCertification): Certification => ({
  id: cert.id ?? cert.certificate_id,
  title: cert.certificate_name ?? cert.title ?? '',
  issuer: cert.issuing_organization ?? cert.issuer ?? '',
  year: cert.issue_date ?? cert.year ?? ''
});

const normalizeAward = (award: ApiAward): Award => ({
  id: award.id ?? award.award_id,
  awardName: award.award_name ?? '',
  issuingOrganization: award.issuing_organization ?? '',
  awardDate: award.award_date ?? '',
  description: award.description ?? ''
});

export const CertificationsSection = () => {
  const [certList, setCertList] = useState<Certification[]>([]);
  const [awardList, setAwardList] = useState<Award[]>([]);
  const [isLoadingCerts, setIsLoadingCerts] = useState(false);
  const [isLoadingAwards, setIsLoadingAwards] = useState(false);
  const hasFetched = useRef(false);

  const [isCertModalOpen, setIsCertModalOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);

  const [isAwardModalOpen, setIsAwardModalOpen] = useState(false);
  const [editingAward, setEditingAward] = useState<Award | null>(null);

  // ── Fetch on mount ──────────────────────────────────────────
  useEffect(() => {
    if (hasFetched.current) return; // prevent double-fire in React StrictMode
    hasFetched.current = true;
    const fetchCerts = async () => {
      setIsLoadingCerts(true);
      const res = await getCertificates();
      if (res.status === 'success' && Array.isArray(res.data)) {
        setCertList(res.data.map((item) => normalizeCertification(item as ApiCertification)));
      }
      setIsLoadingCerts(false);
    };
    const fetchAwards = async () => {
      setIsLoadingAwards(true);
      const res = await getAwards();
      if (res.status === 'success' && Array.isArray(res.data)) {
        setAwardList(res.data.map((item) => normalizeAward(item as ApiAward)));
      }
      setIsLoadingAwards(false);
    };
    fetchCerts();
    fetchAwards();
  }, []);

  // ── Cert Handlers ───────────────────────────────────────────
  const handleAddCertClick = () => {
    setEditingCert(null);
    setIsCertModalOpen(true);
  };
  const handleEditCertClick = (cert: Certification) => {
    setEditingCert(cert);
    setIsCertModalOpen(true);
  };

  const handleDeleteCert = async (id?: number | string) => {
    if (!id) return;
    const res = await deleteCertificate(id);
    if (res.status === 'success') setCertList((prev) => prev.filter((c) => c.id !== id));
  };

  const handleSaveCert = async (savedCert: Certification) => {
    const payload = {
      certificate_name: savedCert.title,
      issuing_organization: savedCert.issuer,
      issue_date: savedCert.year
    };
    if (savedCert.id) {
      const res = await updateCertificate(savedCert.id, payload);
      if (res.status === 'success')
        setCertList((prev) => prev.map((c) => (c.id === savedCert.id ? savedCert : c)));
    } else {
      const res = await createCertificate(payload);
      if (res.status === 'success')
        setCertList((prev) => [
          ...prev,
          (res.data as Certification) ?? { ...savedCert, id: Date.now() }
        ]);
    }
  };

  // ── Award Handlers ──────────────────────────────────────────
  const handleAddAwardClick = () => {
    setEditingAward(null);
    setIsAwardModalOpen(true);
  };
  const handleEditAwardClick = (award: Award) => {
    setEditingAward(award);
    setIsAwardModalOpen(true);
  };

  const handleDeleteAward = async (id?: number | string) => {
    if (!id) return;
    const res = await deleteAward(id);
    if (res.status === 'success') setAwardList((prev) => prev.filter((a) => a.id !== id));
  };

  const handleSaveAward = async (award: Award) => {
    const payload = {
      award_name: award.awardName,
      issuing_organization: award.issuingOrganization,
      award_date: award.awardDate,
      description: award.description
    };
    if (award.id) {
      const res = await updateAward(award.id, payload);
      if (res.status === 'success')
        setAwardList((prev) => prev.map((a) => (a.id === award.id ? award : a)));
    } else {
      const res = await createAward(payload);
      if (res.status === 'success')
        setAwardList((prev) => [
          ...prev,
          res.data ? normalizeAward(res.data as ApiAward) : { ...award, id: Date.now() }
        ]);
    }
   };

  return (
    <Box>
      {/* Certifications Block */}
      <Box sx={{ mb: '32px' }}>
        <SectionHeader
          title="Certifications"
          subtitle="Review your certifications history."
          onAdd={handleAddCertClick}
        />
        {isLoadingCerts ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} sx={{ color: '#C9A84C' }} />
          </Box>
        ) : certList.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography
              sx={{ color: '#9ca3af', fontSize: '14px', fontFamily: 'Satoshi, sans-serif' }}
            >
              No certifications yet.
            </Typography>
          </Box>
        ) : (
          certList.map((cert) => (
            <CertCard
              key={cert.id}
              cert={cert}
              onEdit={handleEditCertClick}
              onDelete={handleDeleteCert}
            />
          ))
        )}
      </Box>

      {/* Awards Block */}
      <Box>
        <SectionHeader
          title="Awards &amp; Recognition"
          subtitle="Review your awards history."
          onAdd={handleAddAwardClick}
        />
        {isLoadingAwards ? (
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 3 }}>
            <CircularProgress size={24} sx={{ color: '#C9A84C' }} />
          </Box>
        ) : awardList.length === 0 ? (
          <Box sx={{ textAlign: 'center', py: 3 }}>
            <Typography
              sx={{ color: '#9ca3af', fontSize: '14px', fontFamily: 'Satoshi, sans-serif' }}
            >
              No awards yet.
            </Typography>
          </Box>
        ) : (
          awardList.map((award) => (
            <AwardCard
              key={award.id}
              award={award}
              onEdit={handleEditAwardClick}
              onDelete={handleDeleteAward}
            />
          ))
        )}
      </Box>

      <AddCertificationModal
        isOpen={isCertModalOpen}
        onClose={() => setIsCertModalOpen(false)}
        onSave={handleSaveCert}
        initialData={editingCert}
      />

      <AddAwardModal
        isOpen={isAwardModalOpen}
        onClose={() => setIsAwardModalOpen(false)}
        onSave={handleSaveAward}
        initialData={editingAward}
      />
    </Box>
  );
};
