const auth = require('../auth')

describe('Auth util', () => {
  let mockRequest

  afterEach(() => {
    mockRequest = {
      isAuth: false,
    }
  })

  test('isAuthenticated does not throw error when isAuth flag is present in the request', async () => {
    let error = undefined
    mockRequest = {
      isAuth: true,
    }

    try {
      auth.isAuthenticated(mockRequest)
    } catch (err) {
      error = err
    }

    expect.assertions(1)
    expect(error).toBe(undefined)
  })

  test('isAuthenticated will throw an error when isAuth flag is ', async () => {
    let error = undefined
    mockRequest = {
      isAuth: false,
    }

    try {
      auth.isAuthenticated(mockRequest)
    } catch (err) {
      error = err
    }

    expect.assertions(2)
    expect(error).toBeInstanceOf(Error)
    expect(error).toHaveProperty('message', 'please login!')
  })
})
