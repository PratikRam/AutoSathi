import { getService } from '@/api/services/services.api'
import { Button } from '@/components/ui/button'
import useServiceStore from '@/store/servicesStore'
import useVehicleStore from '@/store/vehicleStore'
import { ChevronRight, CircleChevronRight, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { deleteService } from '@/api/services/services.api'

const ServicesHistory = () => {
  const { services, setServices, loading, setLoading, error, setError } =
    useServiceStore()

  const { vehicles } =
    useVehicleStore()

  const { id } = useParams()

  const vehicle = vehicles.find(vehicle => vehicle._id === id)
  const vehicleImg = vehicle.image

  const AllCost = services.reduce((acc, service) => acc + service.cost, 0)
  console.log("AllCost is", AllCost);

  const handleDelete = async id => {
    try {
      setLoading(true)
      if (!confirm('Are you sure you want to delete this service?')) {
        return
      }
      await deleteService(id)
      setServices(services.filter(service => service._id !== id))
      setError(null)
    } catch (error) {
      setError(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchServices = async () => {
    try {
      setLoading(true)
      const response = await getService(id)
      console.log("response is", response.services);
      setServices(response.services)
      setError(null)
    } catch (error) {
      setError(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchServices()
  }, [id])

  const navigate = useNavigate()
  return (
    <div className='p-6 flex flex-col gap-4'>
      <div className='flex justify-between bg-gray-100 p-4 rounded-lg'>

        <div className='flex flex-col'> <h1 className='text-3xl font-bold text-gray-900 mb-6'>Service History</h1>
          <p className='text-gray-900 mb-6 text-sm justify-center '>
            <span className='cursor-pointer opacity-80' onClick={() => navigate('/myvehicles')}>My Vehicle</span>
            <ChevronRight className='inline-block' size={15} />
            {vehicle.vehicleName}
            <ChevronRight className='inline-block' size={15} />
            <span className=' font-bold'>Service History</span>
          </p>
        </div>

        <h1 className='text-gray-900 mb-6 text-sm'>Total Maintenance <br /><span className='text-xl font-bold'>₹{AllCost}</span></h1>
        <Button
          onClick={() => navigate(`/add-service/${id}`)}
          className="bg-blue-500 text-white cursor-pointer hover:bg-blue-600 transition-all duration-200 active:scale-95"
        >
          Add Service
        </Button>
      </div>

      <div className='flex'>
        <img src={vehicleImg} alt="nahi mila" className='w-1/2 h-auto rounded-lg opacity-90 ' />
        <div className='flex-1 text-center'>Next Critical Service</div>
        {/* <div className='flex-1'></div> */}
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4 w-full'>
        {loading ? (
          <p className='col-span-full text-center text-gray-500'>
            Loading Services...
          </p>
        ) : services.length > 0 ? (<>

          {services.map(service => (
            <div
              key={service._id}
              className="bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow w-full hover:scale-101 duration-300 ease-in-out"
            >

              <div className='flex justify-between items-center mb-2'> <p className="text-lg font-semibold text-gray-900 mb-2">
                {service.notes}
              </p>
                <button
                  onClick={() => handleDelete(service._id)}
                  className='bg-white p-3 rounded-full text-gray-800 hover:bg-red-500 hover:text-white transition shadow-sm cursor-pointer'
                  title='Delete Service'
                >
                  <Trash2 size={20} />
                </button></div>


              <p className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Garage Name:</span>
                {service.garageName}
              </p>

              <p className="text-sm text-gray-600">
                <span className="font-medium">Cost:</span>
                {service.cost}
              </p>

              <h3 className="text-sm text-gray-600 mb-1">
                <span className="font-medium">Service Date:</span> {new Date(service.serviceDate).toLocaleDateString()}
              </h3>
            </div>
          ))}
        </>
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
