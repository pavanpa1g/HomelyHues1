import { NextResponse } from "next/server";
import { connectedDb } from "@/helper/db";
import User from "@/models/user";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

connectedDb();

export async function POST(request) {
  const { name, email, password, role, phoneNumber } = await request.json();
  // console.log("request", await request.json());
  if (!name || !email || !password || role === undefined) {
    return NextResponse.json(
      { message: "Please fill all the fields" },
      { status: 400 }
    );
  }

  try {
    //checking for existing user
    let users = await User.findOne({
      email: { $regex: new RegExp(`^${email}$`, "i") },
    });
    if (users) {
      return NextResponse.json(
        { message: "User already exists" },
        { status: 401 }
      );
    }

    //creating new user and saving to db
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
      phoneNumber,
    });
    const createdUser = await newUser.save();

    const responseUser = {
      _id: createdUser._id,
      name: createdUser.name,
      email: createdUser.email,
      token: generateToken(createdUser._id),
      picture: createdUser.picture,
      role: createdUser.role,
      phoneNumber: createdUser.phoneNumber,
    };
    return NextResponse.json(responseUser, { status: 201 });
  } catch (error) {
    console.log("Error in register", error);
    return NextResponse.json(
      { message: "Something went wrong!" },
      { status: 500 }
    );
  }
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
