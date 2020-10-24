const { ownMethods } = require('../../utils/toClient');
const {Schema, model} = require('mongoose')

const taskSchema = new Schema({
  title: String,
  order: Number,
  description: String,
  userId: String,
  boardId: String,
  columnId: String
})

ownMethods(taskSchema)

module.exports = model('Task', taskSchema)
