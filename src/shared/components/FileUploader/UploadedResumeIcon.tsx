import React from 'react';

interface UploadedResumeIconProps {
  size?: number;
  className?: string;
}

const UploadedResumeIcon: React.FC<UploadedResumeIconProps> = ({ size = 40, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="40" height="40" rx="20" fill="#DABF67" fillOpacity="0.25" />
    <path
      d="M14 30C13.4696 30 12.9609 29.7893 12.5858 29.4142C12.2107 29.0391 12 28.5304 12 28V12C12 11.4696 12.2107 10.9609 12.5858 10.5858C12.9609 10.2107 13.4696 10 14 10H22C22.3166 9.99949 22.6301 10.0616 22.9225 10.1828C23.215 10.3039 23.4806 10.4818 23.704 10.706L27.292 14.294C27.5168 14.5175 27.6952 14.7833 27.8167 15.0762C27.9382 15.369 28.0005 15.683 28 16V28C28 28.5304 27.7893 29.0391 27.4142 29.4142C27.0391 29.7893 26.5304 30 26 30H14Z"
      stroke="#735302"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M22 10V15C22 15.2652 22.1054 15.5196 22.2929 15.7071C22.4804 15.8946 22.7348 16 23 16H28"
      stroke="#735302"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M17 23L19 25L23 21"
      stroke="#735302"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default UploadedResumeIcon;
