export function uploadImage(req, res) {
  if (!req.file) {
    return res
      .status(400)
      .json({ message: "No se ha enviado ningún archivo" });
  }

  return res.status(201).json({ url: req.file.path });
}