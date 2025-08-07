"use client"
import { Button } from '@/components/ui/button'
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndex'
import axios from 'axios'
import { CheckCircle, Cross, Loader, Loader2Icon, Video, X, Youtube } from 'lucide-react'
import { useParams } from 'next/navigation'
import React, { useContext, useState } from 'react'
import YouTube from 'react-youtube'
import { toast } from 'sonner'

const ChapterContent = ({courseInfo, refreshData}) => {

  const course = courseInfo?.courses
  const enrollCourse = courseInfo?.enrollCourse

   const {selectedChapterIndex, setSelectedChapterIndex}=useContext(SelectedChapterIndexContext)

  
  const courseContent=courseInfo?.courses?.courseContent
  console.log("course Content in chapter content");
  
  console.log(courseContent);
  

  const videoData=courseContent?.[selectedChapterIndex]?.youtubeVideo

  const topics=courseContent?.[selectedChapterIndex]?.courseData?.topics
  console.log("topics");
  console.log(topics);
  const courseId=useParams()
  const completedChapters=enrollCourse?.completedChapters??[]
  const [loading, setLoading]=useState(false)
  
  const markChapterCompleted=async()=>{
    setLoading(true)
    
    // Create a new array to avoid mutating the original
    const updatedCompletedChapters = [...completedChapters, selectedChapterIndex]

    const result=await axios.put('/api/enroll-course', {
      courseId: courseId.courseId, // Extract the actual courseId string from params object
      completedChapters: updatedCompletedChapters
    })
    setLoading(false)

    console.log("result after mark as complete");
    console.log(result);
    refreshData()
    toast.success("Chapter marked as completed")
  }

  const markChapterInCompleted=async()=>{
    setLoading(true)
    
    

   
      const completedChap=completedChapters.filter(item=>item!=selectedChapterIndex)

      const result=await axios.put('/api/enroll-course', {
        courseId: courseId.courseId, // Extract the actual courseId string from params object
        completedChapters: completedChap
      })
      setLoading(false)
      console.log("result after mark as Incomplete");
      console.log(result);
      refreshData()
      toast.success("Chapter marked as Incompleted")
      
      
    
  }
  
  return (
    <div className='p-10'>
      <div  className='flex justify-between'>
      <h2 className='font-bold text-3xl'> {selectedChapterIndex+1}.{courseContent?.[selectedChapterIndex]?.courseData?.chapterName} </h2>
      
      { !completedChapters?.includes(selectedChapterIndex) ? 
        <Button onClick={()=>markChapterCompleted()} disabled={loading} >{loading ? <Loader2Icon className='animate-spin' />: <CheckCircle/>}  Mark as Completed</Button> :
        <Button onClick={()=>markChapterInCompleted()} variant={"outline"}> {loading ? <Loader2Icon className='animate-spin' />: <X/>}  Mark Incomplete </Button>
      }
      </div>

      <h2 className='flex gap-2 my-2 font-bold text-lg'><Video/> Related Videos for Better Understanding</h2>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-5'>
        {videoData?.map((video, index)=> index<2 && (
          <div  key={index}>
            <YouTube  videoId={video?.videoId} opts={{height:'250', width:'400'}} />
          </div>
        ))}
      </div>

      <div className='mt-10 '>

        {topics?.map((topic, index)=>(
          <div className='m-10 p-5 bg-[#1B262C] rounded-2xl' key={index}>
            <h2 className='font-bold text-2xl text-[#3282B8]'>{index+1}.{topic?.topic}</h2>
            {/* <p>{topic?.content}</p> */}

            <div dangerouslySetInnerHTML={{__html:topic?.content}}style={{
              lineHeight:'2'
            }} ></div>
          </div>
        ))}

      </div>

      
    </div>
  )
}

export default ChapterContent
