import React from 'react'
import { Link } from 'react-router-dom'

const UserList = ({ users }) => {
  console.log('users in UserList: ', users)

  return(
    <div>
      <h2 className="users-header">Users:</h2>
      <table className="table">
        <thead>
          <tr>
            <th className="th"></th>
            <th className="th" style={{ fontSize: '.94rem' }}>blogs created:</th>
          </tr>
        </thead>
        <tbody>
          {users.map(user =>
            <tr key={user.id} className="tr">
              <td className="td">
                <Link to={`/users/${user.id}`} className="link">{user.name}</Link>
              </td>
              <td className="td" style={{ paddingLeft: '7rem' }}>
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