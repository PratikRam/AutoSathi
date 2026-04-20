import { deleteVehicle, getVehicle } from '@/api/services/vehicle.api'
import { Button } from '@/components/ui/button'
import useVehicleWithDays from '@/helper/GetRemainingDays'
import useVehicleStore from '@/store/vehicleStore'
import {
  CheckCircle,
  CirclePlus,
  ClockAlert,
  Leaf,
  Loader2,
  Trash2,
  TriangleAlert
} from 'lucide-react'
import { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const MyVehicle = () => {
  const { vehicles, loading, setVehicles, setLoading, setError } =
    useVehicleStore()

  const navigate = useNavigate()

  const navigateHandler = vehicleId => {
    navigate(`/serviceshistory/${vehicleId}`)
  }

  const vehiclesWithDays = useVehicleWithDays()
  console.log('vehiclesWithDays is', vehiclesWithDays)

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
      console.log('response.cars is', response.cars)
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
          <Loader2 className='animate-spin h-12 w-12 text-blue-600' />
        ) : // <p className='col-span-full text-center text-gray-500'>
          //   Loading vehicles...
          // </p>
          vehiclesWithDays.length > 0 ? (
            vehiclesWithDays.map(vehicle => (
              <>
                <div
                  key={vehicle._id}
                  className='bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow '
                >
                  <img
                    src={vehicle.image}
                    alt=''
                    className='w-90 h-60 object-cover rounded-lg mb-2 transition-all duration-200 hover:scale-101'
                  />
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {vehicle.vehicleName}
                    </h3>
                    <h1 className='text-sm text-gray-900 '>
                      {vehicle.registrationNumber}
                    </h1>
                    <button
                      onClick={() => handleDelete(vehicle._id)}
                      className='bg-white p-3 rounded-full text-gray-800 hover:bg-red-500 hover:text-white transition shadow-sm cursor-pointer'
                      title='Delete File'
                    >
                      <Trash2 size={20} />
                    </button>
                  </div>

                  {/* <p className='text-sm text-gray-600'>
                  <span className='font-medium'>Purchase Date : </span>
                  {new Date(vehicle.purchaseDate).toLocaleDateString()}
                </p> */}
                  {/* <p className='text-sm text-gray-600 mb-1'>
                    <span className='font-medium'>Registration : </span>
                    {vehicle.registrationNumber}
                  </p> */}
                  {/* <p className='text-sm text-gray-600'>
                    <span className='font-medium'>General Service Date : </span>
                    {new Date(vehicle.generalServiceDate).toLocaleDateString()}
                  </p> */}
                  <p className='text-sm text-gray-600 mb-1 bg-gray-100 p-1 rounded-md p-3'>
                    <div className='flex justify-between items-center'>
                      <span className='font-medium'>
                        {vehicle.insuranceRemainingDays <= 0 ? (
                          <span className='text-red-500 flex items-center gap-2'>
                            <TriangleAlert />
                            Insurance Policy
                          </span>
                        ) : vehicle.insuranceRemainingDays < 7 ? (
                          <span className='text-yellow-500 flex items-center gap-2'>
                            <ClockAlert />
                            Insurance Due
                          </span>
                        ) : (
                          <span className='text-green-500 flex items-center gap-2'>
                            <CheckCircle />
                            Insurance Policy
                          </span>
                        )}
                      </span>

                      {vehicle.insuranceRemainingDays <= 0 ? (
                        <span className='text-red-500 font-semibold'>
                          Expired
                        </span>
                      ) : vehicle.insuranceRemainingDays <= 7 ? (
                        <span className='text-yellow-500 font-semibold'>
                          Expiring Soon ({vehicle.insuranceRemainingDays} days)
                        </span>
                      ) : (
                        <span className='text-green-500 font-semibold'>
                          Valid
                        </span>
                      )}
                    </div>
                  </p>

                  <p className='text-sm text-gray-600 mb-1 bg-gray-100 p-1 rounded-md p-3'>
                    <div className='flex justify-between items-center'>
                      <span className='font-medium'>
                        {vehicle.pucRemainingDays <= 0 ? (
                          <span className='text-red-500 flex items-center gap-2'>
                            <TriangleAlert />
                            PUC Expiry
                          </span>
                        ) : vehicle.pucRemainingDays < 7 ? (
                          <span className='text-yellow-500 flex items-center gap-2'>
                            <ClockAlert />
                            PUC Due
                          </span>
                        ) : (
                          <span className='text-green-500 flex items-center gap-2'>
                            <Leaf />
                            PUC Expiry
                          </span>
                        )}
                      </span>

                      {vehicle.pucRemainingDays <= 0 ? (
                        <span className='text-red-500 font-semibold'>
                          Expired
                        </span>
                      ) : vehicle.pucRemainingDays <= 7 ? (
                        <span className='text-yellow-500 font-semibold'>
                          Expiring Soon ({vehicle.pucRemainingDays} days)
                        </span>
                      ) : (
                        <span className='text-green-500 font-semibold'>
                          Valid
                        </span>
                      )}
                    </div>
                  </p>
                  <Button
                    className='bg-sky-500 mt-2 cursor-pointer w-full'
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
              no vehicles added
            </div>
          )}
      </div>
      <div className='flex justify-center mt-8 mb-8 bg-white p-4 rounded-lg shadow-sm h-80 w-1/3 flex-col items-center'>
        <CirclePlus
          className='mt-2 cursor-pointer h-15 w-15 hover:text-blue-600 rounded-full p-2 hover:scale-110 transition-all duration-200'
          onClick={() => navigate('/addvehicle')}
          title='Add Your Vehicle'
        >
          Add Your Vehicle
        </CirclePlus>
      </div>
    </div>
  )
}

export default MyVehicle
