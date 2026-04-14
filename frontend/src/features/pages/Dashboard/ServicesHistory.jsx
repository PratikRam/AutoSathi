import { Button } from '@/components/ui/button'
import useServiceStore from '@/store/servicesStore'
import { useNavigate } from 'react-router-dom'

const ServicesHistory = () => {
  const { services, loading, setServices, setLoading, setError } =
    useServiceStore()

  const navigate = useNavigate()
  return (
    <div className='p-6 flex flex-col gap-4'>
      <div className='flex justify-between items-center'>
        <h1 className='text-3xl font-bold text-gray-900 mb-6'>Service History</h1>
        <h1 className='text-gray-900 mb-6'>Total Maintenance Cost:</h1>
        <Button className="bg-blue-500 text-white cursor-pointer" onClick={() => navigate('/newserviceentry')}>Add New Service</Button>
      </div>
      <img src="/images/forServicepage.avif" alt="nahi mila" className='w-full h-auto rounded opacity-80' />
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? (
          <p className='col-span-full text-center text-gray-500'>
            Loading Services...
          </p>
        ) : services.length > 0 ? (
          services.map(service => (
            <div
              key={service._id}
              className='bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow'
            >
              <h1 className='font-medium'>Detailed maintenance timeline for <span className='text-blue-500'>Tara harrier</span></h1>
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                {service.serviceDate}
              </h3>
              <p className='text-sm text-gray-600 mb-1'>
                <span className='font-medium'>Garage Name:</span>
                {service.garageName}
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Cost:</span>
                {service.cost}
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Notes:</span>
                {service.notes}
              </p>
            </div>
          ))
        ) : (
          <div className='col-span-full text-center py-12'>
            <p className='text-gray-500 text-lg'>No services added yet.</p>
          </div>
        )}
      </div>
    </div>
  )
}

export default ServicesHistory
