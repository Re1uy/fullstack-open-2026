import { render, screen } from '@testing-library/react'
import Blog from './Blog'
import BlogForm from './BlogForm'
import userEvent from '@testing-library/user-event'
import { test, expect, vi } from 'vitest'

test('title and author can be render' , () => {
  const blog = {
    title: 'testtitle',
    author : 'testauthor',
    url : 'testurl',
    likes : 0,
    user : 'testuser'
  }

  render(<Blog blog = {blog}/>)

  const titleelement = screen.getByText(/testtitle/i)
  const authorelement = screen.getByText(/testauthor/i)
  expect(titleelement).toBeInTheDocument()
  expect(authorelement).toBeInTheDocument()
})

test('url and like can be render', async() => {
  const blog = {
    title: 'testtitle',
    author : 'testauthor',
    url : 'testurl',
    likes : 4747,
    user : 'testuser'
  }

  render(<Blog blog={blog} />)

  const user = userEvent.setup()
  const viewbutton = screen.getByText(/view/i)
  await user.click(viewbutton)

  const urlelement = screen.getByText(/testurl/i)
  const likeelement = screen.getByText(4747)

  expect(urlelement).toBeVisible()
  expect(likeelement).toBeVisible()
})



test('click likebutton twice', async() => {
  const blog = {
    title: 'testtitle',
    author : 'testauthor',
    url : 'testurl',
    likes : 4747,
    user : 'testuser'
  }

  const mockHandler = vi.fn()

  render(<Blog blog={blog} updatelike={mockHandler} />)

  const user = userEvent.setup()
  const viewbutton = screen.getByText(/view/i)
  await user.click(viewbutton)
  const likebutton = screen.getByText(/like/i)
  await user.click(likebutton)
  await user.click(likebutton)
  expect(mockHandler.mock.calls).toHaveLength(2)
})

test('form calls the event handler with right details when a new blog is created', async () => {
  const createBlog = vi.fn()
  const user = userEvent.setup()

  render(<BlogForm createBlog={createBlog} />)

  const titleinput = screen.getByLabelText('title')
  const authorinput = screen.getByLabelText('author')
  const urlinput = screen.getByLabelText('url')
  const createbutton = screen.getByText(/create/i)

  await user.type(titleinput, 'testtitle')
  await user.type(authorinput, 'testauthor')
  await user.type(urlinput, 'testurl')

  await user.click(createbutton)

  expect(createBlog.mock.calls).toHaveLength(1)
  const callContent = createBlog.mock.calls[0][0]

  expect(callContent.title).toBe('testtitle')
  expect(callContent.author).toBe('testauthor')
  expect(callContent.url).toBe('testurl')
})