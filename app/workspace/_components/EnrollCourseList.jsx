"use client";
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// Import useAuth to get the session token
import { useUser, useAuth } from '@clerk/nextjs';
import EnrollCourseCard from './EnrollCourseCard';
import Loader from '@/app/SmallLoader.jsx'

const EnrollCourseList = () => {
    const [enrollCourseList, setEnrollCourseList] = useState([]);
    const [loading, setLoading] = useState(true); // Start in a loading state
    const [error, setError] = useState(null);
    
    const { isLoaded, isSignedIn } = useUser();
    // Get the getToken function from useAuth
    const { getToken } = useAuth();

    useEffect(() => {
        // Only attempt to fetch data if Clerk is loaded and the user is signed in
        if (isLoaded && isSignedIn) {
            GetEnrolledCourse();
        }
        // If Clerk is loaded but the user is not signed in, stop loading
        if (isLoaded && !isSignedIn) {
            setLoading(false);
        }
    }, [isLoaded, isSignedIn]); // Effect runs when Clerk's state changes

    const GetEnrolledCourse = async () => {
        try {
            setLoading(true);
            setError(null);
            
            // **THE FIX**: Wait for Clerk to provide the session token
            const token = await getToken();

            // **THE FIX**: Pass the token in the Authorization header
            const result = await axios.get('/api/enroll-course', {
  withCredentials: true
});
            
            setEnrollCourseList(result.data);
        } catch (error) {
            console.error('Error fetching enrolled courses:', error);
            setError(error.response?.data?.error || error.message || 'Failed to fetch enrolled courses');
        } finally {
            setLoading(false);
        }
    };

    // Main loading state (waiting for Clerk to initialize)
    if (!isLoaded || loading) {
        return (
          <Loader/>
        );
    }

    // User is not signed in
    if (!isSignedIn) {
        return (
            <div className="flex p-7 items-center justify-center flex-col border rounded-xl mt-5 bg-blue-50 dark:bg-gray-800">
                <h2 className='font-bold text-xl'>Please Sign In</h2>
                <p className='text-gray-500'>Sign in to view your enrolled courses.</p>
            </div>
        );
    }

    // An error occurred during the API call
    if (error) {
        return (
            <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-5 bg-red-100 border-red-400'>
                <p className='text-red-700 font-semibold'>Error: {error}</p>
                <button onClick={GetEnrolledCourse} className='mt-3 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors'>
                    Retry
                </button>
            </div>
        );
    }

    return (
        <div className='mt-5'>
            <h2 className='font-bold text-2xl text-[#3282B8]'>Continue Learning</h2>
            
            {enrollCourseList.length > 0 ? (
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5 mt-4'>
                    {enrollCourseList.map((enrollment, index) => (
                        <EnrollCourseCard 
                            course={enrollment?.courses} 
                            key={index} 
                            enrollCourse={enrollment?.enrollCourse}
                        />
                    ))}
                </div>
            ) : (
                <div className='flex p-7 items-center justify-center flex-col border rounded-xl mt-4 bg-[#011f3596] '>
                    <h2 className='font-bold text-xl'>No Courses Found</h2>
                    <p className='text-gray-500'>You haven't enrolled in any courses yet. Explore to get started!</p>
                </div>
            )}
        </div>
    );
};

export default EnrollCourseList;
