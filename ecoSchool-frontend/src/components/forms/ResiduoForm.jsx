import { useState } from 'react'
import { CATEGORIAS, UBICACIONES } from '../../utils/constants'

const empty = {
  descripcion: '', categoria: '', cantidadKg: '', ubicacion: '', observaciones: ''
}

export default function ResiduoForm({ onSubmit, onCancel, initialData = null }) {
  const [form, setForm]       = useState(initialData || empty)
  const [errors, setErrors]   = useState({})
  const [loading, setLoading] = useState(false)

  const validate = () => {
    const e = {}
    if (!form.descripcion.trim()) e.descripcion = 'La descripción es obligatoria'
    if (!form.categoria)          e.categoria   = 'Selecciona una categoría'
    if (!form.cantidadKg || Number(form.cantidadKg) <= 0) e.cantidadKg = 'Introduce una cantidad mayor que 0'
    if (!form.ubicacion)          e.ubicacion   = 'La ubicación es obligatoria'
    return e
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setForm(prev => ({ ...prev, [name]: value }))
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    const v = validate()
    if (Object.keys(v).length) { setErrors(v); return }
    setLoading(true)
    try {
      await onSubmit({ ...form, cantidadKg: Number(form.cantidadKg) })
      setForm(empty)
    } catch (err) {
      setErrors({ general: err.response?.data?.mensaje || 'Error al guardar' })
    } finally {
      setLoading(false)
    }
  }

  const inputClass = (field) =>
    `w-full px-3 py-2 border rounded-lg text-sm outline-none transition-colors
     ${errors[field]
       ? 'border-red-400 focus:border-red-500'
       : 'border-gray-300 focus:border-eco-800'}`

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="bg-white rounded-2xl shadow-xl p-8 w-full max-w-lg"
    >
      <h2 className="text-xl font-bold text-eco-800 mb-6">
        {initialData ? '✏️ Editar Residuo' : '➕ Nuevo Residuo'}
      </h2>

      {errors.general && (
        <div className="bg-red-50 text-red-700 text-sm px-4 py-3 rounded-lg mb-4">
          {errors.general}
        </div>
      )}

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="descripcion">
          Descripción *
        </label>
        <input
          id="descripcion" name="descripcion" type="text"
          value={form.descripcion} onChange={handleChange}
          placeholder="Ej: Botellas del recreo"
          className={inputClass('descripcion')}
        />
        {errors.descripcion && <p className="text-red-500 text-xs mt-1">{errors.descripcion}</p>}
      </div>

      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="categoria">
            Categoría *
          </label>
          <select
            id="categoria" name="categoria"
            value={form.categoria} onChange={handleChange}
            className={inputClass('categoria')}
          >
            <option value="">Seleccionar...</option>
            {CATEGORIAS.map(c => (
              <option key={c.value} value={c.value}>{c.label}</option>
            ))}
          </select>
          {errors.categoria && <p className="text-red-500 text-xs mt-1">{errors.categoria}</p>}
        </div>

        <div>
          <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="cantidadKg">
            Cantidad (kg) *
          </label>
          <input
            id="cantidadKg" name="cantidadKg" type="number"
            min="0.01" step="0.01"
            value={form.cantidadKg} onChange={handleChange}
            placeholder="0.00"
            className={inputClass('cantidadKg')}
          />
          {errors.cantidadKg && <p className="text-red-500 text-xs mt-1">{errors.cantidadKg}</p>}
        </div>
      </div>

      <div className="mb-4">
        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="ubicacion">
          Ubicación *
        </label>
        <select
          id="ubicacion" name="ubicacion"
          value={form.ubicacion} onChange={handleChange}
          className={inputClass('ubicacion')}
        >
          <option value="">Seleccionar...</option>
          {UBICACIONES.map(u => <option key={u} value={u}>{u}</option>)}
        </select>
        {errors.ubicacion && <p className="text-red-500 text-xs mt-1">{errors.ubicacion}</p>}
      </div>

      <div className="mb-6">
        <label className="block text-sm font-semibold text-gray-700 mb-1" htmlFor="observaciones">
          Observaciones <span className="font-normal text-gray-400">(opcional)</span>
        </label>
        <textarea
          id="observaciones" name="observaciones" rows={3}
          value={form.observaciones} onChange={handleChange}
          placeholder="Detalles adicionales..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-eco-800 transition-colors resize-none"
        />
      </div>

      <div className="flex gap-3 justify-end">
        {onCancel && (
          <button
            type="button" onClick={onCancel}
            className="px-5 py-2 rounded-lg border border-gray-300 text-gray-600 text-sm font-medium hover:bg-gray-50 transition-colors"
          >
            Cancelar
          </button>
        )}
        <button
          type="submit" disabled={loading}
          className="px-6 py-2 rounded-lg bg-eco-800 text-white text-sm font-semibold hover:bg-eco-700 disabled:opacity-60 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Guardando...' : initialData ? 'Actualizar' : 'Registrar'}
        </button>
      </div>
    </form>
  )
}