import { createElement as h } from 'react';

/**
 * Central SVG icon library — plain JS, no JSX.
 * All icons use fill="currentColor" and default to 24×24.
 * Usage:  <ResumeIcon />  or  <ArrowRightIcon size={18} />
 */

const icon = (path, { viewBox = '0 0 24 24', size = 24, stroke = false } = {}) =>
  ({ size: s = size, color = 'currentColor', style = {} } = {}) =>
    h('svg', {
      xmlns: 'http://www.w3.org/2000/svg',
      width: s, height: s,
      viewBox,
      fill: stroke ? 'none' : color,
      stroke: stroke ? color : undefined,
      strokeWidth: stroke ? 2 : undefined,
      strokeLinecap: stroke ? 'round' : undefined,
      strokeLinejoin: stroke ? 'round' : undefined,
      style,
    }, h('path', { d: path }));

// ── Resume / Document icon (Material-style) ────────────────────────────────
export const ResumeIcon = icon(
  'M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8l-6-6zm-1 1.5L18.5 9H13V3.5zM8 13h8v1.5H8V13zm0 3h8v1.5H8V16zm0-6h5v1.5H8V10z'
);

// ── Arrow Right (hero "About Me" link & arrows) ────────────────────────────
export const ArrowRightIcon = icon(
  'M5 12h14M12 5l7 7-7 7',
  { stroke: true }
);

// ── External link arrow (case study, achievements) ────────────────────────
export const ExternalLinkIcon = icon(
  'M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6M15 3h6v6M10 14L21 3',
  { stroke: true }
);

// ── Star (CGPA in Education card) ─────────────────────────────────────────
export const StarIcon = ({ size = 20, color = 'currentColor' } = {}) =>
  h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: color,
  }, h('path', {
    d: 'M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z'
  }));

// ── Compass / Explore icon (footer "Explore" header) ──────────────────────
export const CompassIcon = icon(
  'M12 2a10 10 0 1 0 0 20A10 10 0 0 0 12 2zm0 18a8 8 0 1 1 0-16 8 8 0 0 1 0 16zm-1-6.17L7.83 12 14 7l-3 6.83zM12 13a1 1 0 1 0 0-2 1 1 0 0 0 0 2z'
);

// ── Share / Social icon (footer "Social" header) ──────────────────────────
export const ShareIcon = icon(
  'M18 8a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM6 15a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm12 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zM8.59 13.51l6.83 3.98M15.41 6.51l-6.82 3.98',
  { stroke: true }
);

// ── Figma logo ─────────────────────────────────────────────────────────────
export const FigmaIcon = ({ size = 32, style = {} } = {}) =>
  h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size, height: size,
    viewBox: '0 0 38 57',
    style,
  },
    h('path', { d: 'M19 28.5a9.5 9.5 0 1 1 19 0 9.5 9.5 0 0 1-19 0z', fill: '#1ABCFE' }),
    h('path', { d: 'M0 47.5A9.5 9.5 0 0 1 9.5 38H19v9.5a9.5 9.5 0 0 1-19 0z', fill: '#0ACF83' }),
    h('path', { d: 'M19 0v19h9.5a9.5 9.5 0 0 0 0-19H19z', fill: '#FF7262' }),
    h('path', { d: 'M0 9.5A9.5 9.5 0 0 0 9.5 19H19V0H9.5A9.5 9.5 0 0 0 0 9.5z', fill: '#F24E1E' }),
    h('path', { d: 'M0 28.5A9.5 9.5 0 0 0 9.5 38H19V19H9.5A9.5 9.5 0 0 0 0 28.5z', fill: '#A259FF' })
  );

// ── Adobe XD logo ──────────────────────────────────────────────────────────
export const XDIcon = ({ size = 32, style = {} } = {}) =>
  h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size, height: size,
    viewBox: '0 0 24 24',
    style,
  },
    h('rect', { width: 24, height: 24, rx: 4, fill: '#470137' }),
    h('path', {
      d: 'M8.22 16l-1.03-2.73H4.87L3.86 16H2l2.91-7.5h1.83L9.64 16H8.22zm-1.41-4.02l-.89-2.37-.89 2.37h1.78zm7.21 4.14c-.77 0-1.44-.17-2-.5a3.32 3.32 0 0 1-1.32-1.41 4.62 4.62 0 0 1-.46-2.1c0-.8.16-1.5.48-2.11a3.3 3.3 0 0 1 1.36-1.41 4.2 4.2 0 0 1 2.07-.49c.08 0 .18 0 .31.01V5.5H16v9.98c-.28.05-.59.1-.93.14-.34.04-.66.06-.96.06-.05 0-.07 0-.09-.5zm1.44-1.54V9.7a2.3 2.3 0 0 0-.43-.04c-.44 0-.82.1-1.14.3-.32.2-.56.49-.73.86-.17.37-.25.8-.25 1.29 0 .46.08.87.23 1.22.15.35.38.62.68.82.3.2.67.3 1.11.3.19 0 .36-.01.53-.03z',
      fill: '#FF61F6'
    })
  );

// ── Miro logo ──────────────────────────────────────────────────────────────
export const MiroIcon = ({ size = 32, style = {} } = {}) =>
  h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    style,
  },
    h('rect', { width: 24, height: 24, rx: 4, fill: '#FFD02F' }),
    h('path', {
      d: 'M16.5 5h-2.4l2.2 3.8-2.8-3.8h-2.4l1.9 4-2.5-4H8.1l1.6 4.1L7 5H4.5l2.7 6.8L4.5 19H7l2.2-5.8L7.4 19H10l2.1-6L10.3 19h2.5l1.8-6.2.1 6.2h2.5l.2-7.2L19.5 19H22l-5.5-14z',
      fill: '#050038'
    })
  );

// ── Hand wave / CTA arrow ──────────────────────────────────────────────────
export const HandWaveIcon = icon(
  'M7 11.5V14l-2-1.7A1.75 1.75 0 0 1 7.6 10l.5.2.9-1.6a1.75 1.75 0 0 1 2.9 1.9l-.3.5.9-.5a1.75 1.75 0 1 1 1.75 3.03L12 14l1-.6a1.75 1.75 0 1 1 1.75 3.03l-4.5 2.6a4.5 4.5 0 0 1-6.18-1.64L2 14l1.5-1c.25.43.6.78 1 1L7 11.5z'
);

// ── Arrow Up-Right / Explore ───────────────────────────────────────────────
export const ArrowUpRightIcon = icon(
  'M7 17L17 7M7 7h10v10',
  { stroke: true }
);

// ── Back arrow (←) ────────────────────────────────────────────────────────
export const BackArrowIcon = icon(
  'M19 12H5M12 5l-7 7 7 7',
  { stroke: true }
);

// ── Available / Pulse dot (availability badge) ────────────────────────────
export const AvailIcon = ({ size = 12, color = '#22c55e' } = {}) =>
  h('span', {
    style: {
      display: 'inline-block',
      width: size, height: size,
      borderRadius: '50%',
      background: color,
      boxShadow: `0 0 0 3px ${color}33`,
    }
  });

// ── Pencil / UI-UX Design ─────────────────────────────────────────────────
export const DesignIcon = icon(
  'M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z',
  { stroke: true }
);

// ── Code / Development ────────────────────────────────────────────────────
export const CodeIcon = icon(
  'M16 18l6-6-6-6M8 6l-6 6 6 6',
  { stroke: true }
);

// ── Link / Credential arrow ───────────────────────────────────────────────
export const LinkArrowIcon = icon(
  'M10 6H6a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-4M14 4h6m0 0v6m0-6L10 14',
  { stroke: true }
);

// ── GitHub icon ─────────────────────────────────────────────────────────────
export const GithubIcon = ({ size = 20, color = 'currentColor' } = {}) =>
  h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }, h('path', { d: 'M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22' }));

// ── Behance icon ────────────────────────────────────────────────────────────
export const BehanceIcon = ({ size = 20, color = 'currentColor' } = {}) =>
  h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: color,
  }, h('path', { d: 'M22 7h-7V5h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14H15.97c.13 1.2.836 1.973 2.14 1.973.798 0 1.348-.33 1.692-1.005l2.444.061zM15.97 13h4.604c-.088-1.313-.836-1.993-2.272-1.993-1.48 0-2.193.737-2.332 1.993zM8.986 12.737c1.459.358 2.514 1.21 2.514 2.827 0 2.085-1.741 3.436-4.515 3.436H1V5h5.866c2.634 0 4.204 1.14 4.204 3.132 0 1.348-.738 2.23-2.084 2.605zm-5.037-4.93v2.59h2.55c1.137 0 1.811-.465 1.811-1.325 0-.836-.651-1.265-1.764-1.265H3.949zm2.74 6.568H3.949v2.826h2.76c1.215 0 1.905-.498 1.905-1.413 0-.937-.711-1.413-1.925-1.413z' }));

// ── Learning / Case Study icon ──────────────────────────────────────────────
export const LearningIcon = ({ size = 20, color = 'currentColor' } = {}) =>
  h('svg', {
    xmlns: 'http://www.w3.org/2000/svg',
    width: size, height: size,
    viewBox: '0 0 24 24',
    fill: 'none',
    stroke: color,
    strokeWidth: 2,
    strokeLinecap: 'round',
    strokeLinejoin: 'round',
  }, [
    h('path', { d: 'M4 19.5A2.5 2.5 0 0 1 6.5 17H20' }),
    h('path', { d: 'M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z' })
  ]);
