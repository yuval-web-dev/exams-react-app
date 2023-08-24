import React from 'react'
import { Route, Navigate } from 'react-router-dom'
import { isAuthenticated } from '../../utils/auth.js' // Implement this function to check JWT



const ProtectedRoute = ({ component: Component, ...rest }) => {
  return (
    <Route
      {...rest}
      render={props =>
        isAuthenticated() ? (
          <Component {...props} />
        ) : (
          <Navigate to="/login" />
        )
      }
    />
  )
}

export default ProtectedRoute