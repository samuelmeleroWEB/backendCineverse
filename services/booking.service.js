import Booking from "../models/booking.model.js";

export async function postBookingService(req, totalPrice, menusNormalized) {
  const { sessionId, seats } = req.body;
  return await Booking.create({
    user: req.user.id,
    session: sessionId,
    tickets: seats.length,
    seats,
    totalPrice,
    menus: menusNormalized,
  });
}

export async function getMyBookingsService(userId) {
  const bookings = await Booking.find({ user: userId })
    .populate({
      path: "session",
      populate: [{ path: "movie" }, { path: "room" }],
    })
    .sort({ createdAt: -1 });
  const now = new Date();
  // Nos quedamos solo con reservas cuya sesión es futura (o igual a "ahora")
  const upcoming = bookings.filter((b) => {
    const start = b.session?.startTime;
    if (!start) return false;
    return new Date(start).getTime() >= now.getTime();
  });
  return upcoming.map((b) => ({
    id: b._id.toString(),
    createdAt: b.createdAt,
    seats: b.seats,
    movieTitle: b.session?.movie?.title ?? "Título no disponible",
    sessionDateTime: b.session?.startTime ?? null,
    roomName: b.session?.room?.name ?? "Sala",
    menus:
      b.menus?.map((m) => ({
        name: m.name,
        quantity: m.quantity,
        pricePerUnit: m.pricePerUnit,
      })) ?? [],
  }));
}
