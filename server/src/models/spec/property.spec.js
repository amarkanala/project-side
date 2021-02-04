const mongoose = require('mongoose')
const Property = require('../property')

describe('Property Model Test', () => {
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

  test('create & save favorite successfully', async () => {
    const property = { mlsId: 12345, favoriteCount: 1 }
    const validProperty = new Property(property)
    const savedProperty = await validProperty.save()

    expect.assertions(3)
    expect(savedProperty._id).toBeDefined()
    expect(savedProperty.mlsId).toBe(property.mlsId)
    expect(savedProperty.favoriteCount).toBe(property.favoriteCount)
  })

  test('insert favorite successfully, but the fields that are not defined in schema should be undefined', async () => {
    const property = { mlsId: 12345, favoriteCount: 1, type: 'Condo' }
    const propertyWithInvalidField = new Property(property)
    const savedPropertyWithInvalidField = await propertyWithInvalidField.save()

    expect.assertions(4)
    expect(savedPropertyWithInvalidField._id).toBeDefined()
    expect(savedPropertyWithInvalidField.mlsId).toBe(property.mlsId)
    expect(savedPropertyWithInvalidField.favoriteCount).toBe(
      property.favoriteCount
    )
    expect(savedPropertyWithInvalidField.type).toBeUndefined()
  })

  test('favorite created without required field should fail', async () => {
    const property = { mlsId: 12345 }
    const propertyWithoutRequiredField = new Property(property)
    let error
    try {
      const savedPropertyWithoutRequiredField = await propertyWithoutRequiredField.save()
      err = savedPropertyWithoutRequiredField
    } catch (err) {
      error = err
    }

    expect.assertions(2)
    expect(error).toBeInstanceOf(mongoose.Error.ValidationError)
    expect(error.errors.favoriteCount).toBeDefined()
  })
})
