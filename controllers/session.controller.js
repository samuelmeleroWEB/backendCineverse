import Movie from "../models/movie.model.js";
import Room from "../models/room.model.js";
import {
  getSessionsByDateService,
  getSessionsByIdService,
  getSessionsService,
  postSessionService,
} from "../services/session.service.js";

export async function getSessionsController(req, res) {
  try {
    const sessions = await getSessionsService();
    return res.status(200).json(sessions);
  } catch (error) {
    console.error("Error en GET /sessions:", error);
    return res.status(500).json({ message: "Error al obtener sesiones" });
  }
}
export async function getSessionsByDateController(req, res) {
  try {
    const { date } = req.query;
    if (!date) {
      return res
        .status(400)
        .json({ message: "Falta el parámetro date (YYYY-MM-DD)" });
    }
    const sessions = await getSessionsByDateService(req);
    return res.status(200).json(sessions);
  } catch (error) {
    console.error("Error en GET /sessions/by-date:", error);
    return res
      .status(500)
      .json({ message: "Error al obtener sesiones por fecha" });
  }
}
export async function getSessionsByIdController(req, res) {
  try {
    const { id } = req.params;

    const session = await getSessionsByIdService(req)

    if (!session) {
      return res.status(404).json({ message: "Sesión no encontrada" });
    }

    return res.status(200).json(session);
  } catch (error) {
    console.error("Error en GET /sessions/:id:", error);
    return res.status(500).json({ message: "Error al obtener sesión" });
  }
}
// Admin
export async function postSessionController(req, res) {
  try {
    const { movieId, roomId, startTime, basePrice } = req.body;

    if (!movieId || !roomId || !startTime || !basePrice) {
      return res.status(400).json({ message: "Faltan campos obligatorios" });
    }

    // comprobar que la peli existe
    const movie = await Movie.findById(movieId);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada" });
    }

    // comprobar que la sala existe
    const room = await Room.findById(roomId);
    if (!room) {
      return res.status(404).json({ message: "Sala no encontrada" });
    }

    // la sesión empieza con todos los asientos disponibles
    const newSession = await postSessionService(req,room);

    return res.status(201).json({
      message: "Sesión creada correctamente",
      session: newSession,
    });
  } catch (error) {
    console.error("Error en POST /sessions:", error);
    return res.status(500).json({ message: "Error al crear sesión" });
  }
}
