import User from "../models/user.model.js";
import { loginService, registerService } from "../services/auth.service.js";
import bcrypt from "bcrypt";


export async function registerController(req, res) {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña obligatorios" }); // por si faltan datos
    }

    const userExists = await User.findOne({ email }); // comprobamos si ya esta registrado
    if (userExists) {
      return res.status(400).json({ message: "El email ya está registrado" });
    }
    const newUser = await registerService({ email, password });

    return res.status(201).json({
      // aqui le mandamos respuesta al cliente
      message: "Usuario creado correctamente",
      user: {
        id: newUser._id,
        email: newUser.email,
        role: newUser.role,
      },
    });
  } catch (error) {
    // capturamos el error
    console.error("Error en /auth/register:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}

export async function loginController(req, res) {
  try {
    const { email, password } = req.body;
    //    si el email o la password no los pone enviaremos lo siguiente, importante el return para parar la funcion
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email y contraseña obligatorios" });
    }

    //  Buscamos el usuairo por email y  guardamos su valor, si no tiene email ponemos credenciales incorrectas
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }

    // Comparar la contraseña que llega con la cifrada de la BD, con el bcrypt.compare y si no es devolvemos error
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({ message: "Credenciales incorrectas" });
    }
    const token = await loginService(email);
    // Si todo va bien, respondemos con el codigo 200 y un json con el mensaje de login correcto, el token generado y luego info basica el usuario
    return res.status(200).json({
      message: "Login correcto",
      token,
      user: {
        id: user._id,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    // EL CATCH PARA CUALQUIER ERROR INESPERADO
    console.error("Error en /auth/login:", error);
    return res.status(500).json({ message: "Error en el servidor" });
  }
}
