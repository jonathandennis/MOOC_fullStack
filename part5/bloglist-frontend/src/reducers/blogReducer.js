import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  //console.log('...state: ', ...state)
  switch (action.type) {
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'INIT_BLOGS':
    return action.data

  default:
    return state
  }
}

// export const createBlog = (title, author, url, user) => {
//   return {
//     type: 'NEW_BLOG',
//     data: {
//       title,
//       author,
//       user,
//       url,
//       likes: 0,
//     }
//   }
// }

export const createBlog = (title, author, url) => {
  return async (dispatch) => {
    const newBlog = await blogService.create(title, author, url)
    console.log('newBlog in createBlog: ', newBlog)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

// export const createBlog = (data) => {
//   console.log('data in reducer: ', data)
//   return {
//     type: 'NEW_BLOG',
//     data,
//   }
// }

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export default blogReducer