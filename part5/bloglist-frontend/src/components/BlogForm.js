import React, {useState} from 'react'

const BlogForm = ({ createBlog }) => {
    const [newTitle, setNewTitle] = useState('') 
    const [newAuthor, setNewAuthor] = useState('')
    const [newUrl, setNewUrl] = useState('')

    const handleTitleChange = (event) => {
        setNewTitle(event.target.value)
      }
    
    const handleAuthorChange = (event) => {
      setNewAuthor(event.target.value)
    }
    
    const handleUrlChange = (event) => {
      setNewUrl(event.target.value)
    }

    const addBlog = (event) => {
        event.preventDefault()
        createBlog({
            title: newTitle,
            author: newAuthor,
            url: newUrl,
        })

    setNewAuthor('')
    setNewTitle('')
    setNewUrl('')
    }

    return (
        <div>
            <h2>Create new</h2>

            <form onSubmit={addBlog}>
                <div>
                  Title: <input
                          type="text"
                          value={newTitle}
                          onChange={handleTitleChange}
                        />
                </div>
                <div>
                  Author: <input
                            type="text"
                            value={newAuthor}
                            onChange={handleAuthorChange}
                          />
                </div>
                <div>
                  Url: <input
                        type="text"
                        value={newUrl}
                        onChange={handleUrlChange}
                       />
                </div>
                <button type="submit">create</button>
            </form>
        </div>
    )
}


  export default BlogForm