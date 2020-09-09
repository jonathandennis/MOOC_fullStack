import React from 'react'

const Footer = () => {
  const footerStyle = {
    color: 'green',
    fontStyle: 'italic',
    fontSize: 16
  }

  return (
    <div style={footerStyle}>
      <br />
      <em>Blog app, Made by Jonathan Dennis for submission to the University of Helsinki Full Stack Open MOOC 2020</em>
    </div>
  )
}

export default Footer