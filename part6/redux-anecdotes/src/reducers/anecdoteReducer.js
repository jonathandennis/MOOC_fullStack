const anecdoteReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action', action)
  switch(action.type) {
    case 'NEW_ANECDOTE':
        return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const changedAnecdote = { 
        ...anecdoteToChange, 
        votes: anecdoteToChange.votes + 1 
      }
      console.log('anecdoteToChange: ', anecdoteToChange)
      console.log('changedAnecdote: ', changedAnecdote)
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote)
    }
    
    default:
      return state
    }
}

//Action Creator
export const createAnecdote = (data) => {
  return {
    type: 'NEW_ANECDOTE',
    data,
    }
}

export const initializeAnecdotes = (anecdotes) => {
  return {
    type: 'INIT_ANECDOTES',
    data: anecdotes,
  }
}

//Action Creator
export const vote = (id) => {
  console.log('vote', id)
  return {
    type: 'VOTE',
    data: { id }
  }
}
export default anecdoteReducer