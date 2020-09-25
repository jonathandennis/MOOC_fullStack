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

  let timeoutID

  export const setNotification = (message, seconds) => {
    console.log("timeoutID: ", timeoutID)
  
    return async (dispatch) => {   
      dispatch({
      type: 'NOTIFY',
      data: {message},
      })

      if (timeoutID) {
        clearTimeout(timeoutID)
      }
      
      timeoutID = setTimeout(() => {
      dispatch(clearNotification())
      }, seconds * 1000)     
    }
 }

  export default notificationReducer

// const notificationReducer = (state = null, action) => {
//   switch (action.type) {
//     case "NOTIFY":
//       return action.data
//     case "CLEAR_NOTIFICATION":
//       return (state = null)

//     default:
//       return state
//   }
// }

// export const clearNotification = () => {
//   return {
//     type: "CLEAR_NOTIFICATION",
//   }
// }

// export const setNotification = (message, seconds) => {
//   return (dispatch) => {
//     dispatch({
//       type: "NOTIFY",
//       data: { message },
//     })
//   }
// }

// export default notificationReducer