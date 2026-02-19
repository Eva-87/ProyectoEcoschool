import { useEffect, useState } from 'react'
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts'
import { useResiduos } from '../hooks/useResiduos'
import { getResumenCategorias } from '../services/api'
import { CATEGORIAS, ESTADOS } from '../utils/constants'

export default function DashboardPage() {
  const { residuos, loading } = useResiduos()
  const [chartData, setChartData] = useState([])

  const totalKg = residuos.reduce((a, r) => a + r.cantidadKg, 0).toFixed(1)

  const porCategoria = CATEGORIAS.map(cat => ({
    ...cat,
    total: residuos
      .filter(r => r.categoria === cat.value)
      .reduce((s, r) => s + r.cantidadKg, 0)
      .toFixed(1),
    count: residuos.filter(r => r.categoria === cat.value).length,
  }))

  const porEstado = ESTADOS.map(est => ({
    ...est,
    count: residuos.filter(r => r.estado === est.value).length,
  }))

  useEffect(() => {
    getResumenCategorias()
      .then(({ data }) => {
        setChartData(data.map(item => ({
          name:  CATEGORIAS.find(c => c.value === item.categoria)?.label || item.categoria,
          kg:    item.totalKg,
          color: CATEGORIAS.find(c => c.value === item.categoria)?.color || '#8B5CF6',
        })))
      })
      .catch(() => {})
  }, [])

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 flex flex-col gap-6">
      <h1 className="text-3xl font-bold text-eco-800">📊 Dashboard</h1>

      {/* TOP STATS */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="bg-white rounded-2xl shadow-sm p-5 text-center border-t-4 border-eco-800">
          <p className="text-3xl font-bold text-eco-800">{loading ? '...' : residuos.length}</p>
          <p className="text-xs text-gray-400 mt-1">Total registros</p>
        </div>
        <div className="bg-white rounded-2xl shadow-sm p-5 text-center border-t-4 border-eco-800">
          <p className="text-3xl font-bold text-eco-800">{loading ? '...' : `${totalKg} kg`}</p>
          <p className="text-xs text-gray-400 mt-1">Total gestionado</p>
        </div>
        {porEstado.map(e => (
          <div key={e.value} className="bg-white rounded-2xl shadow-sm p-5 text-center border-t-4 border-gray-300">
            <p className="text-3xl font-bold text-gray-700">{loading ? '...' : e.count}</p>
            <p className="text-xs text-gray-400 mt-1">{e.label}</p>
          </div>
        ))}
      </div>

      {/* GRÁFICO */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📊 Volumen por categoría (kg)</h3>
        {chartData.length === 0 ? (
          <p className="text-center text-gray-400 py-12">Sin datos todavía. ¡Registra residuos!</p>
        ) : (
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData} margin={{ top: 5, right: 10, left: 0, bottom: 5 }}>
              <XAxis dataKey="name" tick={{ fontSize: 11 }} />
              <YAxis unit=" kg" tick={{ fontSize: 11 }} />
              <Tooltip formatter={v => [`${v} kg`, 'Total']} />
              <Bar dataKey="kg" radius={[6, 6, 0, 0]}>
                {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* DESGLOSE POR CATEGORÍA */}
      <div>
        <h2 className="text-base font-bold text-gray-700 mb-3">Desglose por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {porCategoria.map(cat => (
            <div
              key={cat.value}
              className="bg-white rounded-2xl shadow-sm p-4 flex flex-col gap-1"
              style={{ borderLeft: `4px solid ${cat.color}` }}
            >
              <span className="text-sm font-semibold text-gray-700">{cat.label}</span>
              <span className="text-2xl font-bold text-gray-900">{cat.total} kg</span>
              <span className="text-xs text-gray-400">{cat.count} registro(s)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}