import { deleteVehicle, getVehicle } from '@/api/services/vehicle.api'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import useVehicleStore from '@/store/vehicleStore'
import { CirclePlus, Loader2, Trash2 } from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyVehicle = () => {
  const { vehicles, loading, setVehicles, setLoading, setError } =
    useVehicleStore()

  const navigate = useNavigate()
  console.log(vehicles)

  const navigateHandler = vehicleId => {
    navigate(`/serviceshistory/${vehicleId}`)
  }

  const handleDelete = async id => {
    try {
      setLoading(true)
      if (!confirm('Are you sure you want to delete this vehicle?')) {
        return
      }
      await deleteVehicle(id)
      setVehicles(vehicles.filter(vehicle => vehicle._id !== id))
      setError(null)
    } catch (error) {
      setError(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  const fetchVehicles = async () => {
    try {
      setLoading(true)
      const response = await getVehicle()
      setVehicles(response.cars)
      setError(null)
    } catch (error) {
      setError(error.message)
      console.log(error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchVehicles()
  }, [])

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>My Vehicles</h1>
      <p className='font-medium mb-5'>
        Manage and monitor your automotive assets with
        <span className='text-sky-500 font-bold'> AutoSathi</span>
      </p>
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {loading ? (
          <Skeleton className='col-span-full text-center text-gray-500' />
        ) : // <p className='col-span-full text-center text-gray-500'>
          //   Loading vehicles...
          // </p>
          vehicles.length > 0 ? (
            vehicles.map(vehicle => (
              <>
                <div
                  key={vehicle._id}
                  className='bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow'
                >
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold text-gray-900 '>
                      {vehicle.vehicleName}
                    </h3>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className='bg-white p-3 rounded-full text-gray-800 hover:bg-red-500 hover:text-white transition shadow-sm'
                      title='Delete File'
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>


                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Purchase Date:</span>
                    {new Date(vehicle.purchaseDate).toLocaleDateString()}
                  </p>
                  <p className='text-sm text-gray-600 mb-1'>
                    <span className='font-medium'>Registration:</span>
                    {vehicle.registrationNumber}
                  </p>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>General Service Date:</span>
                    {new Date(vehicle.generalServiceDate).toLocaleDateString()}
                  </p>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>Insurance Expiry:</span>
                    {new Date(vehicle.insuranceExpiry).toLocaleDateString()}
                  </p>
                  <p className='text-sm text-gray-600'>
                    <span className='font-medium'>PUC Expiry:</span>
                    {new Date(vehicle.pucExpiry).toLocaleDateString()}
                  </p>
                  <Button
                    className='bg-sky-500 mt-2'
                    onClick={() => navigateHandler(`${vehicle._id}`)}
                  >
                    See Service details
                  </Button>
                </div>
                <>
                  {/* <div
                    className='bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow'
                  >
                    <CirclePlus />
                  </div> */}
                </>
              </>
            ))
          ) : (
            <div className='col-span-full text-center py-12'>
              <p className='text-gray-500 text-lg'>No vehicles added yet.</p>
            </div>
          )}
      </div>
    </div>
  )
}

export default MyVehicle
