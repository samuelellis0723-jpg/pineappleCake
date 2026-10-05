import { Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function Header() {
  const { isAuthenticated } = useAuth()

  return (
    <header className="fixed top-0 inset-x-0 z-50 bg-surface/85 backdrop-blur-xl shadow-[0_1px_8px_rgba(46,35,35,0.06)]">
      <div className="h-20 max-w-[1280px] mx-auto px-margin flex items-center justify-between gap-space-lg">
        <Link className="flex flex-col group" to="/">
          <span className="font-headline-md text-headline-md tracking-tight text-on-surface group-hover:text-primary transition-colors">
            PineappleCakes
          </span>
          <span className="font-label-sm text-label-sm uppercase tracking-widest text-tertiary-container mt-0.5">
            Pasteleria &amp; Repostería
          </span>
        </Link>

        <nav
          className="hidden md:flex items-center gap-space-lg"
          data-active-classes="text-primary font-semibold"
        >
          <Link
            aria-current="page"
            className="uppercase tracking-wider transition-colors py-2 text-primary font-semibold"
            to="/"
          >
            Inicio
          </Link>
          <a
            className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-2"
            href="#colecciones"
          >
            Pasteles
          </a>
          <a
            className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-2"
            href="#colecciones"
          >
            Colecciones
          </a>
          <a
            className="font-label-lg text-label-lg uppercase tracking-wider text-on-surface-variant hover:text-on-surface transition-colors py-2"
            href="#nosotros"
          >
            Nosotros
          </a>
        </nav>

        <div className="flex items-center gap-space-md">
          <button
            aria-label="Buscar"
            className="w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            type="button"
          >
            <span className="material-symbols-outlined text-[20px]">search</span>
          </button>
          <a
            aria-label="Carrito de Compras"
            className="relative w-10 h-10 rounded-full flex items-center justify-center text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface transition-colors"
            href="#colecciones"
          >
            <span className="material-symbols-outlined text-[22px]">shopping_bag</span>
            <span className="absolute top-2 right-2 w-2 h-2 rounded-full bg-primary"></span>
          </a>
          <a
            className="hidden sm:inline-flex items-center justify-center h-10 px-space-lg rounded-full bg-primary text-on-primary font-label-md text-label-md uppercase tracking-wider shadow-[0_4px_16px_rgba(122,81,86,0.24)] hover:bg-primary-container hover:text-on-primary-container transition-all"
            href="#colecciones"
          >
            Pedir Ahora
          </a>

          {/* Admin / Profile Link */}
          <Link
            to={isAuthenticated ? '/admin' : '/login'}
            aria-label={isAuthenticated ? 'Panel Administrativo' : 'Iniciar Sesión'}
            className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-on-primary hover:bg-primary-container transition-colors shadow-sm"
            title={isAuthenticated ? 'Ir al Panel Admin' : 'Iniciar Sesión'}
          >
            <span className="material-symbols-outlined text-[18px]">
              {isAuthenticated ? 'admin_panel_settings' : 'person'}
            </span>
          </Link>
        </div>
      </div>
    </header>
  )
}

export default Header
