import { deleteVehicle, getVehicle } from '@/api/services/vehicle.api'
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { useUserData } from '@/contexts/UserContext'
import useVehicleWithDays from '@/helper/GetRemainingDays'
import useVehicleStore from '@/store/vehicleStore'
import {
  CheckCircle,
  CirclePlus,
  ClockAlert,
  EllipsisVertical,
  Leaf,
  Loader2,
  Trash2,
  TriangleAlert
} from 'lucide-react'
import { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import { useNavigate } from 'react-router-dom'

const MyVehicle = () => {
  const { vehicles, loading, setVehicles, setLoading, setError } =
    useVehicleStore()

  const { user } = useUserData()

  const [activeMenu, setActiveMenu] = useState(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset
  } = useForm()

  const navigate = useNavigate()

  const navigateHandler = vehicleId => {
    navigate(`/serviceshistory/${vehicleId}`)
  }

  const vehiclesWithDays = useVehicleWithDays()

  const openPopup = vehicleId => {
    setActiveMenu(activeMenu === vehicleId ? null : vehicleId)
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
      <div className='mb-8'>
        <h1 className='text-3xl font-bold text-gray-900 mb-2 capitalize'>
          Welcome back, <span className='text-sky-500'>{user?.name}</span> 👋
        </h1>
        <p className='text-gray-600 font-medium'>
          Manage and monitor your automotive assets with
          <span className='text-sky-500 font-bold'> AutoSathi</span>
        </p>
      </div>

      <div className='flex items-center justify-between mb-6'>
        <h2 className='text-2xl font-bold text-gray-800'>My Vehicles</h2>
        {vehiclesWithDays.length > 0 && (
          <Button 
            onClick={() => navigate('/addvehicle')} 
            className='bg-sky-500 hover:bg-sky-600 text-white flex items-center gap-2 transition-colors'
          >
            <CirclePlus size={18} />
            <span className='hidden sm:inline'>Add Vehicle</span>
          </Button>
        )}
      </div>
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
                  <div className='overflow-hidden rounded-lg '>
                    <img
                      src={vehicle.image}
                      alt=''
                      className='w-90 h-60 object-cover mb-2 transition-all duration-300 hover:scale-105'
                    />
                  </div>
                  <div className='flex justify-between items-center mb-2'>
                    <h3 className='text-lg font-semibold text-gray-900'>
                      {vehicle.vehicleName}
                    </h3>
                    <h1 className='text-sm text-gray-900 '>
                      {vehicle.registrationNumber}
                    </h1>
                    <div className='relative'>
                      <button
                        onClick={() => openPopup(vehicle._id)}
                        className='bg-white p-2 rounded-full text-gray-800 hover:bg-gray-500 hover:text-white transition shadow-sm cursor-pointer'
                      >
                        <EllipsisVertical size={20} />
                      </button>

                      {activeMenu === vehicle._id && (
                        <Card className='absolute right-0 w-44 bg-white border rounded-lg shadow-lg gap-2 p-2'>
                          {/* <Button
                          // onClick={}
                          className='bg-white text-black cursor-pointer hover:bg-gray-200 w-full h-10'
                        >
                          🔁 Change Vehicle Info
                        </Button> */}

                          {/* <Input
                            type="date"
                            className="bg-white text-black cursor-pointer hover:bg-gray-200 w-full h-10"
                            {...register("pucExpiry", { required: true })}
                          >
                            🔁 New PucExpiry
                          </Input>

                          <Input
                            type="date"
                            className="bg-white text-black cursor-pointer hover:bg-gray-200 w-full h-10"
                            {...register("insuranceExpiry", { required: true })}
                          >
                            🔁 New InsuranceDate
                          </Input> */}

                          <Button
                            onClick={() => handleDelete(vehicle._id)}
                            className='bg-white text-red-600 cursor-pointer hover:bg-red-200 w-full h-10'
                          >
                            <Trash2
                              size={20}
                              className='inline-block mr-1 items-center'
                            />
                            Delete
                          </Button>
                        </Card>
                      )}
                    </div>
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
                  <div className='text-sm text-gray-600 mb-1 bg-gray-100 p-1 rounded-md p-3'>
                    <div className='flex justify-between items-center'>
                      <span className='font-medium'>
                        {vehicle.insuranceRemainingDays <= 0 ? (
                          <span className='text-red-500 flex items-center gap-2'>
                            <TriangleAlert />
                            Insurance Policy
                          </span>
                        ) : vehicle.insuranceRemainingDays <= 7 ? (
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
                  </div>

                  <div className='text-sm text-gray-600 mb-1 bg-gray-100 p-1 rounded-md p-3'>
                    <div className='flex justify-between items-center '>
                      <span className='font-medium '>
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
                  </div>
                  <Button
                    className='bg-sky-500 mt-2 cursor-pointer w-full'
                    onClick={() => navigateHandler(`${vehicle._id}`)}
                  >
                    View Service History
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
            <div className='col-span-full border-2 border-dashed border-gray-300 rounded-xl bg-gray-50 flex flex-col items-center justify-center py-16 text-center shadow-sm'>
              <div className='bg-white p-4 rounded-full shadow-sm mb-4 inline-block text-sky-500'>
                <CheckCircle size={32} />
              </div>
              <h3 className='text-xl font-semibold text-gray-800 mb-2'>No vehicles added yet</h3>
              <p className='text-gray-500 max-w-sm mb-6'>Add your first vehicle to start tracking insurance, services, and PUC renewals securely.</p>
              <Button 
                onClick={() => navigate('/addvehicle')} 
                className='bg-sky-500 hover:bg-sky-600 text-white px-6 py-2 rounded-lg flex items-center gap-2 shadow-sm transition-all duration-200'
              >
                <CirclePlus size={20} />
                Add Your Vehicle
              </Button>
            </div>
          )}

        {vehiclesWithDays.length > 0 && (
          <Card 
            className='border-2 border-dashed border-gray-300 min-h-[350px] flex flex-col items-center justify-center bg-gray-50 hover:bg-gray-100 transition-colors cursor-pointer group shadow-sm' 
            onClick={() => navigate('/addvehicle')}
          >
            <div className='bg-white p-4 rounded-full shadow-sm mb-4 inline-block text-gray-400 group-hover:text-sky-500 group-hover:scale-110 transition-all duration-300'>
              <CirclePlus size={32} />
            </div>
            <span className='text-gray-600 font-medium text-lg group-hover:text-sky-600 transition-colors'>Add New Vehicle</span>
          </Card>
        )}
      </div>
    </div>
  )
}

export default MyVehicle
