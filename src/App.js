import React, { useState, useEffect } from 'react'
import { Routes, Route } from 'react-router-dom'

import * as Components from './Components'
import { User } from './classes'


const App = () => {

  const [user, setUser] = useState(new User())

  // A function that describes what side effects to perform,
  //  such as fetching data from an API or adding an event listener.
  const useEffectFunc = () => {
    const loggeddUser = new User() // Author
    loggeddUser.firstname = 'Jim'
    loggeddUser.surname = 'Kurose'
    setUser(loggeddUser)
  }

  // controls when the side effect should run.
  // This array contains values that the effect depends on,
  //  and React will re-run the effect whenever any of these values change.
  // If you don't specify the dependency array, the effect will run on every render.
  let useEffectDependancyArr = []

  useEffect(useEffectFunc, useEffectDependancyArr)


  return (
    <Routes>
      <Route path='/' element={<Components.Home />} />
      <Route path='/editor' element={<Components.ExamEditor user={user} />} />
      <Route path='/tester' element={< Components.ApiTester />} />
      <Route path='/*' element={< Components.NotFound />} />
    </Routes>
  )
}

export default App