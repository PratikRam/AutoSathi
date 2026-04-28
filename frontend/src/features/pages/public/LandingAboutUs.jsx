import React from 'react'
import { ShieldCheck, Target, HeartHandshake } from 'lucide-react'

const LandingAboutUs = () => {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white border-t border-gray-50'>
      <div className='flex flex-col lg:flex-row gap-12 lg:gap-24 items-start'>
        
        {/* Left Column - Heading */}
        <div className='lg:w-1/3 top-24'>
          <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight'>
            About AutoSathi
          </h2>
          <p className='text-xl text-blue-600 font-semibold leading-snug'>
            Making vehicle management simple and stress-free.
          </p>
          
          <div className='hidden lg:flex flex-col gap-6 mt-12'>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center'>
                <Target size={20} />
              </div>
              <span className='font-medium text-gray-700'>Purpose-Driven</span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center'>
                <ShieldCheck size={20} />
              </div>
              <span className='font-medium text-gray-700'>Secure Records</span>
            </div>
            <div className='flex items-center gap-4'>
              <div className='w-10 h-10 rounded-full bg-blue-50 text-blue-600 flex items-center justify-center'>
                <HeartHandshake size={20} />
              </div>
              <span className='font-medium text-gray-700'>User-Centric</span>
            </div>
          </div>
        </div>
        
        {/* Right Column - Content */}
        <div className='lg:w-2/3 space-y-8 text-lg text-gray-600 leading-relaxed font-medium bg-gray-50/50 p-8 sm:p-10 rounded-3xl border border-gray-100/50 shadow-sm'>
          <p>
            AutoSathi is a smart vehicle management platform designed to help users keep track of their vehicle maintenance in one place.
          </p>
          <p>
            Users can store service history, track expenses, receive insurance renewal reminders, and manage upcoming service schedules without worrying about missing important dates.
          </p>
          <p>
            Our goal is to simplify vehicle maintenance and help people keep their vehicles organized, safe, and well-maintained.
          </p>
          
          <div className='grid grid-cols-1 sm:grid-cols-2 gap-6 pt-8 mt-8 border-t border-gray-200'>
             <div className='bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4'>
               <h4 className='text-3xl font-extrabold text-gray-900'>0</h4>
               <p className='text-sm text-gray-500 font-semibold leading-tight'>Missed<br/>Services</p>
             </div>
             <div className='bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4'>
               <h4 className='text-3xl font-extrabold text-gray-900'>100%</h4>
               <p className='text-sm text-gray-500 font-semibold leading-tight'>Peace<br/>of Mind</p>
             </div>
          </div>
        </div>

      </div>
    </section>
  )
}

export default LandingAboutUs
