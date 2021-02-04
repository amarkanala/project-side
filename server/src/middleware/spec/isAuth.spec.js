const isAuth = require('../isAuth')
const jwt = require('jsonwebtoken')

describe('Auth middleware', () => {
  let mockRequest
  let mockResponse
  let nextFunction
  jwt.verify = jest.fn()

  beforeEach(() => {
    mockRequest = {
      Authorization: '',
      get: () => {
        return
      },
    }
    mockResponse = {}
    nextFunction = jest.fn()
  })

  test('without "Authorization" header', async () => {
    isAuth(mockRequest, mockResponse, nextFunction)

    expect(mockRequest.isAuth).toBe(false)
    expect(nextFunction).toHaveBeenCalledTimes(1)
  })

  test('with invalid "Authorization" header', async () => {
    mockRequest = {
      Authorization: 'Bearer ',
      get: () => {
        return
      },
    }
    isAuth(mockRequest, mockResponse, nextFunction)

    expect(mockRequest.isAuth).toBe(false)
    expect(nextFunction).toHaveBeenCalledTimes(1)
  })
})
