const tasks = require('../tasks/task.service');
const Board = require('./boards.model');


const getAll = async () => Board.find();


const getById = async id => {
  const board = await Board.findOne({ _id: id });
  if (!board) {
    return 404
  }
  return board;
};

const create = async board => {
  try {
    return await board.save();
  } catch (e) {
    throw new Error(e);
  }
};

const update = async (id, board) => {
  return await Board.findByIdAndUpdate(id, board);
};

const remove = async id => {
  try {
    return await Board.deleteOne({ _id: id });
  }
  catch (e) {
    throw new Error(e)
  }

};

module.exports = { getAll, create, getById, update, remove };
