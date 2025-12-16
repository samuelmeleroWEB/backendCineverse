import User from "../models/user.model.js";

export async function getUsersService() {
    return await User.find().sort({ createdAT:-1 }); 
    // con el .sort({createdAT:-1}) es para que las ordene por fecha de creacion
}