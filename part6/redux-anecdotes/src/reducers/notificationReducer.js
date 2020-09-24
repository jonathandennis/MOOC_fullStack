import { useState } from 'react'

const notificationReducer = (state = null, action) => {
    switch (action.type) {
      case 'NOTIFY':
        return action.data
      case 'CLEAR_NOTIFICATION':
        return state = null

      default:
        return state
    }
  }

  export const clearNotification = () => {
      return {
          type: 'CLEAR_NOTIFICATION'
      }
  }

  export const setNotification = (message, seconds) => {
    const [timeID, setTimeID] = useState(null)

    let timeoutID
    // let ss = setTimeout( clearNotification, 5)
    console.log("timeoutID: ", timeoutID)
    console.log("timeID: ", timeID)
  
    return (dispatch) => {   
      clearTimeout(timeID)
      dispatch({
      type: 'NOTIFY',
      data: {message},
      })
      timeoutID = setTimeout(() => {
      dispatch(clearNotification())
      }, seconds * 1000)
      setTimeID(timeoutID)
    }
 }

  export default notificationReducer