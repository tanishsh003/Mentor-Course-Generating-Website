import React from 'react'

const Loader = () => {
  return (
    <div className="flex items-center justify-center p-4 bg-transparent">
            <div className="flex flex-col items-center space-y-2">
              <div className="animate-spin rounded-full h-8 w-8 border-t-4 border-blue-500 border-opacity-70"></div>
              <p className="text-sm font-medium text-gray-600">
                Loading, please wait...
              </p>
            </div>
          </div>
  )
}

export default Loader
