import { Link } from "react-router-dom";
import { useResiduos } from "../hooks/useResiduos";
import { useAlertas } from "../hooks/useAlertas";
import Menu from "../components/layout/Menu";

export default function HomePage() {
  const { residuos, loading } = useResiduos();
  const { alertas, resolver } = useAlertas();

  const totalKg = residuos.reduce((a, r) => a + r.cantidadKg, 0).toFixed(1);
  const pendientes = residuos.filter((r) => r.estado === "PENDIENTE").length;
  const recogidos = residuos.filter((r) => r.estado === "RECOGIDO").length;

  const stats = [
    {
      label: "Registros totales",
      value: residuos.length,
      border: "border-eco-800",
    },
    {
      label: "Total registrado",
      value: `${totalKg} kg`,
      border: "border-eco-800",
    },
    {
      label: "Pendientes de recogida",
      value: pendientes,
      border: "border-yellow-400",
    },
    { label: "Recogidos", value: recogidos, border: "border-green-500" },
  ];

  return (
    <div className="max-w-5xl mx-auto flex flex-col gap-8">
      <Menu />
      {/* HERO */}
      <section className="rounded-2xl p-12 text-center bg-[url('./public/bannerBackground.jpg')] bg-cover bg-center bg-no-repeat relative">
      <div className="absolute inset-0 bg-black/60"></div>
      <div className="relative z-33333">
        <h1 className="text-4xl font-bold text-eco-800 mb-2 text-white">
          🌿 EcoSchool
        </h1>
        <p className="text-lg mb-6 text-white">
          Gestión inteligente de residuos escolares
        </p>
        <Link
          to="/residuos"
          className="inline-block bg-eco-800 text-white font-semibold px-8 py-3 rounded-xl hover:bg-eco-700 transition-colors bg-green-500"
        >
          ➕ Registrar residuo
        </Link>
        </div>
      </section>

      {/* ALERTAS */}
      {alertas.length > 0 && (
        <section className="bg-yellow-50 border border-yellow-300 rounded-2xl p-5">
          <h2 className="text-base font-bold text-yellow-800 mb-3">
            🔔 Alertas activas ({alertas.length})
          </h2>
          <div className="flex flex-col gap-2">
            {alertas.map((a) => (
              <div
                key={a.id}
                className="flex items-center justify-between bg-white rounded-xl px-4 py-3 gap-4"
              >
                <span className="text-sm text-yellow-900 font-medium">
                  {a.mensaje}
                </span>
                <button
                  onClick={() => resolver(a.id)}
                  className="text-xs font-bold bg-yellow-400 hover:bg-yellow-500 text-yellow-900 px-3 py-1.5 rounded-lg whitespace-nowrap transition-colors"
                >
                  ✓ Resolver
                </button>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* STATS */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-4 p-4">
        {stats.map((s) => (
          <div
            key={s.label}
            className={`bg-white rounded-2xl shadow-sm p-5 flex flex-col items-center gap-1 border-t-4 ${s.border}`}
          >
            <span className="text-3xl font-bold text-eco-800">
              {loading ? "..." : s.value}
            </span>
            <span className="text-xs text-gray-400 text-center">{s.label}</span>
          </div>
        ))}
      </section>

      {/* ACCESO RÁPIDO */}
      <section className="p-4">
        <h2 className="text-base font-bold text-gray-700 mb-3">
          Acceso rápido
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Link
            to="/residuos"
            className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-1 hover:border-eco-800 hover:bg-eco-50 transition-colors group"
          >
            <span className="text-3xl">♻️</span>
            <strong className="text-gray-800 group-hover:text-eco-800">
              Ver residuos
            </strong>
            <span className="text-xs text-gray-400">
              Listado completo con filtros y registro
            </span>
          </Link>
          <Link
            to="/dashboard"
            className="bg-white border border-gray-200 rounded-2xl p-5 flex flex-col gap-1 hover:border-eco-800 hover:bg-eco-50 transition-colors group"
          >
            <span className="text-3xl">📊</span>
            <strong className="text-gray-800 group-hover:text-eco-800">
              Dashboard
            </strong>
            <span className="text-xs text-gray-400">
              Gráficos y métricas por categoría
            </span>
          </Link>
        </div>
      </section>
    </div>
  );
}
