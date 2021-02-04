const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

const CONFIG = require('../../../../config/env')
const User = require('../../models/user')

module.exports = {
  login: async (_, { input }) => {
    try {
      const user = await User.findOne({ email: input.email })
      if (!user) {
        throw new Error('Invalid credentials')
      }

      const isEqual = await bcrypt.compare(input.password, user.token)
      if (!isEqual) {
        throw new Error('Password incorrect!')
      }

      const authToken = jwt.sign(
        { id: user.id, email: user.email },
        CONFIG.SECURITY.AUTH_TOKEN_PRIVATE_KEY
      )

      return { id: user.id, email: user.email, authToken }
    } catch (error) {
      throw error
    }
  },
}
