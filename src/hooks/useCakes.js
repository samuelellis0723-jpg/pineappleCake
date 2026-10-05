import { useState, useEffect, useCallback } from 'react'
import { cakesService } from '../services/cakesService'

/**
 * Hook para obtener los pasteles publicados en la tienda/landing page.
 * Sincronizado automáticamente ante cambios en el catálogo.
 */
export function usePublishedCakes() {
  const [cakes, setCakes] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchCakes = useCallback(async () => {
    try {
      setError(null)
      const data = await cakesService.getPublishedCakes()
      setCakes(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    let isCurrent = true

    async function loadInitial() {
      try {
        const data = await cakesService.getPublishedCakes()
        if (isCurrent) {
          setCakes(data)
          setLoading(false)
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    loadInitial()

    // Escuchar actualizaciones locales o entre pestañas
    const handleUpdate = () => {
      fetchCakes()
    }

    window.addEventListener('pineapple_cakes_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      isCurrent = false
      window.removeEventListener('pineapple_cakes_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [fetchCakes])

  return { cakes, loading, error, refetch: fetchCakes }
}

/**
 * Hook para administrar el inventario y estadísticas de pasteles en el panel admin.
 */
export function useAdminCakes(filters = {}) {
  const [cakes, setCakes] = useState([])
  const [stats, setStats] = useState({
    total: 0,
    published: 0,
    drafts: 0,
    lastPublishedAt: null,
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const searchParam = filters.search || ''
  const categoryParam = filters.category || 'all'
  const statusParam = filters.status || 'all'

  const fetchAdminData = useCallback(async () => {
    try {
      setError(null)
      const [cakesData, statsData] = await Promise.all([
        cakesService.getAllCakes({
          search: searchParam,
          category: categoryParam,
          status: statusParam,
        }),
        cakesService.getCakesStats(),
      ])
      setCakes(cakesData)
      setStats(statsData)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }, [searchParam, categoryParam, statusParam])

  useEffect(() => {
    let isCurrent = true

    async function loadAdminInitial() {
      try {
        const [cakesData, statsData] = await Promise.all([
          cakesService.getAllCakes({
            search: searchParam,
            category: categoryParam,
            status: statusParam,
          }),
          cakesService.getCakesStats(),
        ])
        if (isCurrent) {
          setCakes(cakesData)
          setStats(statsData)
          setLoading(false)
        }
      } catch (err) {
        if (isCurrent) {
          setError(err.message)
          setLoading(false)
        }
      }
    }

    loadAdminInitial()

    const handleUpdate = () => {
      fetchAdminData()
    }

    window.addEventListener('pineapple_cakes_updated', handleUpdate)
    window.addEventListener('storage', handleUpdate)

    return () => {
      isCurrent = false
      window.removeEventListener('pineapple_cakes_updated', handleUpdate)
      window.removeEventListener('storage', handleUpdate)
    }
  }, [fetchAdminData, searchParam, categoryParam, statusParam])

  return {
    cakes,
    stats,
    loading,
    error,
    refetch: fetchAdminData,
  }
}

export default usePublishedCakes
