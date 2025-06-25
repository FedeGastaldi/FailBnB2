const getImagenesByPropiedad = (req, res) => {
  const id = req.params.id;
  db.query(
    "SELECT url_imagen FROM imagenes_propiedad WHERE id_propiedad = ?",
    [id],
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Error al obtener imágenes" });
      res.json(results.map((row) => row.url_imagen));
    }
  );
};
