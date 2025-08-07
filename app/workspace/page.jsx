import WelcomeBanner from '@/app/workspace/_components/WelcomeBanner'
import React from 'react'
import CourseList from '@/app/workspace/_components/CourseList'

import EnrollCourseList from './_components/EnrollCourseList'

const Workspace = () => {
  return (
    <div>
      <WelcomeBanner/>
      <EnrollCourseList/>
      <CourseList/>
    </div>
  )
}

export default Workspace
