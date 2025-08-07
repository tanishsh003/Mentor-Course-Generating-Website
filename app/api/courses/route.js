import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq, ne, sql } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";
import { desc } from "drizzle-orm";

export async function GET(req) {
  try {
    const { searchParams } = new URL(req.url);
    const courseId = searchParams?.get('courseId');

    const user = await currentUser();
    
    // Check if user is authenticated
    if (!user) {
      console.log("No authenticated user found");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    console.log("User authenticated:", user.primaryEmailAddress?.emailAddress);
    if(courseId==='0'){
      const result= await db.select().from(coursesTable).where(sql `${coursesTable?.courseContent}::jsonb='{}':: jsonb`)

      console.log(result);
      return NextResponse.json(result)
      

    }

    if (courseId) {
      const result = await db.select().from(coursesTable).where(eq(coursesTable.cid, courseId)).orderBy(desc(coursesTable.id));
      console.log("Course by ID result:", result[0]);
      return NextResponse.json(result[0]);
    } else {
      const result = await db.select().from(coursesTable).where(eq(coursesTable.userEmail, user.primaryEmailAddress?.emailAddress)).orderBy(desc(coursesTable.id));
      console.log("Courses for user result:", result);
      return NextResponse.json(result);
    }
  } catch (error) {
    console.error("API Error:", error);
    return NextResponse.json({ error: "Internal server error" }, { status: 500 });
  }
}