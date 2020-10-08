import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'

import { initializeBlogs } from './reducers/blogReducer'
import { useDispatch, useSelector } from 'react-redux'

const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  const dispatch = useDispatch()
  const blogs = useSelector(state => state)


  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

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

  const deleteBlog = (id) => {
    const toDelete = blogs.find(blog => blog.id === id)

    if (window.confirm(`Remove: ${toDelete.title} By: ${toDelete.author}?`)) {

      blogService
        .remove(id)
      //setBlogs(blogs.filter(blog => blog.id !== id))
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

  if (user === null) {
    return (
      <div>
        <Notification message={notification} />
        {loginForm()}
        <Footer />
      </div>
    )
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div>
      <h2>blogs</h2>

      <Notification message={notification} />

      <p>{user.name} logged in  <button type="submit" onClick={handleLogout}>logout</button></p>

      <BlogForm />
      {blogs.sort(byLikes).map(blog =>
        <Blog
          key={blog.id}
          user={user}
          blog={blog}
          deleteBlog={deleteBlog}
          notify={notify}
        />
      )}
      <Footer />
    </div>
  )
}

export default App