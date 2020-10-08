import React, { useRef } from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import Togglable from '../components/Togglable'



const BlogForm = () => {
  const dispatch = useDispatch()
  const blogFormRef = useRef()

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    event.target.title.value = ''
    console.log('title: ', title)

    const author = event.target.author.value
    event.target.author.value = ''
    console.log('author: ', author)

    const url = event.target.url.value
    event.target.url.value = ''
    console.log('url: ', url)

    blogFormRef.current.toggleVisibility()
    dispatch(createBlog(title, author, url))
    dispatch(setNotification(`A new blog: '${title}' by ${author} added`, 5))
  }

  return (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <div className="formDiv">
        <h2>Create new</h2>

        <form onSubmit={addBlog}>
          <div>
            Title: <input
              id="title"
              name="title"
              type="text"
            />
          </div>
          <div>
            Author: <input
              id="author"
              name="author"
              type="text"
            />
          </div>
          <div>
            Url: <input
              id="url"
              name="url"
              type="text"
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    </Togglable>
  )
}

export default BlogForm