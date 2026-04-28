import { Card } from '@/components/ui/card'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useUserData } from '@/contexts/UserContext'
import { registerUser } from '@/api/services/auth.api'
import React from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowLeft, Loader2, UserPlus } from 'lucide-react'

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
    <div className='min-h-screen flex flex-col justify-center py-12 sm:px-6 lg:px-8 bg-slate-50/50'>
      <div className='sm:mx-auto sm:w-full sm:max-w-md px-4'>
        
        <Link 
            to='/' 
            className="inline-flex items-center text-sm font-semibold text-gray-500 hover:text-blue-600 transition-colors mb-6 group w-fit"
        >
            <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1.5 transition-transform" />
            Back to Home
        </Link>
        
        <Card className='w-full py-8 px-6 sm:px-10 border-gray-100 shadow-sm rounded-2xl bg-white'>
          <div className="mb-8 flex flex-col gap-2">
            <h2 className='text-3xl font-bold tracking-tight text-gray-900'>Create an account</h2>
            <p className="text-gray-500 text-[15px]">Sign up below to get started with AutoSathi.</p>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
            <div className='space-y-1.5'>
              <Label className='block text-gray-700 font-medium'>Full Name</Label>
              <Input
                type='text'
                className='w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-11 shadow-sm'
                placeholder='Enter your full name'
                {...register('name', { required: 'Name is required' })}
              />
              {errors.name && (
                <p className='text-red-500 text-xs font-medium mt-1'>{errors.name.message}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label className='block text-gray-700 font-medium'>Email Address</Label>
              <Input
                type='email'
                className='w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-11 shadow-sm'
                placeholder='name@example.com'
                {...register('email', { required: 'Email is required' })}
              />
              {errors.email && (
                <p className='text-red-500 text-xs font-medium mt-1'>{errors.email.message}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label className='block text-gray-700 font-medium'>Password</Label>
              <Input
                type='password'
                className='w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-xl h-11 shadow-sm'
                placeholder='Create a secure password'
                {...register('password', { 
                    required: 'Password is required',
                    minLength: {
                        value: 6,
                        message: 'Minimum 6 characters required'
                    } 
                })}
              />
              {errors.password && (
                <p className='text-red-500 text-xs font-medium mt-1'>{errors.password.message}</p>
              )}
            </div>

            {authError && (
              <div className="p-2 bg-red-50 border border-red-100 text-red-600 rounded-xl text-sm font-medium w-fit text-center">
                {authError}
              </div>
            )}

            <Button
              type='submit'
              disabled={authLoading}
              className='w-full bg-blue-600 text-white hover:bg-blue-700 transition-all duration-200 active:scale-[0.98] cursor-pointer h-12 mt-6 rounded-xl font-medium text-[15px] shadow-sm flex items-center justify-center'
            >
              {authLoading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Creating account...
                </>
              ) : (
                <>
                  <UserPlus className="mr-2 h-5 w-5" />
                  Create Account
                </>
              )}
            </Button>

            <div className='mt-8 text-center text-[15px] text-gray-600 font-medium pt-6 border-t border-gray-100'>
              Already have an account?
              <Link to='/login' className='text-blue-600 hover:text-blue-700 font-bold transition-colors hover:underline ml-1'>
                Sign in
              </Link>
            </div>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default Register
