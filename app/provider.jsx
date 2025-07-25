"use client";

import { useUser } from '@clerk/nextjs';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
// Make sure this path is correct for your project structure
import { UserDetailContext } from '../context/UserDetailContext.jsx';

function Provider({ children }) {
  // 1. Get the full loading and authentication status from useUser
  const { user, isSignedIn, isLoaded } = useUser();
  
  // 2. Correctly initialize your state
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    // 3. Define the async function to create/get the user from your database
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
      {children}
    </UserDetailContext.Provider>
  );
}

export default Provider;