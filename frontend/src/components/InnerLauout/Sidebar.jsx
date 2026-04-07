import React from 'react'
import { NavLink, useNavigate } from 'react-router-dom'

const Sidebar = () => {
  const navigate = useNavigate()

  const menuItems = [
    { label: 'My Vehicles', path: '/myvehicles' },
    { label: 'Add Vehicle', path: '/addvehicle' },
    { label: 'Services', path: '/servicevehicle' },
    { label: 'New Service Entry', path: '/newserviceentry' }
  ]

  return (
    <div className='w-64 bg-sky-50 border-r border-gray-200 min-h-screen p-5'>
      <h2 className='text-2xl font-semibold text-gray-900 mb-8'>Dashboard</h2>
      <nav className='flex flex-col gap-2 '>
        {menuItems.map(item => (
          <NavLink
            key={item.path}
            to={item.path}
            className={({ isActive }) =>
              isActive
                ? 'px-4 py-3 text-left font-medium bg-blue-100 text-blue-600 rounded-lg transition-all duration-300 hover:bg-blue-100 hover:text-blue-600 hover:translate-x-1 active:bg-blue-200'
                : 'px-4 py-3 text-left font-medium text-gray-700 hover:bg-sky-100 rounded-lg'
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>
    </div>
  )
}

export default Sidebar
