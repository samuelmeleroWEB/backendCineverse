import { buildPublicFileUrl } from "../services/upload.service.js";

export function uploadImage(req, res) {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No se ha enviado ningún archivo" });
  }

  const fileUrl = buildPublicFileUrl(req, req.file.filename);
  return res.status(201).json({ url: fileUrl });
}
