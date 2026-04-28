import { Button } from '../ui/button'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { CarFront, Menu, X } from 'lucide-react'

const LandingNavbar = () => {
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleGetStarted = () => {
    // Implement the logic for handling the "Get Started" button click
    // For example, you can navigate to a sign-up page or open a modal
    console.log('Get Started button clicked')
    navigate('/login')
  }

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()
    setIsMenuOpen(false) // Close menu on click for mobile

    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className='flex justify-between items-center p-4 bg-white/90 backdrop-blur-md border-b border-gray-100 sticky top-0 z-50 transition-all shadow-lg shadow-blue-500/10'>
        <p className='font-medium cursor-pointer ml-2 md:ml-6 flex items-center font-bold text-xl text-gray-900 tracking-tight'>
          <span><CarFront className='text-blue-600 mr-2 h-7 w-7' /></span>
          Auto<span className='text-blue-600'>Sathi</span>
        </p>

        {/* Desktop Menu */}
        <div className='hidden md:flex justify-between items-center gap-2 lg:gap-6 font-medium'>
          <NavLink
            to='home'
            className='px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm rounded-lg hover:bg-blue-50/50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'home')}
          >
            Home
          </NavLink>
          <NavLink
            to='features'
            className='px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm rounded-lg hover:bg-blue-50/50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'features')}
          >
            Features
          </NavLink>
          <NavLink
            to='how-it-works'
            className='px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm rounded-lg hover:bg-blue-50/50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'how-it-works')}
          >
            How It Works
          </NavLink>
          <NavLink
            to='about'
            className='px-4 py-2 text-gray-600 hover:text-blue-600 transition-colors font-medium text-sm rounded-lg hover:bg-blue-50/50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'about')}
          >
            About Us
          </NavLink>
        </div>

        <div className='hidden md:block mr-2 md:mr-6'>
          <Button className='cursor-pointer rounded-full px-6 shadow-sm hover:shadow-md transition-all' onClick={handleGetStarted}>
            Login
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className='md:hidden flex items-center mr-2 rounded-xl p-2 hover:bg-gray-100 transition-colors duration-200'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-gray-700 hover:text-blue-600 cursor-pointer transition-colors'>
            {isMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className='md:hidden bg-white fixed top-[73px] left-0 right-0 p-4 border-b border-gray-100 shadow-xl z-40 flex flex-col gap-2 animate-in slide-in-from-top-2'>
          <NavLink
            to='home'
            className='px-4 py-3 text-center text-gray-600 hover:text-blue-600 transition-colors font-medium text-base rounded-xl hover:bg-blue-50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'home')}
          >
            Home
          </NavLink>
          <NavLink
            to='features'
            className='px-4 py-3 text-center text-gray-600 hover:text-blue-600 transition-colors font-medium text-base rounded-xl hover:bg-blue-50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'features')}
          >
            Features
          </NavLink>
          <NavLink
            to='how-it-works'
            className='px-4 py-3 text-center text-gray-600 hover:text-blue-600 transition-colors font-medium text-base rounded-xl hover:bg-blue-50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'how-it-works')}
          >
            How It Works
          </NavLink>
          <NavLink
            to='about'
            className='px-4 py-3 text-center text-gray-600 hover:text-blue-600 transition-colors font-medium text-base rounded-xl hover:bg-blue-50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'about')}
          >
            About Us
          </NavLink>
          <div className='pt-2 mt-2 border-t border-gray-100'>
            <Button className='cursor-pointer w-full rounded-xl py-6 text-base shadow-sm' onClick={handleGetStarted}>
              Login
            </Button>
          </div>
        </div>
      )}
    </>
  )
}

export default LandingNavbar
