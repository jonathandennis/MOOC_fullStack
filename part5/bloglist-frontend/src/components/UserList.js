import React from 'react'
import { Table } from 'react-bootstrap'

import { BrowserRouter as Router, Link } from 'react-router-dom'


const UserList = ({ users }) => {
  console.log('users in UserList: ', users)


  return(
    <div>
      <h2>Users</h2>
      <Table borderless size="sm">
        <thead>
          <tr>
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
      </Table>
    </div>
  )
}

export default UserList