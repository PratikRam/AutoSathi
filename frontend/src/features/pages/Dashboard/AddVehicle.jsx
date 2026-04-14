import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { addVehicle } from '@/api/services/vehicle.api'
import useVehicleStore from '@/store/vehicleStore'
import { useNavigate } from 'react-router-dom'

const AddVehicle = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const { addVehicleToList, setLoading, setError } = useVehicleStore()

  const navigate = useNavigate()
  const AddVehiclehandler = async data => {
    try {
      setLoading(true)
      const response = await addVehicle(data)
      console.log(response.car)
      addVehicleToList(response.car)
      setError(null)
      reset() // Clear form after successful submission
      alert('Vehicle added successfully!')
      navigate('/myvehicles')
    } catch (error) {
      setError(error.message)
      console.log(error.message)
    } finally {
      setLoading(false)
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
              {...register('vehicleName', {
                required: 'Vehicle Name is required'
              })}
            />
            {errors.vehicleName && (
              <p className='text-red-500 text-sm'>
                {errors.vehicleName.message}
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
              {...register('pucExpiry', {
                required: 'PUC Expiry is required'
              })}
            />
            {errors.pucExpiry && (
              <p className='text-red-500 text-sm'>{errors.pucExpiry.message}</p>
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
