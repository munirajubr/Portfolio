/* ── Project image card ── */
export default function ProjectImg({ src, alt }) {
  return (
    <img
      src={src}
      alt={alt}
      style={{
        width: 550,
        height: 391,
        objectFit: 'cover',
        borderRadius: 20,
        border: '5px solid var(--black)',
        boxShadow: '7.5px 7.5px 0 var(--black)',
        flexShrink: 0,
        transition: 'transform 0.2s, box-shadow 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = 'translate(-3px,-3px)'
        e.currentTarget.style.boxShadow = '10.5px 10.5px 0 var(--black)'
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = ''
        e.currentTarget.style.boxShadow = '7.5px 7.5px 0 var(--black)'
      }}
    />
  )
}