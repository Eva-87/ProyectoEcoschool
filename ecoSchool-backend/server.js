const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

// Middlewares: Permitir CORS para que React (puerto 5173) pueda conectarse
app.use(cors());
app.use(express.json());

// Importar el servicio
const { registrarResiduo } = require('./service/residuosService');

// Definición de la ruta para el formulario
app.post('/api/residuos', registrarResiduo);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`🚀 Servidor Eco-School corriendo en puerto ${PORT}`);
});