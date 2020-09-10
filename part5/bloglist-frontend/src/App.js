import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const notify = (message, type='error') => {
    setNotification({ type,message })
    setTimeout(() => {
      setNotification(null)
    }, 5000)
  }

  const addBlog = (blogObject) => {
    console.log('blogObject: ', blogObject)
    blogFormRef.current.toggleVisibility()
    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'ok')
      })
  }

  const deleteBlog = (id) => {
    const toDelete = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove: ${toDelete.title} By: ${toDelete.author}?`)) {

      blogService
        .remove(id)
      setBlogs(blogs.filter(blog => blog.id !== id))
      notify(`${toDelete.title} by ${toDelete.author} was successfully deleted!`, 'ok')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const user = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      notify('Wrong username or password')
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem(
      'loggedBlogappUser', JSON.stringify(user)
    )
    setUser(null)
    notify(`${user.name} has been sucessfully logged out.`, 'ok')
  }

  const loginForm = () => (
    <LoginForm
      username={username}
      password={password}
      handleUsernameChange={({ target }) => setUsername(target.value)}
      handlePasswordChange={({ target }) => setPassword(target.value)}
      handleSubmit={handleLogin}
    />
  )

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  )

  // Display list of blogs
  const bloglist = () => blogs.map(blog =>
    <Blog
      key={blog.id}
      user={user}
      blog={blog}
      blogs={blogs}
      setBlogs={setBlogs}
      deleteBlog={deleteBlog}
      notify={notify}
    />
  )

  // Sort blogs by number of likes
  const sortBlogs = (blogs) => {
    blogs.sort((a, b) => {return b.likes - a.likes})
  }

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        {loginForm()}
        <Footer />
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} />

      <h2>blogs</h2>

      <p>{user.name} logged in  <button type="submit" onClick={handleLogout}>logout</button></p>

      {blogForm()}
      {sortBlogs(blogs)}
      <ul>
        {bloglist()}
      </ul>
      <Footer />
    </div>
  )
}

export default App