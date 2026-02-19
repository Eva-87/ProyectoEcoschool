import { Router } from "express";
import { obtenerResiduos, crearResiduo, actualizarResiduo, eliminarResiduo } from "../controllers/residuos.controller.js";

const router = Router();

router.get("/", obtenerResiduos);
router.post("/", crearResiduo);
router.put("/:id", actualizarResiduo);
router.delete("/:id", eliminarResiduo);

export default router;
