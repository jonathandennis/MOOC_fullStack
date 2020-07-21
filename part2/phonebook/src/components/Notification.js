
import React from 'react'

const Notification = ({ notice }) => {
 if (notice === null) {
     return null
   }

   const notificationStyle = {
    background: 'lightgrey',
    color: notice.type ==='ok' ? 'green' : 'red',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 5,
    marginBottom: 10
   }

   return (
    <div style={notificationStyle}>
       {notice.message}
    </div>
  )
}

export default Notification 
