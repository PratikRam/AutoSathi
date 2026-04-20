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
import { Loader2 } from 'lucide-react'

const App = () => {
  const { isAuthenticated, authLoading } = useUserData()

  if (authLoading) {
    return (
      <div className='flex items-center justify-center h-screen'>
        <Loader2 className='animate-spin h-12 w-12 text-blue-600' />
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
        <Route path='*' element={<NotFoundPage />} />
      </Route>
    </Routes>
  )
}

export default App
