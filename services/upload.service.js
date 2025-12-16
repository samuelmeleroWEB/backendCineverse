import path from "node:path";
import fs from "node:fs";

export function getUploadFolder() {
  return path.resolve("uploads");
}

export function ensureUploadFolderExists(folderPath) {
  if (!fs.existsSync(folderPath)) {
    fs.mkdirSync(folderPath, { recursive: true });
  }
}

export function buildPublicFileUrl(req, filename) {
  return `${req.protocol}://${req.get("host")}/uploads/${filename}`;
}
