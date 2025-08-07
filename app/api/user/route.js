import { db } from "@/config/db";
import { usersTable } from "@/config/schema";
import { NextRequest, NextResponse } from "next/server";
import { eq } from "drizzle-orm";

export async function POST(req){
  try {
    const {email, name}= await req.json();
    console.log(email, name);
    //if user exist
    const users = await db.select().from(usersTable).where(eq(usersTable.email, email));

    if(users.length == 0){
      const result = await db.insert(usersTable).values({
        name:name,
        email:email
      }).returning(usersTable)

      console.log(result);
      
      return NextResponse.json(result)
    }
    return NextResponse.json(users[0])
  } catch (error) {
    console.error("Error in user API:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function GET(req) {
  return NextResponse.json({ message: "This is a GET request" });
}