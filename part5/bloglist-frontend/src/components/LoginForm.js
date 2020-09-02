import React from 'react'
import PropTypes from 'prop-types'

const LoginForm = ({
    handleSubmit,
    username,
    password,
    handleUsernameChange,
    handlePasswordChange
}) => {
    return (
        <div>
            
            <form onSubmit={handleSubmit}>
                <div>
                  <h2>Log in to application</h2>
                    username
                      <input
                      type="text"
                      value={username}
                      name="Username"
                      onChange={handleUsernameChange}
                    />
                  </div>
                  <div>
                    password
                      <input
                      type="password"
                      value={password}
                      name="Password"
                      onChange={handlePasswordChange}
                    />
                </div>
                <button type="submit">login</button>
            </form>      
        </div>
    )
}

LoginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsernameChange: PropTypes.func.isRequired,
  handlePasswordChange: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default LoginForm