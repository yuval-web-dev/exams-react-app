import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import * as pages from './pages'


const App = () => {

  // const [user, setUser] = useState(new User())

  // A function that describes what side effects to perform,
  //  such as fetching data from an API or adding an event listener.
  const useEffectFunc = () => {
    // const loggeddUser = new User() // Author
    // loggeddUser.firstname = 'Jim'
    // loggeddUser.surname = 'Kurose'
    // setUser(loggeddUser)
  }

  // controls when the side effect should run.
  // This array contains values that the effect depends on,
  //  and React will re-run the effect whenever any of these values change.
  // If you don't specify the dependency array, the effect will run on every render.
  let useEffectDependancyArr = []

  useEffect(useEffectFunc, useEffectDependancyArr)


  return (
    <Routes>
      <Route path='/' element={<pages.home />} />
      <Route path='/edit' element={<pages.editor />} />
      <Route path='/test' element={<pages.tester />} />
      <Route path='/about' element={<pages.about />} />
      <Route path='/*' element={< pages.notFound />} />
    </Routes>
  )
}

export default App