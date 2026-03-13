/* ── Tag badge ── */
export default function Tag({ label, color }) {
  const colorMap = {
    green: 'var(--green)',
    red: 'var(--red)',
    pink: 'var(--pink)',
    blue: 'var(--blue)',
    purple: 'var(--purple)',
    orange: 'var(--orange)',
    'light-orange': 'var(--light-orange)',
    bg: 'var(--bg)',
  }
  return (
    <span
      style={{
        display: 'inline-flex',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '5px 15px',
        borderRadius: 25,
        border: '2px solid var(--black)',
        boxShadow: '3px 3px 0 var(--black)',
        fontSize: 14,
        fontWeight: 500,
        whiteSpace: 'nowrap',
        background: colorMap[color] || 'var(--bg)',
        color: 'var(--black)',
        flexShrink: 0,
      }}
    >
      {label}
    </span>
  )
}