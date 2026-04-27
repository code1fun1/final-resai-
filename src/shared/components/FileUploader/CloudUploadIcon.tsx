import React from 'react';

interface CloudUploadIconProps {
  size?: number;
  className?: string;
}

const CloudUploadIcon: React.FC<CloudUploadIconProps> = ({ size = 40, className }) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 40 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    className={className}
  >
    <rect width="39.9979" height="40" rx="19.999" fill="#DABF67" fillOpacity="0.25" />
    <path
      d="M19.9974 19.9973V27.9973"
      stroke="#735302"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M11.9974 21.8963C11.2545 21.1373 10.694 20.219 10.3584 19.2113C10.0229 18.2035 9.92112 17.1326 10.0608 16.0796C10.2004 15.0267 10.5779 14.0193 11.1645 13.1339C11.7511 12.2484 12.5316 11.508 13.4467 10.9689C14.3619 10.4297 15.3877 10.1059 16.4466 10.0219C17.5054 9.93794 18.5695 10.096 19.5582 10.4842C20.5469 10.8724 21.4343 11.4804 22.1531 12.2624C22.872 13.0443 23.4035 13.9796 23.7074 14.9973H25.4974C26.4629 14.9972 27.4029 15.3077 28.1784 15.8828C28.9539 16.4579 29.5239 17.2672 29.8042 18.1911C30.0844 19.1151 30.0601 20.1047 29.7347 21.0137C29.4094 21.9228 28.8003 22.703 27.9974 23.2393"
      stroke="#735302"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M15.9974 23.9973L19.9974 19.9973L23.9974 23.9973"
      stroke="#735302"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default CloudUploadIcon;
