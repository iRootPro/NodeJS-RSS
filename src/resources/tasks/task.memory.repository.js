const Task = require('./task.model');

const getAll = async id => {
  return await Task.find({ boardId: id });
};

const getById = async (boardId, id) => {
  console.log(boardId, id);
  const task = await Task.findOne({ _id: id, boardId });
  if (!task) {
    return 404;
  }
  return task;
};

const create = async (task) => {
  return task.save();
};



const update = async (boardId, taskId, task) => {
  return Task.findOneAndUpdate({ _id: taskId, boardId }, { $set: task }, { new: true });
};

const remove = async (boardId, taskId) => {
  return Task.deleteOne({ _id: taskId, boardId });
};
const taskToNull = async (id, toNull) => {
  return Task.updateMany(id, toNull);
}

const removeAllTaskByBoardId = async (boardId) => Task.deleteMany({boardId})


module.exports = { getAll, create, getById, remove, update, taskToNull, removeAllTaskByBoardId };


