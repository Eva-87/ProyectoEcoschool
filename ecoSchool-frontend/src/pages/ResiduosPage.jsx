import { useState } from "react";
import { Weight, MapPin } from "lucide-react";
import Menu from "../components/layout/Menu"

const tiposResiduos = [
  { id: 1, nombre: "Plástico", icono: "♻️" },
  { id: 2, nombre: "Papel", icono: "📄" },
  { id: 3, nombre: "Orgánico", icono: "🍃" },
  { id: 4, nombre: "Vidrio", icono: "🍷" },
];

function ResiduosPage() {
  const [tipoSeleccionado, setTipoSeleccionado] = useState(null);
  const [peso, setPeso] = useState("");
  const [ubicacion, setUbicacion] = useState("Cafetería");

  const submit = (e) => {
    e.preventDefault();

    if (!tipoSeleccionado || Number(peso) <= 0) {
      alert("Completa todos los campos correctamente");
      return;
    }

    const nuevoResiduo = {
      tipo: tipoSeleccionado,
      peso,
      ubicacion,
      fecha: new Date(),
    };

    console.log("Residuo registrado:", nuevoResiduo);
    alert("Residuo registrado correctamente");
  };

  return (
    <>
      <Menu />
      <div
        className="flex justify-center p-4 flex-1 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('../public/fondo-dashboard.jpg')" }}
      >

        <div className="w-full max-w-3xl bg-white/80 backdrop-blur-md p-6 rounded-2xl shadow-lg">
          <h1>Registrar Residuo</h1>

          <h2 className="text-xl mb-4">¿Qué estás reciclando?</h2>

          <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
            {tiposResiduos.map((tipo) => (
              <div
                key={tipo.id}
                className={`border-2 border-green-500 p-4 flex justify-center w-full rounded-xl ${tipoSeleccionado === tipo.nombre ? "activo" : ""}`}
                onClick={() => setTipoSeleccionado(tipo.nombre)}
              >
                <div className="mr-4">{tipo.icono}</div>
                <p>{tipo.nombre}</p>
              </div>
            ))}
          </div>

          <form onSubmit={submit} className="mt-6">
            <h2 className="text-xl mb-4">Detalles del residuo</h2>
            <div className="flex flex-col bg-gray-200 p-4 rounded-xl lg:flex-row items-center">
              <label className="opacity-50 mb-4 lg:mb-0 mr-4">
                Peso estimado (kg)
              </label>

              <div className="flex justify-center items-center">
                <Weight size={25} color="#00c853" />
                <input
                  type="number"
                  value={peso}
                  className="border-2 p-2 ml-4"
                  onChange={(e) => setPeso(e.target.value)}
                  min="0"
                  step="0.01"
                  placeholder="0.0"
                />
              </div>
            </div>

            <div className="mt-6 p-4">
              <h2 className="mb-4 text-xl">Ubicación</h2>
              <div className="flex justify-center items-center border-2 border-green-500 rounded-xl p-2">
                <label htmlFor="ubicacion">
                  <MapPin size={25} color="#00c853" />
                </label>

                <select
                  id="ubicacion"
                  value={ubicacion}
                  className="w-full ml-4 p-2 focus:outline-none focus:ring-0"
                  onChange={(e) => setUbicacion(e.target.value)}
                >
                  <option>Cafetería</option>
                  <option>Patio</option>
                  <option>Aula</option>
                  <option>Biblioteca</option>
                </select>
              </div>
            </div>
            <div className="flex justify-center">
              <button
                type="submit"
                className="bg-green-500 p-4 rounded-xl w-full lg:w-auto"
              >
                Registrar Residuo
              </button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}

export default ResiduosPage;
