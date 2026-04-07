import { Calendar } from '@/components/ui/calendar'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useUserData } from '@/contexts/UserContext'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'
import { useState } from 'react'
import { Button } from '@/components/ui/button'

const AddVehicle = () => {
  const [date, setDate] = useState()

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm()

  const AddVehiclehandler = async data => {
    try {
      // await addVehicle(data)'
      console.log(data)
    } catch (error) {
      console.log(error.message)
    }
  }

  return (
    <div>
      <Card className='w-full max-w-md mx-auto mt-10 p-6'>
        <h2 className='text-2xl font-bold mb-4'>Vehicle Identity</h2>

        <form onSubmit={handleSubmit(AddVehiclehandler)}>
          {/* Name */}
          <div className='mb-4'>
            {/* <label className='block text-gray-700 mb-2'>Name</label> */}
            <Label className='block text-gray-700 mb-2'>Vehicle Name</Label>
            <Input
              type='text'
              className='w-full px-3 py-2 border rounded'
              placeholder='Enter your Vehicle name'
              {...register('vehiclename', {
                required: 'Vehicle Name is required'
              })}
            />
            {errors.vehiclename && (
              <p className='text-red-500 text-sm'>
                {errors.vehiclename.message}
              </p>
            )}
          </div>

          {/* Email */}
          <div className='mb-4'>
            <Label className='block text-gray-700 mb-2'>
              Registration Number
            </Label>
            <Input
              type='text'
              className='w-full px-3 py-2 border rounded'
              placeholder='Enter registration number'
              {...register('registrationNumber', {
                required: 'Registration number is required'
              })}
            />
            {errors.registrationNumber && (
              <p className='text-red-500 text-sm'>
                {errors.registrationNumber.message}
              </p>
            )}
          </div>

          {/* <div className='mb-4'>
            <Label className='block text-gray-700 mb-2'>PUC Expiry</Label>
            <Calendar
              mode='single'
              selected={date}
              onSelect={setDate}
              className='rounded-lg border'
            />
            {errors.pucExpiry && (
              <p className='text-red-500 text-sm'>{errors.pucExpiry.message}</p>
            )}
          </div> */}

          <div className='mb-4'>
            <Label className='block text-gray-700 mb-2'>PUC Expiry</Label>
            <Input
              type='date'
              className='w-full px-3 py-2 border rounded'
              {...register('PucExpiry', {
                required: 'PUC Expiry is required'
              })}
            />
            {errors.PucExpiry && (
              <p className='text-red-500 text-sm'>{errors.PucExpiry.message}</p>
            )}
          </div>

          {/* Button */}
          <Button
            type='submit'
            className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 active:scale-98   '
          >
            Add Vehicle
          </Button>
          
        </form>
      </Card>
    </div>
  )
}

export default AddVehicle
