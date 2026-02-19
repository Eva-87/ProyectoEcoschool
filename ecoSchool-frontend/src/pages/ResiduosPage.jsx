import { useState } from 'react'
import Modal from '../components/layout/Modal'
import ResiduoForm from '../components/forms/ResiduoForm'
import { CATEGORIAS, ESTADOS } from '../utils/constants'
import { useResiduos } from '../hooks/useResiduos'

export default function ResiduosPage() {
  // aseguramos que residuos siempre sea un array
  const { residuos = [], loading, error, crear, actualizar, eliminar } = useResiduos()
  const [creando, setCreando] = useState(false)
  const [editando, setEditando] = useState(null)
  const [confirmDelete, setConfirmDelete] = useState(null)

  if (loading) return <p className="text-center py-20 text-gray-400">Cargando residuos...</p>
  if (error) return <p className="text-center py-20 text-red-500">{error}</p>

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-eco-800">♻️ Residuos</h1>
        <button
          onClick={() => setCreando(true)}
          className="bg-eco-800 text-white px-5 py-2.5 rounded-xl hover:bg-eco-700 transition"
        >
          ➕ Nuevo residuo
        </button>
      </div>

      {/* Mensaje cuando no hay registros */}
      {residuos.length === 0 ? (
        <div className="text-center py-20 text-gray-400">
          <p className="text-6xl mb-3">📭</p>
          <p>No hay residuos registrados todavía.</p>
          <button
            onClick={() => setCreando(true)}
            className="mt-3 bg-eco-800 text-white px-6 py-2 rounded-lg hover:bg-eco-700 transition"
          >
            ➕ Registra el primero
          </button>
        </div>
      ) : (
        <div className="overflow-x-auto bg-white rounded-2xl shadow-sm">
          <table className="w-full text-sm min-w-[600px]">
            <thead className="bg-gray-50 text-gray-500 text-xs uppercase">
              <tr>
                {['Descripción','Categoría','Cantidad','Estado','Fecha',''].map(h => (
                  <th key={h} className="px-4 py-3 text-left">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y">
              {residuos.map(r => (
                <tr key={r.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-3">{r.descripcion}</td>
                  <td className="px-4 py-3">{CATEGORIAS.find(c => c.value === r.categoria)?.label || r.categoria}</td>
                  <td className="px-4 py-3 font-bold text-eco-800">{r.cantidadKg || 0} kg</td>
                  <td className="px-4 py-3">
                    <span className={`px-2 py-1 rounded-full text-xs ${ESTADOS.find(e => e.value === r.estado)?.tw || 'bg-gray-100 text-gray-700'}`}>
                      {ESTADOS.find(e => e.value === r.estado)?.label || r.estado}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-gray-400">
                    {r.fechaRegistro ? new Date(r.fechaRegistro).toLocaleDateString('es-ES') : '-'}
                  </td>
                  <td className="px-4 py-3 flex gap-2">
                    <button onClick={() => setEditando(r)}>✏️</button>
                    <button onClick={() => setConfirmDelete(r.id)}>🗑️</button>
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
                className="bg-red-500 text-white px-5 py-2 rounded-lg hover:bg-red-600 transition"
              >
                Eliminar
              </button>
              <button
                onClick={() => setConfirmDelete(null)}
                className="bg-gray-100 text-gray-700 px-5 py-2 rounded-lg hover:bg-gray-200 transition"
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
