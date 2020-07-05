import React from 'react'

const Notification = ({ message, type }) => {
 if (message === null) {
     return null
   }
   
   console.log('message:', message)

   const notificationStyle = {
    background: 'lightgrey',
    color: type ==='error' ? 'red' : 'green',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
   }

   return (
    <div style={notificationStyle}>
       {message}
    </div>
  )
}


export default Notification