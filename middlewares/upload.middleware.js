import multer from "multer";
import path from "node:path";
import {
  getUploadFolder,
  ensureUploadFolderExists,
} from "../services/upload.service.js";

const uploadFolder = getUploadFolder();
ensureUploadFolderExists(uploadFolder);

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, uploadFolder);
  },
  filename: (_req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, `poster-${uniqueSuffix}${ext}`);
  },
});

export const upload = multer({
  storage,
  limits: {
    fileSize: 5 * 1024 * 1024, // 5MB
  },
});
