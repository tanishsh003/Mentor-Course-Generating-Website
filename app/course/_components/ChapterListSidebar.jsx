import AppHeader from '@/app/workspace/_components/AppHeader'
import React, {useContext} from 'react'
import { SelectedChapterIndexContext } from '@/context/SelectedChapterIndex'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"

const ChapterListSidebar = ({courseInfo}) => {
  const course = courseInfo?.courses
  const enrollCourse = courseInfo?.enrollCourse

  const courseContent = courseInfo?.courses?.courseContent

  console.log("courseInfo:", courseInfo)
  console.log("courseContent:", courseContent)

  const {selectedChapterIndex, setSelectedChapterIndex}=useContext(SelectedChapterIndexContext)
  const completedChapters=enrollCourse?.completedChapters??[]
  return (
    <div className="w-60 min-w-[240px] max-w-[300px] bg-sidebar h-full p-5">
      <h2 className='my-3 font-bold text-xl'>Chapters  </h2>
      <Accordion type="single" collapsible>
        {courseContent?.map((chapter, index)=>(
          <AccordionItem value={chapter?.courseData?.chapterName} key={index} onClick={()=>setSelectedChapterIndex(index)}>
          
          <AccordionTrigger className={'text-lg font-medium'} >
            {index+1}.{chapter?.courseData?.chapterName}  </AccordionTrigger>
          <AccordionContent>
            <div className='p-3  rounded-lg'>
              {chapter?.courseData?.topics?.map((topic, index_)=>(
                <h2 className={`p-3  rounded-lg my-1 ${completedChapters?.includes(index)?  'bg-[#005B41] ':'bg-[#1B262C]' }`} key={index_}>{topic?.topic}</h2>
              ))}
            </div>
            
          </AccordionContent>
        </AccordionItem>
            
          ))}
        
      </Accordion>
    </div>
  );
}

export default ChapterListSidebar
