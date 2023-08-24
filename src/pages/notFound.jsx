import React from "react"
import { Link } from "react-router-dom"

const NotFound = () => {
  return (
    <React.Fragment>
      <p>Are you lost?</p>
      <Link to="/">
        Back to safe haven
      </Link>
    </React.Fragment>
  )
}

export default NotFound