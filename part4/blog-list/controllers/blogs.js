const blogsRouter = require('express').Router()
const jwt = require('jsonwebtoken')
const logger = require('../utils/logger')
const Blog = require('../models/blog')
const User = require('../models/user')
const Comment = require('../models/comment')

blogsRouter.get('/', async (request, response) => {
  const blogs = await Blog
    .find({}).populate('user', { username: 1, name: 1 })
    .find({}).populate('comments', { comment: 1 })

  response.json(blogs)
})

blogsRouter.delete('/:id', async (request, response) => {
  const decodedToken = jwt.verify(request.token, process.env.SECRET)

  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }

  const blog = await Blog.findById(request.params.id)

  console.log('request.params.id: ', request.params.id)
  console.log('decodedToken.id: ', decodedToken.id)
  console.log('blog.user: ', blog.user)

  if (decodedToken.id.toString() === blog.user.toString()) {
    await blog.remove()
    return response.status(204).end()
  }
  response.status(404).json({ error: 'invalid action' })
})

blogsRouter.post('/', async (request, response) => {
  const body = request.body
  const decodedToken = jwt.verify(request.token, process.env.SECRET)
  if (!request.token || !decodedToken.id) {
    return response.status(401).json({ error: 'token missing or invalid' })
  }
  const user = await User.findById(decodedToken.id)

  const blog = new Blog({
    title: body.title,
    author: body.author,
    user: user._id,
    url: body.url,
    likes: body.likes || 0,
    comments: body.comments,
  })
  const savedBlog = await blog.save()
  user.blogs = user.blogs.concat(savedBlog._id)
  await user.save()

  response.json(savedBlog)
})

blogsRouter.put('/:id', async (request, response) => {
  const body = request.body

  const blog = {
    title: body.title,
    author: body.author,
    url: body.url,
    likes: body.likes || 0,
    comments: body.comments,
  }

  const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, blog, { new: true })
  response.json(updatedBlog.toJSON())
})

blogsRouter.post('/:id/comments', async (request, response) => {
  logger.info('hit blogsRouter/comment, request: ', request.body)
  const body = request.body
  logger.info('body in comments blogsRouter.post: ', body)
  if (body.comment === undefined) {
    return response.status(400).json({ error: 'content missing' })
  }
  const comment = new Comment({ comment: body.comment })
  logger.info('comment in blogsRouter/comments : ', comment)
  const savedComment = await comment.save()

  const blog = await Blog.findById(request.params.id)
  logger.info('blog in comments blogsRouter.post: ', blog)

  logger.info('savedComment in comments blogsRouter.post: ', savedComment)
  //logger.info('PRE blog.comments in comments blogsRouter.post: ', blog.comments)
  blog.comments = blog.comments.concat(savedComment._id)
  //logger.info('POST blog.comments in comments blogsRouter.post: ', blog.comments)

  await blog.save()
  response.json(savedComment)
  //logger.info('response in blogsRouter/comments: ', response)
})

module.exports = blogsRouter