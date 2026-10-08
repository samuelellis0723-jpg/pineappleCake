import { useState, useEffect, useMemo, useCallback } from 'react'
import { AuthContext } from './auth-context'
import { authService } from '../services/authService'
import { isSupabaseConfigured } from '../services/supabase'

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null)
  const [session, setSession] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    let isMounted = true

    async function initializeAuth() {
      try {
        if (!isSupabaseConfigured) {
          if (isMounted) setLoading(false)
          return
        }

        const currentSession = await authService.getCurrentSession()
        if (isMounted) {
          setSession(currentSession)
          setUser(currentSession?.user || null)
          setLoading(false)
        }
      } catch (err) {
        if (isMounted) {
          console.error('Error al inicializar sesión:', err)
          setError(err.message)
          setLoading(false)
        }
      }
    }

    initializeAuth()

    const { data: authListener } = authService.onAuthStateChange(
      (_event, newSession) => {
        if (isMounted) {
          setSession(newSession)
          setUser(newSession?.user || null)
          setLoading(false)
        }
      },
    )

    return () => {
      isMounted = false
      if (authListener?.subscription?.unsubscribe) {
        authListener.subscription.unsubscribe()
      }
    }
  }, [])

  const login = useCallback(async (email, password) => {
    setError(null)
    try {
      const data = await authService.signInWithEmail(email, password)
      setUser(data.user)
      setSession(data.session)
      return { success: true, user: data.user }
    } catch (err) {
      setError(err.message)
      return { success: false, error: err.message }
    }
  }, [])

  const logout = useCallback(async () => {
    setError(null)
    try {
      await authService.signOut()
      setUser(null)
      setSession(null)
    } catch (err) {
      setError(err.message)
      console.error('Error al cerrar sesión:', err)
    }
  }, [])

  const value = useMemo(
    () => ({
      user,
      session,
      isAuthenticated: Boolean(user),
      loading,
      error,
      login,
      logout,
      isConfigured: isSupabaseConfigured,
    }),
    [user, session, loading, error, login, logout],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export default AuthProvider
