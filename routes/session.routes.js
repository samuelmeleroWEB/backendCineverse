import { Router } from "express"
import { getSessionsByDateController, getSessionsByIdController, getSessionsController, postSessionController } from "../controllers/session.controller.js"
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js"

const router= Router()



// Listado sesiones
router.get('/',getSessionsController)

// GET /sessions/by-date?date=YYYY-MM-DD
router.get('/by-date',getSessionsByDateController)

// ---------- GET /sessions/:id (detalle de una sesión)
router.get('/:id',getSessionsByIdController)

// Admin 
// ---------- POST /sessions (crear sesión - solo admin)
router.post('/', authMiddleware, isAdmin, postSessionController)

export default router