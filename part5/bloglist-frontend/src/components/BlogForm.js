import React from 'react'

const BlogForm = ({
    addBlog,
    newTitle,
    handleTitleChange,
    newAuthor,
    handleAuthorChange,
    newUrl,
    handleUrlChange
}) => {
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