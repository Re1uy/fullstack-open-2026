const express = require('express')
const app = express()
const cors = require('cors')
const blogRouter = require('./controllers/blogs')
const mongoose = require('mongoose')
const mongoUrl = 'mongodb://localhost/bloglist'

mongoose.connect(mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(error => console.error('Error:', error.message))

app.use(cors())
app.use(express.json())
app.use('/api/blogs', blogRouter)

module.exports = app