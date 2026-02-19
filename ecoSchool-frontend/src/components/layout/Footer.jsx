import { Link } from "react-router-dom";
import {
    FaFacebookF,
    FaInstagram,
    FaHome,
    FaRecycle,
    FaChartBar,
} from "react-icons/fa";
import { SiX } from "react-icons/si";

const Footer = () => {
    const navItems = [
        { to: "/", label: "Inicio", icon: FaHome },
        { to: "/residuos", label: "Registro", icon: FaRecycle },
        { to: "/dashboard", label: "Estadísticas", icon: FaChartBar },
    ];

    return (
        <footer className="relative overflow-hidden text-green-100 pt-20 pb-14 shadow-xl">

            {/* ===== Onda ecológica superior ===== */}
            <div className="absolute top-0 left-0 w-full overflow-hidden leading-none rotate-180">
                <svg
                    className="relative block w-[calc(100%+1.3px)] h-16 animate-pulse"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 1200 120"
                    preserveAspectRatio="none"
                >
                    <path
                        d="M321.39 56.44c58-10.79 114.16-30.13 172-41.86C584.67-1.67 642.16 3.68 700 14.05c57.84 10.37 113.91 27.86 172 36.29 58.09 8.43 120.34 6.61 178-6.73V0H0v27.35a600.21 600.21 0 00321.39 29.09z"
                        className="fill-green-900/90"
                    />
                </svg>
            </div>

            {/* ===== Imagen de fondo ===== */}
            <div
                className="absolute inset-0 bg-cover bg-center"
                style={{ backgroundImage: "url('../fondo-footer2.jpg')" }}
            />

            {/* Overlay verde suave para no tapar la imagen */}
            <div className="absolute inset-0 bg-green-900/60 backdrop-blur-[2px]" />

            {/* ===== Contenido en 3 columnas iguales ===== */}
            <div className="relative max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-3 gap-8 items-center">

                {/* COLUMNA 1 — Texto */}
                <div className="flex flex-col items-center md:items-start text-center md:text-left gap-4">
                    <h2 className="text-3xl md:text-4xl font-bold tracking-wide">
                        EcoSchool 🌱
                    </h2>

                    <p className="text-base md:text-lg text-green-200 max-w-sm">
                        Plataforma escolar para registrar residuos y fomentar la conciencia
                        ambiental en la comunidad educativa.
                    </p>

                    <p className="text-sm text-green-300">
                        © {new Date().getFullYear()} EcoSchool
                    </p>
                </div>

                {/* COLUMNA 2 — LOGO CENTRAL */}
                {/* COLUMNA 2 — LOGO CENTRAL */}
                <div className="flex justify-center">
                    <img
                        src="/logo.png"
                        alt="Logo EcoSchool"
                        className="h-44 md:h-52 w-auto object-contain transition-transform duration-500 hover:scale-110"
                    />
                </div>


                {/* COLUMNA 3 — Navegación + redes */}
                <div className="flex flex-col items-center md:items-end gap-5">

                    <nav className="flex flex-col gap-3 text-lg md:text-xl font-medium">
                        {navItems.map(({ to, label, icon: Icon }, i) => (
                            <Link
                                key={i}
                                to={to}
                                className="flex items-center gap-2 group hover:text-green-300 transition"
                            >
                                <Icon className="text-xl" />
                                {label}
                                <span className="block h-0.5 w-0 bg-green-300 transition-all duration-300 group-hover:w-full" />
                            </Link>
                        ))}
                    </nav>

                    {/* Redes sociales */}
                    <div className="flex gap-6 text-2xl md:text-3xl">
                        {[FaFacebookF, SiX, FaInstagram].map((Icon, idx) => (
                            <a
                                key={idx}
                                href="#"
                                className="transition transform hover:scale-125 hover:-translate-y-1 hover:text-green-300"
                            >
                                <Icon />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;

