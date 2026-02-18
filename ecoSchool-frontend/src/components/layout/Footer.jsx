const Footer = () => {
    const currentYear = new Date().getFullYear();

    return (
        <footer className="w-full bg-green-950 border-t-2 border-green-600 shadow-[0_-10px_40px_rgba(34,197,94,0.25)] relative overflow-hidden">

            {/* Línea luminosa ecológica */}
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-green-400 to-transparent animate-pulse"></div>

            <div className="max-w-7xl mx-auto px-6 py-5">

                {/* Grid de contenido */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center md:text-left">

                    {/* Columna 1: Sobre EcoSchool */}
                    <div className="space-y-2">
                        <h3 className="text-green-400 font-extrabold text-xl tracking-wide drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                            EcoSchool 🌱
                        </h3>
                        <p className="text-green-200 text-sm leading-relaxed">
                            Plataforma educativa para registrar residuos, fomentar el reciclaje
                            y crear conciencia ambiental en el colegio.
                        </p>
                    </div>

                    {/* Columna 2: Enlaces rápidos */}
                    <div className="space-y-2">
                        <h3 className="text-green-400 font-extrabold text-lg tracking-wide drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                            Enlaces
                        </h3>
                        <ul className="space-y-1 text-green-100 text-sm">
                            <li>
                                <a href="/" className="hover:text-green-400 transition-colors duration-300 inline-block hover:translate-x-1">
                                    🏫 Inicio
                                </a>
                            </li>
                            <li>
                                <a href="/residuos" className="hover:text-green-400 transition-colors duration-300 inline-block hover:translate-x-1">
                                    ♻️ Registro de residuos
                                </a>
                            </li>
                            <li>
                                <a href="/dashboard" className="hover:text-green-400 transition-colors duration-300 inline-block hover:translate-x-1">
                                    📊 Estadísticas
                                </a>
                            </li>
                            <li>
                                <a href="/contacto" className="hover:text-green-400 transition-colors duration-300 inline-block hover:translate-x-1">
                                    ✉️ Contacto
                                </a>
                            </li>
                        </ul>
                    </div>

                    {/* Columna 3: Comunidad */}
                    <div className="space-y-2">
                        <h3 className="text-green-400 font-extrabold text-lg tracking-wide drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]">
                            Comunidad
                        </h3>

                        <div className="flex justify-center md:justify-start gap-4 text-green-400">

                            {/* Reciclaje */}
                            <span className="text-2xl hover:scale-110 transition">♻️</span>

                            {/* Árbol */}
                            <span className="text-2xl hover:scale-110 transition">🌳</span>

                            {/* Hoja */}
                            <span className="text-2xl hover:scale-110 transition">🍃</span>
                        </div>

                        <p className="text-green-300 text-xs italic mt-3">
                            "Pequeñas acciones diarias crean un planeta mejor."
                            <br />
                            <span className="text-green-400">— Comunidad EcoSchool</span>
                        </p>
                    </div>
                </div>

                {/* Línea inferior */}
                <div className="mt-6 pt-4 border-t border-green-800 text-center text-green-300 text-sm">
                    © {currentYear} EcoSchool. Educación ambiental para un futuro sostenible.
                </div>
            </div>
        </footer>
    );
};

export default Footer;


