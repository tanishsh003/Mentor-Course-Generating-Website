"use client"
import EditCourse from '@/app/workspace/edit-course/[courseId]/page'
import { useParams } from 'next/navigation'
import React from 'react'

const page = () => {

  // const {courseId}=useParams()
  return (
    <div>
      <EditCourse viewCourse={true} /> 
    </div>
  )
}

export default page
 