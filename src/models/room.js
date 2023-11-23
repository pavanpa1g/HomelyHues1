import mongoose from "mongoose";

let Room;

try {
  Room = mongoose.model("Room");
} catch (error) {
  const RoomSchema = mongoose.Schema(
    {
      hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
        required: true,
      },
      roomNumber: { type: Number, required: true },
      capacity: { type: Number, required: true },
      occupiedBy: [
        {
          user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true,
          },
          booking: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Booking",
            required: true,
          },
        },
      ],
      price: { type: Number, required: true },
      floorNumber: { type: Number },
    },
    {
      timestamps: true,
    }
  );

  Room = mongoose.model("Room", RoomSchema);
}

export default Room;
