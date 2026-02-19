import axios from 'axios'

const api = axios.create({
baseURL: 'http://localhost:8080/api',
  headers: { 'Content-Type': 'application/json' },
})

api.interceptors.response.use(
  res => res,
  err => {
    console.error('API Error:', err.response?.data || err.message)
    return Promise.reject(err)
  }
)

// Residuos
export const getResiduos          = ()         => api.get('/residuos')
export const createResiduo        = (data)     => api.post('/residuos', data)
export const updateResiduo        = (id, data) => api.put(`/residuos/${id}`, data)
export const deleteResiduo        = (id)       => api.delete(`/residuos/${id}`)
export const getResumenCategorias = ()         => api.get('/residuos/resumen')

// Alertas
export const getAlertasActivas = ()    => api.get('/alertas/activas')
export const resolverAlerta    = (id)  => api.patch(`/alertas/${id}/resolver`)

export default api