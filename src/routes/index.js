import React from "react"
import { Routes, Route } from "react-router-dom"
import { AuthProvider, RequireAuth } from 'react-auth-kit'

import { Pages } from "../pages"


const ProtectedRoutesElement = () => {
  return (
    <RequireAuth loginPath="/login">
      <Routes>
        <Route path="/" element={<Pages.Home />} />
        <Route path="/my-exams" element={<Pages.Exams />} />
        <Route path="/my-submissions" element={<Pages.Submissions />} />
        <Route path="/create-exam" element={<Pages.CreateExam />} />
        <Route path="/take-exam" element={<Pages.TakeExam />} />
      </Routes>
    </RequireAuth>
  )
}


const AppRoutes = () => {
  return (
    <AuthProvider authName="_auth" authType="cookie" cookieSecure={false}>
      <Routes>
        <Route path="/*" element={<ProtectedRoutesElement />} />
        <Route path="/login" element={<Pages.Login />} />
        <Route path="/register" element={<Pages.Registration />} />
      </Routes>
    </AuthProvider>
  );
};


export default AppRoutes
