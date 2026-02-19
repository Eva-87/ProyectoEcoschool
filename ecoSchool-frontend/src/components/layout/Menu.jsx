import BtnPrimary from "./ButtonPrimary";
import { useState } from "react";
import { Link } from "react-router-dom";

function Menu() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header className="flex flex-col lg:flex-row items-center justify-around p-6 border-b-2 relative bg-white">
  
      <div className="flex justify-center items-center space-x-4 lg:w-1/3">
        <img
          src="../public/logo.png"
          alt="Logo de ECOSCHOOL"
          className="w-12 lg:w-16"
        />
        <h1 className="text-2xl lg:text-3xl font-bold text-green-500">
          ECOSCHOOL
        </h1>
      </div>

      <div className="absolute top-6 right-6 lg:hidden">
        <button
          className="text-3xl hover:text-amber-300"
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? "✖" : "☰"}
        </button>
      </div>

      <nav
        className={` bg-white lg:flex w-2/3 justify-around transition-all duration-300 ${
          isOpen ? "flex flex-col items-center" : "hidden"
        }`}
      >
        <ul className="flex flex-col lg:flex-row justify-around items-center w-full text-center lg:space-x-6 py-4 lg:py-0 text-2xl lg:text-xl">
          <Link to="/">
            <li className="my-2 lg:my-0">Inicio</li>
          </Link>

          <Link to="/residuos">
            <li className="my-2 lg:my-0">Registro</li>
          </Link>
          <Link to="/dashboard">
            <li className="my-2 lg:my-0">Estadísticas</li>
          </Link>
        </ul>
      </nav>
    </header>
  );
}

export default Menu;
