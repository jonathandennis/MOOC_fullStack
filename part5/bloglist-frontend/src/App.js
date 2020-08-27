import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login' 

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newTitle, setNewTitle] = useState('')
  const [newAuthor, setNewAuthor] = useState('')
  const [newUrl, setNewUrl] = useState('')
  const [username, setUsername] = useState('') 
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

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

  const addBlog = event => {
    event.preventDefault()
    const blogObject = {
      title: newTitle,
      author: newAuthor,
      url: newUrl,
    }

    blogService
      .create(blogObject)
      .then(returnedBlog => {
        setBlogs(blogs.concat(returnedBlog))
        notify(`a new blog ${blogObject.title} by ${blogObject.author} added`, 'ok')
      })
    setNewTitle('')
    setNewAuthor('')
    setNewUrl('')
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

  const handleTitleChange = (event) => {
    setNewTitle(event.target.value)
  }

  const handleAuthorChange = (event) => {
    setNewAuthor(event.target.value)
  }

  const handleUrlChange = (event) => {
    setNewUrl(event.target.value)
  }

  const loginForm = () => (

    <form onSubmit={handleLogin}>
      <div>
        <h2>Log in to application</h2>
          username
            <input
            type="text"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
            <input
            type="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
      </div>
      <button type="submit">login</button>
    </form>      
  )

  const blogForm = () => (

    <form onSubmit={addBlog}>

        <h2>Create new blog</h2>

      <div>
        Title: <input
                type="text"
                value={newTitle}
                onChange={handleTitleChange}
              />
      </div>
      <div>
        Author: <input
                  type="text"
                  value={newAuthor}
                  onChange={handleAuthorChange}
                />
      </div>
      <div>
        Url: <input
              type="text"
              value={newUrl}
              onChange={handleUrlChange}
             />
      </div>
      <button type="submit">create</button>
    </form>  
  )

  if (user === null) {
    return (
      <div>
      <Notification message={notification} />
      {loginForm()}
      </div>
    )
  }

  return (
    <div>
      <Notification message={notification} />

      <h2>blogs</h2>
          
      <p>{user.name} logged in  <button type="submit" onClick={handleLogout}>logout</button></p>

      {blogForm()}

      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}

    </div>
  )
}

export default App