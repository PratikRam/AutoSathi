import { Button } from '@/components/ui/button'
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { ShieldCheck, Wrench, Receipt, ArrowRight } from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()

  return (
    <div className="relative flex items-center justify-center overflow-hidden bg-gradient-to-b from-blue-50/50 to-white">
      {/* Background Decor */}
      <div className="absolute top-0 right-0 -mr-20 -mt-20 w-96 h-96 rounded-full bg-blue-100/50 blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 -ml-20 -mb-20 w-80 h-80 rounded-full bg-blue-50 blur-3xl opacity-60"></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 pb-16 md:pt-12 md:pb-24 flex flex-col lg:flex-row items-center gap-12 lg:gap-8 z-10 w-full">

        {/* Left Column - Content */}
        <div className="flex-1 text-center lg:text-left mt-4 lg:mt-0">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-50 border border-blue-100 text-blue-600 text-sm font-medium mb-6">
            <span className="flex h-2 w-2 rounded-full bg-blue-600"></span>
            Smart Vehicle Management
          </div>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 leading-[1.15] tracking-tight mb-6">
            Never Miss Your <br className="hidden lg:block" />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">Vehicle Service</span> Again
          </h1>

          <p className="text-xl text-gray-600 font-medium mb-4 max-w-2xl mx-auto lg:mx-0">
            Track service history, expenses, insurance renewals, and maintenance reminders — all in one smart dashboard.
          </p>

          <p className="text-base text-gray-500 mb-8 max-w-2xl mx-auto lg:mx-0">
            AutoSathi helps vehicle owners organize records, manage expenses, and stay updated with important service dates seamlessly.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
            <Button
              size="lg"
              className="w-full sm:w-auto h-12 px-8 rounded-full text-base font-semibold shadow-lg shadow-blue-500/30 hover:shadow-blue-500/50 transition-all hover:-translate-y-0.5"
              onClick={() => navigate('/login')}
            >
              Get Started <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            {/* <Button
              variant="outline"
              size="lg"
              className="w-full sm:w-auto h-12 px-8 rounded-full text-base font-semibold border-gray-300 hover:bg-gray-50 transition-all"
              onClick={() => navigate('/about')}
            >
              Learn More
            </Button> */}
          </div>

          {/* Social Proof / Stats block */}
          <div className="mt-10 pt-8 border-t border-gray-100 flex flex-wrap items-center justify-center lg:justify-start gap-8 lg:gap-12">
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">10k+</p>
              <p className="text-sm text-gray-500 font-medium">Active Users</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">99%</p>
              <p className="text-sm text-gray-500 font-medium">On-time Services</p>
            </div>
            <div>
              <p className="text-2xl sm:text-3xl font-bold text-gray-900">4.9/5</p>
              <p className="text-sm text-gray-500 font-medium">User Rating</p>
            </div>
          </div>
        </div>

        {/* Right Column - Visual */}
        <div className="flex-1 w-full relative perspective-1000 mt-10 lg:mt-0">
          <div className="relative w-full max-w-lg mx-auto lg:max-w-none lg:w-[110%] lg:-mr-[10%]">

            {/* Decorative blob behind image */}
            {/* <div className="absolute inset-0 bg-gradient-to-tr from-blue-100 to-indigo-50 rounded-3xl transform rotate-3 scale-105 -z-10 transition-transform duration-700 hover:rotate-6"></div> */}

            {/* Main Dashboard Image */}
            <div className="relative bg-white p-2 sm:p-3 rounded-2xl shadow-2xl border border-gray-100 transform transition duration-500 hover:scale-[1.02] ">
              <img
                src='/images/landingpage.jpg '
                alt='Vehicle Tracking Dashboard UI'
                className='w-full h-auto rounded-xl shadow-sm object-cover aspect-video sm:aspect-auto'
                onError={(e) => {
                  e.target.src = '/images/landingpage.jpg'; // Fallback
                }}
              />
            </div>

            {/* Floating Badges */}
            {/* Badge 1: Insurance */}
            <div className="hidden md:flex absolute -left-12 top-10 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-xl border border-gray-100 items-center gap-3 animate-bounce" style={{ animationDuration: '3s' }}>
              <div className="p-2.5 rounded-xl bg-green-100 text-green-600">
                <ShieldCheck size={20} className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">Insurance Active</p>
                <p className="text-xs text-gray-500 font-medium">Renews in 45 days</p>
              </div>
            </div>

            {/* Badge 2: Service Due */}
            {/* <div className="hidden md:flex absolute -right-8 -top-6 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-xl border border-gray-100 items-center gap-3 animate-bounce" style={{ animationDuration: '4s', animationDelay: '1s' }}>
               <div className="p-2.5 rounded-xl bg-amber-100 text-amber-600">
                 <Wrench size={20} className="w-5 h-5" />
               </div>
               <div>
                 <p className="text-sm font-bold text-gray-900">Service Alert</p>
                 <p className="text-xs text-gray-500 font-medium">Due in 500 km</p>
               </div>
             </div> */}

            {/* Badge 3: Expense */}
            <div className="hidden lg:flex absolute -right-4 bottom-12 bg-white/95 backdrop-blur-sm p-3.5 rounded-2xl shadow-xl border border-gray-100 items-center gap-3 animate-bounce" style={{ animationDuration: '3.5s', animationDelay: '0.5s' }}>
              <div className="p-2.5 rounded-xl bg-blue-100 text-blue-600">
                <Receipt size={20} className="w-5 h-5" />
              </div>
              <div>
                <p className="text-sm font-bold text-gray-900">₹8,500</p>
                <p className="text-xs text-gray-500 font-medium">Recent Maintenance</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  )
}

export default Home
