import { Router } from "express";
import { getUsersController } from "../controllers/user.controller.js";
import { authMiddleware, isAdmin } from "../middlewares/auth.middleware.js";

const router = Router();

router.get('/',authMiddleware, isAdmin, getUsersController)


export default router;