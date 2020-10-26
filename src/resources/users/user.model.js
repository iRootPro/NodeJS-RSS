const {Schema, model} = require('mongoose')
const {ownMethods} = require('./../../utils/toClient')

const userSchema = new Schema({
  name: String,
  login: String,
  password: String
})


ownMethods(userSchema)

module.exports = model('User', userSchema);
