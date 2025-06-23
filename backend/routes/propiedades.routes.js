const express = require("express");
const router = express.Router();
const propiedadesController = require("../controllers/propiedades.controller");

// Listar Propiedades
router.get("/", propiedadesController.getAllpropiedades);

// Crear nueva Propiedad
router.post("/", propiedadesController.createPropiedad);
//Filtro
router.get("/disponibles", propiedadesController.buscarPropiedadesDisponibles);
// Obtener imágenes de una Propiedad por ID
router.get("/filtrar", propiedadesController.filtrarPropiedades);
// Obtener una Propiedad por ID
router.get("/:id", propiedadesController.getPropiedadById);

// Actualizar una Propiedad por ID
router.put("/:id", propiedadesController.updatePropiedad);

// Eliminar una Propiedad por ID
router.delete("/:id", propiedadesController.deletePropiedad);

module.exports = router;
