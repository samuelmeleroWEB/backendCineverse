import mongoose from "mongoose";

export default async function connectDB() {
  const uri = process.env.MONGOURI;
  if (!uri) throw new Error("MONGOURI no está definido en el .env");

  // evita que las queries se queden “en cola” si Mongo cae
  mongoose.set("bufferCommands", false);

  // Logs útiles
  mongoose.connection.on("connected", () => console.log("✅ Mongo conectado"));
  mongoose.connection.on("disconnected", () => console.log("⚠️ Mongo desconectado"));
  mongoose.connection.on("error", (e) => console.error("❌ Mongo error:", e));

  await mongoose.connect(uri, {
    maxPoolSize: 20,
    minPoolSize: 5,

    // Para que no “se quede colgado” eternamente en momentos malos
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 20000,

    // En Atlas suele ayudar
    retryWrites: true,
  });

  console.log("🚀 Conexión a Mongo lista");
}
