const http = require('http')
const express = require('express')
const app = express()
const Blog = require('./models/blog')
const logger = require('./utils/logger')
const middleware = require('./utils/middleware')
const config = require('./utils/config')

const cors = require('cors')

const server = http.createServer(app)

app.use(cors())
app.use(express.json())
app.use(middleware.requestLogger)

app.get('/api/blogs', (request, response, next) => {
  Blog
    .find({})
    .then(blogs => {
      response.json(blogs)
    })
    .catch(error => next(error))
})

app.post('/api/blogs', (request, response, next) => {
  const blog = new Blog(request.body)

  blog
    .save()
    .then(result => {
      response.status(201).json(result)
    })
    .catch(error => next(error))
})

app.use(middleware.unknownEndpoint)
app.use(middleware.errorHandler)

server.listen(config.PORT, () => {
  logger.info(`Server running on port ${config.PORT}`)
}) 