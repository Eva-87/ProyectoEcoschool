import { useEffect, useState } from "react";
import {
  BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell
} from "recharts";
import { useResiduos } from "../hooks/useResiduos";
import { useAlertas } from "../hooks/useAlertas";
import { getResumenCategorias } from "../services/api";
import { CATEGORIAS, ESTADOS } from "../utils/constants";
import { FaCheck, FaExclamationTriangle } from "react-icons/fa";

export default function DashboardPage() {
  const { residuos, loading } = useResiduos();
  const { alertas, loading: loadingAlertas, resolver } = useAlertas();
  const [chartData, setChartData] = useState([]);

  const totalKg = residuos.reduce((a,r) => a + Number(r.cantidadKg||0),0).toFixed(1);

  const porCategoria = CATEGORIAS.map(cat => ({
    ...cat,
    total: residuos.filter(r => r.categoria===cat.value).reduce((s,r)=>s+r.cantidadKg,0).toFixed(1),
    count: residuos.filter(r => r.categoria===cat.value).length
  }));

  const porEstado = ESTADOS.map(est => ({
    ...est,
    count: residuos.filter(r=>r.estado===est.value).length
  }));

  useEffect(() => {
    getResumenCategorias()
      .then(({data}) => {
        setChartData(data.map(item => ({
          name: CATEGORIAS.find(c=>c.value===item.categoria)?.label || item.categoria,
          kg: item.totalKg,
          color: CATEGORIAS.find(c=>c.value===item.categoria)?.color || "#15803d"
        })))
      }).catch(()=>{})
  },[]);

  return (
    <div className="relative min-h-screen">

      {/* ===== Fondo: misma imagen que el footer ===== */}
      <div
        className="fixed inset-0 -z-10 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('../public/vertical-high-angle-closeup-shot-green-leaf-fallen-ground-with-waterdrops-surface.jpg')" }}
      />
      {/* Overlay degradado verde, igual que el footer */}
      <div className="fixed inset-0 -z-10 bg-green-950/50" />

      {/* ===== Contenido ===== */}
      <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">

        {/* TÍTULO */}
        <h1 className="text-3xl font-bold text-white drop-shadow">📊 Dashboard</h1>

        {/* PANEL DE ALERTAS INTEGRADO */}
        <div className="max-w-4xl mx-auto w-full p-6 rounded-2xl bg-green-800/90 backdrop-blur-md text-white shadow-lg">
          <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
            <FaExclamationTriangle className="text-yellow-400" /> Alertas activas
          </h2>

          {loadingAlertas && <p className="animate-pulse text-green-200">Cargando alertas...</p>}
          {!loadingAlertas && alertas.length === 0 && (
            <p className="text-green-200">No hay alertas activas 🌱</p>
          )}

          <ul className="space-y-3 mt-4">
            {alertas.map(a => (
              <li
                key={a.id}
                className="flex justify-between items-center bg-green-700/70 p-4 rounded-xl shadow-sm border border-green-600"
              >
                <span className="text-white">{a.mensaje}</span>
                <button
                  onClick={() => resolver(a.id)}
                  className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 transition text-sm font-medium text-white"
                >
                  <FaCheck /> Resolver
                </button>
              </li>
            ))}
          </ul>
        </div>

        {/* ESTADÍSTICAS */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <StatCard value={loading ? "..." : residuos.length} label="Total registros" />
          <StatCard value={loading ? "..." : `${totalKg} kg`} label="Total gestionado" />
          {porEstado.map(e => (
            <StatCard key={e.value} value={loading ? "..." : e.count} label={e.label} secondary />
          ))}
        </div>

        {/* GRÁFICO DE CATEGORÍAS */}
        <div className="rounded-2xl p-6 bg-green-800/90 backdrop-blur-md text-white shadow-lg">
          <h3 className="text-lg font-bold mb-4">📊 Volumen por categoría (kg)</h3>
          {chartData.length === 0 ? (
            <p className="text-center text-green-200 py-12">Sin datos todavía. ¡Registra residuos!</p>
          ) : (
            <ResponsiveContainer width="100%" height={280}>
              <BarChart data={chartData}>
                <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#d1fae5' }} />
                <YAxis unit=" kg" tick={{ fontSize: 11, fill: '#d1fae5' }} />
                <Tooltip
                  formatter={v => [`${v} kg`, 'Total']}
                  contentStyle={{ backgroundColor: '#166534', border: 'none', color: '#fff' }}
                />
                <Bar dataKey="kg" radius={[6, 6, 0, 0]}>
                  {chartData.map((entry, i) => <Cell key={i} fill={entry.color} />)}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          )}
        </div>

        {/* DESGLOSE POR CATEGORÍA */}
        <div>
          <h2 className="text-lg font-bold text-white drop-shadow mb-4">Desglose por categoría</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {porCategoria.map(cat => (
              <div
                key={cat.value}
                className="rounded-2xl p-4 bg-green-700/80 backdrop-blur-md text-white shadow-lg flex flex-col gap-1"
                style={{ borderLeft: `4px solid ${cat.color}` }}
              >
                <span className="text-sm font-semibold text-green-100">{cat.label}</span>
                <span className="text-2xl font-bold">{cat.total} kg</span>
                <span className="text-xs text-green-300">{cat.count} registro(s)</span>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}

/* Componente StatCard reutilizable */
function StatCard({ value, label, secondary }) {
  return (
    <div className={`rounded-2xl p-5 text-center shadow-lg backdrop-blur-md
      ${secondary ? 'bg-green-700/80 text-white' : 'bg-green-800/90 text-white'}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-xs text-green-300 mt-1">{label}</p>
    </div>
  );
}
