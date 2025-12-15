import { Router } from "express"; // nos permite crear como un mini servidor dentro del servidor
import {
  loginController,
  registerController,
} from "../controllers/auth.controller.js";

const router = Router(); // CREAMOS EL MINI ROUTER DE EXPRESS, ahora usaremos router.get , .post en vez de app.get

// ---------- REGISTRO DE USUARIO ---------- //

router.post("/register", registerController);

// ---------- LOGIN DE USUARIO ---------- //
router.post("/login", loginController);

export default router;
