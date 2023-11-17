import { NextResponse } from "next/server";

import { connectedDb } from "@/helper/db";

connectedDb();

export function GET() {
  return NextResponse.json({ message: "hello" });
}
