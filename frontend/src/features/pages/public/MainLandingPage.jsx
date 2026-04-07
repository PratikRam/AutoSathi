import Home from './Home'
import React from 'react'
import LandingFeatures from './LandingFeatures'
import LandingHowitsWork from './LandingHowitsWork'
import LandingAboutUs from './LandingAboutUs'

const MainLandingPage = () => {
  return (
    <div>
      <section id='home'>
        <Home />
      </section>
      <section id='features'>
        <LandingFeatures />
      </section>
      <section id='how-it-works'>
        <LandingHowitsWork />
      </section>
      <section id='about'>
        <LandingAboutUs />
      </section>
    </div>
  )
}

export default MainLandingPage
