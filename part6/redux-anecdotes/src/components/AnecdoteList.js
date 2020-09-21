import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification, clearNotification } from '../reducers/notificationReducer'

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
  const anecdotes = useSelector(state => state.anecdotes)
  const searchTerm = useSelector(state => state.filter)
  console.log('anecdotes: ', anecdotes)
  console.log('searchTerm in AnecdoteList: ', searchTerm)

  const anecdotesToShow = searchTerm.length === 0 ?
    anecdotes : 
    anecdotes.filter(a => a.content.toLowerCase().includes(searchTerm.value.toLowerCase()))

  return(
      <div>
        {sortAnecdotes(anecdotesToShow)}
        {anecdotesToShow.map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            dispatch(vote(anecdote))
            dispatch(setNotification(`You voted for: ${anecdote.content}`))
            setTimeout(() =>
                dispatch(clearNotification()), 5000)}
          }
        />
      )} 
      </div>
  )
}

export default AnecdoteList