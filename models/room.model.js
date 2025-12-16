import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const roomSchema = new Schema(
  {
    name: { type: String, required: true, trim: true, unique: true },
    capacity: { type: Number, required: true, min: 1 },
    rows: { type: Number, default: 10 },   
    cols: { type: Number, default: 12 },   
  },
  { timestamps: true }
);

const Room = model('Room', roomSchema, 'Room');

export default Room;


