import React from 'react'

import { Link } from 'react-router-dom'

const BlogList = ({ blogs }) => {

  const byLikes = (b1, b2) => b2.likes - b1.likes

  return(
    <div>
      <ul className="BlogList-ul">
        {blogs.sort(byLikes).map(blog =>
          <li key={blog.id} className="BlogList-li stripe-li">
            <Link to={`/${blog.id}`} className="link">{blog.title},&nbsp;&nbsp;{blog.author}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default BlogList