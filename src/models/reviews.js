import mongoose from "mongoose";

let Review;

try {
  Review = mongoose.model("Review");
} catch (error) {
  const ReviewSchema = mongoose.Schema(
    {
      user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
      },
      hostel: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
        required: true,
      },
      rating: { type: Number, required: true },
      reviewText: { type: String, required: true },
    },
    {
      timestamps: true,
    }
  );
  Review = mongoose.model("Review", ReviewSchema);
}

export default Review;
