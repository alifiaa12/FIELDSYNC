import { LogoBox } from './Logo'
import { MENU } from '../constants'

// Role-aware navigation sidebar.
export function Sidebar({ me, active, onNavigate, onLogout }) {
  const items = MENU[me.r] || []
  const groupLabel = me.r === 'admin' ? 'ADMIN' : 'KARYAWAN'

  return (
    <nav className="sidebar">
      <div className="sb-head">
        <LogoBox className="sb-logo" size={28} />
        <h3>Sistem Monitoring</h3>
      </div>
      <ul className="menu">
        <li className="grp">{groupLabel}</li>
        {items.map(item => (
          <li
            key={item.id}
            className={`nav${active === item.id ? ' on' : ''}`}
            onClick={() => onNavigate(item.id)}
          >
            {item.label}
          </li>
        ))}
      </ul>
      <div className="uinfo">
        Login: <strong style={{ color: '#fff' }}>{me.u}</strong> ({me.r})
      </div>
      <div className="lgout" onClick={onLogout}>
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ verticalAlign: 'middle', marginRight: '6px' }}>
          <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
          <polyline points="16 17 21 12 16 7" />
          <line x1="21" y1="12" x2="9" y2="12" />
        </svg>
        Keluar
      </div>
    </nav>
  )
}
