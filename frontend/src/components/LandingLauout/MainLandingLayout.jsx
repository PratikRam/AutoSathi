import React from 'react'
import LandingNavbar from './LandingNavbar'
import Footer from './Footer'
import { Outlet } from "react-router-dom";

const MainLandingLayout = () => {
  return (
    <div>
      <LandingNavbar />
      <Outlet />
      <Footer />
    </div>
  )
}

export default MainLandingLayout
