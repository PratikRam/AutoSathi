import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import React from 'react'
import { useForm } from 'react-hook-form'
import useServiceStore from '@/store/servicesStore'
import { useNavigate, useParams } from 'react-router-dom'
import { Textarea } from '@/components/ui/textarea'
import { addServiceHandler } from '@/api/services/services.api'
import { ArrowLeft, Loader2, Wrench } from 'lucide-react'

const NewServicesEntry = () => {
  const { register, handleSubmit, formState: { errors }, reset } = useForm()
  const { loading, error, setLoading, setError } = useServiceStore()
  const { id } = useParams()
  const navigate = useNavigate()

  const AddServicehandler = async (data) => {
    try {
      setLoading(true)
      const response = await addServiceHandler(id, data)
      console.log(response)
      setError(null)
      reset()
      navigate(`/serviceshistory/${id}`)
    } catch (error) {
      setError(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='w-full p-4 sm:p-6 lg:p-8 flex items-center justify-center min-h-[85vh] bg-slate-50/50'>
      <div className="w-full max-w-lg">
        <button 
          type="button"
          onClick={() => navigate(`/serviceshistory/${id}`)}
          className="flex items-center text-sm font-medium text-gray-500 hover:text-blue-600 transition-colors mb-6 group w-fit"
        >
          <ArrowLeft size={16} className="mr-1.5 group-hover:-translate-x-1.5 transition-transform" />
          Back to Service History
        </button>

        <Card className='w-full p-6 sm:p-8 border-gray-100 shadow-sm rounded-2xl bg-white'>
          <div className="mb-8">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-5">
              <Wrench size={24} />
            </div>
            <h2 className='text-2xl font-bold text-gray-900 tracking-tight'>Record New Service</h2>
            <p className="text-gray-500 text-sm mt-1.5">Enter the details of the vehicle maintenance or repair.</p>
          </div>

          <form onSubmit={handleSubmit(AddServicehandler)} className="space-y-5">
            <div className='space-y-1.5'>
              <Label className='text-gray-700 font-medium'>Service Date</Label>
              <Input
                type='date'
                className='w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm h-11'
                {...register('serviceDate', {
                  required: 'Service Date is required'
                })}
              />
              {errors.serviceDate && (
                <p className='text-red-500 text-xs font-medium mt-1'>{errors.serviceDate.message}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label className='text-gray-700 font-medium'>Garage / Workshop Name</Label>
              <Input
                type='text'
                placeholder='e.g. Super Motors Care'
                className='w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm h-11'
                {...register('garageName', {
                  required: 'Garage name is required'
                })}
              />
              {errors.garageName && (
                <p className='text-red-500 text-xs font-medium mt-1'>{errors.garageName.message}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label className='text-gray-700 font-medium'>Total Cost (₹)</Label>
              <Input
                type='number'
                min="0"
                step="any"
                placeholder='e.g. 1500'
                className='w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm h-11'
                {...register('cost', {
                  required: 'Cost is required',
                  min: { value: 0, message: 'Cost cannot be negative' },
                  valueAsNumber: true
                })}
              />
              {errors.cost && (
                <p className='text-red-500 text-xs font-medium mt-1'>{errors.cost.message}</p>
              )}
            </div>

            <div className='space-y-1.5'>
              <Label className='text-gray-700 font-medium'>Service Notes / Description</Label>
              <Textarea
                placeholder='e.g. Engine oil replaced, brakes checked, and general washing.'
                className='w-full border-gray-200 focus:border-blue-500 focus:ring-blue-500 rounded-lg shadow-sm min-h-[100px] resize-y'
                {...register('notes', {
                  required: 'Notes are required'
                })}
              />
              {errors.notes && (
                <p className='text-red-500 text-xs font-medium mt-1'>{errors.notes.message}</p>
              )}
            </div>

            {error && (
              <div className="p-3 bg-red-50 border border-red-100 text-red-600 rounded-lg text-sm font-medium">
                {error}
              </div>
            )}

            <Button
              type='submit'
              disabled={loading}
              className='w-full bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all duration-200 active:scale-[0.98] cursor-pointer h-12 mt-6 font-medium text-[15px] shadow-sm'
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Saving Record...
                </>
              ) : (
                'Add Service Record'
              )}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  )
}

export default NewServicesEntry