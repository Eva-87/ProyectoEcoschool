import { useState, useEffect, useCallback } from 'react'
import { getResiduos, createResiduo, updateResiduo, deleteResiduo } from '../services/api'

export function useResiduos() {
  const [residuos, setResiduos] = useState([])
  const [loading, setLoading]   = useState(false)
  const [error, setError]       = useState(null)

  const fetchResiduos = useCallback(async () => {
    setLoading(true)
    setError(null)
    try {
      const { data } = await getResiduos()
      setResiduos(data)
    } catch {
      setError('Error al cargar los residuos')
    } finally {
      setLoading(false)
    }
  }, [])

  useEffect(() => { fetchResiduos() }, [fetchResiduos])

  const crear = async (dto) => {
    const { data } = await createResiduo(dto)
    setResiduos(prev => [data, ...prev])
    return data
  }

  const actualizar = async (id, dto) => {
    const { data } = await updateResiduo(id, dto)
    setResiduos(prev => prev.map(r => r.id === id ? data : r))
    return data
  }

  const eliminar = async (id) => {
    await deleteResiduo(id)
    setResiduos(prev => prev.filter(r => r.id !== id))
  }

  return { residuos, loading, error, fetchResiduos, crear, actualizar, eliminar }
}