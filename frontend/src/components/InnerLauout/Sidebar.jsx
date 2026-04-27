import { logout } from '@/api/services/auth.api'
import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { CarFront, CircleUserRound, Menu, X, LogOut } from 'lucide-react'
import { CheckAuth } from '@/api/services/checkAuth.api'
import { useUserData } from '@/contexts/UserContext'

const Sidebar = () => {
  const [name, setName] = useState('')
  const [isOpen, setIsOpen] = useState(false)

  const navigate = useNavigate()
  const { setIsAuthenticated } = useUserData()

  const handleProfileClick = () => {
    navigate('/myprofile')
    setIsOpen(false)
  }

  const handleLogout = async () => {
    try {
      await logout()
      setIsAuthenticated(false)
    } catch (error) {
      console.error("Logout failed:", error)
    }
  }

  const user = async () => {
    try {
      const resp = await CheckAuth()
      if (resp?.user?.name) {
        const { name } = resp.user
        setName(name.charAt(0).toUpperCase() + name.slice(1))
      }
    } catch (error) {
      console.error("Auth check failed:", error)
    }
  }

  useEffect(() => {
    user()
  }, [])

  const menuItems = [
    { label: 'My Vehicles', path: '/myvehicles' },
    { label: 'Add Vehicle', path: '/addvehicle' },
    { label: 'Upcoming-Services', path: '/upcoming-services' }
  ]

  const handleNavClick = () => {
    setIsOpen(false)
  }

  return (
    <>
      {/* Floating Mobile Toggle Button */}
      <button
        className="md:hidden fixed top-5 bg-white right-5 z-[60] p-2.5 rounded-xl shadow-md border border-gray-100 text-gray-700 hover:text-blue-600 transition-all focus:outline-none"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle Menu"
      >
        {isOpen ? <X size={24} className="text-gray-900" /> : <Menu size={24} />}
      </button>

      {/* Mobile Backdrop Overlay */}
      {isOpen && (
        <div
          className="md:hidden fixed inset-0 bg-slate-900/40 z-[50] backdrop-blur-sm transition-opacity"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar Container */}
      <div className={`
        fixed md:sticky top-0 left-0 h-[100dvh] z-[55]
        w-72 md:w-64 bg-slate-50 border-r border-slate-200 p-6 flex flex-col
        transition-transform duration-300 ease-in-out shrink-0 overflow-y-auto
        ${isOpen ? 'translate-x-0 shadow-2xl' : '-translate-x-full shadow-none'} 
        md:translate-x-0 md:shadow-none
      `}>

        {/* Logo Header */}
        <h2 className='text-2xl font-bold text-gray-900 mb-10 mt-2 flex items-center gap-2.5'>
          <div className="bg-blue-600 p-2 rounded-xl text-white shadow-sm flex items-center justify-center">
            <CarFront size={22} className="stroke-[2.5]" />
          </div>
          <span className="tracking-tight">Auto<span className='text-blue-600'>Sathi</span></span>
        </h2>

        {/* Navigation Links */}
        <nav className='flex flex-col gap-2 flex-grow'>
          <span className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-2 px-1">Menu</span>
          {menuItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={handleNavClick}
              className={({ isActive }) =>
                isActive
                  ? 'px-4 py-3.5 text-[15px] font-bold text-blue-700 bg-blue-100/50 rounded-2xl transition-all border border-blue-200/50 flex items-center shadow-sm'
                  : 'px-4 py-3.5 text-[15px] font-semibold text-gray-600 hover:text-blue-600 hover:bg-slate-200/50 rounded-2xl transition-all flex items-center'
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* Footer Area (Logout & Profile) */}
        <div className="flex flex-col gap-4 mt-8 pt-8 border-t border-slate-200">

          <div
            onClick={handleProfileClick}
            className='flex items-center gap-3 px-4 py-3 cursor-pointer rounded-2xl bg-white border border-gray-100 shadow-sm hover:border-blue-300 hover:shadow-md transition-all group'
          >
            <div className="bg-slate-100 text-gray-600 p-2 rounded-full group-hover:bg-blue-600 group-hover:text-white transition-colors">
              <CircleUserRound size={20} />
            </div>
            <div className="flex flex-col overflow-hidden">
              <span className="text-[11px] text-gray-500 font-bold uppercase tracking-wider leading-none mb-1">Account</span>
              <span className='text-[15px] font-bold text-gray-900 leading-none truncate w-28'>{name || 'User'}</span>
            </div>
          </div>

          <button
            className='w-full flex items-center justify-center gap-2 text-red-600 hover:bg-red-600 hover:text-white bg-red-50 border border-red-100 shadow-sm font-bold text-[15px] h-12 rounded-2xl transition-all cursor-pointer'
            onClick={handleLogout}
          >
            Log out
          </button>

        </div>
      </div >
    </>
  )
}

export default Sidebar
