"use client";
import AddNewCourseDialog from '@/app/workspace/_components/AddNewCourseDialog';
import { Button } from '@/components/ui/button';
// Import useAuth to get the session token
import { useUser, useAuth } from '@clerk/nextjs';
import axios from 'axios';
import CourseCard from './CourseCard';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import Loader from '@/app/SmallLoader';

const CourseList = () => {
    const [courseList, setCourseList] = useState([]);
    const [loading, setLoading] = useState(true); // Start in loading state
    const [error, setError] = useState(null);
    
    const { user, isLoaded, isSignedIn } = useUser();
    // **THE FIX**: Get the getToken function from useAuth
    const { getToken } = useAuth();

    useEffect(() => {
        // Only fetch courses if Clerk is loaded and the user is signed in
        if (isLoaded && isSignedIn) {
            getCourseList();
        }
        // If Clerk is loaded but the user is not signed in, stop loading
        if (isLoaded && !isSignedIn) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn]); // Depend on isSignedIn as well

    const getCourseList = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // **THE FIX**: Wait for Clerk to provide the session token
            const token = await getToken();

            // **THE FIX**: Pass the token in the Authorization header
            const result = await axios.get('/api/courses', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            
            setCourseList(result.data);
        } catch (error) {
            console.error('Error fetching courses:', error);
            setError(error.response?.data?.error || error.message || 'Failed to fetch courses');
        } finally {
            setLoading(false);
        }
    };

    // Main loading state (waiting for Clerk to initialize or data to load)
    if (!isLoaded || loading) {
        return (
            <Loader/>
        );
    }

    // An error occurred during the API call
    if (error) {
        return (
            <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-10 bg-red-100 border-red-400'>
                <p className='text-red-700 font-semibold'>Error: {error}</p>
                <Button onClick={getCourseList} className='mt-3'>Retry</Button>
            </div>
        );
    }

    return (
        <div className='mt-10'>
            <div className='flex justify-between items-center '>
                <h2 className='font-bold text-2xl text-[#3282B8] '>My Courses</h2>
                <AddNewCourseDialog>
                    <Button>+ New Course</Button>
                </AddNewCourseDialog>
            </div>
            
            {courseList.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-5'>
                    {courseList.map((course, index) => (
                        <CourseCard key={index} course={course} />
                    ))}
                </div>
            ) : (
                <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-5 bg-[#011f3596]'>
                    <Image src={'/ol.png'} alt='No courses' width={80} height={80} />
                    <h2 className='font-bold text-xl mt-4'>You haven't created any courses yet</h2>
                    <p className='text-gray-500'>Click the button above to create your first course.</p>
                </div>
            )}
        </div>
    );
};

export default CourseList;
