import { Router } from "express";
import { getRoomsController, postRoomController } from "../controllers/room.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";



const router = Router();




// GET /rooms  → listar salas (público)
router.get('/',getRoomsController)

// Admin
// POST /rooms  → crear sala (solo admin)
router.post('/', authMiddleware,isAdmin,postRoomController)
export default router