import React from 'react'
import NewNote from './components/NewNote'
import Notes from './components/Notes'

const App = () => {

  return(
    <div>
      <div>
      <NewNote />
      <Notes  />
    </div>
    </div>
  )
}

export default App