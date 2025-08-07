"use client"
import React, { useState, useEffect } from 'react'
import {SidebarProvider } from '../../components/ui/sidebar.jsx'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader.jsx'
import WelcomeBanner from './_components/WelcomeBanner.jsx'
import Loading from '@/app/Loading.jsx'

const WorkspaceProvider = ({children}) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate async loading or replace with your actual loading logic
    const timer = setTimeout(() => setLoading(false), 1000);
    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <Loading />;
  }

  return (
    <div>
      <SidebarProvider>
        <AppSidebar />
      
      <div className='w-full'>
        <AppHeader/>
        <div className='p-10'>
        {/* <WelcomeBanner /> */}
        
        {children}
        </div>
      </div>
      </SidebarProvider>
      
    </div>
  )
}

export default WorkspaceProvider
