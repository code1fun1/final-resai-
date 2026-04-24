import React from 'react';

interface SpinnerIconProps {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}

const SpinnerIcon: React.FC<SpinnerIconProps> = ({
  size = 24,
  color = '#DABF67',
  className,
  animate = true
}) => {
  const spinStyle: React.CSSProperties = animate
    ? { animation: 'resai-spin 1s linear infinite', display: 'block' }
    : { display: 'block' };

  return (
    <>
      {animate && (
        <style>{`
          @keyframes resai-spin {
            from { transform: rotate(0deg); }
            to   { transform: rotate(360deg); }
          }
        `}</style>
      )}
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={spinStyle}
        className={className}
      >
        <path
          d="M12 2V4"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M12 20V22"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M4.92999 4.92993L6.33999 6.33993"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.66 17.6599L19.07 19.0699"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M2 12H4"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M20 12H22"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M6.33999 17.6599L4.92999 19.0699"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M19.07 4.92993L17.66 6.33993"
          stroke={color}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </>
  );
};

export default SpinnerIcon;
