import EnrollCourseList from '@/app/workspace/_components/EnrollCourseList'
import WelcomeBanner from '@/app/workspace/_components/WelcomeBanner'
import React from 'react'

const MyLearning = () => {
  return (
    <div>
      <WelcomeBanner/>
      <h2 className='font-bold 
      text-2xl mt-3'>My Learnings</h2>
      <EnrollCourseList/>
    </div>
  )
}

export default MyLearning
