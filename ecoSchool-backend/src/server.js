import express from "express";
import cors from "cors";
import { sequelize } from "./config/db.js";   // Importa tu conexión a PostgreSQL
import residuosRoutes from "./routes/residuos.routes.js";

const app = express();

app.use(cors());
app.use(express.json());

// Conexión a PostgreSQL
sequelize.authenticate()
  .then(() => {
    console.log("PostgreSQL conectado");
    return sequelize.sync(); // crea tablas si no existen
  })
  .then(() => console.log("Tablas sincronizadas"))
  .catch(err => console.error("Error al conectar PostgreSQL:", err));

// Rutas
app.use("/api/residuos", residuosRoutes);

app.listen(3000, () => {
  console.log("Servidor escuchando en http://localhost:3000");
});
