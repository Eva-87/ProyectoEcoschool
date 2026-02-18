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
          color: CATEGORIAS.find(c=>c.value===item.categoria)?.color || "#15803d" // verde oscuro
        })))
      }).catch(()=>{})
  },[]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-10 flex flex-col gap-8">

      {/* TÍTULO */}
      <h1 className="text-3xl font-bold text-black">📊 Dashboard</h1>

      {/* PANEL DE ALERTAS INTEGRADO */}
      <div className="max-w-4xl mx-auto p-6 rounded-2xl bg-green-800/90 backdrop-blur-md text-black shadow-lg">
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <FaExclamationTriangle className="text-yellow-500" /> Alertas activas
        </h2>

        {loadingAlertas && <p className="animate-pulse text-black/70">Cargando alertas...</p>}
        {!loadingAlertas && alertas.length === 0 && <p className="text-black/70">No hay alertas activas 🌱</p>}

        <ul className="space-y-3 mt-4">
          {alertas.map(a => (
            <li
              key={a.id}
              className="flex justify-between items-center bg-green-700/70 p-4 rounded-xl shadow-sm border border-green-600"
            >
              <span>{a.mensaje}</span>
              <button
                onClick={() => resolver(a.id)}
                className="flex items-center gap-2 px-3 py-1.5 rounded-lg bg-green-600 hover:bg-green-500 transition text-sm font-medium"
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
        {porEstado.map(e => <StatCard key={e.value} value={loading ? "..." : e.count} label={e.label} secondary />)}
      </div>

      {/* GRÁFICO DE CATEGORÍAS */}
      <div className="rounded-2xl p-6 bg-green-800/90 backdrop-blur-md text-black shadow-lg">
        <h3 className="text-lg font-bold mb-4">📊 Volumen por categoría (kg)</h3>
        {chartData.length===0 ? (
          <p className="text-center text-black/60 py-12">Sin datos todavía. ¡Registra residuos!</p>
        ):(
          <ResponsiveContainer width="100%" height={280}>
            <BarChart data={chartData}>
              <XAxis dataKey="name" tick={{fontSize:11, fill:'#000'}}/>
              <YAxis unit=" kg" tick={{fontSize:11, fill:'#000'}}/>
              <Tooltip formatter={v=>[`${v} kg`,'Total']} contentStyle={{backgroundColor:'#166534', border:'none', color:'#000'}}/>
              <Bar dataKey="kg" radius={[6,6,0,0]}>
                {chartData.map((entry,i)=> <Cell key={i} fill={entry.color} />)}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        )}
      </div>

      {/* DESGLOSE POR CATEGORÍA */}
      <div>
        <h2 className="text-lg font-bold text-black mb-4">Desglose por categoría</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {porCategoria.map(cat => (
            <div
              key={cat.value}
              className="rounded-2xl p-4 bg-green-700/80 backdrop-blur-md text-black shadow-lg"
              style={{borderLeft:`4px solid ${cat.color}`}}
            >
              <span className="text-sm font-semibold">{cat.label}</span>
              <span className="text-2xl font-bold">{cat.total} kg</span>
              <span className="text-xs text-black/70">{cat.count} registro(s)</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

/* Componente StatCard reutilizable */
function StatCard({value,label,secondary}) {
  return (
    <div className={`rounded-2xl p-5 text-center shadow-lg backdrop-blur-md
      ${secondary ? 'bg-green-700/80 text-black' : 'bg-green-800/90 text-black'}`}>
      <p className="text-3xl font-bold">{value}</p>
      <p className="text-xs text-black/70 mt-1">{label}</p>
    </div>
  )
}
