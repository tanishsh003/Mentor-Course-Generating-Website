import { SignIn } from '@clerk/nextjs'

export default function Page() {
  return (
    <div className='inset-0 -z-10 h-screen w-screen [background:radial-gradient(130%_130%_at_50%_20%,#000_30%,#0F4C75_100%)]'>
      <div className='flex items-center justify-center h-screen'>
        <SignIn />
      </div>
    </div>
  );
}