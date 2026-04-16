import React from 'react';

/* ── Exact SVG Icon Components ── */
const LinkedInIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect x="2" y="9" width="4" height="12" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const BehanceIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
    <path d="M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.836 1.973 2.14 1.973.798 0 1.348-.33 1.692-1.005l2.444.061zM15.97 13h4.604c-.088-1.313-.836-1.993-2.272-1.993-1.48 0-2.193.737-2.332 1.993zM8.986 12.737c1.459.358 2.514 1.21 2.514 2.827 0 2.085-1.741 3.436-4.515 3.436H1V5h5.866c2.634 0 4.204 1.14 4.204 3.132 0 1.348-.738 2.23-2.084 2.605zm-5.037-4.93v2.59h2.55c1.137 0 1.811-.465 1.811-1.325 0-.836-.651-1.265-1.764-1.265H3.949zm2.74 6.568H3.949v2.826h2.76c1.215 0 1.905-.498 1.905-1.413 0-.937-.711-1.413-1.925-1.413z"/>
  </svg>
);

const GithubIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path>
  </svg>
);

export const socialLinks = [
  { 
    label: 'LinkedIn', 
    Icon: LinkedInIcon, 
    bg: 'var(--blue)',
    href: 'https://www.linkedin.com/in/munirajubr/' 
  },
  { 
    label: 'Behance',  
    Icon: BehanceIcon,  
    bg: 'var(--orange)',
    href: 'https://www.behance.net/munirajraj2' 
  },
  { 
    label: 'Github',   
    Icon: GithubIcon,   
    bg: 'var(--green)',
    href: 'https://github.com/munirajubr' 
  },
];