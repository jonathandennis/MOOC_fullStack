import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
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
  BrowserRouter as Router,
  Switch, Route, useRouteMatch
} from 'react-router-dom'


const App = () => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const blogs = useSelector(state => state.blogs)
  const loggedUser = useSelector(state => state.loggedUser)
  const users = useSelector(state => state.users)
  console.log('loggedUser in App: ', loggedUser)

  const match = useRouteMatch('/users/:id')
  const user = match
    ? users.find(user => user.id === String(match.params.id))
    : null

  const dispatch = useDispatch()

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

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return (
    <div className="container">
      <div>
        <h2>blogs</h2>

        <Notification />

        <p>{loggedUser.name} logged in</p>
        <button type="submit" onClick={handleLogout}>logout</button>

        <Switch>
          <Route path="/blogs">
            <BlogForm />
            {blogs.sort(byLikes).map(blog =>
              <Blog
                key={blog.id}
                loggedUser={loggedUser}
                blog={blog}
              />
            )}
          </Route>
          <Route path="/users/:id">
            <User user={user} />
          </Route>
          <Route path="/users">
            <UserList users={users} />
          </Route>
        </Switch>
        <Footer />
      </div>
    </div>
  )
}

export default App