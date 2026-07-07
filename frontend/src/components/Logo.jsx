// TelkomAkses circular logo mark. `size` controls the SVG dimensions.
export function LogoMark({ size = 36 }) {
  return (
    <svg width={size} height={size} viewBox="0 0 36 36">
      <circle cx="18" cy="18" r="18" fill="#e10019" />
      <circle cx="18" cy="18" r="10" fill="none" stroke="#fff" strokeWidth="3" />
      <circle cx="18" cy="10" r="3" fill="#fff" />
      <circle cx="25" cy="14" r="2.5" fill="#fff" />
      <circle cx="25" cy="22" r="2.5" fill="#fff" />
      <circle cx="18" cy="26" r="3" fill="#fff" />
      <circle cx="11" cy="22" r="2.5" fill="#fff" />
      <circle cx="11" cy="14" r="2.5" fill="#fff" />
    </svg>
  )
}

// Logo mark + wordmark, used on auth cards and the sidebar header.
export function LogoBox({ className = 'logo-box', size = 36 }) {
  return (
    <div className={className}>
      <LogoMark size={size} />
      <div className="logo-text">
        <div className="t1">TelkomAkses</div>
        <div className="t3">by Telkom Indonesia</div>
      </div>
    </div>
  )
}
