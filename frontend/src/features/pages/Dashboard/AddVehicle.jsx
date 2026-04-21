import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useForm } from 'react-hook-form'
import { Button } from '@/components/ui/button'
import { addVehicle } from '@/api/services/vehicle.api'
import useVehicleStore from '@/store/vehicleStore'
import { useNavigate } from 'react-router-dom'
import { Camera } from 'lucide-react'

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
    console.log('data is', data)

    const formData = new FormData()
    formData.append('vehicleName', data.vehicleName)
    formData.append('registrationNumber', data.registrationNumber)
    formData.append('purchaseDate', data.purchaseDate)
    formData.append('generalServiceDate', data.generalServiceDate)
    formData.append('insuranceExpiry', data.insuranceExpiry)
    formData.append('pucExpiry', data.pucExpiry)
    formData.append('image', data.vehiclePortrait[0])

    console.log(formData)

    try {
      setLoading(true)
      const response = await addVehicle(formData)
      // console.log(response.car)
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
    <div className='w-full min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 lg:p-8 font-sans'>
      <Card className='flex flex-col lg:flex-row w-full max-w-5xl overflow-hidden shadow-lg border-0 rounded-2xl bg-white'>
        {/* Left Side: Information & Branding */}
        <div className='w-full lg:w-5/12 bg-[#fafafa] p-8 lg:p-12 flex flex-col justify-between border-r border-gray-100'>
          <div>
            <h1 className='text-3xl lg:text-4xl font-bold mb-4 tracking-tight text-gray-900'>
              Expand Your
              <br />
              Collection.
            </h1>
            <p className='text-gray-600 mb-8 leading-relaxed text-sm'>
              Register a new vehicle to start tracking its mechanical lineage,
              service milestones, and regulatory compliance within the
              AutoSathi.
            </p>
          </div>
          <div className='mt-8 rounded-xl overflow-hidden relative h-64 lg:h-80 shadow-md'>
            <img
              src='images/bmw.avif'
              alt='Car Interior'
              className='object-cover w-full h-full brightness-[0.4] rounded-xl'
            />
            <div className='absolute bottom-6 left-6 right-6 text-white'>
              <h3 className='font-semibold text-lg leading-tight mb-1'>
                <span className='text-blue-500 font-bold shadow-white'>
                  AutoSathi
                </span>
                is the soul of performance.
              </h3>
            </div>
          </div>
        </div>

        {/* Right Side: Form */}
        <div className='w-full lg:w-7/12 p-8 lg:p-12 bg-white'>
          <form
            onSubmit={handleSubmit(AddVehiclehandler)}
            className='space-y-8 flex flex-col h-full'
          >
            {/* Vehicle Identity Section */}
            <div>
              <h3 className='text-lg font-semibold mb-5 text-gray-900'>
                Vehicle Identity
              </h3>
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2.5'>
                  <Label className='text-[11px] font-semibold text-gray-500 uppercase tracking-wide'>
                    Vehicle Name <span className='text-red-400'>*</span>
                  </Label>
                  <Input
                    type='text'
                    className='bg-gray-100/80 border-0 focus-visible:ring-1 focus-visible:ring-gray-300 rounded-lg shadow-none px-4 py-5'
                    placeholder='e.g. 911 Carrera S'
                    {...register('vehicleName', {
                      required: 'Vehicle Name is required'
                    })}
                  />
                  {errors.vehicleName && (
                    <p className='text-red-500 text-xs'>
                      {errors.vehicleName.message}
                    </p>
                  )}
                </div>
                <div className='space-y-2.5'>
                  <Label className='text-[11px] font-semibold text-gray-500 uppercase tracking-wide'>
                    Registration Number <span className='text-red-400'>*</span>
                  </Label>
                  <Input
                    type='text'
                    className='bg-gray-100/80 border-0 focus-visible:ring-1 focus-visible:ring-gray-300 rounded-lg shadow-none px-4 py-5'
                    placeholder='ABC-1234'
                    {...register('registrationNumber', {
                      required: 'Registration number is required'
                    })}
                  />
                  {errors.registrationNumber && (
                    <p className='text-red-500 text-xs'>
                      {errors.registrationNumber.message}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Compliance & Expiry Section */}
            <div className='pt-2'>
              <h3 className='text-lg font-semibold mb-5 text-gray-900'>
                Compliance & Expiry
              </h3>

              <div className='grid grid-cols-1 md:grid-cols-2 gap-4 mb-5'>
                <div className='space-y-2.5'>
                  <Label className='text-[11px] font-semibold text-gray-500 uppercase tracking-wide'>
                    Purchase Date <span className='text-red-400'>*</span>
                  </Label>
                  <Input
                    type='date'
                    className='bg-gray-100/80 border-0 focus-visible:ring-1 focus-visible:ring-gray-300 rounded-lg shadow-none px-4 py-5 text-gray-600 block w-full'
                    {...register('purchaseDate', {
                      required: 'Purchase Date is required'
                    })}
                  />
                  {errors.purchaseDate && (
                    <p className='text-red-500 text-xs'>
                      {errors.purchaseDate.message}
                    </p>
                  )}
                </div>

                <div className='space-y-2.5'>
                  <Label className='text-[11px] font-semibold text-gray-500 uppercase tracking-wide'>
                    General Service Date <span className='text-red-400'>*</span>
                  </Label>
                  <Input
                    type='date'
                    className='bg-gray-100/80 border-0 focus-visible:ring-1 focus-visible:ring-gray-300 rounded-lg shadow-none px-4 py-5 text-gray-600 block w-full'
                    {...register('generalServiceDate', {
                      required: 'General Service Date is required'
                    })}
                  />
                  {errors.generalServiceDate && (
                    <p className='text-red-500 text-xs'>
                      {errors.generalServiceDate.message}
                    </p>
                  )}
                </div>
              </div>

              {/* Purchase Date inserted to preserve functionality */}
              <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
                <div className='space-y-2.5'>
                  <Label className='text-[11px] font-semibold text-gray-500 uppercase tracking-wide'>
                    PUC Expiry Date <span className='text-red-400'>*</span>
                  </Label>
                  <Input
                    type='date'
                    className='bg-gray-100/80 border-0 focus-visible:ring-1 focus-visible:ring-gray-300 rounded-lg shadow-none px-4 py-5 text-gray-600 block w-full'
                    {...register('pucExpiry', {
                      required: 'PUC Expiry is required'
                    })}
                  />
                  {errors.pucExpiry && (
                    <p className='text-red-500 text-xs'>
                      {errors.pucExpiry.message}
                    </p>
                  )}
                  <p className='text-[10px] text-gray-400 italic mt-1'>
                    Pollution Under Control certification
                  </p>
                </div>

                <div className='space-y-2.5'>
                  <Label className='text-[11px] font-semibold text-gray-500 uppercase tracking-wide'>
                    Insurance Expiry Date <span className='text-red-400'>*</span>
                  </Label>
                  <Input
                    type='date'
                    className='bg-gray-100/80 border-0 focus-visible:ring-1 focus-visible:ring-gray-300 rounded-lg shadow-none px-4 py-5 text-gray-600 block w-full'
                    {...register('insuranceExpiry', {
                      required: 'Insurance Expiry is required'
                    })}
                  />
                  {errors.insuranceExpiry && (
                    <p className='text-red-500 text-xs'>
                      {errors.insuranceExpiry.message}
                    </p>
                  )}
                  <p className='text-[10px] text-gray-400 italic mt-1'>
                    Valid comprehensive or third-party cover
                  </p>
                </div>
              </div>
            </div>

            {/* Vehicle Portrait Section */}
            <div className='pt-2'>
              <Label className='text-[11px] font-semibold text-gray-500 uppercase tracking-wide mb-3 block'>
                Vehicle Portrait <span className='text-red-400'>*</span>
              </Label>

              <Input
                className='border-2 border-dashed border-gray-200 rounded-xl p-6 lg:p-8 flex flex-col items-center justify-center text-center cursor-pointer hover:bg-gray-50/80 transition-colors group'
                type='file'
                accept='image/*'
                {...register('vehiclePortrait', {
                  required: 'Vehicle Portrait is required'
                })}
              >
                {/* <div className='bg-white p-3 rounded-full shadow-sm mb-3 group-hover:scale-105 transition-transform'>
                  <Camera className='h-6 w-6 text-gray-400' />
                </div> */}
                {/* <p className='text-xs text-gray-500 font-medium'>Click to upload high-resolution image</p> */}
              </Input>
            </div>

            {/* Action Buttons */}
            <div className='flex justify-between items-center mt-auto pt-6'>
              <Button
                type='button'
                variant='ghost'
                className='text-gray-500 hover:text-gray-700 hover:bg-gray-100 cursor-pointer'
                onClick={() => navigate('/myvehicles')}
              >
                Cancel
              </Button>
              <Button
                type='submit'
                className='bg-[#5a5c65] hover:bg-[#4a4c51] text-white rounded-lg px-6 py-5 shadow-sm transition-all cursor-pointer'
              >
                Add Vehicle
              </Button>
            </div>
          </form>
        </div>
      </Card>
    </div>
  )
}

export default AddVehicle
