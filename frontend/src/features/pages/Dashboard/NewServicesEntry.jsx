import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from 'postcss'
import { Label } from 'radix-ui'
import React from 'react'
import { useForm } from 'react-hook-form'
import useServiceStore from '@/store/servicesStore'
import { useNavigate } from 'react-router-dom'

const NewServicesEntry = () => {

  const { register, handleSubmit, formState: { errors } } = useForm()
  const { addService, loading, error, setLoading, setError } = useServiceStore()

  const navigate = useNavigate()

  const AddServicehandler = async (data) => {
    try {
      setLoading(true)
      const response = await addService(data)
      console.log(response)
      setError(null)
      reset()
      navigate('/serviceshistory')
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card className='w-full max-w-md mx-auto mt-10 p-6'>
      <h2 className='text-2xl font-bold mb-4'>Add New Service</h2>

      <form onSubmit={handleSubmit(AddServicehandler)}>
        {/* Name */}
        <div className='mb-4'>
          {/* <label className='block text-gray-700 mb-2'>Name</label> */}
          <Label className='block text-gray-700 mb-2'>Service Date</Label>
          <Input
            type='date'
            className='w-full px-3 py-2 border rounded'
            {...register('serviceDate', {
              required: 'Service Date is required'
            })}
          />
          {errors.serviceDate && (
            <p className='text-red-500 text-sm'>
              {errors.serviceDate.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <Label className='block text-gray-700 mb-2'>
            Garage Name
          </Label>
          <Input
            type='text'
            className='w-full px-3 py-2 border rounded'
            {...register('garageName', {
              required: 'Garage name is required'
            })}
          />
          {errors.garageName && (
            <p className='text-red-500 text-sm'>
              {errors.garageName.message}
            </p>
          )}
        </div>

        <div className='mb-4'>
          <Label className='block text-gray-700 mb-2'>Cost</Label>
          <Input
            type='number'
            className='w-full px-3 py-2 border rounded'
            {...register('cost', {
              required: 'Cost is required'
            })}
          />
          {errors.cost && (
            <p className='text-red-500 text-sm'>{errors.cost.message}</p>
          )}
        </div>

        {/* Button */}
        <Button
          type='submit'
          className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 active:scale-98   '
        >
          Add Service
        </Button>
      </form>
    </Card>
  )
}

export default NewServicesEntry