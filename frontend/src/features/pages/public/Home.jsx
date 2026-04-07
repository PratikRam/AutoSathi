import { Button } from '@/components/ui/button'
import React from 'react'

const Home = () => {
  return (
    <div className='flex justify-between items-center p-8 gap-8'>
      <div className='flex-1'>
        <p className='text-4xl font-bold mb-4'>
          Manage your <span className='text-blue-600 text-5xl'>Vehicle</span> smartly
        </p>
        <p className='text-lg text-gray-600 mb-6'>
          track services, expences,insurence and never miss a due date again
        </p>
        <Button>Get Started</Button>
      </div>
      <div className='flex-1'>
        <img
          src='/images/car.avif'
          alt='car'
          className='w-full h-auto rounded'
        />
      </div>
    </div>
  )
}

export default Home
