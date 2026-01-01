import React from 'react'
import {PricingTable} from '@clerk/clerk-react'

const Plan = () => {
  return (
    <div className='max-w-2xl mx-auto z-20 my-30'>
        <div className='text-center'>
            <h2 className='text-[#E6E6E6] text-[42px] font-semibold'>Choose Plan</h2>
            <p className='text-[#A8A8A8] max-w-lg mx-auto'>Find the perfect plan that goes with your needs</p>
        </div>
        <br />
        <br />
        <div className='mt-14 max-sm:mx-8'>
            <PricingTable/>
        </div>
      
    </div>
  )
}

export default Plan 

