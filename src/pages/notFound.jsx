import React from "react"
import { Link } from "react-router-dom"

const notFound = () => {
  return (
    <React.Fragment>
      <p>Are you lost?</p>
      <p>
        <Link to="/">
          Back to safe haven
        </Link>
      </p>
    </React.Fragment>
  )
}

export default notFound