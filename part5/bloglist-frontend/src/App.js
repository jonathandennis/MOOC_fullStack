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
  console.log('loggedUser in App: ', loggedUser)

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
    } catch (error) {
      dispatch(setNotification('Wrong username or password', 5))
      //notify('Wrong username or password')
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
    dispatch(setNotification(`${loggedUser.name} has been sucessfully logged out.`, 5))
    //notify(`${user.name} has been sucessfully logged out.`, 'ok')
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
      <div className="container">
        <div>
          <Notification />
          {loginForm()}
          <Footer />
        </div>
      </div>
    )
  }

  const padding = {
    paddingLeft: 20
  }

  const buttonStyle = {
    padding: (0, 3, 0, 3),
    borderRadius: 10,
    marginLeft: 330
  }

  return (
    <div className="container">
      <div>
        <div style={{ backgroundColor: 'gainsboro' }}>
          <Link style={padding} to="/">blogs</Link>
          <Link style={padding} to="/users">users</Link>
          <em style={padding}>{loggedUser.name} logged in </em>
          <button type="submit" onClick={handleLogout} style={buttonStyle}>logout</button>
        </div>
        <br />
        <Notification />
        <h2>blog app</h2>
        <br />
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
            <BlogForm />
            <BlogList blogs={blogs} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  )
}

export default App