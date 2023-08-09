import React from 'react'

import { Navs, ApiTester } from '../components'


const tester = () => {
  return (
    <React.Fragment>
      <Navs.TopNavbar />
      <ApiTester />
      <Navs.BottomNavbar />
    </React.Fragment>
  )
}

export default tester