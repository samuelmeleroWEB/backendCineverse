import mongoose from "mongoose";

const { Schema, model } = mongoose;

const menuSchema = new Schema(
  {
    name: { type: String, required: true },
    quantity: { type: Number, required: true },
    pricePerUnit: { type: Number, required: true },
  },
  { _id: false } 
);

const bookingSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    session: { type: Schema.Types.ObjectId, ref: "Session", required: true },
    tickets: { type: Number, required: true },
    seats: [{ type: String, required: true }],
    totalPrice: { type: Number, required: true },
    menus: { type: [menuSchema], default: [] }, // 
  },
  { timestamps: true }
);

const Booking = model("Booking", bookingSchema);
export default Booking;

