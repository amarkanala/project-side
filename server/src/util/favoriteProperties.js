const Property = require('../models/property')

module.exports = {
  getFavoriteProperties: async () => {
    try {
      const mResponse = await Property.find({})
      const mProperties = {}
      if (mResponse) {
        mResponse.forEach((item) => {
          mProperties[item.mlsId] = {
            favoriteCount: item.favoriteCount,
          }
        })
      }
      return mProperties
    } catch (error) {
      throw new Error(error)
    }
  },
}
