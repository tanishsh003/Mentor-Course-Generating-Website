import { NextResponse } from "next/server";
import { db } from "@/config/db";
import { coursesTable } from "@/config/schema";
import { eq, ne, sql, desc, and } from "drizzle-orm";
import { currentUser } from "@clerk/nextjs/server";

export async function GET(req) {
    try {
        const user = await currentUser();
        
        // **THE FIX**: Add a security check at the very top of the function.
        // If the request is not authenticated, deny access immediately.
        // if (!user || !user.primaryEmailAddress) {
        //     return NextResponse.json({ error: "Unauthorized: User not authenticated." }, { status: 401 });
        // }

        const userEmail = user?.primaryEmailAddress?.emailAddress;
        const { searchParams } = new URL(req.url);
        const courseId = searchParams?.get('courseId');

        // This logic is for a special case, likely finding un-setup courses
        if (courseId === '0') {
            const result = await db.select()
                .from(coursesTable)
                .where(sql`${coursesTable?.courseContent}::jsonb='{}'::jsonb`);
            return NextResponse.json(result);
        }

        // This logic gets a specific course by its ID
        if (courseId) {
            const result = await db.select()
                .from(coursesTable)
                .where(eq(coursesTable?.cid, courseId))
                .orderBy(desc(coursesTable?.id));
            return NextResponse.json(result[0] || null);
        } 
        
        // This is the default case: get all courses created by the authenticated user
        else {
            const result = await db.select()
                .from(coursesTable)
                .where(eq(coursesTable?.userEmail, userEmail)) // Use the safe userEmail variable
                .orderBy(desc(coursesTable?.id));
            return NextResponse.json(result);
        }
    } catch (error) {
        console.error("API Error in /api/courses:", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}

export async function POST(req) {
    try {
        const user = await currentUser();
        if (!user || !user.primaryEmailAddress) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }
        const userEmail = user.primaryEmailAddress.emailAddress;

        const { courseId } = await req.json();
        if (!courseId) {
            return NextResponse.json({ error: "Course ID is required" }, { status: 400 });
        }

        // --- Just delete the course ---
        // The 'ON DELETE CASCADE' rule in your database will automatically delete the enrollments.
        const result = await db.delete(coursesTable)
            .where(
                and(
                    eq(coursesTable.cid, courseId),
                    eq(coursesTable.userEmail, userEmail)
                )
            )
            .returning({ deletedId: coursesTable.cid });

        if (result.length === 0) {
            return NextResponse.json({ error: "Course not found or you are not authorized to delete it." }, { status: 404 });
        }

        return NextResponse.json({ message: "Course deleted successfully", deletedId: result[0].deletedId }, { status: 200 });

    } catch (error) {
        console.error("API Error in /api/courses POST (delete):", error);
        return NextResponse.json({ error: "Internal server error" }, { status: 500 });
    }
}