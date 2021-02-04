const express = require('express')
const { ApolloServer } = require('apollo-server-express')
const mongoose = require('mongoose')

const CONFIG = require('../../config/env')
const typeDefs = require('./graphql/schema')
const resolvers = require('./graphql/resolvers')
const isAuth = require('./middleware/isAuth')

const app = express()

const server = new ApolloServer({
  introspection: true,
  playground: true,
  typeDefs,
  resolvers,
  formatError: (error) => error,
  context: ({ req, res }) => ({ req, res }),
})

app.use(isAuth)

server.applyMiddleware({ app })

mongoose
  .connect(CONFIG.DB_CONNECTION_URI)
  .then(() => {
    app.listen(CONFIG.SERVER_PORT, () => {
      console.log(`Now serving requests on port ${CONFIG.SERVER_PORT}`)
    })
  })
  .catch((error) => {
    console.log(error)
  })
