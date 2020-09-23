import React from 'react'
import { connect } from 'react-redux'
import { setSearchTerm } from '../reducers/filterReducer'

const Filter = (props) => {
    
    console.log('setSearchTerm: ', props.searchTerm)
    //console.log('anecdotes in filter: ', props.anecdotes)
    const handleChange = (event) => {
      event.preventDefault()
      props.setSearchTerm(event.target.value)
    }


    const style = {
      marginBottom: 10
    }
  
    return (
      <div style={style}>
        filter <input onChange={handleChange} />
      </div>
    )
  }

  const mapStateToProps = (state) => {
    return {
      searchTerm: state.filter
    }
  }

  const mapDispatchToProps = {
    setSearchTerm,
  }
  
  export default connect(
    mapStateToProps,
    mapDispatchToProps
  )(Filter)