import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import BlogList from './components/BlogList'
import Notification from './components/Notification'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import UserList from './components/UserList'
import User from './components/User'
import Footer from './components/Footer'
import blogService from './services/blogs'
import loginService from './services/login'
import './App.css'

import { initializeBlogs } from './reducers/blogReducer'
import { initializeLoggedUser, setLoggedUser, setLoggedUserNull } from './reducers/loggedUserReducer'
import { initializeUsers } from './reducers/usersReducer'
import { setNotification } from './reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'

import {
  Switch, Route, Link, useRouteMatch, useHistory
} from 'react-router-dom'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)

  const dispatch = useDispatch()
  const history = useHistory()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeLoggedUser())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])


  const handleLogin = async (event) => {
    event.preventDefault()
    console.log('logging in with', username, password)

    try {
      const loggedUser = await loginService.login({
        username, password,
      })

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )
      blogService.setToken(loggedUser.token)
      dispatch(setLoggedUser())
      setUsername('')
      setPassword('')
      dispatch(setNotification(`${loggedUser.name} has been sucessfully logged in.`, 'ok'))
    } catch (error) {
      dispatch(setNotification('Wrong username or password'))
      setUsername('')
      setPassword('')
    }
  }

  const handleLogout = async () => {
    window.localStorage.removeItem(
      'loggedBlogappUser', JSON.stringify(loggedUser)
    )
    dispatch(setLoggedUserNull(null))
    history.push('/')
    dispatch(setNotification(`${loggedUser.name} has been sucessfully logged out.`, 'ok'))
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

  const matchBlogs = useRouteMatch('/:id')
  const blog = matchBlogs
    ? blogs.find(blog => blog.id === String(matchBlogs.params.id))
    : null

  const matchUsers = useRouteMatch('/users/:id')
  const user = matchUsers
    ? users.find(user => user.id === String(matchUsers.params.id))
    : null

  if (loggedUser === null) {
    return (
      <body className="body">
        <main className="main">
          <h2 className="blog-app">&lt;blog app&gt;</h2>
          <Notification />
          {loginForm()}
          <footer className="footer">
            <Footer />
          </footer>
        </main>
      </body>
    )
  }

  return (
    <body className="body">
      <header>
        <nav className="nav-bar">
          <div className="nav-left">
            <Link className="link nav-link-1" to="/">blogs</Link>
            <Link className="link nav-link-2" to="/users">users</Link>
          </div>
          <div className="nav-right">
            <em id="nav-user">{loggedUser.name} logged in </em>
            <button type="submit" onClick={handleLogout} id="nav-button">logout</button>
          </div>
        </nav>
        <h2 className="blog-app">&lt;blog app&gt;</h2>
      </header>
      <main className="main">
        <Notification />
        <Switch>
          <Route path="/users/:id">
            <User user={user} />
          </Route>
          <Route path="/users">
            <UserList users={users} />
          </Route>
          <Route path="/:id">
            <Blog blog={blog} loggedUser={loggedUser} />
          </Route>
          <Route path="/">
            <BlogForm loggedUser={loggedUser} />
            <BlogList blogs={blogs} />
          </Route>
        </Switch>
        <footer className="footer">
          <Footer />
        </footer>
      </main>
    </body>
  )
}

export default App