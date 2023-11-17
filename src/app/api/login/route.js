import { NextResponse } from "next/server";
import { connectedDb } from "@/helper/db";
import User from "@/models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

connectedDb();

export async function POST(request) {
  const { email, password } = await request.json();
  if (!email || !password) {
    return NextResponse.json(
      { message: "Missing email or password" },
      { status: 401 }
    );
  }

  try {
    const user = await User.findOne({ email });
    if (!user) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) {
      return NextResponse.json(
        { message: "Invalid email or password" },
        { status: 400 }
      );
    }

    console.log("user", user);
    const responseUser = {
      _id: user._id,
      name: user.name,
      email: user.email,
      token: generateToken(user._id),
      picture: user.picture,
    };

    return NextResponse.json(responseUser, { status: 201 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};
