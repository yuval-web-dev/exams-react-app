import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { ApiTester, NotFound } from './Components'


import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={< ApiTester />} />
      <Route path='/*' element={< NotFound />} />
    </Routes>
  )
}

export default App