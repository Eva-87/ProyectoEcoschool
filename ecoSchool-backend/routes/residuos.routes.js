const express = require('express');
const router = express.Router();
const pool = require('../config/db');

// GET: Listado de residuos y su estado [cite: 15, 87]
router.get('/', async (req, res) => {
  try {
    const result = await pool.query('SELECT * FROM residuos ORDER BY fecha DESC');
    res.json(result.rows);
  } catch (err) {
    res.status(500).json({ error: 'Error al obtener residuos' });
  }
});

// POST: Registro de residuos por tipo [cite: 14, 86]
router.post('/', async (req, res) => {
  const { tipo, cantidad, ubicacion } = req.body;
  
  // Validación y sanitización básica [cite: 44, 116]
  if (!tipo || !cantidad) {
    return res.status(400).json({ error: 'Faltan campos obligatorios' });
  }

  try {
    const query = 'INSERT INTO residuos (tipo, cantidad, ubicacion) VALUES ($1, $2, $3) RETURNING *';
    const result = await pool.query(query, [tipo, cantidad, ubicacion]);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).json({ error: 'Error al registrar residuo' });
  }
});

module.exports = router;