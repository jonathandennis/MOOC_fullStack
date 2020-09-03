import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ user, blogs, setBlogs, blog, notify, deleteBlog }) => {

  const [ visibility, setVisibility ] = useState(false)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const hideWhenVisible = { display: visibility ? 'none': '' }
  const showWhenVisibile = { display: visibility ? '' : 'none' }

  // Allow blogs to be deleted only if blog post created by user
  const showDeleteButton = () => {

    if (user.username === blog.user['username']) {
      return (
        <button onClick={() => deleteBlog(blog.id)}>Remove</button>
      )
    }
  }

  // const handleLikes = (id) => {
  //   const likeBlog = blogs.find(blog => blog.id === id)
  //   console.log('blog: ', likeBlog)
  //   const updateLike = { ...likeBlog, likes: likeBlog.likes + 1 }
  //   blogService
  //     .update(id, updateLike)
  //     .then(response =>
  //       setBlogs(blogs.map(blog => blog.id !== id ? blog : response))
  //     )
  // }
  const likeBlog = async () => {

    const likedBlog = {
      title: blog.title,
      likes: blog.likes + 1,
      author: blog.author,
      url: blog.url,
      id: blog.id,
      user: blog.user
    }
    console.log('liked blog: ', likedBlog)
    console.log('blog.user: ', blog.user)

    try {
      await blogService
        .update(blog.id, likedBlog)
      console.log('blog.id: ', blog.id)
      setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : likedBlog))
      console.log('likedBlog in try: ', likedBlog)
      notify(`Like added to: ${blog.title}`, 'ok')
    } catch (exception){
      notify('Error!')
    }
  }

  const toggle = () => {
    setVisibility(!visibility)
  }
  
  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className='blog'>
        {blog.title}
        {blog.author}
        <button onClick={toggle}>view</button>
      </div>
      <div style={showWhenVisibile} className='blogView'>
        {blog.title}
        {blog.author}
        <button onClick={toggle}>hide</button>
        <br/>
        {blog.url}
        <br/>
        {blog.likes}
        <button onClick={likeBlog}>like</button>
        <br/>
        {blog.user.name}
        <br/>
        {showDeleteButton()}
      </div>
    </div>
  )
}

export default Blog
