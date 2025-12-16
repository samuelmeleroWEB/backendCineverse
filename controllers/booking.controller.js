import Session from "../models/session.model.js";
import {
  getMyBookingsService,
  postBookingService,
} from "../services/booking.service.js";

export async function postBookingController(req, res) {
  try {
    console.log("BODY /bookings:", JSON.stringify(req.body, null, 2)); //  LOG IMPORTANTE
    const { sessionId, seats, menus } = req.body;

    if (!sessionId || !seats || !Array.isArray(seats) || seats.length === 0) {
      return res
        .status(400)
        .json({ message: "sessionId y seats (array) son obligatorios" });
    }

    const session = await Session.findById(sessionId);
    if (!session) {
      return res.status(404).json({ message: "Sesión no encontrada" });
    }

    if (typeof session.availableSeats !== "number") {
      console.error("availableSeats no es un número en Session:", session);
      return res
        .status(500)
        .json({ message: "Configuración de sesión inválida" });
    }

    if (session.availableSeats < seats.length) {
      return res
        .status(400)
        .json({ message: "No hay suficientes asientos disponibles" });
    }

    const alreadyTaken = seats.some((seat) =>
      session.occupiedSeats.includes(seat)
    );

    if (alreadyTaken) {
      return res
        .status(400)
        .json({ message: "Alguna de las butacas ya está ocupada" });
    }

    const ticketsTotal = session.basePrice * seats.length;

    let menusTotal = 0;
    let menusNormalized = [];

    if (Array.isArray(menus) && menus.length > 0) {
      menusNormalized = menus
        .filter(
          (m) => m && typeof m.name === "string" && m.name.trim().length > 0
        )
        .map((m) => ({
          name: m.name.trim(),
          quantity:
            typeof m.quantity === "number" && m.quantity > 0 ? m.quantity : 1,
          pricePerUnit:
            typeof m.pricePerUnit === "number" && m.pricePerUnit >= 0
              ? m.pricePerUnit
              : 0,
        }));

      menusTotal = menusNormalized.reduce(
        (sum, m) => sum + m.pricePerUnit * m.quantity,
        0
      );
    }

    const totalPrice = ticketsTotal + menusTotal;

    const newBooking = await postBookingService(
      req,
      totalPrice,
      menusNormalized
    );

    session.occupiedSeats = [...session.occupiedSeats, ...seats];
    session.availableSeats -= seats.length;
    await session.save();

    return res.status(201).json({
      message: "Reserva creada correctamente",
      booking: newBooking,
    });
  } catch (error) {
    console.error("Error en POST /bookings:", error);
    return res.status(500).json({ message: "Error al crear la reserva" });
  }
}
export async function getMyBookingController(req, res) {
  try {
    const userId = req.user.id;
    const result = await getMyBookingsService(userId);

    return res.status(200).json(result);
  } catch (error) {
    console.error("Error en GET /bookings/my:", error);
    return;
  }
}
