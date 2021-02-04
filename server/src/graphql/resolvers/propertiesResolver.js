const Property = require('../../models/property')
const fetchProperties = require('../../util/fetchProperties')
const authUtil = require('../../util/auth')
const favUtil = require('../../util/favoriteProperties')
const s = () => {}

module.exports = {
  properties: async (_, __, { req }) => {
    authUtil.isAuthenticated(req)
    try {
      const response = await fetchProperties()
      if (!response.length) return []
      const mProperties = (await favUtil.getFavoriteProperties()) || {}
      const properties = response.map((property) => {
        const favoriteCount = mProperties[property.mlsId]
          ? mProperties[property.mlsId].favoriteCount
          : 0
        return { ...property, favoriteCount }
      })

      return properties
    } catch (error) {
      throw error
    }
  },
  propertiesByCity: async (_, { city }, { req }) => {
    authUtil.isAuthenticated(req)
    try {
      const response = await fetchProperties()
      if (!response.length || !city.length) return []
      const mProperties = (await favUtil.getFavoriteProperties()) || {}

      const properties = response.filter((property) => {
        if (property.address.city === city) {
          const favoriteCount = mProperties[property.mlsId]
            ? mProperties[property.mlsId].favoriteCount
            : 0
          property.favoriteCount = favoriteCount
        }

        return property.address.city === city
      })

      return properties
    } catch (error) {
      throw error
    }
  },
  getFavoriteCount: async (_, { mlsId }, { req }) => {
    authUtil.isAuthenticated(req)
    try {
      const property = await Property.findOne({ mlsId })

      if (!property) {
        return 0
      }

      return property.favoriteCount
    } catch (error) {
      throw error
    }
  },
  markFavorite: async (_, { mlsId }, { req }) => {
    authUtil.isAuthenticated(req)
    try {
      const property = await Property.findOne({ mlsId: mlsId })
      let result
      if (property) {
        result = await Property.findOneAndUpdate(
          { mlsId: mlsId },
          { $inc: { favoriteCount: 1 } },
          { new: true }
        )
      } else {
        result = await new Property({
          mlsId: mlsId,
          favoriteCount: 1,
        }).save()
      }

      return { mlsId: result.mlsId, favoriteCount: result.favoriteCount }
    } catch (error) {
      throw error
    }
  },
}
