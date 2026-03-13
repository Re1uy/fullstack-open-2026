const blogRouter = require('express').Router()
const { response } = require('../app')
const Blog = require('../models/blog')


blogRouter.get('', async (request, response) => {
  const result = await Blog.find({})
  response.json(result)
})

blogRouter.post('/', async (request, response) => {
  const blog = new Blog(request.body)

  try {
    const result = await blog.save()
    response.status(201).json(result)
  } catch (error) {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async (request, response) => {
  await Blog.findByIdAndDelete(request.params.id)
  response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const newblog = {
    title : body.title,
    author: body.author,
    url : body.url,
    likes : body.likes
  }
  try {
    const result = await Blog.findByIdAndUpdate(
    request.params.id,
    newblog,
    { new: true, runValidators: true, context: 'query' }
    )
    if (result) {
      response.json(result)
    } else {
      response.status(404).end()
    }
  } catch (error) {
    response.status(400).end()
  }
})

module.exports = blogRouter