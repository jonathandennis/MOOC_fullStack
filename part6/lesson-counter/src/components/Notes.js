import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleImportanceOf } from '../reducers/noteReducer'

const Note = ({ note, handleClick }) => {
  return(
    <li onClick={handleClick}>
      {note.content} 
      <strong> {note.important ? 'important' : ''}</strong>
    </li>
  )
}

const Notes = () => {
    /* using hooks to dispatch actions. The useDispatch-hook provides any React component access to the dispatch-function of the redux-store defined in index.js. This allows all components to make changes to the state of the redux-store. */
  const dispatch = useDispatch()
  /* The component can access the notes stored in the store with the useSelector-hook of the react-redux library. useSelector receives a function as a parameter. The function either searches for or selects data from the redux-store. Here we need all of the notes, so our selector function returns the whole state: */
  const notes = useSelector(({ filter, notes }) => {
    if ( filter === 'ALL' ) {
      return notes
    }
    return filter === 'IMPORTANT'
    ? notes.filter(note => note.important)
    : notes.filter(note => !note.important)
  })

  return(
    <ul>
      {notes.map(note =>
        <Note
          key={note.id}
          note={note}
          handleClick={() => 
            dispatch(toggleImportanceOf(note.id))
          }
        />
      )}
    </ul>
  )
}

export default Notes