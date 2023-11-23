import { NextResponse } from "next/server";
import { connectedDb } from "@/helper/db";
import Hostel from "@/models/hostel";
import User from "@/models/user";

connectedDb();

export async function POST(request) {
  const { hostelData } = await request.json();

  const {
    owner,
    hostelName,
    address,
    foodMenu,
    contactNumber,
    image,
    numberOfRooms,
    roomTypes,
  } = hostelData;
  if (
    !owner ||
    !hostelName ||
    !address ||
    !contactNumber ||
    !numberOfRooms ||
    !roomTypes
  ) {
    return NextResponse.json(
      { message: "Fill all the input fields" },
      { status: 401 }
    );
  }

  try {
    // Check user role
    const user = await User.findOne({ _id: owner });

    if (!user || user.role === false) {
      return NextResponse.json(
        { message: "User role is invalid" },
        { status: 401 }
      );
    }

    //check if there the owner id is already there in the db
    const userRegistered = await Hostel.findOne({ owner });
    if (userRegistered) {
      return NextResponse.json(
        { message: `User has been registered with another hostel` },
        { status: 401 }
      );
    }

    const newHostel = {
      owner,
      hostelName,
      address,
      foodMenu,
      contactNumber,
      image,
      numberOfRooms,
      roomTypes,
    };

    const createdHostel = await Hostel(newHostel).populate(
      "owner",
      "-password"
    );
    await createdHostel.save();
    return NextResponse.json(createdHostel, { status: 201 });
  } catch (error) {
    console.log("Error", error);
    return NextResponse.json(
      { message: "Something went wrong" },
      { status: 500 }
    );
  }
}
