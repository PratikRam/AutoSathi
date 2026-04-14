import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { useUserData } from '@/contexts/UserContext'
import { loginUser } from '@/api/services/auth.api'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'

const Login = () => {
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
      const response = await loginUser(data)
      setIsAuthenticated(true)
      setUser(response?.user ?? null)
      navigate('/myvehicles')
    } catch (err) {
      setIsAuthenticated(false)
      setUser(null)
      setAuthError(err.message)
      console.log(err.message)
    } finally {
      setAuthLoading(false)
    }
  }

  return (
    <div>
      <Link to='/'>Home</Link>
      <Card className='w-full max-w-md mx-auto mt-10 p-6'>
        <Label className='text-2xl font-bold mb-4'>Login</Label>

        <form onSubmit={handleSubmit(onSubmit)}>
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
            <Label className='block text-gray-700 mb-2'>Password</Label>
            <input
              type='password'
              className='w-full px-3 py-2 border rounded'
              placeholder='Enter your password'
              {...register('password', {
                required: 'Password is required'
                // minLength: {
                //   value: 6,
                //   message: 'Minimum 6 characters required'
                // }
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
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 active:scale-98'
          >
            {authLoading ? 'Logging in...' : 'Login'}
          </button>

          {authError && (
            <p className='mt-2 text-sm text-red-500'>{authError}</p>
          )}

          {/* Register Link */}
          <div className='mt-2'>
            <span>You have no account? </span>
            <Link to='/register' className='text-blue-600 hover:underline'>
              Register
            </Link>
          </div>
        </form>
      </Card>
    </div>
  )
}

export default Login
