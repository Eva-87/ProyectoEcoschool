import { Schema, model } from "mongoose";

const ResiduoSchema = new Schema({
  tipo: { type: String, required: true }, // papel, plástico, orgánico, etc.
  cantidad: { type: Number, required: true }, // en kg o unidades
  fecha: { type: Date, default: Date.now },
  estado: { type: String, default: "pendiente" }, // pendiente, recogido, procesado
  aula: { type: String }, // opcional
});

export default model("Residuo", ResiduoSchema);
