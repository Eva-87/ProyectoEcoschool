import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-green-800/95 backdrop-blur text-green-100 py-10">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 items-center gap-6">

        {/* IZQUIERDA — logo */}
        <div className="flex justify-center md:justify-start">
          <img
            src="../public/logo.jpg"
            alt="Logo EcoSchool"
            className="h-20 md:h-24 w-auto object-contain"
          />
        </div>

        {/* CENTRO — texto y navegación */}
        <div className="flex flex-col items-center text-center gap-4">

          <h2 className="text-2xl font-bold">EcoSchool 🌱</h2>

          <p className="text-green-200 text-sm max-w-md">
            Plataforma escolar para registrar residuos y fomentar la conciencia
            ambiental en la comunidad educativa.
          </p>

          <nav className="flex gap-6 flex-wrap justify-center">
            <Link to="/" className="hover:text-green-300 transition">
              Inicio
            </Link>

            <Link to="/residuos" className="hover:text-green-300 transition">
              Registro
            </Link>

            <Link to="/dashboard" className="hover:text-green-300 transition">
              Estadísticas
            </Link>
          </nav>

          <p className="text-xs text-green-300">
            © {new Date().getFullYear()} EcoSchool. Todos los derechos reservados.
          </p>
        </div>

        {/* DERECHA — espacio vacío para equilibrio visual */}
        <div className="hidden md:block" />
      </div>
    </footer>
  );
};

export default Footer;
