const db = require("../models/db");
//obtener todas las propiedades
const getAllpropiedades = (req, res) => {
  db.query("SELECT * FROM propiedades", (err, results) => {
    if (err) {
      return res
        .status(500)
        .json({ error: "Error al obtener las propiedades" });
    }
    res.json(results);
  });
};
//obtener  propiedad por ID
const getPropiedadById = (req, res) => {
  const id = req.params.id;
  db.query("SELECT * FROM propiedades WHERE id = ?", [id], (err, results) => {
    if (err)
      return res.status(500).json({ error: "Error al obtener la propiedad" });
    if (results.length === 0) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }
    res.json(results[0]);
  });
};
//crear nueva propiedad
const createPropiedad = (req, res) => {
  const {
    id_usuario,
    titulo,
    descripcion,
    direccion,
    cant_habitaciones,
    cant_baños,
    capacidad_max,
    precio_noche,
    ubicacion,
  } = req.body;
  if (!id_usuario || !titulo || !capacidad_max || !precio_noche) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }
  const query = `
  INSERT INTO propiedades(id_usuario, titulo, descripcion, direccion, cant_habitaciones, cant_baños, capacidad_max, precio_noche,ubicacion)
  VALUES (?, ?, ?, ?, ?, ?, ?, ?,?)`;
  db.query(
    query,
    [
      id_usuario,
      titulo,
      descripcion,
      direccion,
      cant_habitaciones,
      cant_baños,
      capacidad_max,
      precio_noche,
      ubicacion,
    ],
    (err, results) => {
      if (err) {
        console.error("Error en query:", err); // <-- Acá imprimís el error en consola
        return res
          .status(500)
          .json({ error: "Error al crear la propiedad", detalle: err.message });
      }
      res.status(201).json({
        message: "Propiedad creada exitosamente",
        id: results.insertId,
      });
    }
  );
};

//Actualizar propiedad
const updatePropiedad = (req, res) => {
  const id = req.params.id;
  const {
    titulo,
    descripcion,
    direccion,
    cant_habitaciones,
    cant_baños,
    capacidad_max,
    precio_noche,
    ubicacion,
  } = req.body;

  const query = `
    UPDATE propiedades SET
    titulo = ?, descripcion = ?, direccion = ?, cant_habitaciones = ?, cant_baños = ?, capacidad_max = ?, precio_noche = ?,ubicacion = ?
    WHERE id = ?`;

  db.query(
    query,
    [
      titulo,
      descripcion,
      direccion,
      cant_habitaciones,
      cant_baños,
      capacidad_max,
      precio_noche,
      id,
      ubicacion,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Propiedad actualizada" });
    }
  );
};
//Eliminar propiedad
const deletePropiedad = (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM propiedades WHERE id = ?", [id], (err, result) => {
    if (err) return res.status(500).json({ error: err.message });
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Propiedad no encontrada" });
    }
    res.json({ message: "Propiedad eliminada" });
  });
};
//Exports
module.exports = {
  getAllpropiedades,
  getPropiedadById,
  createPropiedad,
  updatePropiedad,
  deletePropiedad,
};
