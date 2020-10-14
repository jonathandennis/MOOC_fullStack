import React from 'react'
import { useDispatch } from 'react-redux'

import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { BrowserRouter as Router, useHistory } from 'react-router-dom'

const Blog = ({ blog, loggedUser }) => {
  console.log('blog in Blog: ', blog)

  const dispatch = useDispatch()
  const history = useHistory()

  // Allow blogs to be deleted only if blog post created by user
  const showDeleteButton = () => {

    if (loggedUser.username === blog.user['username']) {
      return (
        <button onClick={() => handleDeleteBlog(blog.id)}>Remove</button>
      )
    }
  }

  const handleDeleteBlog = (id) => {
    //const toDelete = blogs.find(blog => blog.id === id)
    const toDelete = blog

    if (window.confirm(`Remove: ${toDelete.title} By: ${toDelete.author}?`)) {

      dispatch(deleteBlog(id))
      history.push('/')
      dispatch(setNotification(`${toDelete.title} by ${toDelete.author} was successfully deleted!`, 5))
      //notify(`${toDelete.title} by ${toDelete.author} was successfully deleted!`, 'ok')
    }
  }

  const handleLike = async () => {
    console.log('blog in handleLike: ', blog)

    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`Like added to: ${blog.title}`, 5))
      //notify(`Like added to: ${blog.title}`, 'ok')
    } catch (exception){
      dispatch(setNotification('Error!', 5))
      //notify('Error!')
    }
  }

  if (!blog) {
    return null
  }

  return(
    <div>
      <div>
        <br />
        <h2>{blog.title} {blog.author}</h2>
      </div>
      <div>
        {blog.url}
        <br />
        {blog.likes} Likes
        <button onClick={handleLike}>like</button>
        <br />
        added by: {blog.user.name}
        <br />
        {showDeleteButton()}
      </div>
    </div>
  )
}

export default Blog
