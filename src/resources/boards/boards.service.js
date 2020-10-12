const boardsRepo = require('./boards.memory.repository');

const getAll = () => boardsRepo.getAll();
const create = board => boardsRepo.create(board);
const getById = id => boardsRepo.getById(id);
const update = (id, board) => boardsRepo.update(id, board);
const remove = id => boardsRepo.remove(id);

module.exports = { getAll, create, getById, update, remove };
