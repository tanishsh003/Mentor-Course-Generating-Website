import { db } from "@/config/db";
import { enrollCourseTable, coursesTable } from "@/config/schema";
import { NextResponse } from "next/server";
import { eq, and, desc } from "drizzle-orm";
import {auth,  currentUser } from "@clerk/nextjs/server";
// import { auth } from "@clerk/nextjs/server";
// import { clerkClient } from "@clerk/nextjs/server";
export async function POST(req){
  const {courseId}=await req.json();
  const user=await currentUser()

  // if already enrolled
  const enrollCourses=await db.select().from(enrollCourseTable).where(and(eq(enrollCourseTable.userEmail, user?.primaryEmailAddress.emailAddress),eq(enrollCourseTable.cid, courseId)))

  if(enrollCourses?.length==0){
    const result=await db.insert(enrollCourseTable).values({
      cid:courseId,
      userEmail:user.primaryEmailAddress.emailAddress
    }).returning(enrollCourseTable)

    return NextResponse.json(result)
  }

  return NextResponse.json({
    'resp':'already enrolled'
  })
}

export async function GET(req) {
    try {
        const user = await currentUser();
        
        // This check is correct and essential
        if (!user || !user.primaryEmailAddress) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const userEmail = user.primaryEmailAddress.emailAddress;
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");

        let result;
        if (courseId) {
            // Fetch a single enrolled course
            result = await db
                .select()
                .from(coursesTable)
                .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
                .where(and(
                    eq(enrollCourseTable.userEmail, userEmail),
                    eq(enrollCourseTable.cid, courseId)
                ))
                .orderBy(desc(enrollCourseTable.id));
            
            return NextResponse.json(result[0] || null);
        } else {
            // Fetch all enrolled courses for the user
            result = await db
                .select()
                .from(coursesTable)
                .innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid))
                .where(eq(enrollCourseTable.userEmail, userEmail))
                .orderBy(desc(enrollCourseTable.id));
            
            return NextResponse.json(result);
        }
    } catch (error) {
        console.error("API GET Error:", error);
        return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
    }
}

export  async function PUT(req){
  const {completedChapters, courseId}=await req.json()

  console.log("completedChapter and courseId in enroll course route");
  console.log(completedChapters);
  console.log(courseId);
  
  const user=await currentUser()

  const result=await db.update(enrollCourseTable).set({completedChapters:completedChapters}).where(and(eq(enrollCourseTable.cid, courseId), eq(enrollCourseTable.userEmail, user?.primaryEmailAddress?.emailAddress))).returning(enrollCourseTable)

  return NextResponse.json(result)
}

// export async function GET(req) {
//   return NextResponse.json({ message: "Enroll course API is working" });
// }