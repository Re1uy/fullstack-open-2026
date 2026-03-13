const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
const jwt = require("jsonwebtoken");

blogRouter.get('', async (request, response) => {
  const result = await Blog.find({}).populate('user', {username : 1, name : 1})
  response.json(result)
})

blogRouter.post('/', async (request, response) => {
  const body = request.body
  const user = request.user
  const blog = new Blog( {
    title : body.title,
    author : body.author,
    url : body.url,
    likes : body.likes,
    user : user._id
  })

  try {
    const result = await blog.save()
    user.blogs = user.blogs.concat(blog._id);
    await user.save();
    response.status(201).json(result)
  } catch (error) {
    response.status(400).end()
  }
})

blogRouter.delete('/:id', async(request, response) => {
  const user = request.user
  const blog = await Blog.findById(request.params.id);
  if (blog && user && blog.user.toString() === user.id.toString()) {
    await Blog.findByIdAndDelete(request.params.id);
    response.status(204).end();
  } else {
    response.status(401).json({ error: "You can't delete this" });
  }
})

blogRouter.put('/:id', async (request, response) => {
  const body = request.body

  const users = User.find({})
  const creator = users[0]

  const newblog = {
    title : body.title,
    author: body.author,
    url : body.url,
    likes : body.likes,
    user : creator._id
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