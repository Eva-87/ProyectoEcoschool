import { useState, useEffect, useCallback } from 'react'
import { getAlertasActivas, resolverAlerta } from '../services/api'

export function useAlertas() {
  const [alertas, setAlertas] = useState([])
  const [loading, setLoading] = useState(false)

  const fetchAlertas = useCallback(async () => {
    setLoading(true)
    try {
      const { data } = await getAlertasActivas()
      setAlertas(data)
    } catch {
      console.error('Error al cargar alertas')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    fetchAlertas()
    const interval = setInterval(fetchAlertas, 30000)
    return () => clearInterval(interval)
  }, [fetchAlertas])

  const resolver = async (id) => {
    await resolverAlerta(id)
    setAlertas(prev => prev.filter(a => a.id !== id))
  }

  return { alertas, loading, resolver, fetchAlertas }
}
