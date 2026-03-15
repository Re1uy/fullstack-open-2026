const { test, expect, beforeEach, describe } = require('@playwright/test')

describe('Blog app', () => {
  beforeEach(async ({ page }) => {
    await page.goto('http://localhost:5173')
  })

  test('Login form is shown', async ({ page }) => {
    const loginHeading = page.getByRole('heading', { name: 'Login' })
    await expect(loginHeading).toBeVisible()
    const loginButton = page.getByRole('button', {name: 'login'})
    await expect(loginButton).toBeVisible()
  })

  describe('Blog app', () => {
    beforeEach(async ({ page, request }) => {
      await request.post('http://localhost:3003/api/testing/reset')
      await request.post('http://localhost:3003/api/users', {
        data: {
          name: "admin",
          username: 'admin',
          password: 'password'
        }
    })
  })

    test('loging test' , async({page}) => {
      await page.getByLabel('username').fill('admin')
      await page.getByLabel('password').fill('password')
      await page.getByRole('button', {name : 'login'}).click()
      const logininfo = page.getByText(/logged in/i)
      await expect(logininfo).toBeVisible()
    })

    describe('logged user function', () => {
      beforeEach(async ({page}) => {
        await page.getByLabel('username').fill('admin')
        await page.getByLabel('password').fill('password')
        await page.getByRole('button', {name : 'login'}).click()
      })

      test('create blog', async ({ page }) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByLabel('title').fill('testtitle')
        await page.getByLabel('author').fill('testauthor')
        await page.getByLabel('url').fill('testurl')
        await page.getByRole('button', { name: 'create' }).click()
        const newblog = page.locator('.blog').filter({ hasText: 'testtitle' })
        await expect(newblog).toBeVisible()
      })

      test('like blog', async ({page}) => {
        await page.getByRole('button', { name: 'create new blog' }).click()
        await page.getByLabel('title').fill('testtitle')
        await page.getByLabel('author').fill('testauthor')
        await page.getByLabel('url').fill('testurl')
        await page.getByRole('button', { name: 'create' }).click()
        const blogLocator = page.locator('.blog').filter({ hasText: 'testtitle' })
        await expect(blogLocator).toBeVisible()
        const specificBlog = page.locator('.blog').filter({ hasText: 'testtitle' })
        await specificBlog.getByRole('button', { name: 'view' }).click()
        await specificBlog.getByRole('button', { name: 'like' }).click()
        await expect(specificBlog.getByText('1')).toBeVisible()
      })
    })

  })
})