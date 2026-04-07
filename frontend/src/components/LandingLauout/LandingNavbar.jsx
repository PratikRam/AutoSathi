import { Button } from '../ui/button'
import { NavLink, useNavigate } from 'react-router-dom'

const LandingNavbar = () => {
  const navigate = useNavigate()
  const handleGetStarted = () => {
    // Implement the logic for handling the "Get Started" button click
    // For example, you can navigate to a sign-up page or open a modal
    console.log('Get Started button clicked')
    navigate('/login')
  }

  const handleSmoothScroll = (e, href) => {
    e.preventDefault()

    const targetId = href.replace('#', '')
    const targetElement = document.getElementById(targetId)

    if (targetElement) {
      targetElement.scrollIntoView({ behavior: 'smooth' })
    }
  }

  return (
    <>
      <div className='flex justify-between items-center p-4 bg-gray-400 rounded sticky top-0'>
        <p className='font-medium cursor-pointer ml-6'>
          <span className='text-blue-600 text-xl font-bold'>Auto</span>Sathi
        </p>

        <div className='flex justify-between items-center gap-6  font-medium'>
          <NavLink
            href='home'
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
        <div>
          <Button className='cursor-pointer' onClick={handleGetStarted}>
            Login
          </Button>
        </div>
      </div>
    </>
  )
}

export default LandingNavbar
