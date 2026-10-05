import { Link } from 'react-router-dom'
import { useAuth } from '../../hooks/useAuth'

export function AdminSidebar({ activeTab, onSelectTab, isMobileOpen, onCloseMobile }) {
  const { logout, user } = useAuth()

  const handleTabClick = (tabId) => {
    onSelectTab(tabId)
    if (onCloseMobile) onCloseMobile()
  }

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: 'dashboard' },
    { id: 'cakes', label: 'Gestión de Pasteles', icon: 'cake' },
    { id: 'new', label: 'Agregar Pastel', icon: 'add_circle' },
  ]

  return (
    <>
      {/* Mobile Backdrop */}
      {isMobileOpen && (
        <div
          onClick={onCloseMobile}
          className="fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar Container */}
      <aside
        className={`fixed top-0 bottom-0 left-0 z-50 w-72 bg-surface-container-low border-r border-surface-container-high/80 flex flex-col justify-between transition-transform duration-300 ease-in-out lg:translate-x-0 ${
          isMobileOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div>
          {/* Brand header */}
          <div className="h-20 px-6 flex items-center justify-between border-b border-surface-container-high/60">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-primary text-on-primary flex items-center justify-center shadow-md shadow-primary/20">
                <span className="material-symbols-outlined text-[22px]">cake</span>
              </div>
              <div className="flex flex-col">
                <span className="font-headline-sm text-headline-sm text-on-surface leading-tight">
                  PineappleCakes
                </span>
                <span className="font-label-sm text-label-sm uppercase tracking-widest text-primary">
                  Admin Panel
                </span>
              </div>
            </Link>

            {/* Mobile Close Button */}
            <button
              onClick={onCloseMobile}
              className="lg:hidden p-1.5 rounded-full text-on-surface-variant hover:bg-surface-container-high"
              type="button"
              aria-label="Cerrar menú"
            >
              <span className="material-symbols-outlined text-[20px]">close</span>
            </button>
          </div>

          {/* Navigation links */}
          <nav className="p-4 space-y-1.5">
            {navItems.map((item) => {
              const isActive = activeTab === item.id
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabClick(item.id)}
                  type="button"
                  className={`w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-body-md text-body-md transition-all text-left ${
                    isActive
                      ? 'bg-primary text-on-primary font-semibold shadow-md shadow-primary/20'
                      : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
                  }`}
                >
                  <span className="material-symbols-outlined text-[22px]">
                    {item.icon}
                  </span>
                  <span>{item.label}</span>
                </button>
              )
            })}

            <div className="pt-4 mt-4 border-t border-surface-container-high/60">
              <Link
                to="/"
                className="w-full flex items-center gap-3.5 px-4 py-3 rounded-2xl font-body-md text-body-md text-on-surface-variant hover:bg-surface-container-high hover:text-primary transition-all"
              >
                <span className="material-symbols-outlined text-[22px]">storefront</span>
                <span>Ver Tienda Pública</span>
              </Link>
            </div>
          </nav>
        </div>

        {/* User profile & Logout Footer */}
        <div className="p-4 border-t border-surface-container-high/60 bg-surface/50">
          <div className="flex items-center gap-3 px-2 mb-3">
            <div className="w-9 h-9 rounded-full bg-primary-fixed flex items-center justify-center text-on-primary-fixed text-sm font-semibold">
              {user?.email ? user.email.charAt(0).toUpperCase() : 'A'}
            </div>
            <div className="flex flex-col min-w-0 flex-1">
              <span className="font-label-md text-label-md text-on-surface truncate font-semibold">
                {user?.email || 'Administrador'}
              </span>
              <span className="font-label-sm text-[11px] text-tertiary truncate">
                Sesión Activa
              </span>
            </div>
          </div>

          <button
            onClick={logout}
            type="button"
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-xl border border-outline-variant/50 text-error hover:bg-error-container hover:border-error-container font-label-md text-label-md uppercase tracking-wider transition-all"
          >
            <span className="material-symbols-outlined text-[18px]">logout</span>
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </aside>
    </>
  )
}

export default AdminSidebar
