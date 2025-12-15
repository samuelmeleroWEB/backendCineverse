import express from 'express'
import cors from 'cors'
import conexion from './config/db.config.js';
import authRoutes from './routes/auth.routes.js';
const app = express()
const PORT = process.env.PORT || 4000; // cogemos el puerto del punto .env o por defecto que use 4000


app.use(cors()); // permitira peticiones desde el front
app.use(express.json());
conexion()


// LOGIN Y REGISTRO
app.use('/auth', authRoutes)



app.listen(PORT, ()=>{
     console.log(`Servidor escuchando en http://localhost:${PORT}`);
})