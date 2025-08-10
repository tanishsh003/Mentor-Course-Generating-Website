"use client";
import { Divide } from 'lucide-react'
import Body from './Body.jsx'
import MainHeader from './MainHeader.jsx'
import { useUser } from '@clerk/nextjs';
import Loading from './Loading.jsx';
export default function Home() {
  const { user, isLoaded, isSignedIn } = useUser();
  if (!isLoaded) return <Loading />;
  return(
    <div>
      <MainHeader/>
       <Body />
    </div>
  )
}
