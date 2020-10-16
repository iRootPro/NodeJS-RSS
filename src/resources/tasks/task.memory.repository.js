const taskDB = require('../../common/MemoryDb');

const getAll = async id => {
  return taskDB.filter(task => task.boardId === id);
};

const getById = async (boardId, taskId) => {
  let idx = -1;
  taskDB.forEach((task, index) => {
    if (task.id === taskId && task.boardId === boardId) {
      idx = index;
    }
  });
  if (idx === -1) {
    return 404;

  } else {
    return taskDB[idx];
  }
};

const create = async (task) => {
  taskDB.push(task);
  return getById(task.boardId, task.id);
};


const update = async (boardId, taskId, task) => {
  taskDB.map(el => {
    if (el.id === task.id && el.boardId === boardId) {
      el.title = task.title
      el.order = task.order
      el.description = task.description
      el.userId = task.userId
      el.boardId = task.boardId
      el.columnId = task.columnId
    }
  })
  return getById(boardId, taskId)
}

const remove = async (boardId, taskId) => {
  let idx = -1;
  taskDB.forEach((task, index) => {
    if (task.boardId === boardId && task.id === taskId) {
      idx = index;
    }
  });
  if (idx !== -1) {
    taskDB.splice(idx, 1);
    return 200;
  }
  return 404;

};
module.exports = { getAll, create, getById, remove, update };
