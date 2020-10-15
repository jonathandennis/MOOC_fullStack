import React from 'react'

export const User = ({ user }) => {
  console.log('user in User: ', user)

  if (!user) {
    return null
  }

  return(
    <div>
      <h2>{user.name}</h2>
      <h5>added blogs</h5>
      <ul style={{ listStyleType: 'none' }}>
        {user.blogs.map(user =>
          <li key={user.id}>
            {user.title}
          </li>)}
      </ul>
    </div>
  )
}

export default User