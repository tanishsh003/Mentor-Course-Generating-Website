"use client"
import React from 'react'
import { useRouter } from 'next/navigation'



import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Book, Compass, icons, LayoutDashboard, PencilRulerIcon, UserCircle2Icon, WalletCards } from 'lucide-react'
import path from 'path'
import { usePathname } from 'next/navigation'
import AddNewCourseDialog from './AddNewCourseDialog.jsx'
 

const SidebarOptions=[{
  title:'Dashboard',
  icon:LayoutDashboard,
  path:'/workspace'
},
{
  title:'My Learning',
  icon:Book,
  path:'/workspace/my-learning'
},
{
  title:'Explore Courses',
  icon:Compass,
  path:'/workspace/explore'
},

{
  title:'Billing',
  icon:WalletCards,
  path:'/workspace/billing'
},
{
  title:'Profile',
  icon:UserCircle2Icon,
  path:'/workspace/profile'
}
]
export function AppSidebar() {
  const router=useRouter()
  const path=usePathname()
  return (
    <Sidebar>
      <SidebarHeader className={'p-4 items-center'} >
        <Image onClick={()=>router.replace('/')}  src="/logo.svg" alt="logo" width={50} height={50} sizes="(max-width: 768px) 100vw, 120px" />

      </SidebarHeader>
      <SidebarContent className={'items-center w-full '}>
        <SidebarGroup size={'lg'} />
        <div className='w-full px-2'> {/* Ensure full width and optional horizontal padding */}
          <AddNewCourseDialog>
            <Button size='lg' className='w-full justify-start'>
              Create New Course
            </Button>
          </AddNewCourseDialog>
        </div>
        <SidebarGroup />
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {SidebarOptions.map((item, index)=>(
                <SidebarMenuItem key={index}>
                  <SidebarMenuButton asChild className={'p-5 hover:bg-[#BBE1FA]'}>
                    <Link  href={item.path} className={`text-[17px] ${path.includes(item.path) && 'text-[#DDE6ED] bg-[#3282B8]' }`}>
                    <item.icon className='w-7 h-7'/>
                    <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>

                </SidebarMenuItem>

              ))}
            </SidebarMenu>

          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter />
    </Sidebar>
  )
}

export default AppSidebar
