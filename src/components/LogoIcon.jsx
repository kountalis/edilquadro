import React from 'react';

const LogoIcon = ({ className = 'h-10 w-10', ...props }) => (
  <svg
    viewBox="0 0 64 64"
    role="img"
    aria-label="Edilquadro logo"
    className={className}
    {...props}
  >
    <circle cx="32" cy="12" r="4.5" fill="currentColor" />
    <path
      d="M22 28 C26 18 38 18 42 28"
      strokeWidth="4"
      stroke="currentColor"
      fill="none"
      strokeLinecap="round"
    />
    <path
      d="M26 30 L16 56"
      strokeWidth="4"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M38 30 L48 56"
      strokeWidth="4"
      stroke="currentColor"
      strokeLinecap="round"
    />
    <path
      d="M18 46 L46 46"
      strokeWidth="4"
      stroke="currentColor"
      strokeLinecap="round"
    />
  </svg>
);

export default LogoIcon;










