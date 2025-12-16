import { Router } from "express";
import { getMyBookingController, postBookingController } from "../controllers/booking.controller.js";
import { authMiddleware } from "../middlewares/auth.middleware.js";


const router = Router();




// ---------- POST /bookings (crear reserva - usuario logueado)
router.post("/", authMiddleware, postBookingController)
router.get("/my", authMiddleware, getMyBookingController)
export default router;