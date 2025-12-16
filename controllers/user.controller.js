import { getUsersService } from "../services/user.service.js";


export async function getUsersController(req, res){
try {
    const users = await getUsersService()
    return res.status(200).json(users);
    
  } catch (error) { 
    console.error('Error en GET /users:', error);
    return res.status(500).json({ message: 'Error al obtener usuarios' });
  }
}