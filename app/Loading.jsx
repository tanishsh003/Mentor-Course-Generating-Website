'use client';

import React from 'react';

export default function Loading() {
  return (
    <div className="flex items-center justify-center h-screen w-full bg-black">
      <div className="flex flex-col items-center space-y-4">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-blue-500 border-opacity-70"></div>
        <p className="text-lg font-medium text-gray-600">Loading, please wait...</p>
      </div>
    </div>
  );
}