import { NextResponse } from "next/server";

export async function GET(req) {
  console.log("Test API route hit");
  return NextResponse.json({ message: "API is working" });
}

