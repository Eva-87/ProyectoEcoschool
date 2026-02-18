import React from "react";
import { FaRecycle, FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-green-800 text-green-100 py-8">
      <div className="container mx-auto flex flex-col items-center justify-center gap-4">

        {/* Logo con icono */}
        <div className="flex items-center gap-2">
          <FaRecycle className="text-3xl text-green-300" />
          <h1 className="text-2xl font-bold">EcoSchool</h1>
        </div>

        {/* Descripción */}
        <p className="text-center text-green-200 text-sm md:text-base">
          Promoviendo el reciclaje en tu colegio 🌱
        </p>

        {/* Links de navegación */}
        <div className="flex flex-wrap justify-center gap-6 mt-2">
          <a href="/" className="hover:text-green-300 transition">Inicio</a>
          <a href="/residuos" className="hover:text-green-300 transition">Registro</a>
          <a href="/dashboard" className="hover:text-green-300 transition">Estadísticas</a>
          <a href="/contacto" className="hover:text-green-300 transition">Contacto</a>
        </div>

        {/* Redes sociales */}
        <div className="flex gap-6 mt-4">
          <a href="https://facebook.com" className="hover:text-green-300 transition">
            <FaFacebook size={24} />
          </a>
          <a href="https://twitter.com" className="hover:text-green-300 transition">
            <FaTwitter size={24} />
          </a>
          <a href="https://instagram.com" className="hover:text-green-300 transition">
            <FaInstagram size={24} />
          </a>
        </div>

        {/* Footer bottom */}
        <div className="mt-6 text-center text-green-200 text-sm">
          &copy; {new Date().getFullYear()} EcoSchool. Todos los derechos reservados.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
