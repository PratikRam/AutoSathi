import React from 'react'
import { CarFront, FileCheck, CircleDollarSign, BellRing } from 'lucide-react'

const steps = [
  {
    step: 'Step 1',
    title: 'Add Your Vehicle',
    description: 'Enter your car or bike details.',
    icon: CarFront,
  },
  {
    step: 'Step 2',
    title: 'Save Service Records',
    description: 'Store maintenance history and important details.',
    icon: FileCheck,
  },
  {
    step: 'Step 3',
    title: 'Track Expenses',
    description: 'Monitor fuel costs, repairs, and renewal dates.',
    icon: CircleDollarSign,
  },
  {
    step: 'Step 4',
    title: 'Smart Reminders',
    description: 'Receive alerts for upcoming services and insurance renewals.',
    icon: BellRing,
  },
]

const LandingHowitsWork = () => {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white'>
      <div className='text-center max-w-3xl mx-auto mb-16'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight'>
          How AutoSathi Works
        </h2>
        <p className='text-lg text-gray-500 font-medium'>
          Manage your vehicle in just a few simple steps.
        </p>
      </div>

      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8'>
        {steps.map((item, index) => {
          const Icon = item.icon
          return (
            <div 
              key={index} 
              className='p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default group'
            >
              <div className='flex items-center gap-3 mb-5'>
                <div className='flex-shrink-0 w-10 h-10 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center group-hover:scale-110 transition-transform duration-300'>
                  <Icon size={20} className='stroke-[1.75]' />
                </div>
                <span className='text-xs md:text-sm font-bold text-blue-600 tracking-wider uppercase'>
                  {item.step}
                </span>
              </div>
              <h3 className='text-lg font-bold text-gray-900 mb-2'>
                {item.title}
              </h3>
              <p className='text-gray-500 font-medium leading-relaxed'>
                {item.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LandingHowitsWork