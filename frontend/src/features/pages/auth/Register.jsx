import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useUserData } from '@/contexts/UserContext'
import { registerUser } from '@/api/services/auth.api'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const {
    authError,
    authLoading,
    setAuthLoading,
    setAuthError,
    setIsAuthenticated,
    setUser
  } = useUserData()
  const navigate = useNavigate()

  const onSubmit = async data => {
    setAuthLoading(true)
    setAuthError('')
    try {
      const response = await registerUser(data)
      setIsAuthenticated(true)
      setUser(response?.user ?? null)
      navigate('/myvehicles')
    } catch (error) {
      setIsAuthenticated(false)
      setUser(null)
      setAuthError(error.message)
      console.log(error.message)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <div>
      <Link to='/'>Home</Link>

      <Card className='w-full max-w-md mx-auto mt-10 p-6'>
        <h2 className='text-2xl font-bold mb-4'>Register</h2>

        <form onSubmit={handleSubmit(onSubmit)}>
          {/* Name */}
          <div className='mb-4'>
            {/* <label className='block text-gray-700 mb-2'>Name</label> */}
            <Label className='block text-gray-700 mb-2'>Name</Label>
            <input
              type='text'
              className='w-full px-3 py-2 border rounded'
              placeholder='Enter your name'
              {...register('name', {
                required: 'Name is required'
              })}
            />
            {errors.name && (
              <p className='text-red-500 text-sm'>{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div className='mb-4'>
            <Label className='block text-gray-700 mb-2'>Email</Label>
            <input
              type='email'
              className='w-full px-3 py-2 border rounded'
              placeholder='Enter your email'
              {...register('email', {
                required: 'Email is required'
              })}
            />
            {errors.email && (
              <p className='text-red-500 text-sm'>{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div className='mb-4'>
            <label className='block text-gray-700 mb-2'>Password</label>
            <input
              type='password'
              className='w-full px-3 py-2 border rounded'
              placeholder='Enter your password'
              {...register('password', {
                required: 'Password is required',
                minLength: {
                  value: 6,
                  message: 'Minimum 6 characters required'
                }
              })}
            />
            {errors.password && (
              <p className='text-red-500 text-sm'>{errors.password.message}</p>
            )}
          </div>

          {/* Button */}
          <button
            type='submit'
            disabled={authLoading}
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 active:scale-98   '
          >
            {authLoading ? 'Registering...' : 'Register'}
          </button>

          {authError && (
            <p className='mt-2 text-sm text-red-500'>{authError}</p>
          )}

          {/* Register Link */}
          <div className='mt-2'>
            <span>You have an account? </span>
            <Link
              to='/login'
              className='text-blue-600 hover:underline scale-105 transition ease-in-out duration-200'
            >
              Login
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Register
