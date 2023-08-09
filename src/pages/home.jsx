import React from 'react'

import { Navs } from '../components'


const home = () => {
  return (
    <React.Fragment>
      <Navs.TopNavbar />
      <p>Whoa, its pretty empty here.</p>
      <Navs.BottomNavbar />
    </React.Fragment>
  )
}

export default home