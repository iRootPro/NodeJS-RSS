const tasksRepo = require('./task.memory.repository');

const getAll = id => tasksRepo.getAll(id);
const create = (task) => tasksRepo.create(task);
const getById = (boardId, taskId) => tasksRepo.getById(boardId, taskId);
const update = (boardId, taskId, task) => tasksRepo.update(boardId, taskId, task);
const remove = (boardId, taskId) => tasksRepo.remove(boardId, taskId);
const taskToNull = (id, toNull) => tasksRepo.taskToNull(id, toNull)
const removeAllTaskByBoardId = id => tasksRepo.removeAllTaskByBoardId(id)

module.exports = { getAll, create, getById, remove, update, taskToNull, removeAllTaskByBoardId};
