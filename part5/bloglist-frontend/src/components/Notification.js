import React from 'react'
import { useSelector } from 'react-redux'

const Notification = () => {
  const notification = useSelector(state => state.notifications)

  if (notification === null) {
    return null
  }

  const style = {
    background: 'lightgrey',
    color: notification.type ==='ok' ? 'green' : 'red',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
  }

  return (
    <div
      className="notification"
      style={style}>
      {notification.message}
    </div>
  )
}

export default Notification
