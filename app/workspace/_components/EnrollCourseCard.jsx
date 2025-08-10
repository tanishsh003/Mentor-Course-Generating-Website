// import { Button } from '@/components/ui/button'
import { Button } from '@/components/ui/button'
import { Progress } from '@/components/ui/progress'
import { Book, LoaderCircle, PlayCircle, Settings } from 'lucide-react'
import Image from 'next/image'
import Link from 'next/link'

// import { log } from 'node:console'
import React from 'react'

const EnrollCourseCard = ({course, enrollCourse}) => {
  console.log("enrollCourse in enroll course card");
  console.log(enrollCourse);
  console.log("course in enroll course card");
  console.log(course);
  

  // console.log(course);
  

  let courseJson = {};

if (course?.courseJson) {
  try {
    const rawJson = course.courseJson.replace(/```json|```/g, '');
    courseJson = JSON.parse(rawJson)?.course || {};
  } catch (err) {
    console.error('Invalid courseJson:', err);
  }
}
  const CalculatePerProgress=()=>{
    console.log("progress is ");
    
    return Math.floor(((enrollCourse.completedChapters?.length ?? 0) / course?.courseContent?.length) * 100);
  }
  return (
    <div className="m-3 shadow hover:shadow-[0_0_15px_#3282B8] rounded-t-xl transition-all duration-100 ">
      <Image
        src={course?.bannerImageUrl}
        alt={course.name}
        width={400}
        height={300}
        className="w-full aspect-video rounded-t-xl object-cover"
      />

      <div className="p-3 bg-[#181e26f5] flex flex-col gap-3">
        <h2 className="font-bold text-lg">{courseJson?.name}</h2>
        <p className="line-clamp-3 text-sm text-gray-500">
          {courseJson?.description}
        </p>

        <div className="">
          <h2 className="flex justify-between text-sm text-primary2nd mb-2 ">
            Progress <span>{CalculatePerProgress()}%</span>
          </h2>
          <Progress value={CalculatePerProgress()} className="" />
          {/* <Button asChild className={'w-full mt-3'}>
            <Link href={'/workspace/view-course/'+course?.cid}> 
              <PlayCircle className='mr-2 h-4 w-4'/> Continue Learning 
            </Link>
          </Button> */}
          <Link
            href={"/workspace/view-course/" + course?.cid}
            className="w-full"
          >
            <Button className="w-full mt-3">
              <PlayCircle className="mr-2 h-4 w-4" /> Continue Learning
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default EnrollCourseCard
