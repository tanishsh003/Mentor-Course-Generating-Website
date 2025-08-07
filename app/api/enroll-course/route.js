import { db } from "@/config/db";
import { coursesTable, enrollCourseTable } from "@/config/schema";
import { currentUser } from "@clerk/nextjs/server";
import { and, desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";

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
  const {searchParams}=new URL(req.url);
  const courseId=searchParams?.get('courseId')

  const user=await currentUser();

  if(courseId){
    const result=await db.select().from(coursesTable).innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid)).where(and(eq(enrollCourseTable.userEmail, user.primaryEmailAddress.emailAddress), eq(enrollCourseTable.cid, courseId))).orderBy(desc(enrollCourseTable.id));
  console.log("returning the result from enroll-course");

  return NextResponse.json(result[0])


  }
  else{

  

  const result=await db.select().from(coursesTable).innerJoin(enrollCourseTable, eq(coursesTable.cid, enrollCourseTable.cid)).where(eq(enrollCourseTable.userEmail, user.primaryEmailAddress.emailAddress)).orderBy(desc(enrollCourseTable.id));
  console.log("returning the result from enroll-course");
  

  return NextResponse.json(result)
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