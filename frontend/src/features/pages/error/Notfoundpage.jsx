import { Link, useNavigate } from "react-router-dom"


export default function NotFoundPage() {
    const navigate = useNavigate()
    return (
        <>
            {/*
    This example requires updating your template:

    ```
    <html class="h-full">

    <body class="h-full">
        ```
        */}
            <main className="grid min-h-full place-items-center bg-gray-600 px-6 py-24 sm:py-32 lg:px-8">
                <div className="text-center">
                    <p className="text-base font-semibold text-indigo-500">404</p>
                    <h1 className="mt-4 text-5xl font-semibold tracking-tight text-balance text-white sm:text-7xl">
                        Page not found
                    </h1>
                    <p className="mt-6 text-lg font-medium text-pretty text-gray-400 sm:text-xl/8">
                        Sorry, we couldn’t find the page you’re looking for.
                    </p>
                    <div className="mt-10 flex items-center justify-center gap-x-6">
                        <Link to={"/myvehicles"}
                            className="rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-xs hover:bg-indigo-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500">
                            Go back home
                        </Link>
                        <a href="#" className="text-sm font-semibold text-white">
                            Contact support <span aria-hidden="true">&rarr;</span>
                        </a>
                    </div>
                </div>
            </main>
        </>
    )
}



// import { Card } from '@/components/ui/card'
// import { Input } from '@/components/ui/input'
// import { Label } from '@/components/ui/label'
// import { useForm } from 'react-hook-form'
// import { Button } from '@/components/ui/button'
// import { addVehicle } from '@/api/services/vehicle.api'
// import useVehicleStore from '@/store/vehicleStore'
// import { useNavigate } from 'react-router-dom'

// const AddVehicle = () => {
//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     reset
//   } = useForm()

//   const { addVehicleToList, setLoading, setError } = useVehicleStore()

//   const navigate = useNavigate()
//   const AddVehiclehandler = async data => {
//     try {
//       setLoading(true)
//       const response = await addVehicle(data)
//       console.log(response.car)
//       addVehicleToList(response.car)
//       setError(null)
//       reset() // Clear form after successful submission
//       alert('Vehicle added successfully!')
//       navigate('/myvehicles')
//     } catch (error) {
//       setError(error.message)
//       console.log(error.message)
//     } finally {
//       setLoading(false)
//     }
//   }

//   return (
//     <div>
//       <Card className='w-full max-w-md mx-auto mt-10 p-6'>
//         <h2 className='text-2xl font-bold mb-4'>Vehicle Identity</h2>

//         <form onSubmit={handleSubmit(AddVehiclehandler)}>
//           {/* Name */}
//           <div className='mb-4'>
//             {/* <label className='block text-gray-700 mb-2'>Name</label> */}
//             <div className='flex items-center gap-2 mb-2'>
//               <Label className='block text-gray-700 '>Vehicle Name</Label>
//               <div className='mt-2 text-red-500'>*</div>
//             </div>

//             <Input
//               type='text'
//               className='w-full px-3 py-2 border rounded'
//               placeholder='Enter your Vehicle name'
//               {...register('vehicleName', {
//                 required: 'Vehicle Name is required'
//               })}
//             />
//             {errors.vehicleName && (
//               <p className='text-red-500 text-sm'>
//                 {errors.vehicleName.message}
//               </p>
//             )}
//           </div>

//           <Label className='block text-gray-700 mb-2'>
//             Purchase Date
//           </Label>
//           <div className='mb-4'>
//             <Input
//               type='date'
//               className='w-full px-3 py-2 border rounded'
//               {...register('purchaseDate', {
//                 required: 'Purchase Date is required'
//               })}
//             />
//             {errors.purchaseDate && (
//               <p className='text-red-500 text-sm'>
//                 {errors.purchaseDate.message}
//               </p>
//             )}
//           </div>

//           <div className='mb-4'>
//             <Label className='block text-gray-700 mb-2'>
//               Registration Number
//             </Label>
//             <Input
//               type='text'
//               className='w-full px-3 py-2 border rounded'
//               placeholder='Enter registration number'
//               {...register('registrationNumber', {
//                 required: 'Registration number is required'
//               })}
//             />
//             {errors.registrationNumber && (
//               <p className='text-red-500 text-sm'>
//                 {errors.registrationNumber.message}
//               </p>
//             )}
//           </div>

//           <div className='mb-4'>
//             <Label className='block text-gray-700 mb-2'>PUC Expiry</Label>
//             <Input
//               type='date'
//               className='w-full px-3 py-2 border rounded'
//               {...register('pucExpiry', {
//                 required: 'PUC Expiry is required'
//               })}
//             />
//             {errors.pucExpiry && (
//               <p className='text-red-500 text-sm'>{errors.pucExpiry.message}</p>
//             )}
//           </div>

//           {/* Button */}
//           <Button
//             type='submit'
//             className='w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition duration-200 active:scale-98   '
//           >
//             Add Vehicle
//           </Button>
//         </form>
//       </Card>
//     </div>
//   )
// }

// export default AddVehicle
