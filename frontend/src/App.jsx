import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
import MainInnerLayout from './components/InnerLauout/MainInnerLayout'
import MainLandingLayout from './components/LandingLauout/MainLandingLayout'
import AddVehicle from './features/pages/Dashboard/AddVehicle'
import NewServicesEntry from './features/pages/Dashboard/NewServicesEntry'
import Login from './features/pages/auth/Login'
import Register from './features/pages/auth/Register'
import MainLandingPage from './features/pages/public/MainLandingPage'
import MyVehicle from './features/pages/Dashboard/MyVehicle'
import { useUserData } from './contexts/UserContext'
import ServicesHistory from './features/pages/Dashboard/ServicesHistory'
import NotFoundPage from './features/pages/error/Notfoundpage'
import { Car, Loader2 } from 'lucide-react'
import MyProfile from './features/pages/Dashboard/MyProfile'
import UpcomingServices from './features/pages/Dashboard/UpcomingServices'

const App = () => {
  const { isAuthenticated, authLoading } = useUserData()

  if (authLoading) {
    return (
      <div className='flex flex-col items-center justify-center h-screen gap-2'>
        <Loader2 className='animate-spin h-12 w-12 text-blue-600' />
        <div className='flex items-center gap-2'>
          <p className=' text-blue-600 font-semibold'>Please wait while we load AutoSathi</p>
          <Car className='text-blue-600 h-5 w-5' />
        </div>
      </div>
    )
  }

  return (
    <Routes>
      {/*  Public Routes */}
      <Route path='/' element={<MainLandingLayout />}>
        <Route index element={<MainLandingPage />} />
        {/* <Route path='home' element={<Home />} /> */}
        {/* <Route path='landingfeatures' element={<LandingFeatures />} /> */}
        {/* <Route path='about' element={<LandingAboutUs />} /> */}
        {/* <Route path='how-it-works' element={<LandingHowitsWork />} /> */}
      </Route>

      {/* ==>> Private Routes */}

      <Route
        path='/login'
        element={!isAuthenticated ? <Login /> : <Navigate to='/myvehicles' />}
      />

      <Route
        path='/register'
        element={
          !isAuthenticated ? <Register /> : <Navigate to='/myvehicles' />
        }
      />

      {/* Protected Routes */}
      <Route
        path='/'
        element={
          isAuthenticated ? <MainInnerLayout /> : <Navigate to='/login' />
        }
      >
        <Route index element={<Navigate to='/myvehicles' />} />
        <Route path='myvehicles' element={<MyVehicle />} />
        <Route path='addvehicle' element={<AddVehicle />} />
        <Route path='serviceshistory/:id' element={<ServicesHistory />} />
        <Route path='add-service/:id' element={<NewServicesEntry />} />
        <Route path='myprofile' element={<MyProfile />} />
        <Route path='upcoming-services' element={<UpcomingServices />} />
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
