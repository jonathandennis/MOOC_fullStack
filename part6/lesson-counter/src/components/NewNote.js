import React from 'react'
import { useDispatch } from 'react-redux'
import { createNote } from '../reducers/noteReducer'

const NewNote = (props) => {
    /* using hooks to dispatch actions. The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js. This allows all components to make changes to the state of the redux-store. */
  const dispatch = useDispatch()

  const addNote = (event) => {
    event.preventDefault()
    const content = event.target.note.value
    event.target.note.value = ''
    dispatch(createNote(content))
  }

  return (
    <form onSubmit={addNote}>
      <input name="note" />
      <button type="submit">add</button>
    </form>
  )
}

export default NewNote