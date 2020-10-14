import React from 'react'
import { useSelector } from 'react-redux'
import { Table } from 'react-bootstrap'

const UserList = () => {
  const users = useSelector(state => state.users)
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
                {user.name}
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