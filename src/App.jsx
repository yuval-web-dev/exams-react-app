import React from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import { AuthProvider, RequireAuth, useIsAuthenticated } from 'react-auth-kit'
import * as Pages from "./pages"

// Redux toolkit
import { Provider } from "react-redux"
import store from "./app/store"
import { SiteNav } from "./components"



const App = () => {
  const PrivateRoute = ({ Component }) => {
    const isAuthenticated = useIsAuthenticated();
    const auth = isAuthenticated();
    return auth ? <Component /> : <Navigate to="/login" />;
  };

  const DashboardRoutes = () => (
    <RequireAuth loginPath={"/login"}>
      <SiteNav.Top />
      <Routes>
        <Route path="/" element={<Pages.Dashboard />} />
        <Route path="/edit" element={<Pages.Editor />} />
        <Route path="/test" element={<Pages.Test />} />
      </Routes>
      <SiteNav.Bottom />
    </RequireAuth>
  )

  return (
    <AuthProvider authName="_auth" authType="cookie" cookieSecure={false}>
      <Routes>
        <Route path="/" element={<Navigate to="/dashboard" />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/dashboard/*" element={<PrivateRoute Component={DashboardRoutes} />} />
        <Route path="/*" element={<Navigate to="/" />} />
      </Routes>
    </AuthProvider>
  )
}



export default App