const authResolver = require('../authResolver')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const CONFIG = require('../../../../../config/env')
const User = require('../../../models/user')

jest.mock('bcryptjs')
jest.mock('jsonwebtoken')

describe('Authentition resolvers ', () => {
  beforeEach(async () => {
    User.findOne()
  })

  test('login resolver will show an error when given invalid username', async () => {
    User.findOne = jest.fn().mockResolvedValue(undefined)

    const testInput = {
      input: {
        email: 'test@test.com',
        password: 'test123',
      },
    }
    expect.assertions(2)
    //const result = await authResolver.login({}, testInput)
    //console.log(result)

    try {
      const result = await authResolver.login({}, testInput)
    } catch (error) {
      expect(error).toBeInstanceOf(Error)
      expect(error).toHaveProperty('message', 'Invalid credentials')
    }
  })
})
