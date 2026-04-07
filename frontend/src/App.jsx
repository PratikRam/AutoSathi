import React from 'react'
import { Navigate, Route, Routes } from 'react-router-dom'
// import PublicRoutes from './routes/PublicRoutes'
// import ProtectedRoutes from './routes/ProtectedRoutes'
import MainInnerLayout from './components/InnerLauout/MainInnerLayout'
import MainLandingLayout from './components/LandingLauout/MainLandingLayout'
import ServiceVehicle from './features/pages/Dashboard/ServicesVehicle'
import AddVehicle from './features/pages/Dashboard/AddVehicle'
import NewServicesEntry from './features/pages/Dashboard/NewServicesEntry'
import LandingFeatures from './features/pages/public/LandingFeatures'
import LandingHowitsWork from './features/pages/public/LandingHowitsWork'
import LandingAboutUs from './features/pages/public/LandingAboutUs'
import Login from './features/pages/auth/Login'
import Register from './features/pages/auth/Register'
import Home from './features/pages/public/Home'
import MainLandingPage from './features/pages/public/MainLandingPage'
import MyVehicle from './features/pages/Dashboard/MyVehicle'
import { useUserData } from './contexts/UserContext'

const App = () => {
  const { isAuthenticated } = useUserData()

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

      {/* Private Routes */}
      <Route
        path='/login'
        element={
          isAuthenticated ? <Navigate to='/myvehicles' /> : <Login />
        }
      />

      <Route
        path='/register'
        element={
          isAuthenticated ? <Navigate to='/myvehicles' /> : <Register />
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
        <Route path='servicevehicle' element={<ServiceVehicle />} />
        <Route path='newserviceentry' element={<NewServicesEntry />} />
      </Route>
    </Routes>
  )
}

export default App
