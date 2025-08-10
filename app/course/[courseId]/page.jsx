 "use client"
import AppHeader from '@/app/workspace/_components/AppHeader'
// import React from 'react'
import ChapterListSidebar from '../_components/ChapterListSidebar';
import ChapterContent from '../_components/ChapterContent';

 
  import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'next/navigation';
import Loading from '@/app/Loading';

// import EnrollCourseCard from './EnrollCourseCard'
const Course = () => {
  console.log("inside the course/cid/page");
  

  const {courseId}=useParams()
  const [courseInfo, setCourseInfo]=useState()
  const [loading, setLoading]=useState(true)

    useEffect(()=>{
      GetEnrolledCourseById()
    }, [])
    const GetEnrolledCourseById=async()=>{
      setLoading(true)
      const result=await axios.get('/api/enroll-course?courseId='+courseId);

      console.log("log result.data in enrollcourse list");
      
      console.log(result.data);
      setCourseInfo(result.data)
      setLoading(false)
      
      
    }
    if (loading) {
      return (
        <Loading/>
      )
    }
  return (
    <div className='w-full inset-0 [background:radial-gradient(130%_130%_at_50%_20%,#000_30%,#0F4C75_100%)]'>
      <AppHeader hideSidebar={true}/>

      <div className='flex gap-10'>
        <ChapterListSidebar courseInfo={courseInfo} />
        <ChapterContent courseInfo={courseInfo} refreshData={()=>GetEnrolledCourseById()} />
      </div>
    </div>
  )
}

export default Course
