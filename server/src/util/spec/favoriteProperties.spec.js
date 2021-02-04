const favProperties = require('../favoriteProperties')
const Property = require('../../models/property')
const mockProperties = require('../../mock/properties')

jest.mock('../../models/property')

describe('favProperties util', () => {
  test('favProperties returns a key value map of fav peoperties', async () => {
    Property.find = jest
      .fn()
      .mockResolvedValue([{ mlsId: 1005192, favoriteCount: 10 }])
    const expected = {
      1005192: { favoriteCount: 10 },
    }
    const properties = await favProperties.getFavoriteProperties()

    expect.assertions(1)
    expect(properties).toEqual(expected)
  })

  test('favProperties throws an exception when mongodb find fails', async () => {
    Property.find = jest.fn().mockResolvedValue(new Error())
    const expected = {
      1005192: { favoriteCount: 10 },
    }

    try {
      const properties = await favProperties.getFavoriteProperties()
    } catch (err) {
      error = err
    }

    expect.assertions(1)
    expect(error).toBeInstanceOf(Error)
  })
})
