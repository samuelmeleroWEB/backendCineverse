import Room from "../models/room.model.js";
import { getRoomsService, postRoomService } from "../services/room.service.js";

export async function getRoomsController(req, res) {
    try {
    const rooms = await getRoomsService()
    return res.status(200).json(rooms);
  } catch (error) {
    console.error('Error en GET /rooms:', error);
    return res.status(500).json({ message: 'Error al obtener salas' });
  }
}

// Admin
export async function postRoomController(req, res){
     try {
    const { name, capacity } = req.body;

    if (!name || !capacity) {
      return res.status(400).json({ message: 'Nombre y capacidad son obligatorios' });
    }

    const existingRoom = await Room.findOne({ name });
    if (existingRoom) {
      return res.status(400).json({ message: 'Ya existe una sala con ese nombre' });
    }

    const newRoom = await postRoomService(req)

    return res.status(201).json({
      message: 'Sala creada correctamente',
      room: newRoom,
    });
  } catch (error) {
    console.error('Error en POST /rooms:', error);
    return res.status(500).json({ message: 'Error al crear sala' });
  }
}