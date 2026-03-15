import { useState } from 'react'

const Blog = ({ blog, updatelike, removeblog }) => {
  const [visible, setVisible] = useState(false)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title}{' '}{blog.author}
        <span style={hideWhenVisible}>
          <button onClick={toggleVisibility}>view</button>
        </span>
        <span style={showWhenVisible}>
          <div>{blog.url}</div>
          <div>
            {blog.likes}
            <button onClick={() => updatelike(blog)}>like</button>
          </div>
          <button onClick={toggleVisibility}>hide</button>
          <div>{blog.user?.username}</div>
          <button onClick={() => removeblog(blog)}>remove</button>
        </span>
      </div>
    </div>
  )
}

export default Blog



