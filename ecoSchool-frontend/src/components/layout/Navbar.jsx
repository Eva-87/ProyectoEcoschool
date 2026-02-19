import { Link, useLocation } from 'react-router-dom'
import { useAlertas } from '../../hooks/useAlertas'

export default function Navbar() {
  const { pathname } = useLocation()
  const { alertas } = useAlertas()

  const links = [
    { to: '/',          label: '🏠 Inicio' },
    { to: '/residuos',  label: '♻️ Residuos' },
    { to: '/dashboard', label: '📊 Dashboard' },
  ]

  return (
    <nav className="bg-eco-800 text-white px-6 h-16 flex items-center justify-between shadow-md sticky top-0 z-50">
      <div className="flex items-center gap-2">
        <span className="text-3xl">🌿</span>
        <span className="text-xl font-bold tracking-wide">EcoSchool</span>
      </div>

      <ul className="flex gap-1 list-none m-0 p-0">
        {links.map(link => (
          <li key={link.to}>
            <Link
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors
                ${pathname === link.to
                  ? 'bg-white/20 text-white'
                  : 'text-white/80 hover:bg-white/10 hover:text-white'}`}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>

      {alertas.length > 0 && (
        <span className="bg-yellow-400 text-yellow-900 text-xs font-bold px-3 py-1 rounded-full">
          🔔 {alertas.length} alerta{alertas.length > 1 ? 's' : ''}
        </span>
      )}
    </nav>
  )
}