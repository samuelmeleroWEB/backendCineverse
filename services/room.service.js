import Room from "../models/room.model.js";



export  async function getRoomsService() {
    
    return await Room.find().sort({ name: 1 });
  
}

// Admin
export  async function postRoomService(req){
    // extraemos nombre y capacidad del body
    const { name, capacity } = req.body;
   return await Room.create({
      name,
      capacity,
    });
}