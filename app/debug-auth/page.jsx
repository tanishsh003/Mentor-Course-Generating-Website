"use client"
import { useUser } from '@clerk/nextjs'
import { useRouter } from 'next/navigation'
import { useEffect } from 'react'

export default function DebugAuth() {
  const { isSignedIn, isLoaded, user } = useUser()
  const router = useRouter()

  useEffect(() => {
    console.log('Debug Auth - State:', { isLoaded, isSignedIn, user })
  }, [isLoaded, isSignedIn, user])

  if (!isLoaded) {
    return <div>Loading...</div>
  }

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Authentication Debug</h1>
      <div className="space-y-4">
        <div>
          <strong>Is Loaded:</strong> {isLoaded ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>Is Signed In:</strong> {isSignedIn ? 'Yes' : 'No'}
        </div>
        <div>
          <strong>User:</strong> {user ? JSON.stringify(user, null, 2) : 'No user'}
        </div>
        <div>
          <strong>Environment Variables:</strong>
          <pre className="bg-gray-100 p-2 mt-2 rounded">
            {JSON.stringify({
              NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY: process.env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? 'Set' : 'Not Set',
              CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY ? 'Set' : 'Not Set',
            }, null, 2)}
          </pre>
        </div>
        <button 
          onClick={() => router.push('/workspace')}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Test Workspace Access
        </button>
      </div>
    </div>
  )
}
