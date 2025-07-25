import React from 'react'
import {SidebarProvider, SidebarTrigger } from '../../components/ui/sidebar.jsx'
import AppSidebar from './_components/AppSidebar'
import AppHeader from './_components/AppHeader.jsx'
import WelcomeBanner from './_components/WelcomeBanner.jsx'
const WorkspaceProvider = ({children}) => {
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
