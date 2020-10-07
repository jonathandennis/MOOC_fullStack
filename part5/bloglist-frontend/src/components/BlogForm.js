import React from 'react'
import { useDispatch } from 'react-redux'
import { createBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const dispatch = useDispatch()
  //const [newTitle, setNewTitle] = useState('')
  //const [newAuthor, setNewAuthor] = useState('')
  //const [newUrl, setNewUrl] = useState('')

  // const handleTitleChange = (event) => {
  //   setNewTitle(event.target.value)
  // }

  // const handleAuthorChange = (event) => {
  //   setNewAuthor(event.target.value)
  // }

  // const handleUrlChange = (event) => {
  //   setNewUrl(event.target.value)
  // }

  const addBlog = async (event) => {
    event.preventDefault()

    const title = event.target.title.value
    event.target.title.value = ''
    console.log('title: ', title)

    const author = event.target.author.value
    event.target.author.value = ''
    console.log('author: ', author)

    const url = event.target.url.value
    event.target.url.value = ''
    console.log('url: ', url)

    dispatch(createBlog(title, author, url))
  }

  ////// not async
  // const addBlog = (event) => {
  //   event.preventDefault()

  //   const title = event.target.title.value
  //   event.target.title.value = ''
  //   console.log('title: ', title)

  //   const author = event.target.author.value
  //   event.target.author.value = ''
  //   console.log('author: ', author)

  //   const url = event.target.url.value
  //   event.target.url.value = ''
  //   console.log('url: ', url)

  //   dispatch(createBlog(title, author, url))
  // }
  /////// Internal React State
  // const addBlog = (event) => {
  //   event.preventDefault()
  //   createBlog({
  //     title: newTitle,
  //     author: newAuthor,
  //     url: newUrl,
  //   })

  //  setNewAuthor('')
  //  setNewTitle('')
  //  setNewUrl('')
  //}

  return (
    <div className="formDiv">
      <h2>Create new</h2>

      <form onSubmit={addBlog}>
        <div>
          Title: <input
            id="title"
            name="title"
            type="text"
            //value={newTitle}
            //onChange={handleTitleChange}
          />
        </div>
        <div>
          Author: <input
            id="author"
            name="author"
            type="text"
            //value={newAuthor}
            //onChange={handleAuthorChange}
          />
        </div>
        <div>
          Url: <input
            id="url"
            name="url"
            type="text"
            //value={newUrl}
            //onChange={handleUrlChange}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}


export default BlogForm