import React, { useState, useEffect } from 'react';

// ── Close Icon ─────────────────────────────────────────────────────────────

const CloseIcon = () => (
  <svg
    width="20"
    height="20"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
  >
    <path d="M18 6L6 18M6 6l12 12" />
  </svg>
);

// ── Reusable Field Components ──────────────────────────────────────────────

function Label({ children }: { children: React.ReactNode }) {
  return (
    <label
      style={{
        display: 'block',
        fontSize: 13.5,
        fontWeight: 600,
        color: '#1a1a1a',
        marginBottom: 8,
        fontFamily: '\'Satoshi\', sans-serif'
      }}
    >
      {children}
    </label>
  );
}

interface TextareaProps {
  placeholder?: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name: string;
  rows?: number;
}

function Textarea({ placeholder, value, onChange, name, rows = 5 }: TextareaProps) {
  const [focused, setFocused] = useState(false);
  return (
    <textarea
      name={name}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      rows={rows}
      onFocus={() => setFocused(true)}
      onBlur={() => setFocused(false)}
      style={{
        width: '100%',
        padding: '12px 16px',
        borderRadius: 10,
        border: `1.5px solid ${focused ? '#C9A84C' : '#e0dbd2'}`,
        background: 'white',
        fontSize: 14,
        color: '#1a1a1a',
        fontFamily: '\'Satoshi\', sans-serif',
        outline: 'none',
        resize: 'vertical',
        boxSizing: 'border-box',
        transition: 'border-color 0.15s'
      }}
    />
  );
}

// ── Initial Form State ─────────────────────────────────────────────────────

const EMPTY_FORM = {
  achievements: ''
};

// ── Modal Component ────────────────────────────────────────────────────────

interface AwardFormData {
  id?: number;
  bullets?: string[];
}

interface AddAwardModalProps {
  isOpen: boolean;
  onClose?: () => void;
  onSave?: (award: AwardFormData) => void;
  initialData?: AwardFormData | null;
}

export default function AddAwardModal({
  isOpen,
  onClose,
  onSave,
  initialData
}: AddAwardModalProps) {
  const [form, setForm] = useState(EMPTY_FORM);

  useEffect(() => {
    if (isOpen) {
      if (initialData) {
        setForm({
          achievements: initialData.bullets ? initialData.bullets.join('\n') : ''
        });
      } else {
        setForm(EMPTY_FORM);
      }
    }
  }, [isOpen, initialData]);

  if (!isOpen) return null;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveClick = () => {
    if (!form.achievements.trim()) return;

    onSave?.({
      id: initialData?.id,
      bullets: form.achievements.split('\n').filter(Boolean)
    });
    setForm(EMPTY_FORM);
    onClose?.();
  };

  const handleCancel = () => {
    setForm(EMPTY_FORM);
    onClose?.();
  };

  return (
    <>
      <div
        onClick={handleCancel}
        style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0,0,0,0.35)',
          backdropFilter: 'blur(6px)',
          WebkitBackdropFilter: 'blur(6px)',
          zIndex: 40
        }}
      />
      <div
        style={{
          position: 'fixed',
          top: 0,
          bottom: 0,
          right: 0,
          width: 560,
          maxWidth: '100vw',
          height: '100vh',
          background: 'white',
          borderRadius: '16px 0 0 16px',
          zIndex: 50,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-8px 0 40px rgba(0,0,0,0.12)',
          fontFamily: '\'Satoshi\', sans-serif'
        }}
      >
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '28px 32px 20px',
            borderBottom: '1px solid #f0ebe3'
          }}
        >
          <h2 style={{ fontSize: 22, fontWeight: 700, color: '#1a1a1a', margin: 0 }}>
            {initialData ? 'Edit Awards & Recognition' : 'Add New Awards & Recognition'}
          </h2>
          <button
            onClick={handleCancel}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              color: '#888',
              padding: 4,
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <CloseIcon />
          </button>
        </div>

        <div
          style={{
            flex: 1,
            overflowY: 'auto',
            padding: '24px 32px',
            display: 'flex',
            flexDirection: 'column',
            gap: 20
          }}
        >
          <div>
            <Label>Awards / Recognition</Label>
            <Textarea
              name="achievements"
              value={form.achievements}
              onChange={handleChange}
              placeholder="Mention achievements"
              rows={8}
            />
          </div>
        </div>

        <div
          style={{
            padding: '16px 32px',
            borderTop: '1px solid #f0ebe3',
            display: 'flex',
            justifyContent: 'flex-end',
            gap: 12
          }}
        >
          <button
            onClick={handleCancel}
            style={{
              padding: '11px 28px',
              borderRadius: 28,
              border: '1.5px solid #ddd',
              background: 'white',
              fontFamily: '\'Satoshi\', sans-serif',
              fontWeight: 500,
              fontSize: 15,
              cursor: 'pointer',
              color: '#333'
            }}
          >
            Cancel
          </button>
          <button
            onClick={handleSaveClick}
            style={{
              padding: '11px 32px',
              borderRadius: 28,
              border: 'none',
              background: form.achievements.trim() ? '#C9A84C' : '#e0d9c8',
              fontFamily: '\'Satoshi\', sans-serif',
              fontWeight: 600,
              fontSize: 15,
              cursor: form.achievements.trim() ? 'pointer' : 'not-allowed',
              color: 'white',
              transition: 'background 0.2s'
            }}
          >
            {initialData ? 'Update' : 'Add'}
          </button>
        </div>
      </div>
    </>
  );
}
