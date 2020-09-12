import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { vote } from './reducers/anecdoteReducer'
import NewAnecdote from './components/NewAnecdote'

const App = () => {
  const anecdotes = useSelector(state => state)
  const dispatch = useDispatch()
  
/* 
  // Display list of anecdotes
  const anecdoteList = () => anecdotes.map(anecdote =>
    <Anecdote
      key={anecdote.id}
      anecdote={anecdote}
      anecdotes={anecdotes}
    />
  )

  // Sort blogs by number of likes
  const sortBlogs = (blogs) => {
    blogs.sort((a, b) => {return b.likes - a.likes})
  }
 */

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes.map(anecdote =>
        <div key={anecdote.id}>
          <div>
            {anecdote.content}
          </div>
          <div>
            has {anecdote.votes}
            <button onClick={() => dispatch(vote(anecdote.id))}>vote</button>
          </div>
        </div>
      )}
      <h2>create new</h2>
      <NewAnecdote />
    </div>
  )
}

export default App