import mongoose from "mongoose";

let Booking;

try {
  Booking = mongoose.model("Booking");
} catch (error) {
  const BookingSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      room: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        required: true,
      },
      hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
        required: true,
      },
      checkInDateTime: { type: Date, required: true },
      checkOutDateTime: { type: Date, required: true },
      price: { type: Number, required: true },
      paymentStatus: { type: String, enum: ["Paid", "Due"], required: true },
    },
    {
      timestamps: true,
    }
  );
}

const bookingHistorySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookingID: { type: String, required: true },
  checkInDateTime: { type: Date, required: true },
  checkOutDateTime: { type: Date, required: true },
  roomNumber: { type: Number, required: true },
  bedNumber: { type: Number, required: true },
  hostelID: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel" },
});
