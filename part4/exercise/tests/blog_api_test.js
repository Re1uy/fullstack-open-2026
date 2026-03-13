const { test, after, beforeEach, describe } = require('node:test')
const assert = require('node:assert')
const mongoose = require('mongoose')
const supertest = require('supertest')
const {initialBlogs, blogInDB} = require('./test_helper')
const app = require('../app')

/** @type {import('mongoose').Model<any>} */
const Blog = require('../models/blog')
const { promiseHooks } = require('node:v8')
const blog = require('../models/blog')
const api = supertest(app)

describe('GET /api/blogs', () => {
  test('get all blogs', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.strictEqual(response.body.length, initialBlogs.length)
  })

  test('unique identifier property name is id', async () => {
    const response = await api
      .get('/api/blogs')
      .expect(200)
      .expect('Content-Type', /application\/json/)
  
    assert.ok(response.body[0].id)
    assert.strictEqual(response.body[0]._id, undefined)
  })
})

describe('POST /api/blogs', () => {
  test('add new blog', async () => {
    const newblog = {
      title: "helloword",
      author: "b",
      url: "c",
      likes: 0,
    }

    await api
      .post('/api/blogs')
      .send(newblog)
      .expect(201)
      .expect('Content-Type', /application\/json/)
  
    const response = await api.get('/api/blogs')
    const contents = response.body.map(r => r.title)

    assert.strictEqual(contents.length, initialBlogs.length + 1)
    assert(contents.includes('helloword'))
  })

  test('miss like attribute', async () => {
    const newblog = {
      title: "misslike",
      author: "a",
      url: "b",
    }
  
    const result = await api
      .post('/api/blogs')
      .send(newblog)
      .expect(201)
      .expect('Content-Type', /application\/json/)

    assert.strictEqual(result.body.likes, 0)
  })


  test('miss title', async () => {
    const newblog = {
      author: "a",
      url: "b",
      like: 0
    }

    const result = await api
      .post('/api/blogs')
      .send(newblog)
      .expect(400)
  })

  test('miss url', async () => {
    const newblog = {
      title: "title",
      author: "a",
      like: 0
    }

    const result = await api
      .post('/api/blogs')
      .send(newblog)
      .expect(400)
  })
})

test('delete', async () => {
  const blogAtStart = await blogInDB()
  const blogToDelete = blogAtStart[0]

  await api
    .delete(`/api/blogs/${blogToDelete.id}`)
    .expect(204)
  
  const blogAtEnd = await blogInDB()
  const blogAtEndTitle = blogAtEnd.map(blog => blog.title)
  assert.strictEqual(blogAtEnd.length, blogAtStart.length - 1)
  assert(!blogAtEndTitle.includes(blogToDelete.title))
})

test('update likes', async () => {
  const blogAtStart = await blogInDB()
  const blogToUpdate = blogAtStart[0]
  const changedblog = {
    ...blogToUpdate,
    likes: blogToUpdate.likes + 1
  }

  const result = await api
    .put(`/api/blogs/${blogToUpdate.id}`)
    .send(changedblog)
    .expect(200)
  
  const blogAtEndlikes = result.body.likes
  assert.strictEqual(blogAtEndlikes, blogToUpdate.likes + 1)
})


after(async () => {
  await mongoose.connection.close()
})

beforeEach(async () => {
  await Blog.deleteMany({})
  console.log('clear all')

  const blogsObject = initialBlogs.map(blog => new Blog(blog))
  const PromiseArray = blogsObject.map(blog => blog.save())
  await Promise.all(PromiseArray)
  console.log('initilize blogs')
})

 