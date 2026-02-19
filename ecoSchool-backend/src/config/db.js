import { Sequelize } from "sequelize";

export const sequelize = new Sequelize(
  "Reciclados",        // nombre de tu base de datos en pgAdmin
  "postgres",         // usuario por defecto
  "LajirafaLoca123",  // tu contraseña real
  {
    host: "localhost", // NO pongas "postgres"
    dialect: "postgres",
  }
);
