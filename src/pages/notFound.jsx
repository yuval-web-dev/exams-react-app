import React from "react"
import { Link } from "react-router-dom"

import { Navs } from "../components"


const notFound = () => {
  return (
    <React.Fragment>
      <Navs.TopNavbar />
      <p>Are you lost?</p>
      <p>
        <Link to="/">
          Back to safe haven
        </Link>
      </p>
      <Navs.BottomNavbar />
    </React.Fragment>
  )
}

export default notFound