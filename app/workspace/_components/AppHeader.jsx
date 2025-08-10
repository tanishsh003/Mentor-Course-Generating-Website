import { UserButton } from '@clerk/nextjs'
import React from 'react'
import { SidebarTrigger } from '@/components/ui/sidebar.jsx'

const AppHeader = ({hideSidebar=false}) => {
  return (
    <div className='w-full p-4 flex justify-between items-center border-b-2 border-[#0F4C75] shadow-[0_4px_15px_4px_rgba(15,76,117,0.5)]'>
      {!hideSidebar && <SidebarTrigger />}
      <UserButton/>
    </div>
  )
}

export default AppHeader
