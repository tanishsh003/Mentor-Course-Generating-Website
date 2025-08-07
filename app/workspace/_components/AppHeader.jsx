import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar.jsx'

const AppHeader = ({hideSidebar=false}) => {
  return (
    <div className='w-full p-4 flex justify-between items-center shadow-lg'>
      {!hideSidebar && <SidebarTrigger />}
      <UserButton/>
    </div>
  )
}

export default AppHeader
