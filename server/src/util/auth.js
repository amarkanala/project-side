module.exports = {
  isAuthenticated: (req) => {
    if (!req.isAuth) {
      throw new Error('please login!')
    }
  },
}
