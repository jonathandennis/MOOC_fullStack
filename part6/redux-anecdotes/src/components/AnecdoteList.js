import React from 'react'
import { connect } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

// Sort anecdotes by number of likes
const sortAnecdotes = (anecdotes) => {
  console.log('anecdotes in sortAnecdotes: ', anecdotes)
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

const AnecdoteList = (props) => {
  console.log('props.anecdotes in AnecdoteList: ', props.anecdotes)
  
  const anecdotesToShow = () => {
    if ( props.searchTerm.length === 0 ) {
      return props.anecdotes
    }
     
    return props.anecdotes.filter(a => a.content.toLowerCase().includes(props.searchTerm.value.toLowerCase()))
  }

  return(
      <div>
        {sortAnecdotes(anecdotesToShow())}
        {anecdotesToShow().map(anecdote =>
        <Anecdote
          key={anecdote.id}
          anecdote={anecdote}
          handleClick={() => {
            props.vote(anecdote)
            props.setNotification(`You voted for: '${anecdote.content}'`, 5)}
          }
        />
      )} 
      </div>
  )
}

const mapStateToProps = (state) => {
  // sometimes it is useful to console log from mapStateToProps
  console.log('state in mapStateToProps: ', state)
  return {
    anecdotes: state.anecdotes,
    searchTerm: state.filter
  }
}

const mapDispatchToProps = {
  vote,
  setNotification
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(AnecdoteList)