const db = require("../models/db");
const getReservas = (req, res) => {
  db.query("SELECT * FROM reservas", (err, results) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(results);
  });
};
module.exports = { getReservas };
