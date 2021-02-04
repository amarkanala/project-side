const authResolver = require('./authResolver')
const userResolver = require('./userResolver')
const propertiesResolver = require('./propertiesResolver')

module.exports = {
  Query: {
    login: authResolver.login,
    getUser: userResolver.getUser,
    getUsers: userResolver.getUsers,
    properties: propertiesResolver.properties,
    propertiesByCity: propertiesResolver.propertiesByCity,
    getFavoriteCount: propertiesResolver.getFavoriteCount,
  },
  Mutation: {
    createUser: userResolver.createUser,
    markFavorite: propertiesResolver.markFavorite,
  },
}
