const express = require("express");
const reservasRoutes = require("./routes/reservas.routes");

const app = express();
app.use(express.json());

app.use("/api/reservas", reservasRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
