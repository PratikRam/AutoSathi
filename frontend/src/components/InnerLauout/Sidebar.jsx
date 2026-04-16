import { logout } from '@/api/services/auth.api'
import React from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'

const Sidebar = () => {
  const navigate = useNavigate()

  const menuItems = [
    { label: 'My Vehicles', path: '/myvehicles' },
    { label: 'Add Vehicle', path: '/addvehicle' },
    { label: 'All Maintenances', path: '/allmaintenances' }
    // { label: 'Services', path: '/servicevehicle' },
    // { label: 'New Service Entry', path: '/newserviceentry' }
  ]

  return (
    <div className='w-64 bg-gray-100 border-r border-gray-200 min-h-screen p-5 sticky top-0 h-screen'>
      <h2 className='text-2xl font-semibold text-gray-900 mb-8'>Dashboard</h2>
      <nav className='flex flex-col gap-2 '>
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'px-4 py-3 text-left font-medium font-semibold text-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 hover:translate-x-1 active:bg-blue-200'
                : 'px-4 py-3 text-left font-medium text-gray-700 hover:bg-gray-200 rounded-lg'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
      <Button
        className='px-4 py-3 text-left font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg absolute bottom-5'
        onClick={async () => {
          await logout()
          navigate('./login')
        }}
      >
        Log out
      </Button>
    </div >
  )
}

export default Sidebar
