import React, { useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'

import { deleteBlog, likeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const Blog = ({ user, blog }) => {
  const [ visibility, setVisibility ] = useState(false)

  const blogs = useSelector(state => state.blogs)
  const dispatch = useDispatch()

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visibility ? 'none': '' }
  const showWhenVisibile = { display: visibility ? '' : 'none' }

  // Allow blogs to be deleted only if blog post created by user
  const showDeleteButton = () => {

    if (user.username === blog.user['username']) {
      return (
        <button onClick={() => handleDeleteBlog(blog.id)}>Remove</button>
      )
    }
  }

  const handleDeleteBlog = (id) => {
    const toDelete = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove: ${toDelete.title} By: ${toDelete.author}?`)) {

      dispatch(deleteBlog(id))
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

  const toggle = () => {
    setVisibility(!visibility)
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blog'>
        {blog.title} {blog.author}
        <button onClick={toggle}>view</button>

      </div>
      <div style={showWhenVisibile} className='blogView'>
        {blog.title} {blog.author}
        <button onClick={toggle}>hide</button>
        <br/>
        {blog.url}
        <br/>
        {blog.likes}
        <button onClick={handleLike}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        {showDeleteButton()}
      </div>
    </div>
  )
}

export default Blog
