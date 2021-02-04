const bcrypt = require('bcryptjs')
const CONFIG = require('../../../../config/env')
const User = require('../../models/user')
const authUtil = require('../../util/auth')

module.exports = {
  getUsers: (_, __, { req }) => {
    authUtil.isAuthenticated(req)
    try {
      return User.find({})
    } catch (error) {
      throw error
    }
  },
  getUser: (_, args, { req }) => {
    authUtil.isAuthenticated(req)
    try {
      return User.findById(args.id)
    } catch (error) {
      throw error
    }
  },
  createUser: async (_, args, { req }) => {
    // authUtil.isAuthenticated(req)
    try {
      const isUser = await User.findOne({ email: args.input.email })
      if (isUser) {
        throw new Error('User already exists!')
      }
      const hashedPassword = await bcrypt.hash(
        args.input.password,
        CONFIG.SECURITY.PASSWORD_SALT_LENGTH
      )
      const user = new User({
        email: args.input.email,
        token: hashedPassword,
      })
      const newUser = await user.save()

      return {
        _id: newUser._id,
      }
    } catch (error) {
      throw error
    }
  },
}
