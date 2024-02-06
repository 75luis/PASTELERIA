import express from "express";
import morgan from "morgan";
import cors from "cors"; // Importa el módulo cors

import indexRoutes from "./negocio/index.js";
import moviesRoutes from "./negocio/pedido.js";

const app = express();

// Configura cors
app.use(cors());


// settings
app.set("port", process.env.PORT || 4000);

// middlewares
app.use(morgan("dev"));
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// routes
app.use(indexRoutes);
app.use("/api/pedidos", moviesRoutes);

// starting the server
app.listen(app.get("port"), () => {
  console.log(`Server on port ${app.get("port")}`);
});
