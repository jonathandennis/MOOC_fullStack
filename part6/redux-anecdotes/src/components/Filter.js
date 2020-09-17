import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { setSearchTerm } from '../reducers/filterReducer'

const Filter = () => {
    const searchTerm = useSelector(state => state.filter)
    const dispatch = useDispatch()
    console.log('setSearchTerm: ', searchTerm)
    const handleChange = (event) => {
      event.preventDefault()
      dispatch(setSearchTerm(event.target.value))
      
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
  
  export default Filter