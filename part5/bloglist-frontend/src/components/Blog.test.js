import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

test('renders blog title and author', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luikkannen',
    url: 'http://www.testurl.com',
    likes: 3,
    user: {
      name: 'Jon Dennis',
      username: 'jdfoto'
    }
  }

  const user = {
    name: 'Jon Dennis',
    username: 'jdfoto'
  }

  const component = render(
    <Blog blog={blog} user={user} />
  )

  const div = component.container.querySelector('.blog')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-libraryMatti Luikkannen'
  )
})

test('renders entire blog when click view', () => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luikkannen',
    url: 'http://www.testurl.com',
    likes: 3,
    user: {
      name: 'Jon Dennis',
      username: 'jdfoto'
    }
  }

  const user = {
    name: 'Jon Dennis',
    username: 'jdfoto'
  }

  const mockHandler = jest.fn()

  const component = render(
    <Blog blog={blog} user={user} toggle={mockHandler} />
  )

  const button = component.getByText('view')
  fireEvent.click(button)

  const div = component.container.querySelector('.blogView')
  expect(div).toHaveTextContent(
    'Component testing is done with react-testing-libraryMatti Luikkannenhidehttp://www.testurl.com3likeJon DennisRemove'
  )
})

test('when like button is clicked twice event handler is called twice', ( setBlogs, blogs ) => {
  const blog = {
    title: 'Component testing is done with react-testing-library',
    author: 'Matti Luikkannen',
    url: 'http://www.testurl.com',
    likes: 3,
    id: 'doIreallyNeedAnID',
    user: {
      name: 'Jon Dennis',
      username: 'jdfoto'
    }
  }

  const likedBlog = {
    title: blog.title,
    likes: blog.likes + 1,
    author: blog.author,
    url: blog.url,
    id: blog.id,
    user: blog.user
  }

  const user = {
    name: 'Jon Dennis',
    username: 'jdfoto'
  }

  const mockHandler = jest.fn()
  blogService
    .update(blog.id, likedBlog)
  setBlogs(blogs.map(blog => blog.id !== likedBlog.id ? blog : likedBlog))

  const component = render(
    <Blog blog={blog} user={user} likeBlog={mockHandler} setBlogs={setBlogs} blogs={blogs} />
  )

  const button = component.getByText('like')
  fireEvent.click(button)

  //expect(mockHandler.mock.calls).toHaveLength(1)
  const div = component.container.querySelector('.blogView')
  expect(div).toHaveTextContent(
    '4'
  )

})