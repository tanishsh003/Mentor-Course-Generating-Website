"use client"
import AddNewCourseDialog from '@/app/workspace/_components/AddNewCourseDialog'
import { Button } from '@/components/ui/button'
import { useUser } from '@clerk/nextjs'
import axios from 'axios'
import CourseCard from './CourseCard'
import Image from 'next/image'
import React, {useEffect, useState} from 'react'

const CourseList = () => {
  const [courseList, setCourseList] = React.useState([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const {user} = useUser()
  
  useEffect(() => {
    if (user) {
      getCourseList()
    }
  }, [user])

  const getCourseList = async () => {
    try {
      setLoading(true)
      setError(null)
      console.log('Fetching courses for user:', user?.primaryEmailAddress?.emailAddress)
      
      const result = await axios.get('/api/courses')
      console.log('API Response:', result.data)
      setCourseList(result.data)
    } catch (error) {
      console.error('Error fetching courses:', error)
      setError(error.response?.data?.error || error.message || 'Failed to fetch courses')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='mt-10'>
      <h2 className='font-bold text-2xl'>Course List</h2>
      
      {loading && (
        <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-gray-600'>
          <p>Loading courses...</p>
        </div>
      )}
      
      {error && (
        <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-red-600'>
          <p className='text-white'>Error: {error}</p>
          <Button onClick={getCourseList} className='mt-2'>Retry</Button>
        </div>
      )}
      
      {!loading && !error && courseList.length === 0 && (
        <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-2 bg-gray-600'>
          <Image src={'/ol.png'} alt='edu' width={80} height={80} />
          <h2 className='font-bold text-xl'>Look Like you haven't created any courses yet</h2>
          <AddNewCourseDialog>
            <Button>Create your first course</Button>
          </AddNewCourseDialog>
        </div>
      )}
      
      {!loading && !error && courseList.length > 0 && (
        <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-5'>
          {courseList?.map((course, index) => (
            <CourseCard key={index} course={course} />
          ))}
        </div>
      )}
    </div>
  )
}

export default CourseList
