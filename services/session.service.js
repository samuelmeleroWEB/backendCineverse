import Session from "../models/session.model.js";

// Public
export async function getSessionsService() {
  return await Session.find()
    .populate("movie")
    .populate("room")
    .sort({ startTime: 1 });
}
export async function getSessionsByDateService(req) {
  const { date } = req.query;
  const start = new Date(date);
  const end = new Date(date);
  end.setDate(end.getDate() + 1);
  // a end le modificamos la fecha para que al dia siguiente caduque
  return await Session.find({
    startTime: { $gte: start, $lt: end },
  })
    .populate("movie")
    .populate("room")
    .sort({ startTime: 1 });
}
export async function getSessionsByIdService(req) {
    const { id } = req.params;
    return await Session.findById(id)
      .populate("movie")
      .populate("room");
}

// Admin
export async function postSessionService(req,room) {
  const { movieId, roomId, startTime, basePrice } = req.body;

  // la sesión empieza con todos los asientos disponibles
  return await Session.create({
    movie: movieId,
    room: roomId,
    startTime,
    basePrice,
    availableSeats: room.capacity,
  });
}
