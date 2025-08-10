"use client";
import TypingEffect from '@/app/TypingEffect'
import { Button } from '@/components/ui/button'
import React from 'react'
import { useRouter } from 'next/navigation'
import { useUser } from '@clerk/nextjs';
import { Search } from 'lucide-react';
const Body = () => {
  const router=useRouter()
  const { isSignedIn } = useUser();

  return (
    <div className=" inset-0 -z-10 h-screen w-screen [background:radial-gradient(130%_130%_at_50%_20%,#000_30%,#0F4C75_100%)]">
      <div className="h-screen w-screen flex flex-col items-center gap-10  ">
        <div className="mt-15 flex flex-col items-center gap-2 ">
          <h1 className="font-bold text-4xl ">Welcome to the </h1>
          <h2
            className="text-[#3282B8] text-6xl md:text-9xl p-2 
                   [text-shadow:0_0_20px_#0F4C75]"
          >
            Mentor
          </h2>
        </div>
        <div className="">
          <p className=" flex gap-2 font-bold text-xl p-5 rounded-2xl border-1 border-[#0F4C75] shadow-sm transition-shadow duration-200 hover:shadow-[0_6px_20px_rgba(15,76,117,0.5)]"><Search size={"25px"} />
            {/* Just type your topic, and we’ll create a curriculum, chapters,
            lessons, and quizzes. */}
            <TypingEffect text={"Just type your topic, and we'll create a curriculum, chapters,lessons, and quizzes."}/>
          </p>
        </div>

        {isSignedIn ? 
        <div className=" w-md lg:w-lg flex flex-col items-center gap-10 
    border-2 border-transparent hover:border-[#3282B8] 
     shadow-none hover:shadow-[0_0_25px_rgba(50,130,184,0.6)] 
    transition-all duration-200 p-10 rounded-xl">
          <h2 className=' items-center gap-5 mt-5 font-bold text-3xl'> Dive Into the world of <span className='text-[#3282B8]'>Mentor</span></h2>
          <Button
            className={"w-full transition-shadow duration-100 hover:shadow-[0_0_20px_rgba(15,76,117,0.5)]"}
            onClick={() => router.push("/workspace")}
          >
            Your WorkSpace
          </Button>
        </div>
        :
        <div className=" w-md lg:w-lg flex flex-col items-center gap-10 
    border-2 border-transparent hover:border-[#3282B8] 
    shadow-none hover:shadow-[0_0_25px_rgba(50,130,184,0.6)] 
    transition-all duration-200 p-10 rounded-xl">
          <div> 
            <h2 className='  items-center gap-5 mt-5 font-bold text-3xl'>Please Sign In to Dive Into the world of <span className='text-[#3282B8]'>Mentor</span></h2>
          </div>
          <Button
            className={"w-full transition-shadow duration-100 hover:shadow-[0_0_20px_rgba(15,76,117,0.5)] "}
            onClick={() => router.push("/sign-in")}
          >
            Sign In 
          </Button>
        </div>
        }
      </div>
    </div>
  );
}

export default Body
