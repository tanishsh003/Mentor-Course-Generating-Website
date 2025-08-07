import { Button } from '@/components/ui/button';
import { Book, Clock, Loader2Icon, PlayCircle, Sparkle } from 'lucide-react';
import Image from 'next/image';
// import Image from 'next/image';
import React, { useState } from 'react'
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import Link from 'next/link';
const CourseInfo =  ({course, viewCourse}) => {

  if (!course) {
    return <div>Loading course information...</div>;
  }

  let courseLayout;

  try {
    // 1. Get the JSON string directly from course.courseJson
    let jsonString = course.courseJson;

    // 2. Clean the string to remove the markdown code block fences
    // This removes "```json\n" from the start and "\n```" from the end
    if (jsonString.startsWith('```json')) {
      jsonString = jsonString.replace(/^```json\n/, '').replace(/\n```$/, '');
    }

    // 3. Parse the cleaned string
    const courseData = JSON.parse(jsonString);
    
    // 4. Access the final course layout object
    courseLayout = courseData?.course;

    console.log("courseLayout is ");
    console.log(courseLayout);
    
    

  } catch (error) {
    console.error("Failed to parse courseJson:", error);
    return <div>There was an error displaying the course data.</div>;
  }

  if (!courseLayout) {
    return <div>Could not find course details in the data.</div>;
  }
  const router=useRouter()
  const [loading, setLoading]=useState(false)
  const GenerateCourseContent=async ()=>{
    setLoading(true)
    try{
      const result= await axios.post('/api/generate-course-content',{
      courseJson:courseLayout,
       courseTitle:course.name, 
       courseId:course.cid
    })

    console.log(result.data);
    setLoading(false)
    router.replace('/workspace')
    toast.success("Course Generated successfully")
    
    }
    catch(e){
      setLoading(false)
      console.log(e);
      toast.error("server side error, try again")
      
    }
  }

  return (
    <div className='flex flex-col md:flex-row gap-5 justify-between p-5 rounded-2xl shadow bg-[#0d283c]'>
      <div className='flex flex-col gap-3'>
        <h2 className='font-bold text-3xl'>{courseLayout.name} </h2>
        <p className='line-clamp-2 text-gray-300'>{courseLayout.description} </p>
        <div className='grid grid-cols-1 sm:grid-cols-3'>
          <div className='flex gap-2 items-cente p-3 rounded-lg shadow'>
            <Clock className='text-blue-400'/>
            <section>
              <h2 className='font-bold' >Duration</h2>
              <h2>2 Hours</h2>
            </section>

          </div>

          <div className='flex gap-2 items-cente p-3 rounded-lg shadow'>
            <Book className='text-blue-400'/>
            <section>
              <h2 className='font-bold' >Chapters</h2>
              <h2>2 Hours</h2>
            </section>

          </div>

          <div className='flex gap-2 items-cente p-3 rounded-lg shadow'>
            <Clock className='text-blue-400'/>
            <section>
              <h2 className='font-bold' >Difficulty Level</h2>
              <h2>{course.level} </h2>
            </section>

          </div>
        </div>
        {!viewCourse ?  <Button disabled={loading} onClick={GenerateCourseContent} > {loading ? <Loader2Icon className='animate-spin'/> :  <Sparkle/>}Generate Button</Button> :
        <Link href={'/course/'+course.cid}><Button ><PlayCircle/> Continue Learning </Button> </Link>}

      </div>
      <Image src={course.bannerImageUrl} alt={'banner Image'} width={400} height={400} className='w-full mt-5 md-m-0 md:w-[400px] h-[240px] object-cover rounded-2xl flex-shrink-0'/>
        
    </div>
  );
}

export default CourseInfo
