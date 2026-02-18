import Residuo from "../models/Residuo.js";

export const obtenerResiduos = async (req, res) => {
  const residuos = await Residuo.find();
  res.json(residuos);
};

export const crearResiduo = async (req, res) => {
  const nuevo = new Residuo(req.body);
  await nuevo.save();
  res.json(nuevo);
};

export const actualizarResiduo = async (req, res) => {
  const actualizado = await Residuo.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(actualizado);
};

export const eliminarResiduo = async (req, res) => {
  await Residuo.findByIdAndDelete(req.params.id);
  res.json({ message: "Residuo eliminado" });
};
