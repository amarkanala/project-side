const mongoose = require('mongoose')
const User = require('../user')

describe('User Model Test', () => {
  beforeAll(async () => {
    await mongoose.connect(
      global.__MONGO_URI__,
      { useNewUrlParser: true, useCreateIndex: true },
      (err) => {
        if (err) {
          console.error(err)
          process.exit(1)
        }
      }
    )
  })

  afterEach(async () => {
    setTimeout(async () => {
      await mongoose.connection.close()
    }, 100)
  })

  test('create & save user successfully', async () => {
    const userData = { email: 'test@test.com', token: 'G37yof7R?Mcv3B' }
    const validUser = new User(userData)
    const savedUser = await validUser.save()

    expect.assertions(3)
    expect(savedUser._id).toBeDefined()
    expect(savedUser.email).toBe(userData.email)
    expect(savedUser.token).toBe(userData.token)
  })

  test('insert user successfully, but the fields that are not defined in schema should be undefined', async () => {
    const userData = {
      email: 'test1@test.com',
      token: 'G37yof7R?Mcv3B',
      address: '0 infinite loop, mars',
    }
    const userWithInvalidField = new User(userData)
    const savedUserWithInvalidField = await userWithInvalidField.save()

    expect.assertions(4)
    expect(savedUserWithInvalidField._id).toBeDefined()
    expect(savedUserWithInvalidField.email).toBe(userData.email)
    expect(savedUserWithInvalidField.token).toBe(userData.token)
    expect(savedUserWithInvalidField.address).toBeUndefined()
  })

  test('user created without required field should fail', async () => {
    const userData = { email: 'test2@test.com' }
    const userWithoutRequiredField = new User(userData)
    let error
    try {
      const savedUserWithoutRequiredField = await userWithoutRequiredField.save()
      err = savedUserWithoutRequiredField
    } catch (err) {
      error = err
    }

    expect.assertions(2)
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.token).toBeDefined()
  })
})
