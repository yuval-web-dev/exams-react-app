import React, { useState, useEffect } from "react"
import { Routes, Route } from "react-router-dom"

import * as pages from "./pages"

// Redux toolkit
import { Provider } from "react-redux"
import store from "./app/store"


const App = () => {

  // const [user, setUser] = useState(new User())

  // A function that describes what side effects to perform,
  //  such as fetching data from an API or adding an event listener.
  const useEffectFunc = () => {
    // const loggeddUser = new User() // Author
    // loggeddUser.firstname = "Jim"
    // loggeddUser.surname = "Kurose"
    // setUser(loggeddUser)
  }

  // controls when the side effect should run.
  // This array contains values that the effect depends on,
  //  and React will re-run the effect whenever any of these values change.
  // If you don"t specify the dependency array, the effect will run on every render.
  let useEffectDependancyArr = []

  useEffect(useEffectFunc, useEffectDependancyArr)


  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<pages.Home />} />
        <Route path="/edit" element={<pages.Editor />} />
        <Route path="/test" element={<pages.Test />} />
        <Route path="/about" element={<pages.About />} />
        <Route path="/*" element={< pages.NotFound />} />
      </Routes>
    </Provider>
  )
}

export default App