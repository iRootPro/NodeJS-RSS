const boardsRepo = require('./boards.memory.repository');
const { removeAllTaskByBoardId } = require('../tasks/task.memory.repository');

const getAll = () => boardsRepo.getAll();
const create = board => boardsRepo.create(board);
const getById = id => boardsRepo.getById(id);
const update = (id, board) => boardsRepo.update(id, board);
const remove =async id => {
  await boardsRepo.remove(id);
  await removeAllTaskByBoardId(id)
}

module.exports = { getAll, create, getById, update, remove };
