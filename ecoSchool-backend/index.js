const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();

const residuosRoutes = require('./routes/residuos.routes');

app.use(cors());
app.use(express.json());

app.use('/api/residuos', residuosRoutes);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
});