import React from 'react'
import { useDispatch } from 'react-redux'

import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

import { useHistory } from 'react-router-dom'

const Blog = ({ blog, loggedUser }) => {
  console.log('blog in Blog: ', blog)

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

  const handleComment = async (event) => {
    event.preventDefault()

    const comment = event.target.comment.value
    event.target.comment.value = ''
    console.log('comment in handleComment: ', comment)

    dispatch(addComment(blog.id, comment))
  }

  if (!blog) {
    return null
  }

  const buttonStyle = {
    marginLeft: 3,
    padding: (0, 2, 0, 2),
    borderRadius: 6,
  }

  return(
    <div>
      <div>
        <h2>{blog.title} {blog.author}</h2>
      </div>
      <div>
        {blog.url}
        <br />
        {blog.likes} Likes
        <button onClick={handleLike} style={buttonStyle}>like</button>
        <br />
        added by: {blog.user.name}
        <br />
        <br />
        <h5>comments</h5>
        <br />
        <div>
          <form onSubmit={handleComment}>
            <input
              name="comment"
            />
            <button type="submit">add comment</button>
          </form>
        </div>
        <br />
        <ul>
          {blog.comments.map(comment =>
            <li key={comment.id}>{comment.comment}</li>)}
        </ul>
        <br />
        {showDeleteButton()}
      </div>
    </div>
  )
}

export default Blog
