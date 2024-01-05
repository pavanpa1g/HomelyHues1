import { NextResponse } from "next/server";

import jwt from "jsonwebtoken";
import { connectedDb } from "@/helper/db";
import Hostel from "@/models/hostel";
import User from "@/models/user";

connectedDb();

export async function GET(request, { params }) {
  //   const cookiesStore = cookies();
  //   console.log(cookiesStore.get("jwt_token").value);
  //   const token = cookiesStore.get("jwt_token").value;
  //   const token =
  //     "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY1NTg5Y2E1Yzc2M2E4OGI5Y2M0MzI5ZiIsImlhdCI6MTcwMDczOTU5NSwiZXhwIjoxNzAzMzMxNTk1fQ.7ctq90MzGckY_hoJ7jjhhCV-_0Jwbyw0x9Pt9nwxylc";
  //   console.log("id", getIdFromToken(token));

  const { id } = params;

  try {
    const response = await Hostel.findById({ _id: id }).populate(
      "owner",
      "-password"
    );
    return NextResponse.json(response, { status: 201 });
  } catch (error) {
    console.log(error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }

  return NextResponse.json({ message: "hello" });
}

const getIdFromToken = (token) => {
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded.id;
  } catch (error) {
    console.error("JWT Verification Error:", error.message);
    // Log additional information if needed
    console.error("Error Stack Trace:", error.stack);
    return null;
  }
};
