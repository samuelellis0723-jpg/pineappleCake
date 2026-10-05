import { useState, useEffect } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from '../hooks/useAuth'

export function LoginPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [errorMessage, setErrorMessage] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { login, isAuthenticated, isConfigured } = useAuth()
  const navigate = useNavigate()

  useEffect(() => {
    if (isAuthenticated) {
      navigate('/admin', { replace: true })
    }
  }, [isAuthenticated, navigate])

  const handleTogglePassword = () => {
    setShowPassword((prev) => !prev)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setErrorMessage('')

    if (!email.trim() || !password) {
      setErrorMessage('Por favor ingresa tu correo y contraseña.')
      return
    }

    setIsSubmitting(true)
    const result = await login(email, password)
    setIsSubmitting(false)

    if (result.success) {
      navigate('/admin', { replace: true })
    } else {
      if (result.error.includes('Invalid login credentials')) {
        setErrorMessage('Credenciales inválidas. Verifica tu correo y contraseña.')
      } else {
        setErrorMessage(result.error || 'Error al iniciar sesión.')
      }
    }
  }

  return (
    <div className="min-h-screen bg-surface flex flex-col justify-center items-center px-4 py-12 relative overflow-hidden selection:bg-primary-fixed selection:text-on-primary-fixed">
      {/* Decorative ambient background glows */}
      <div className="absolute -top-32 -left-20 w-96 h-96 rounded-full bg-primary-fixed/30 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -right-20 w-96 h-96 rounded-full bg-surface-container-high/60 blur-3xl pointer-events-none" />

      {/* Top back link to home */}
      <div className="absolute top-6 left-6 z-10">
        <Link
          to="/"
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-container/60 hover:bg-surface-container-high text-on-surface-variant hover:text-primary transition-all text-body-sm font-medium backdrop-blur-sm"
        >
          <span className="material-symbols-outlined text-[18px]">arrow_back</span>
          Volver a la tienda
        </Link>
      </div>

      <div className="w-full max-w-md z-10">
        {/* Brand Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-3xl bg-primary text-on-primary shadow-lg shadow-primary/20 mb-4">
            <span className="material-symbols-outlined text-[32px]">cake</span>
          </div>
          <h1 className="font-headline-lg text-headline-lg text-on-surface tracking-tight">
            PineappleCakes
          </h1>
          <p className="font-label-md text-label-md uppercase tracking-widest text-primary font-semibold mt-1">
            Panel Administrativo
          </p>
          <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
            Ingresa tus credenciales autorizadas para gestionar el catálogo.
          </p>
        </div>

        {/* Not Configured Notice / Local Mode */}
        {!isConfigured && (
          <div className="mb-6 p-4 rounded-2xl bg-amber-50 border border-amber-200 text-amber-900 text-body-sm space-y-2">
            <div className="flex items-start gap-2.5">
              <span className="material-symbols-outlined text-amber-600 text-[20px] shrink-0 mt-0.5">
                info
              </span>
              <div>
                <p className="font-semibold">Modo Local Activo (Offline / localStorage)</p>
                <p className="text-xs mt-1 text-amber-800">
                  Puedes ingresar con credenciales de prueba locales para gestionar el catálogo sin necesidad de configurar Supabase.
                </p>
              </div>
            </div>
            <button
              type="button"
              onClick={() => {
                setEmail('admin@pineapplecakes.com')
                setPassword('admin123')
              }}
              className="w-full py-2 px-3 rounded-xl bg-amber-200/80 hover:bg-amber-300 text-amber-950 font-label-sm text-[12px] font-semibold transition-colors flex items-center justify-center gap-1.5"
            >
              <span className="material-symbols-outlined text-[16px]">key</span>
              <span>Autocompletar Acceso Demo (admin@pineapplecakes.com)</span>
            </button>
          </div>
        )}

        {/* Error Alert */}
        {errorMessage && (
          <div className="mb-6 p-4 rounded-2xl bg-error-container text-on-error-container text-body-sm flex items-center gap-3 animate-fadeIn">
            <span className="material-symbols-outlined text-[20px] shrink-0 text-error">
              error
            </span>
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Login Card Form */}
        <div className="bg-surface-container-lowest/90 backdrop-blur-xl rounded-3xl p-8 shadow-[0_16px_40px_rgba(46,35,35,0.08)] border border-surface-container-high/80">
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label
                htmlFor="email"
                className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-2"
              >
                Correo Electrónico
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">mail</span>
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="admin@pineapplecakes.com"
                  required
                  autoComplete="email"
                  className="w-full pl-11 pr-4 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-body-md"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="block font-label-md text-label-md uppercase tracking-wider text-on-surface-variant mb-2"
              >
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-on-surface-variant">
                  <span className="material-symbols-outlined text-[20px]">lock</span>
                </div>
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  required
                  autoComplete="current-password"
                  className="w-full pl-11 pr-12 py-3 rounded-2xl bg-surface-container-low border border-outline-variant/40 text-on-surface placeholder:text-on-surface-variant/50 focus:outline-none focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all font-body-md text-body-md"
                />
                <button
                  type="button"
                  onClick={handleTogglePassword}
                  className="absolute inset-y-0 right-0 pr-3.5 flex items-center text-on-surface-variant hover:text-on-surface transition-colors"
                  aria-label={showPassword ? 'Ocultar contraseña' : 'Ver contraseña'}
                >
                  <span className="material-symbols-outlined text-[20px]">
                    {showPassword ? 'visibility_off' : 'visibility'}
                  </span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full mt-2 h-12 rounded-2xl bg-primary text-on-primary font-label-lg text-label-lg uppercase tracking-wider shadow-lg shadow-primary/25 hover:bg-primary-container hover:shadow-primary/35 active:scale-[0.99] disabled:opacity-60 disabled:cursor-not-allowed transition-all flex items-center justify-center gap-2"
            >
              {isSubmitting ? (
                <>
                  <span className="w-5 h-5 border-2 border-on-primary border-t-transparent rounded-full animate-spin" />
                  <span>Iniciando sesión...</span>
                </>
              ) : (
                <>
                  <span>Ingresar al Panel</span>
                  <span className="material-symbols-outlined text-[18px]">login</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Security Footer Notice */}
        <p className="text-center font-body-sm text-body-sm text-on-surface-variant/75 mt-8 flex items-center justify-center gap-1.5">
          <span className="material-symbols-outlined text-[16px]">shield</span>
          Acceso privado y encriptado para personal autorizado
        </p>
      </div>
    </div>
  )
}

export default LoginPage
