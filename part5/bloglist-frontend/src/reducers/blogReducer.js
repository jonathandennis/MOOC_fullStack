import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
  console.log('state now: ', state)
  console.log('action now: ', action)
  switch (action.type) {
  case 'INIT_BLOGS':
    return action.data
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'DELETE_BLOG': {
    return state.filter(blog => blog.id !== action.data)
  }
  case 'LIKE_BLOG': {
    const id = action.data.data.id
    return state.map(blog => blog.id !== id ? blog : action.data.data)
  }
  case 'NEW_COMMENT': {
    const id = action.id
    const comment = action.data

    return state.map(blog => blog.id !== id ? blog : {
      ...blog,
      comments: [...blog.comments, comment]
    })
  }

  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs,
    })
  }
}

export const createBlog = (title, author, url) => {
  return async dispatch => {
    const newBlog = await blogService.create(title, author, url)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog,
    })
  }
}

export const likeBlog = (blog) => {
  const changedBlog = {
    ...blog,
    likes: blog.likes + 1
  }
  return async dispatch => {
    const newObject = await blogService.update(blog.id, changedBlog)
    dispatch({
      type: 'LIKE_BLOG',
      data: newObject
    })
  }
}

export const addComment = (id, comment) => {
  return async dispatch => {
    const newComment = await blogService.addComment(id, comment)
    dispatch({
      type: 'NEW_COMMENT',
      data: newComment, id
    })
  }
}

export const deleteBlog = (id) => {
  return async dispatch => {
    await blogService.remove(id)
    console.log('blog to delete: ', id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export default blogReducer