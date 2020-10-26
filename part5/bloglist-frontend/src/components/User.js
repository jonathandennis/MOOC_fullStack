import React from 'react'

export const User = ({ user }) => {
  if (!user) {
    return null
  }

  return(
    <div>
      <h2 className="user-name">{user.name}</h2>
      <h5 style={{ fontSize: '.94rem' }}>added blogs:</h5>
      <ul>
        {user.blogs.map(user =>
          <li key={user.id} className="user-li stripe-li">
            {user.title}
          </li>)}
      </ul>
    </div>
  )
}

export default User