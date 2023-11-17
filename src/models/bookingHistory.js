const bookingHistorySchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  bookingID: { type: String, required: true },
  checkInDateTime: { type: Date, required: true },
  checkOutDateTime: { type: Date, required: true },
  roomNumber: { type: Number, required: true },
  bedNumber: { type: Number, required: true },
  hostelID: { type: mongoose.Schema.Types.ObjectId, ref: "Hostel" },
});
