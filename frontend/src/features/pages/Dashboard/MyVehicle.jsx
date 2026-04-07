import React, { useState } from 'react'

const MyVehicle = () => {
  const [vehicles, setVehicles] = useState([
    {
      id: 1,
      name: 'Toyota Camry',
      model: '2022',
      registrationNumber: 'ABC123'
    },
    { id: 2, name: 'Honda Civic', model: '2021', registrationNumber: 'XYZ789' }
  ])

  return (
    <div className='p-6'>
      <h1 className='text-3xl font-bold text-gray-900 mb-6'>My Vehicles</h1>

      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
        {vehicles.length > 0 ? (
          vehicles.map(vehicle => (
            <div
              key={vehicle.id}
              className='bg-white border border-gray-200 rounded-lg shadow-sm p-4 hover:shadow-md transition-shadow'
            >
              <h3 className='text-lg font-semibold text-gray-900 mb-2'>
                {vehicle.name}
              </h3>
              <p className='text-sm text-gray-600 mb-1'>
                <span className='font-medium'>Model:</span> {vehicle.model}
              </p>
              <p className='text-sm text-gray-600'>
                <span className='font-medium'>Registration:</span>{' '}
                {vehicle.registrationNumber}
              </p>
            </div>
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
