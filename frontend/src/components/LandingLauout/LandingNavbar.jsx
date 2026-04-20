import { Button } from '../ui/button'
import { NavLink, useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

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
      <div className='flex justify-between items-center p-4 bg-gray-400 rounded sticky top-0 z-50'>
        <p className='font-medium cursor-pointer ml-2 md:ml-6'>
          <span className='text-blue-600 text-xl font-bold'>Auto</span>Sathi
        </p>

        {/* Desktop Menu */}
        <div className='hidden md:flex justify-between items-center gap-6 font-medium'>
          <NavLink
            to='home'
            className='px-4 py-2 text-slate-700 hover:text-emerald-600 transition-colors font-medium text-md rounded-lg hover:bg-emerald-50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'home')}
          >
            Home
          </NavLink>
          <NavLink
            to='features'
            className='px-4 py-2 text-slate-700 hover:text-emerald-600 transition-colors font-medium text-md rounded-lg hover:bg-emerald-50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'features')}
          >
            Features
          </NavLink>
          <NavLink
            to='how-it-works'
            className='px-4 py-2 text-slate-700 hover:text-emerald-600 transition-colors font-medium text-md rounded-lg hover:bg-emerald-50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'how-it-works')}
          >
            How It Work
          </NavLink>
          <NavLink
            href='about'
            className='px-4 py-2 text-slate-700 hover:text-emerald-600 transition-colors font-medium text-md rounded-lg hover:bg-emerald-50 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'about')}
          >
            About Us
          </NavLink>
        </div>
        
        <div className='hidden md:block mr-2 md:mr-6'>
          <Button className='cursor-pointer' onClick={handleGetStarted}>
            Login
          </Button>
        </div>

        {/* Mobile Menu Toggle Button */}
        <div className='md:hidden flex items-center mr-2 bg-gray-200 rounded-full p-2 hover:scale-110 transition-all duration-200'>
          <button onClick={() => setIsMenuOpen(!isMenuOpen)} className='text-gray-700 hover:text-gray-900 cursor-pointer'>
            {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu Dropdown */}
      {isMenuOpen && (
        <div className='md:hidden bg-gray-300 fixed top-[72px] left-0 right-0 p-4 rounded-b shadow-lg z-40 flex flex-col gap-4'>
          <NavLink
            to='home'
            className='px-4 py-2 text-center text-slate-700 hover:text-emerald-600 transition-colors font-medium text-md rounded-lg hover:bg-gray-200 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'home')}
          >
            Home
          </NavLink>
          <NavLink
            to='features'
            className='px-4 py-2 text-center text-slate-700 hover:text-emerald-600 transition-colors font-medium text-md rounded-lg hover:bg-gray-200 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'features')}
          >
            Features
          </NavLink>
          <NavLink
            to='how-it-works'
            className='px-4 py-2 text-center text-slate-700 hover:text-emerald-600 transition-colors font-medium text-md rounded-lg hover:bg-gray-200 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'how-it-works')}
          >
            How It Work
          </NavLink>
          <NavLink
            href='about'
            className='px-4 py-2 text-center text-slate-700 hover:text-emerald-600 transition-colors font-medium text-md rounded-lg hover:bg-gray-200 cursor-pointer'
            onClick={e => handleSmoothScroll(e, 'about')}
          >
            About Us
          </NavLink>
          <Button className='cursor-pointer w-full mt-2' onClick={handleGetStarted}>
            Login
          </Button>
        </div>
      )}
    </>
  )
}

export default LandingNavbar
