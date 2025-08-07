'use client';

import { UserButton, UserProfile, useUser } from '@clerk/nextjs';
import { Button } from "../components/ui/button.jsx";
import Loading from './Loading.jsx';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
const router = useRouter();
  if (!isLoaded) return <Loading />;

  return (
    <div className=" border-b-2 border-[#0F4C75] h-4 flex justify-between p-8 items-center bg-black">
      <h3 ><Image src="/logo.svg" alt="logo" width={50} height={50} sizes="(max-width: 768px) 100vw, 120px" /></h3>
      {isSignedIn ? 
      <UserButton/> :
      <Button onClick={()=>router.push('/sign-in')}>Sign In </Button>
      
      }
      
    </div>
  );
}