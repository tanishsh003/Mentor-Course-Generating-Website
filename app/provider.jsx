"use client";

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// Make sure this path is correct for your project structure
import { UserDetailContext } from '../context/UserDetailContext.jsx';

import { SelectedChapterIndexContext } from '../context/SelectedChapterIndex.jsx';

function Provider({ children }) {

  const { user, isSignedIn, isLoaded } = useUser();
 
  const [userDetail, setUserDetail] = useState(null);

  const [selectedChapterIndex, setSelectedChapterIndex] = useState(0);

  useEffect(() => {
    
    const createUserInDb = async () => {
      try {
        console.log("Sending user data to API:", {
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress
        });
        const result = await axios.post('/api/user', {
          name: user?.fullName,
          email: user?.primaryEmailAddress?.emailAddress
          // It's also good practice to send the clerkId
          // clerkId: user?.id 
        });

        console.log("User details from DB:", result.data);
        setUserDetail(result.data); // Store the user details from your backend

      } catch (error) {
        // Log the full error for better debugging
        console.error("Error creating/fetching user in DB:", error.response ? error.response.data : error.message);
      }
    };

    // 4. Run the effect only when Clerk has loaded, the user is signed in,
    //    and we haven't already fetched the user details from our backend.
    if (isLoaded && isSignedIn && user && !userDetail) {
      createUserInDb();
    }
    
  // 5. Add all dependencies that the effect uses
  }, [isLoaded, isSignedIn, user, userDetail]);

  // Provide the context value to all child components
  return (
    <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
      <SelectedChapterIndexContext.Provider value={{selectedChapterIndex, setSelectedChapterIndex}} >
      {children}
      </SelectedChapterIndexContext.Provider>
    </UserDetailContext.Provider>
  );
}

export default Provider;