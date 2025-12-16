import { Router } from "express";
import { upload } from "../middlewares/upload.middleware.js";
import { uploadImage } from "../controllers/upload.controller.js";

const router = Router();

// POST /uploads/image
router.post("/image", upload.single("file"), uploadImage);

export default router;
