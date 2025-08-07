import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'
// import { log } from 'node:console'
import React from 'react'

const EnrollCourseCard = ({course, enrollCourse}) => {
  console.log("course list ");
  

  console.log(course);
  

  const rawJson = course.courseJson.replace(/```json|```/g, '');
  const parsed = JSON.parse(rawJson);
  const courseJson=parsed.course;
  const CalculatePerProgress=()=>{
    return (enrollCourse.completedChapters?.length??0/course?.courseContent?.length)*100;
  }
  return (
    <div className='m-3 shadow '>
      <Image src={course?.bannerImageUrl} alt={course.name} width={400} height={300} className='w-full aspect-video rounded-t-xl object-cover' />


      <div className='p-3 bg-[#181e26f5] flex flex-col gap-3'>
        <h2 className='font-bold text-lg'>{courseJson?.name}</h2>
        <p className='line-clamp-3 text-sm text-gray-500'>{courseJson?.description}</p>

        <div className=''>
          <h2 className='flex justify-between text-sm text-primary2nd mb-2 '>Progress <span>{CalculatePerProgress()}%</span></h2>
          <Progress value={CalculatePerProgress()} className='' />
          <Link href={'/workspace/view-course/'+course?.cid} ><Button className={'w-full mt-3'} > <PlayCircle/> Coutinue Learning </Button></Link>
          
        </div>
      </div>
    </div>
  )
}

export default EnrollCourseCard
