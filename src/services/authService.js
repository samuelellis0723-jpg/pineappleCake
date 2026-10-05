import { supabase, isSupabaseConfigured } from './supabase'

const LOCAL_AUTH_KEY = 'pineapple_auth_session'

export const authService = {
  async signInWithEmail(email, password) {
    if (!isSupabaseConfigured || !supabase) {
      // Modo local/offline para desarrollo y pruebas del panel admin
      if (email.trim().toLowerCase() === 'admin@pineapplecakes.com' && password === 'admin123') {
        const localUser = {
          id: 'admin-local',
          email: 'admin@pineapplecakes.com',
          user_metadata: { role: 'admin', name: 'Administrador PineappleCakes' },
        }
        const localSession = {
          user: localUser,
          access_token: 'local-token-' + Date.now(),
        }
        localStorage.setItem(LOCAL_AUTH_KEY, JSON.stringify(localSession))
        return { user: localUser, session: localSession }
      }
      throw new Error(
        'Credenciales inválidas. Usa correo: admin@pineapplecakes.com y contraseña: admin123',
      )
    }

    const { data, error } = await supabase.auth.signInWithPassword({
      email: email.trim(),
      password,
    })

    if (error) {
      throw error
    }

    return data
  },

  async signOut() {
    if (!isSupabaseConfigured || !supabase) {
      localStorage.removeItem(LOCAL_AUTH_KEY)
      return
    }

    const { error } = await supabase.auth.signOut()
    if (error) {
      throw error
    }
  },

  async getCurrentSession() {
    if (!isSupabaseConfigured || !supabase) {
      try {
        const raw = localStorage.getItem(LOCAL_AUTH_KEY)
        return raw ? JSON.parse(raw) : null
      } catch {
        return null
      }
    }

    const { data, error } = await supabase.auth.getSession()
    if (error) {
      console.error('Error al recuperar sesión:', error.message)
      return null
    }

    return data.session
  },

  async getCurrentUser() {
    if (!isSupabaseConfigured || !supabase) {
      const session = await this.getCurrentSession()
      return session?.user || null
    }

    const { data, error } = await supabase.auth.getUser()
    if (error) {
      return null
    }

    return data.user
  },

  onAuthStateChange(callback) {
    if (!isSupabaseConfigured || !supabase) {
      return { data: { subscription: { unsubscribe: () => {} } } }
    }

    return supabase.auth.onAuthStateChange((event, session) => {
      callback(event, session)
    })
  },
}

export default authService
