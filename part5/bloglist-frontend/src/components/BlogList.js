import React from 'react'

import { BrowserRouter as Router, Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {

  console.log('blogs in BlogList: ', blogs)

  const ulStyle = {
    margin: 0,
    padding: 0,
    listStyleType: 'none'
  }

  const blogStyle = {
    paddingTop: 7,
    paddingLeft: 20,
    paddingBottom: 8,
    border: 'solid',
    borderRadius: 2.5,
    borderWidth: 1,
    borderColor: 'dimgray',
    marginTop: 5
  }

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return(
    <div>
      <ul style={ulStyle}>
        {blogs.sort(byLikes).map(blog =>
          <li key={blog.id} style={blogStyle}>
            <Link to={`/${blog.id}`}>{blog.title} {blog.author}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogList