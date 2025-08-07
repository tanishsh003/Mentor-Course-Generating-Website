import { Button } from '@/components/ui/button';
import axios from 'axios';
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react';
import Image from 'next/image'
import Link from 'next/link';
import React, { useState } from 'react'
import { toast } from 'sonner';

const CourseCard = ({course}) => {
  const rawJson = course.courseJson.replace(/```json|```/g, '');
  const parsed = JSON.parse(rawJson);
  const courseJson=parsed.course;

  const [loading, setLoading]=useState(false)
  const onEnrollCourse=async()=>{
    try{
      setLoading(true);
    const result=await axios.post('/api/enroll-course', {
      courseId:course?.cid
    })

    if(result.data.resp){
      toast.warning("already enrolled")
      setLoading(false)
      return ;
    }
    setLoading(false)
    toast.success('Enrolled successfully')
    console.log(result.data);
    }
    catch(e){
      toast.error('server side error in enroll-course')
      console.log(e);
      
    }
    

  }
  return (
    <div className='m-3 shadow '>
      <Image src={course?.bannerImageUrl} alt={course.name} width={400} height={300} className='w-full aspect-video rounded-t-xl object-cover' />
      <div className='p-3 bg-[#181e26f5] flex flex-col gap-3'>
        <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
        <p className='line-clamp-3 text-sm text-gray-500'>{courseJson?.description}</p>

        <div className='flex justify-between items-center '>
          <h2 className='flex items-center gap-2 text-sm '><Book className='text-primary h-5 w-5 '/> {courseJson.noOfChapters} </h2>
          {course?.courseContent?.length?<Button size={'sm'} onClick={onEnrollCourse} disabled={loading} > 
           {loading ? <LoaderCircle className='animate-spin'/> : <PlayCircle/>}  Start Learning </Button>
          :
         <Link href={'/workspace/edit-course/'+course?.cid} > <Button size={'sm'} variant={'outline'} > <Settings/> Generate Course</Button></Link>}
        </div>
      </div>
    </div>
  )
}

export default CourseCard
