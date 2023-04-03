import React, { useState } from 'react'
import { Routes, Route } from 'react-router-dom'

import { Home, NotFound } from './Components'


import './App.css'

const App = () => {
  return (
    <Routes>
      <Route path='/' element={< Home />} />
      <Route path='/*' element={< NotFound />} />
    </Routes>
  )
}

export default App