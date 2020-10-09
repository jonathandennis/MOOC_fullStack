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
    const id = action.data.id
    return state.remove(blog =>
      blog.id === id)
  }
  case 'LIKE_BLOG': {
    console.log('state in LIKE_BLOG: ', state)
    console.log('action.data in LIKE_BLOG', action.data)
    const id = action.data.data.id
    console.log('id in LIKE_BLOG: ', id)
    return state.map(blog => blog.id !== id ? blog : action.data.data)
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
    console.log('newBlog in createBlog: ', newBlog)
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

export const deleteBlog = (id) => {
  return async dispatch => {
    //const toDelete = await blogs.find(blog => blog.id === id)
    console.log('blog to delete: ', id)
    dispatch({
      type: 'DELETE_BLOG',
      data: id,
    })
  }
}

export default blogReducer