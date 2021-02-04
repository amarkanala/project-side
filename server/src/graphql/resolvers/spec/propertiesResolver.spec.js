const propertiesResolver = require('../propertiesResolver')
const mockProperties = require('../../../mock/properties')
const Property = require('../../../models/property')
const authUtil = require('../../../util/auth')
const fetchProperties = require('../../../util/fetchProperties')
const favUtil = require('../../../util/favoriteProperties')

jest.mock('../../../util/auth')
jest.mock('../../../models/property')
jest.mock('../../../util/fetchProperties')
jest.mock('../../../util/favoriteProperties')

describe('Properties resolver ', () => {
  let mockRequest

  beforeEach(async () => {
    mockRequest = {
      Authorization: '',
      get: () => {
        return
      },
    }

    favUtil.getFavoriteProperties = jest
      .fn()
      .mockResolvedValue({ 1005192: { favoriteCount: 10 } })

    Property.save = jest.fn()
    authUtil.isAuthenticated.mockResolvedValue(true)
    fetchProperties.mockResolvedValue(mockProperties)
  })

  test('"properties" QUERY resolver returns all items from the API ', async () => {
    const properties = await propertiesResolver.properties({}, {}, { req: {} })
    expect.assertions(2)
    expect(properties.length).toBe(3)
    properties.forEach((property) => {
      if (property.mlsId === 1005192) {
        expect(property.favoriteCount).toBe(10)
      }
    })
  })

  test('"properties" QUERY resolver handles the use case when API response is empty ', async () => {
    fetchProperties.mockResolvedValue([])

    const properties = await propertiesResolver.properties({}, {}, { req: {} })

    expect.assertions(2)
    expect(properties.length).toBe(0)
    expect(Property.find).toHaveBeenCalledTimes(0)
  })

  test('"propertiesByCity" QUERY resolver returns the filtered properties list ', async () => {
    Property.findOne = jest
      .fn()
      .mockResolvedValue({ mlsId: 1005192, favoriteCount: 10 })

    const properties = await propertiesResolver.propertiesByCity(
      {},
      { city: 'Houston' },
      { req: {} }
    )

    expect.assertions(2)
    expect(properties.length).toBe(1)
    properties.forEach((property) => {
      if (property.mlsId === 1005192) {
        expect(property.favoriteCount).toBe(10)
      }
    })
  })

  test('"propertiesByCity" QUERY resolver handles the use case when API response is empty ', async () => {
    fetchProperties.mockResolvedValue([])
    Property.findOne = jest
      .fn()
      .mockResolvedValue({ mlsId: 1005192, favoriteCount: 10 })

    const properties = await propertiesResolver.propertiesByCity(
      {},
      { city: 'Houston' },
      { req: {} }
    )

    expect.assertions(2)
    expect(properties.length).toBe(0)
    expect(Property.findOne).toHaveBeenCalledTimes(0)
  })

  test('"markFavorite" MUTATION resolver adds a new entry to the collection for the first "markFavorite" for a given property', async () => {
    const mlsId = 12345
    Property.findOne = jest.fn().mockResolvedValue(undefined)
    jest
      .spyOn(Property.prototype, 'save')
      .mockResolvedValue({ mlsId, favoriteCount: 1 })

    expect.assertions(2)
    const result = await propertiesResolver.markFavorite({}, { mlsId }, {})
    expect(Property.findOne).toHaveBeenCalledTimes(1)
    expect(Property.prototype.save).toHaveBeenCalledTimes(1)
  })

  test('"markFavorite" MUTATION resolver increments the favorite counter for property previosuly favorited', async () => {
    const mlsId = 12345
    Property.findOne = jest
      .fn()
      .mockResolvedValue({ mlsId: mlsId, favoriteCount: 10 })
    Property.findOneAndUpdate = jest
      .fn()
      .mockResolvedValue({ _id: '1', mlsId: 12345, favoriteCount: 11 })
    jest
      .spyOn(Property.prototype, 'save')
      .mockResolvedValue({ mlsId, favoriteCount: 1 })

    expect.assertions(4)
    const result = await propertiesResolver.markFavorite({}, { mlsId }, {})
    expect(Property.findOne).toHaveBeenCalledTimes(1)
    expect(Property.findOneAndUpdate).toHaveBeenCalledTimes(1)
    expect(result.favoriteCount).toBe(11)
    expect(result.mlsId).toBe(12345)
  })
})
