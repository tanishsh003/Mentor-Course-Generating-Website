import AppHeader from '@/app/workspace/_components/AppHeader'
import AppSidebar from '@/app/workspace/_components/AppSidebar'
import { SidebarProvider } from '@/components/ui/sidebar'
import React from 'react'

const WelcomeBanner = () => {
  return (
    <div className='p-5 bg-gradient-to-br from-[#0F4C75] to-indigo-900 rounded-md '>
      <h2 className='font-bold text-2xl text-gray-200 '>Welcome to Mentor</h2>
      <p className='text-gray-400'>Your one-stop platform for learning and growth.</p>
      
    </div>
  )
}

export default WelcomeBanner
