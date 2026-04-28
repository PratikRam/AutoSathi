import React from 'react'
import { ClipboardList, LineChart, BellRing, CalendarDays, FileText, CarFront } from 'lucide-react'

const features = [
  {
    title: 'Service History',
    description: 'Store complete vehicle maintenance records.',
    icon: ClipboardList,
  },
  {
    title: 'Expense Tracking',
    description: 'Track fuel and repair expenses.',
    icon: LineChart,
  },
  {
    title: 'Insurance Alerts',
    description: 'Get renewal reminders before expiry.',
    icon: BellRing,
  },
  {
    title: 'Service Reminders',
    description: 'Never miss upcoming maintenance dates.',
    icon: CalendarDays,
  },
  {
    title: 'PDF Reports',
    description: 'Download complete vehicle history reports.',
    icon: FileText,
  },
  {
    title: 'Multi Vehicle Support',
    description: 'Manage multiple vehicles easily.',
    icon: CarFront,
  },
]

const LandingFeatures = () => {
  return (
    <section className='py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white'>
      <div className='text-center max-w-3xl mx-auto mb-16'>
        <h2 className='text-3xl md:text-4xl font-extrabold text-gray-900 mb-5 tracking-tight'>
          Everything You Need to Manage Your Vehicle
        </h2>
        <p className='text-lg text-gray-500 font-medium'>
          Track services, expenses, insurance renewals, and vehicle records in one place.
        </p>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8'>
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <div
              key={index}
              className='p-6 md:p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-md hover:-translate-y-1 transition-all duration-300 cursor-default group'
            >
              <div className='w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300'>
                <Icon size={24} className='stroke-[1.75]' />
              </div>
              <h3 className='text-xl font-bold text-gray-900 mb-3'>
                {feature.title}
              </h3>
              <p className='text-gray-500 font-medium leading-relaxed'>
                {feature.description}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default LandingFeatures