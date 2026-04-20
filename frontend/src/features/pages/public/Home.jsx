import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'

const Home = () => {
  const navigate = useNavigate()
  return (
    <div className='flex flex-col md:flex-row justify-between items-center p-4 md:p-8 gap-8'>
      <div className='flex-1 mt-8 md:mt-0'>
        <p className='text-3xl md:text-4xl font-bold mb-4 text-center md:text-left'>
          Manage your <span className='text-blue-600 text-4xl md:text-5xl block md:inline mt-2 md:mt-0'>Vehicle</span> smartly
        </p>
        <p className='text-base md:text-lg text-gray-600 mb-6 text-center md:text-left'>
          track services, expences, insurence and never miss a due date again
        </p>
        <div className='flex justify-center md:justify-start'>
          <Button className='w-full md:w-auto' onClick={() => navigate('/login')}>Get Started</Button>
        </div>
      </div>
      <div className='flex-1 w-full'>
        <img
          src='/images/car.avif'
          alt='car'
          className='w-full h-auto rounded-lg shadow-lg'
        />
      </div>
    </div>
  )
}

export default Home
