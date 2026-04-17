import { logout } from '@/api/services/auth.api'
import React, { useEffect, useState } from 'react'
import { Navigate, NavLink, useNavigate } from 'react-router-dom'
import { Button } from '../ui/button'
import { CircleUserRound } from 'lucide-react'
import { CheckAuth } from '@/api/services/checkAuth.api'

const Sidebar = () => {

  const [name, setName] = useState('')

  const navigate = useNavigate()

  const handleProfileClick = () => {
    navigate('/profile')
  }

  const user = async () => {
    const user = await CheckAuth()
    const { name, email } = user.user
    setName(name.charAt(0).toUpperCase() + name.slice(1))
  }

  useEffect(() => {
    user()
  }, [])

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
        className='px-4 py-3 text-left font-medium text-white bg-red-500 hover:bg-red-600 rounded-lg absolute bottom-20 cursor-pointer'
        onClick={async () => {
          await logout()
          navigate('/')
        }}

      >
        Log out
      </Button>
      <div className='flex items-center gap-2 absolute bottom-5'>
        <CircleUserRound className='cursor-pointer h-8 w-8 hover:bg-gray-200 rounded-full transition-all duration-200 hover:scale-110' />
        <p className=''>{name}</p>
      </div>
    </div >
  )
}

export default Sidebar
