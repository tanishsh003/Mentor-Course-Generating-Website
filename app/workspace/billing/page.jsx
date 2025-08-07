import { PricingTable } from '@clerk/nextjs'
import React from 'react'

const Billing = () => {
  return (
    <div>
      <h2 className='font-bold text-3xl mb-5'>Select Plan that you want</h2>
      <PricingTable/>
      
    </div>
  )
}

export default Billing
