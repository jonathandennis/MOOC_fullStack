import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'

// Sort anecdotes by number of likes
const sortAnecdotes = (anecdotes) => {
  anecdotes.sort((a, b) => {return b.votes - a.votes})
}

const Anecdote = ({ anecdote, handleClick }) => {
  return(
      <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={handleClick}>vote</button>
          </div>
        </div>
  )
}

const AnecdoteList = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state)

  return(
      <div>
        {sortAnecdotes(anecdotes)}
        {anecdotes.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => 
            dispatch(vote(anecdote.id))
          }
        />
      )} 
      </div>
  )
}

export default AnecdoteList