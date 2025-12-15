import bcrypt from "bcrypt";
import User from "../models/user.model.js";
import jwt from "jsonwebtoken";

export async function registerService(params) {
  const { email, password } = params; // aqui leemos lo que nos mandara postman, email y password

  const hashedPassword = await bcrypt.hash(password, 10); // ciframos la contraseña, 10 es el nivel de seguridad, es el mas estandar

  return await User.create({
    // guardamos el usuario nuevo con .create
    email,
    password: hashedPassword,
    role: "user",
  });
}

export async function loginService(email) {
  
  //  Buscamos el usuairo por email y  guardamos su valor
  const user = await User.findOne({ email });
  // Aqui vamos a crear el token, con el .sign  // recibe 3 parametros, payload= id y role, para luego leerlo en el middleware, segundo parametro, process...
  // es la clave que guardamos  en el .env, token al final sera algo tipo : eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: "1d", // aqui decimos el tiempo en el que expirara el token
    }
  );
}
