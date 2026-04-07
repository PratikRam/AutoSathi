import React from 'react'
import { Route, Routes } from 'react-router-dom'
import LandingFeatures from '../features/pages/public/LandingFeatures'
import LandingHowitsWork from '../features/pages/public/LandingHowitsWork'
import LandingAboutUs from '../features/pages/public/LandingAboutUs'
import Login from '../features/pages/auth/Login'
import Register from '../features/pages/auth/Register'
import MainLandingLayout from '../components/LandingLauout/MainLandingLayout'

const PublicRoutes = () => {
  return (
    <div>
      <MainLandingLayout />
      {/* <Route  element={<LandingFeatures />} />
        <Route path='/about' element={<LandingAboutUs />} />
        <Route path='/how-it-works' element={<LandingHowitsWork />} />

        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} /> */}
    </div>
  )
}

export default PublicRoutes
