const db = require("../models/db");
const path = require("path");
const fs = require("fs");

function getFechasEntre(inicio, fin) {
  const fechas = [];
  let current = new Date(inicio);
  const end = new Date(fin);

  while (current <= end) {
    fechas.push(current.toISOString().split("T")[0]); // formato YYYY-MM-DD
    current.setDate(current.getDate() + 1);
  }

  return fechas;
}
// Obtener todas las propiedades
const getAllpropiedades = (req, res) => {
  const query = `
    SELECT 
      p.*, 
      (SELECT url_imagen FROM imagenes_propiedad WHERE id_propiedad = p.id ORDER BY id LIMIT 1) AS portada
    FROM propiedades p
  `;

  db.query(query, (err, results) => {
    if (err) {
      console.error("Error al obtener propiedades:", err);
      return res
        .status(500)
        .json({ error: "Error al obtener las propiedades" });
    }

    // Agregamos la URL completa
    const propiedadesConUrl = results.map((prop) => ({
      ...prop,
      portada: prop.portada?.startsWith("data:image")
        ? prop.portada
        : `data:image/jpeg;base64,${prop.portada}` || "",
    }));

    res.json(propiedadesConUrl);
  });
};

// Obtener propiedad por ID
// Obtener propiedad con sus imágenes
const getPropiedadById = (req, res) => {
  const id = req.params.id;

  const propQuery = "SELECT * FROM propiedades WHERE id = ?";
  const imgQuery =
    "SELECT url_imagen FROM imagenes_propiedad WHERE id_propiedad = ?";

  db.query(propQuery, [id], (err, propResult) => {
    if (err)
      return res.status(500).json({ error: "Error al obtener la propiedad" });
    if (propResult.length === 0)
      return res.status(404).json({ error: "No encontrada" });

    db.query(imgQuery, [id], (err2, imgResults) => {
      if (err2)
        return res.status(500).json({ error: "Error al obtener imágenes" });

      const propiedad = propResult[0];
      propiedad.imagenes = imgResults.map((img) => {
        const raw = img.url_imagen || "";
        return raw.startsWith("data:image/")
          ? raw
          : `data:image/jpeg;base64,${raw}`;
      });

      res.json(propiedad);
    });
  });
};

// Crear nueva propiedad con imágenes
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
    imagenes = [],
    fecha_inicio_disponibilidad,
    fecha_fin_disponibilidad,
  } = req.body;

  if (!id_usuario || !titulo || !capacidad_max || !precio_noche) {
    return res.status(400).json({ error: "Faltan campos requeridos" });
  }

  const insertPropQuery = `
    INSERT INTO propiedades (id_usuario, titulo, descripcion, direccion, cant_habitaciones, cant_baños, capacidad_max, precio_noche, ubicacion)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)
  `;

  db.query(
    insertPropQuery,
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
    (err, result) => {
      if (err) {
        console.error("Error al insertar propiedad:", err);
        return res.status(500).json({ error: "Error al crear propiedad" });
      }

      const propiedadId = result.insertId;
      //insertar fechas
      if (fecha_inicio_disponibilidad && fecha_fin_disponibilidad) {
        const fechas = getFechasEntre(
          fecha_inicio_disponibilidad,
          fecha_fin_disponibilidad
        );

        const disponibilidadValues = fechas.map((f) => [propiedadId, f]);
        const insertDisponQuery = `INSERT INTO disponibilidad (id_propiedad, fecha) VALUES ?`;

        db.query(insertDisponQuery, [disponibilidadValues], (errDisp) => {
          if (errDisp) {
            console.error("Error al insertar disponibilidad:", errDisp);
            // No cortar, seguir igual
          } else {
            console.log("Fechas de disponibilidad insertadas");
          }
        });
      }
      if (!Array.isArray(imagenes) || imagenes.length === 0) {
        return res.status(201).json({
          message: "Propiedad creada sin imágenes",
          id: propiedadId,
        });
      }

      const insertImgQuery = `INSERT INTO imagenes_propiedad (id_propiedad, url_imagen) VALUES ?`;
      const values = imagenes.map((img) => [propiedadId, img]);

      db.query(insertImgQuery, [values], (errImg) => {
        if (errImg) {
          console.error("Error al insertar imágenes:", errImg);
          return res.status(500).json({
            error: "Propiedad creada, pero error al guardar imágenes",
            id: propiedadId,
          });
        }

        res.status(201).json({
          message: "Propiedad e imágenes guardadas con éxito",
          id: propiedadId,
        });
      });
    }
  );
};

// Actualizar propiedad
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
    titulo = ?, descripcion = ?, direccion = ?, cant_habitaciones = ?, cant_baños = ?, capacidad_max = ?, precio_noche = ?, ubicacion = ?
    WHERE id = ?
  `;

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
      ubicacion,
      id,
    ],
    (err, result) => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Propiedad actualizada" });
    }
  );
};

// Eliminar propiedad
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
const getImagenesByPropiedad = (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM imagenes_propiedad WHERE id_propiedad = ?",
    [id],
    (err, results) => {
      if (err) {
        return res.status(500).json({ error: "Error al obtener imágenes" });
      }

      res.json(results);
    }
  );
};
//Filtro
// Filtro por ubicación, fechas y cantidad de viajeros
const buscarPropiedadesDisponibles = (req, res) => {
  const { ubicacion, checkin, checkout, viajeros } = req.query;

  if (!ubicacion || !checkin || !checkout || !viajeros) {
    return res.status(400).json({ error: "Faltan parámetros de búsqueda" });
  }

  const query = `
    SELECT p.*, 
      (SELECT url_imagen FROM imagenes_propiedad WHERE id_propiedad = p.id LIMIT 1) AS portada
    FROM propiedades p
    WHERE p.ubicacion LIKE ?
      AND p.capacidad_max >= ?
      AND p.id NOT IN (
        SELECT d.id_propiedad
        FROM disponibilidad d
        WHERE d.fecha BETWEEN ? AND ? AND d.disponible = 0
        GROUP BY d.id_propiedad
      )
  `;

  db.query(
    query,
    [`%${ubicacion}%`, parseInt(viajeros), checkin, checkout],
    (err, results) => {
      if (err) {
        console.error("Error al buscar propiedades:", err);
        return res.status(500).json({ error: "Error al buscar propiedades" });
      }

      const propiedades = results.map((prop) => ({
        ...prop,
        portada: prop.portada?.startsWith("data:image")
          ? prop.portada
          : `data:image/jpeg;base64,${prop.portada}` || "",
      }));

      res.json(propiedades);
    }
  );
};
// Filtrar
const filtrarPropiedades = (req, res) => {
  const { ubicacion, checkin, checkout, viajeros } = req.query;

  if (!ubicacion || !checkin || !checkout || !viajeros) {
    return res.status(400).json({ error: "Faltan parámetros de búsqueda" });
  }

  // Creamos lista de fechas entre checkin y checkout
  const fechas = [];
  let current = new Date(checkin);
  const end = new Date(checkout);

  while (current <= end) {
    fechas.push(current.toISOString().split("T")[0]); // yyyy-mm-dd
    current.setDate(current.getDate() + 1);
  }

  // Construir placeholders (?, ?, ?, ...) según la cantidad de fechas
  const placeholders = fechas.map(() => "?").join(",");

  const sql = `
    SELECT DISTINCT p.*, 
      (SELECT url_imagen FROM imagenes_propiedad WHERE id_propiedad = p.id ORDER BY id LIMIT 1) AS portada
    FROM propiedades p
    JOIN disponibilidad d ON p.id = d.id_propiedad
    WHERE p.ubicacion LIKE ? 
      AND p.capacidad_max >= ?
      AND d.fecha IN (${placeholders})
      AND d.disponible = TRUE
    GROUP BY p.id
    HAVING COUNT(d.fecha) = ?
  `;

  const values = [
    `%${ubicacion}%`,
    parseInt(viajeros),
    ...fechas,
    fechas.length,
  ];

  db.query(sql, values, (err, results) => {
    if (err) {
      console.error("Error al filtrar propiedades:", err);
      return res.status(500).json({ error: "Error interno del servidor" });
    }

    const propiedadesConUrl = results.map((prop) => ({
      ...prop,
      portada: prop.portada?.startsWith("data:image")
        ? prop.portada
        : `data:image/jpeg;base64,${prop.portada}` || "",
    }));

    res.json(propiedadesConUrl);
  });
};

module.exports = {
  getAllpropiedades,
  getPropiedadById,
  createPropiedad,
  updatePropiedad,
  deletePropiedad,
  getImagenesByPropiedad,
  buscarPropiedadesDisponibles,
  filtrarPropiedades,
};
