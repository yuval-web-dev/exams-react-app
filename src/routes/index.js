import React from "react"
import { Navigate, Routes, Route } from "react-router-dom"
import * as AuthKit from "react-auth-kit" // https://authkit.arkadip.dev/

import { Pages } from "../pages"


const LOGIN = "/login"

const PrivateRoute = ({ children }) => {
  const isAuthenticated = AuthKit.useIsAuthenticated();
  const auth = isAuthenticated();
  return auth ? children : <Navigate to={LOGIN} />;
}

const ProtectedRoutesElement = () => {
  return (
    <Routes>
      <Route path="/" element={<Pages.Home />} />
      <Route path="/my-exams" element={<Pages.Exams />} />
      <Route path="/my-submissions" element={<Pages.Submissions />} />
      <Route path="/create-exam" element={<Pages.CreateExam />} />
      <Route path="/take-exam" element={<Pages.TakeExam />} />
    </Routes>
  )
}


const AppRoutes = () => {
  return (
    <AuthKit.AuthProvider
      authName="_auth"
      authType="cookie"
      cookieDomain={window.location.hostname}
      cookieSecure={false}>
      <Routes>
        <Route path="/*" element={<PrivateRoute><ProtectedRoutesElement /></PrivateRoute>} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/register" element={<Pages.Registration />} />
      </Routes>
    </AuthKit.AuthProvider>
  );
};


export default AppRoutes
