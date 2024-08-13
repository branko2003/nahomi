import { Router } from "express"; // importar para crear enrutador con esto creamos funciones post put delete
import {
  login,
  logout,
  register,
  verifyToken,
} from "../controllers/auth.controller.js";
import { validateSchema } from "../middlewares/validator.middleware.js";
import { loginSchema, registerSchema } from "../schemas/auth.shema.js";
//import { authRequired } from "../middlewares/validateToken.js";

const router = Router();

router.post("/register", validateSchema(registerSchema), register);
router.post("/login", validateSchema(loginSchema), login);
router.get("/verify", verifyToken);
router.post("/logout", verifyToken, logout);
//router.get("/profile", authRequired, profile);

export default router;