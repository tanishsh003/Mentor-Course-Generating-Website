import WelcomeBanner from '@/app/workspace/_components/WelcomeBanner'
import React from 'react'
import CourseList from '@/app/workspace/_components/CourseList'

const Workspace = () => {
  return (
    <div>
      <WelcomeBanner/>
      <CourseList/>
    </div>
  )
}

export default Workspace
