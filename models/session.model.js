import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const sessionSchema = new Schema(
  {
    movie: {
      type: Schema.Types.ObjectId,
      ref: 'Movie',       
      required: true,
    },
    room: {
      type: Schema.Types.ObjectId,
      ref: 'Room',         
      required: true,
    },
    startTime: {
      type: Date,          
      required: true,
    },
    basePrice: {
      type: Number,
      required: true,
    },
    availableSeats: {
      type: Number,
      required: true,
      min: 0,
    },
     occupiedSeats: {
      type: [String],  
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const Session = model('Session', sessionSchema, 'Session');

export default Session;
