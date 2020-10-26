import React from 'react'
import { useDispatch } from 'react-redux'

import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { useHistory } from 'react-router-dom'

const Blog = ({ blog, loggedUser }) => {

  const dispatch = useDispatch()
  const history = useHistory()

  // Allow blogs to be deleted only if blog post created by user
  const showDeleteButton = () => {

    if (loggedUser.username === blog.user['username']) {
      return (
        <button onClick={() => handleDeleteBlog(blog.id)}>Remove Blog</button>
      )
    }
  }

  const handleDeleteBlog = (id) => {
    if (window.confirm(`Remove: ${blog.title} By: ${blog.author}?`))
      try {
        dispatch(deleteBlog(id))
        history.push('/')
        dispatch(setNotification(`${blog.title} by ${blog.author} was successfully deleted!`, 'ok'))
      } catch(exception){
        dispatch(setNotification('Error!'))
      }
  }

  const handleLike = async () => {
    try {
      dispatch(likeBlog(blog))
      dispatch(setNotification(`Like added to: ${blog.title}`, 'ok'))
    } catch (exception){
      dispatch(setNotification('Error!'))
    }
  }

  const handleComment = async (event) => {
    event.preventDefault()
    try {
      const comment = event.target.comment.value
      event.target.comment.value = ''
      dispatch(addComment(blog.id, comment))
      dispatch(setNotification('Your comment was added successfully!', 'ok'))
    } catch (exception){
      dispatch(setNotification('Error!'))
    }
  }

  if (!blog) {
    return null
  }

  return(
    <div className="blogview-container">
      <div className="blog-container">
        <div className="blog-title">
          <h2>{blog.title},&nbsp;&nbsp;{blog.author}</h2>
        </div>
        <div className="blog-body">
          <div className="body-1">
            <a href={blog.url}>{blog.url}</a>
          </div>
          <div className="body-1">
            {blog.likes}&nbsp;Likes
            <button onClick={handleLike} id="like-button">like</button>
          </div>
          <div className="body-1">
          added by:&nbsp;{blog.user.name}
          </div>
        </div>
      </div>
      <div className="comments-container">
        <div className="comments-form">
          <form onSubmit={handleComment}>
            <input
              name="comment"
              id="comment-input"
            />
            <button type="submit" id="comment-button">add comment</button>
          </form>
        </div>
        <h5 className="comments-header">comments:</h5>
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id} className="stripe-li comment-li">{comment.comment}</li>)}
        </ul>
      </div>
      {showDeleteButton()}
    </div>
  )
}

export default Blog