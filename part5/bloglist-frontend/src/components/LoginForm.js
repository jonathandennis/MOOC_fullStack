import React from 'react'

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


  export default LoginForm