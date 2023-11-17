import mongoose from "mongoose";

let User;

try {
  // Check if the model already exists, and if not, define it.
  User = mongoose.model("User");
} catch (error) {
  const userSchema = mongoose.Schema(
    {
      role: { type: Boolean, required: true }, //ture = provider  //false= user
      name: { type: String, required: true },
      dateOfBirth: { type: Date },
      gender: { type: String },
      phoneNumber: { type: String },
      email: { type: String, required: true, unique: true },
      password: { type: String, required: true },
      picture: {
        type: String,
        default:
          "https://icon-library.com/images/anonymous-avatar-icon/anonymous-avatar-icon-25.jpg",
      },
    },
    {
      timestamps: true,
    }
  );

  User = mongoose.model("User", userSchema);
}

export default User;
