import React from 'react'
import { Routes, Route } from 'react-router-dom'

import { Home, ApiTester, ExamBuilder, NotFound } from './Components'


import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={<Home />} />
      <Route path='/exambuilder' element={<ExamBuilder />} />
      <Route path='/apitester' element={< ApiTester />} />
      <Route path='/*' element={< NotFound />} />
    </Routes>
  )
}

export default App