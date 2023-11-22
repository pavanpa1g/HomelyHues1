import { NextResponse } from "next/server";

import { connectedDb } from "@/helper/db";

connectedDb();

//api/hostel/search?search=query
export async function GET(request) {
  //   const { search } = query;
  const url = new URL(request.url);
  const searchParams = url.searchParams;
  const search = searchParams.get("search");

  return NextResponse.json({ search });
}
