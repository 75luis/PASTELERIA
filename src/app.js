import express from "express";
import morgan from "morgan";
import cors from "cors"; // Importa el paquete cors
// import indexRoutes from "D:\ESCRITORIO\REST\express-basic-restapi\src\negocio\routes\index.js";
// import moviesRoutes from "D:\ESCRITORIO\REST\express-basic-restapi\src\negocio\routes\movies.js";
// import usersRoutes from "D:\ESCRITORIO\REST\express-basic-restapi\src\negocio\routes\users.js";

const app = express();

// Configuración de CORS
app.use(cors());

// ... (otras configuraciones)

// Rutas
app.use(indexRoutes);
app.use("/api/pedidos", moviesRoutes);

// Iniciar el servidor
app.listen(app.get("port"), () => {
  console.log(`Servidor en el puerto ${app.get("port")}`);
});
