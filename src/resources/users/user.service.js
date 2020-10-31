const usersRepo = require('./user.memory.repository');
const { taskToNull } = require('../tasks/task.memory.repository');

const getAll = () => usersRepo.getAll();
const create = user => usersRepo.create(user);
const getById = id => usersRepo.getById(id);
const update = (id, user) => usersRepo.update(id, user);
const remove = async (id) => {
  await usersRepo.remove(id);
  await taskToNull({ userId: id }, { userId: null });
};

module.exports = { getAll, create, getById, update, remove };
