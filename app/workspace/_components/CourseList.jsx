"use client"
import AddNewCourseDialog from '@/app/workspace/_components/AddNewCourseDialog'
import { Button } from '@/components/ui/button'
import Image from 'next/image'
import React, {useState} from 'react'

const CourseList = () => {
  const [courseList, setCourseList] = React.useState([])
  return (
    <div className='mt-10'>
      <h2 className='font-bold text-3xl'>Course List</h2>
      {courseList.length ==0 ? <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-gray-600'>
        <Image src={'/ol.png'} alt='edu' width={80} height={80} />
        <h2 className='font-bold text-xl'>Look Like you haven't created any courses yet</h2>
        <AddNewCourseDialog>
        <Button>Create your first course</Button>
        </AddNewCourseDialog>

      </div> :
      <div>
        
      </div> }
    </div>
  )
}

export default CourseList
