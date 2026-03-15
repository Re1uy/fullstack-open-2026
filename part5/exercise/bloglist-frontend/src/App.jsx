import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import LoginForm from './components/LoginForm'
import loginService from './services/login'
import BlogForm from './components/BlogForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import './index.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [info, setinfo] = useState({ message: null, type: 'null' })

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({ username, password })
      setUser(user)
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)
      setUsername('')
      setPassword('')
    } catch {
      notify('wrong username or password', 'error')
    }
  }

  const handleCreateBlog = async (blogObject) => {
    try {
      const returnedBlog = await blogService.create(blogObject)
      const blogWithUser = {
        ...returnedBlog,
        user: {
          username: user.username,
          name: user.name,
          id: returnedBlog.user,
        },
      }
      setBlogs(blogs.concat(blogWithUser))
      blogFormRef.current.toggleVisibility()
      notify(
        `a new blog ${blogObject.title} by ${blogObject.author} added`,
        'success',
      )
    } catch {
      notify('blog cannot create', 'error')
    }
  }

  const handleLogout = () => {
    window.localStorage.removeItem('loggedBlogappUser')
    setUser(null)
  }

  const handleLikes = async(blog) => {
    const updatedBlog = {
      title: blog.title,
      author: blog.author,
      url: blog.url,
      likes: blog.likes + 1,
      user: blog.user.id || blog.user
    }

    try {
      const returnedBlog = await blogService.update(blog.id, updatedBlog)
      const blogWithFullUser = { ...returnedBlog, user: blog.user }
      setBlogs(
        blogs.map((b) => (b.id !== blog.id ? b : blogWithFullUser))
      )
    } catch {
      notify('like error', 'error')
    }
  }

  const handleDelete = async(blog) => {
    try {
      if (window.confirm(`Remove blog ${blog.title} by ${blog.author}`)) {
        await blogService.remove(blog.id)
        setBlogs(blogs.filter((b) => b.id !== blog.id))
      }
    } catch {
      notify('delete error', 'error')
    }
  }

  const notify = (message, type) => {
    setinfo({ message, type })
    setTimeout(() => {
      setinfo({ message: null, type: null })
    }, 5000)
  }

  return (
    <div>
      <Notification info={info} />
      {user === null ? (
        <LoginForm
          handleLogin={handleLogin}
          username={username}
          password={password}
          setUsername={setUsername}
          setPassword={setPassword}
        />
      ) : (
        <div>
          <p>
            {user.name} logged in <button onClick={handleLogout}>logout</button>
          </p>
          <h2>blogs</h2>
          <Togglable
            children={<BlogForm createBlog={handleCreateBlog} />}
            buttonLabel={'create new blog'}
            ref={blogFormRef}
          />
          {blogs.map((blog) => (
            <Blog key={blog.id} blog={blog} updatelike = {handleLikes} removeblog = {handleDelete}/>
          ))}
        </div>
      )}
    </div>
  )
}

export default App
