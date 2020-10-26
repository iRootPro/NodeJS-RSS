const { ownMethods } = require('../../utils/toClient');
const { Schema, model } = require('mongoose');

const boardSchema = new Schema({
  title: String,
  columns: Array
});

ownMethods(boardSchema)

module.exports = model('Board', boardSchema);


