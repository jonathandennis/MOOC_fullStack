import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch (action.type) {
  case 'INIT_USER':
    return action.data
  case 'SET_USER':
    return action.data
  case 'SET_NULL':
    return action.data

  default:
    return state
  }
}

export const initializeUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  return async dispatch => {
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      blogService.setToken(user.token)
      dispatch({
        type: 'INIT_USER',
        data: user,
      })
    }
  }
}

export const setUser = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
  return async dispatch => {
    const user = JSON.parse(loggedUserJSON)
    blogService.setToken(user.token)
    dispatch({
      type: 'SET_USER',
      data: user,
    })
  }
}

export const setUserNull = () => {
  return async dispatch => {
    dispatch({
      type: 'SET_NULL',
      data: null
    })
  }
}

export default userReducer