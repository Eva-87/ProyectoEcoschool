import { useState } from 'react'
import { useResiduos } from '../hooks/useResiduos'
import { CATEGORIAS, ESTADOS } from '../utils/constants'
import ResiduoForm from '../components/forms/ResiduoForm'
import Modal from '../components/layout/Modal'

export default function ResiduosPage() {
  const { residuos, loading, error, crear, actualizar, eliminar } = useResiduos()
  const [filtroCategoria, setFiltroCategoria] = useState('')
  const [filtroEstado,    setFiltroEstado]    = useState('')
  const [creando,         setCreando]         = useState(false)
  const [editando,        setEditando]        = useState(null)
  const [confirmDelete,   setConfirmDelete]   = useState(null)

  const filtrados = residuos.filter(r => {
    if (filtroCategoria && r.categoria !== filtroCategoria) return false
    if (filtroEstado    && r.estado    !== filtroEstado)    return false
    return true
  })

  const getCatLabel  = v => CATEGORIAS.find(c => c.value === v)?.label || v
  const getEstadoTw  = v => ESTADOS.find(e => e.value === v)?.tw || 'bg-gray-100 text-gray-700'
  const getEstadoLbl = v => ESTADOS.find(e => e.value === v)?.label || v

  const selectClass = "px-3 py-2 border border-gray-300 rounded-lg text-sm outline-none focus:border-eco-800 transition-colors bg-white"

  if (loading) return <p className="text-center py-20 text-gray-400">Cargando residuos...</p>
  if (error)   return <p className="text-center py-20 text-red-500">{error}</p>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">

      {/* HEADER */}
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-eco-800">♻️ Residuos</h1>
        <button
          onClick={() => setCreando(true)}
          className="bg-eco-800 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-eco-700 transition-colors"
        >
          ➕ Nuevo residuo
        </button>
      </div>

      {/* FILTROS */}
      <div className="flex gap-3 flex-wrap items-center mb-6">
        <select value={filtroCategoria} onChange={e => setFiltroCategoria(e.target.value)} className={selectClass}>
          <option value="">Todas las categorías</option>
          {CATEGORIAS.map(c => <option key={c.value} value={c.value}>{c.label}</option>)}
        </select>
        <select value={filtroEstado} onChange={e => setFiltroEstado(e.target.value)} className={selectClass}>
          <option value="">Todos los estados</option>
          {ESTADOS.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
        </select>
        <span className="text-sm text-gray-400 ml-auto">{filtrados.length} resultado(s)</span>
      </div>

      {/* TABLA */}
      {filtrados.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-4xl mb-3">📭</p>
          <p>No hay residuos registrados.{' '}
            <button onClick={() => setCreando(true)} className="text-eco-800 font-semibold underline">
              ¡Registra el primero!
            </button>
          </p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 text-gray-500 uppercase text-xs tracking-wider">
              <tr>
                {['Descripción','Categoría','Cantidad','Ubicación','Estado','Fecha',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filtrados.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3 text-gray-800">{r.descripcion}</td>
                  <td className="px-4 py-3">{getCatLabel(r.categoria)}</td>
                  <td className="px-4 py-3 font-bold text-eco-800">{r.cantidadKg} kg</td>
                  <td className="px-4 py-3 text-gray-600">{r.ubicacion}</td>
                  <td className="px-4 py-3">
                    <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${getEstadoTw(r.estado)}`}>
                      {getEstadoLbl(r.estado)}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {new Date(r.fechaRegistro).toLocaleDateString('es-ES')}
                  </td>
                  <td className="px-4 py-3 flex gap-1">
                    <button onClick={() => setEditando(r)} className="p-1.5 rounded-lg hover:bg-blue-50 transition-colors">✏️</button>
                    <button onClick={() => setConfirmDelete(r.id)} className="p-1.5 rounded-lg hover:bg-red-50 transition-colors">🗑️</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* MODAL CREAR */}
      {creando && (
        <Modal onClose={() => setCreando(false)}>
          <ResiduoForm
            onSubmit={async d => { await crear(d); setCreando(false) }}
            onCancel={() => setCreando(false)}
          />
        </Modal>
      )}

      {/* MODAL EDITAR */}
      {editando && (
        <Modal onClose={() => setEditando(null)}>
          <ResiduoForm
            initialData={editando}
            onSubmit={async d => { await actualizar(editando.id, d); setEditando(null) }}
            onCancel={() => setEditando(null)}
          />
        </Modal>
      )}

      {/* MODAL BORRAR */}
      {confirmDelete && (
        <Modal onClose={() => setConfirmDelete(null)}>
          <div className="bg-white rounded-2xl shadow-xl p-8 text-center max-w-sm">
            <p className="text-2xl mb-2">🗑️</p>
            <p className="text-gray-700 font-medium mb-6">¿Seguro que quieres eliminar este residuo?</p>
            <div className="flex gap-3 justify-center">
              <button
                onClick={async () => { await eliminar(confirmDelete); setConfirmDelete(null) }}
                className="bg-red-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-red-600 transition-colors"
              >
                Eliminar
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg font-semibold hover:bg-gray-200 transition-colors"
              >
                Cancelar
              </button>
            </div>
          </div>
        </Modal>
      )}
    </div>
  )
}