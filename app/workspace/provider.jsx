"use client"
import React from 'react'
import { SidebarProvider } from '../../components/ui/sidebar.jsx'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader.jsx'
import Loading from '@/app/Loading.jsx'
import { useUser } from '@clerk/nextjs'

const WorkspaceProvider = ({ children }) => {
  const { isSignedIn, isLoaded } = useUser();

  if (!isLoaded) {
    return <Loading />;
  }

  if (!isSignedIn) {
    // Redirect client-side if somehow we got here without a signed-in user
    if (typeof window !== "undefined") {
      window.location.href = "/sign-in";
    }
    return null;
  }
  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
        <div className='w-full inset-0 [background:radial-gradient(130%_130%_at_50%_20%,#000_30%,#0F4C75_100%)]'>
          <AppHeader />
          <div className='p-10'>
            {children}
          </div>
        </div>
      </SidebarProvider>
    </div>
  )
}

export default WorkspaceProvider