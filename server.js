import express from 'express'
import cors from 'cors'
import path from "node:path";
import conexion from './config/db.config.js';
import authRoutes from './routes/auth.routes.js';
import movieRoutes from './routes/movie.routes.js'
import roomRoutes from './routes/room.routes.js'
import sessionRoutes from './routes/session.routes.js'
import bookingRoutes from './routes/booking.routes.js'
import usersRoutes from './routes/user.routes.js'
import uploadRoutes from './routes/upload.routes.js'
const app = express()
const PORT = process.env.PORT || 4000; // cogemos el puerto del punto .env o por defecto que use 4000


app.use(cors()); // permitira peticiones desde el front
app.use(express.json());
conexion()
app.use("/uploads", express.static(path.resolve("uploads")));
// LOGIN Y REGISTRO
app.use('/auth', authRoutes)

// Movies
app.use('/movies',movieRoutes )

// Rooms
app.use('/rooms', roomRoutes)

// Sessions
app.use('/sessions', sessionRoutes)

// Booking
app.use('/bookings', bookingRoutes)

// Users
app.use('/users', usersRoutes)
// Uploads
app.use("/uploads", uploadRoutes);
app.listen(PORT, ()=>{
     console.log(`Servidor escuchando en http://localhost:${PORT}`);
})