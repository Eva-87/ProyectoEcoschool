import React, { useState } from 'react';
import './RegistroForm.css';
// Importamos el logo usando el nombre exacto con espacios de tu carpeta assets
import logoEcoSchool from '../assets/logo ECOSCHOOL.jpg'; 

const RegistroForm = () => {
  const [formData, setFormData] = useState({
    usuario: '',
    tipoResiduo: '',
    cantidad: '',
    descripcion: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Residuo registrado:", formData);
    alert(`¡Registro exitoso! Has registrado ${formData.cantidad}kg de ${formData.tipoResiduo}`);
  };

  return (
    <div className="registro-container">
      <div className="registro-card">
        <h2 className="registro-titulo">Registro de Residuos</h2>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label>Nombre del Responsable</label>
            <input 
              type="text" 
              name="usuario" 
              placeholder="Nombre del alumno o aula" 
              onChange={handleChange}
              required 
            />
          </div>

          <div className="input-group">
            <label>Tipo de Residuo</label>
            <select name="tipoResiduo" onChange={handleChange} required>
              <option value="">Selecciona una categoría...</option>
              <option value="Papel/Cartón">Caja 1: Papel y Cartón</option>
              <option value="Plástico">Caja 2: Envases y Plásticos</option>
              <option value="Orgánico">Caja 3: Residuos Orgánicos</option>
              <option value="Vidrio">Caja 4: Vidrio</option>
            </select>
          </div>

          <div className="input-group">
            <label>Cantidad (en kg)</label>
            <input 
              type="number" 
              name="cantidad" 
              step="0.1"
              placeholder="Ej: 1.5" 
              onChange={handleChange}
              required 
            />
          </div>

          <button type="submit" className="btn-registro">
            Registrar Residuo
          </button>
        </form>

        {/* Contenedor del logo al fondo de la tarjeta */}
       
      </div>
    </div>
  );
};

export default RegistroForm;