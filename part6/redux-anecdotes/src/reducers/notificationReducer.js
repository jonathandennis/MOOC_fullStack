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

  export const setNotification = (message) => {
      return {
          type: 'NOTIFY',
          data: {message}
      }
  }

  export const clearNotification = () => {
      return {
          type: 'CLEAR_NOTIFICATION'
      }
  }

  export default notificationReducer