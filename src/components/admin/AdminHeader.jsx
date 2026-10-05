import { useAuth } from '../../hooks/useAuth'

export function AdminHeader({ title, onOpenMobileMenu }) {
  const { user, logout } = useAuth()

  return (
    <header className="h-20 bg-surface/90 backdrop-blur-md border-b border-surface-container-high/80 px-6 sm:px-8 flex items-center justify-between sticky top-0 z-30">
      <div className="flex items-center gap-4">
        {/* Mobile menu trigger */}
        <button
          onClick={onOpenMobileMenu}
          className="lg:hidden p-2 rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-colors"
          type="button"
          aria-label="Abrir menú"
        >
          <span className="material-symbols-outlined text-[24px]">menu</span>
        </button>

        <h2 className="font-headline-md text-headline-md text-on-surface tracking-tight">
          {title}
        </h2>
      </div>

      <div className="flex items-center gap-3">
        <div className="hidden sm:flex flex-col text-right">
          <span className="font-label-md text-label-md text-on-surface font-semibold">
            {user?.email || 'Administrador'}
          </span>
          <span className="font-label-sm text-label-sm text-primary font-medium">
            Acceso Autorizado
          </span>
        </div>

        <button
          onClick={logout}
          className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2 rounded-full bg-surface-container-high hover:bg-error-container text-on-surface-variant hover:text-error transition-all text-body-sm font-medium"
          type="button"
        >
          <span className="material-symbols-outlined text-[18px]">logout</span>
          <span>Salir</span>
        </button>
      </div>
    </header>
  )
}

export default AdminHeader
