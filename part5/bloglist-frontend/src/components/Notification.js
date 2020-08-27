import React from 'react'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  const notificationStyle = {
    background: 'lightgrey',
    color: message.type ==='ok' ? 'green' : 'red',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
   }

  return (
    <div
         style={notificationStyle}>
      {message.message}
    </div>
  )
}

export default Notification
