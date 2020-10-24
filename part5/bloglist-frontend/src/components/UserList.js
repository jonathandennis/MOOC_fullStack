import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  console.log('users in UserList: ', users)

  const tableStyle = {
    width: '60%',
    tableLayout: 'fixed'
  }

  const trthStyle = {
    textAlign: 'left'
  }

  return(
    <div>
      <h2>Users</h2>
      <table cstyle={tableStyle}>
        <thead>
          <tr style={trthStyle}>
            <th></th>
            <th>blogs created</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id}>
              <td>
                <Link to={`/users/${user.id}`}>{user.name}</Link>
              </td>
              <td>
                {user.blogs.length}
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}

export default UserList