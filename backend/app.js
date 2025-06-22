const express = require("express");
const cors = require("cors"); //Error de CORS
const reservasRoutes = require("./routes/reservas.routes");

const app = express();
// Solucionar el proble de de CORS
app.use(
  cors({
    origin: "http://localhost:5173", // permite al fornt acceder
    credentials: true,
  })
);

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));

app.use("/api/reservas", reservasRoutes);

app.listen(3000, () => {
  console.log("Servidor corriendo en http://localhost:3000");
});
const propiedadesRoutes = require("./routes/propiedades.routes");
app.use("/api/propiedades", propiedadesRoutes);

const authRoutes = require("./routes/auth.routes");
app.use("/api/auth", authRoutes);
