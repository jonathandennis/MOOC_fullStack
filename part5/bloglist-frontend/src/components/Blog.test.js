import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'

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