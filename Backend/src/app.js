import express from "express";
import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.routes.js";
import taksRoutes from "./routes/tasks.routes.js";
import tecnicosRoutes from "./routes/tecnico.routes.js";
import clientesRoutes from "./routes/cliente.routes.js";
import reparacionRoutes from "./routes/reparacion.routes.js";

import { FRONTEND_URL } from "./config.js";

const app = express();

app.use(
  cors({
    credentials: true,
    origin: FRONTEND_URL,
  }
)
);

app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api", taksRoutes);
app.use("/api", tecnicosRoutes);
app.use("/api", clientesRoutes);
app.use("/api", reparacionRoutes);
app.use(express.static("public"));



if (process.env.NODE_ENV === "production") {
  const path = await import("path");
  app.use(express.static("client/dist"));

  app.get("*", (req, res) => {
    console.log(path.resolve("client", "dist", "index.html") );
    res.sendFile(path.resolve("client", "dist", "index.html"));
  });
}

export default app;