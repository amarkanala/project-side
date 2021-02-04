const mongoose = require('mongoose')

const Schema = mongoose.Schema

const Address = new Schema({
  street: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: false,
  },
  state: {
    type: Number,
    required: true,
  },
  postalCode: {
    type: String,
    required: true,
  },
})

const propertySchema = new Schema({
  mlsId: {
    type: Number,
    required: true,
  },
  address: {
    type: Address,
    required: false,
  },
  favoriteCount: {
    type: Number,
    required: true,
  },
})

module.exports = mongoose.model('Property', propertySchema)
