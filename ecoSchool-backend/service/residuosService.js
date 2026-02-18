const fs = require('fs');
const path = require('path');
// Esta línea define que el archivo se creará en la carpeta raíz del backend
const filePath = path.join(__dirname, '../datos.json');

const registrarResiduo = (req, res) => {
    const responsable = req.body.responsable || req.body.usuario;
    const { tipoResiduo, cantidad } = req.body;

    // 1. Crear el objeto con la información
    const nuevoRegistro = {
        id: Date.now(),
        responsable,
        tipoResiduo,
        cantidad,
        fecha: new Date().toLocaleString()
    };

    // 2. Leer registros anteriores si existen, o empezar de cero
    let datos = [];
    if (fs.existsSync(filePath)) {
        try {
            const contenido = fs.readFileSync(filePath, 'utf-8');
            datos = JSON.parse(contenido);
        } catch (e) {
            datos = [];
        }
    }

    // 3. AGREGAR Y GUARDAR (Esto es lo que crea el archivo)
    datos.push(nuevoRegistro);
    fs.writeFileSync(filePath, JSON.stringify(datos, null, 2));

    console.log("✅ Datos guardados en datos.json:", nuevoRegistro);

    res.status(201).json({ 
        message: '✅ Eco-School: Residuo registrado correctamente en el sistema',
        data: nuevoRegistro
    });
};

module.exports = { registrarResiduo };