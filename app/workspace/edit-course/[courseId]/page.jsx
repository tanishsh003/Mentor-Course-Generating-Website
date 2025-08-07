"use client"
import CourseInfo from '@/app/workspace/edit-course/_components/CourseInfo'
import axios from 'axios'
import { useParams } from 'next/navigation'
import React, { useEffect, useState } from 'react'
import ChapterTopicList from '@/app/workspace/edit-course/_components/ChapterTopicList'
const EditCourse = ({viewCourse=false}) => { 
  const {courseId}=useParams()
  console.log(courseId);
  const [loading, setLoading]=useState(false)
  const [course,setCourse]=useState()


  useEffect(()=>{
    GetCourseInfo()
  },[])
  const GetCourseInfo=async()=>{
    setLoading(true)
    const result=await axios.get('/api/courses?courseId='+courseId)
    console.log("you are at edit-course/id");
    console.log(result);
    console.log("data is");
    
    console.log(result.data);
    setCourse(result.data)
    setLoading(false)
    setCourse(result.data)
    

  }
  
  return (
    <div>
      <CourseInfo course={course} viewCourse={viewCourse}/>
      <ChapterTopicList course={course}/>
      
      
    </div>
  )
}

export default EditCourse
