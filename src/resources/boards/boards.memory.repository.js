const boardDB = require('../../common/MemoryDb');
const taskDB = require('../../common/MemoryDb');


const getAll = async () => {
  return boardDB;
};


const getById = async id => {
  let idx = -1;
  boardDB.forEach((board, index) => {
    if (board.id === id) {
      idx = index;
    }
  });
  if (idx !== -1) {
    return boardDB[idx];
  } else {
    return 404;
  }
};

const create = async board => {
  boardDB.push(board);
  return getById(board.id);
};

const update = async (id, board) => {
  boardDB.map(el => {
    if (el.id === id) {
      el.title = board.title;
      el.columns = board.columns;
    }
  });
  return getById(id);
};

const removeTaskByBoardId = (boardId) => {
  const idxs = [];
  taskDB.forEach((task, index) => {
    if (task.boardId === boardId) idxs.push(index);
  });
  idxs.forEach(idx => taskDB.splice(idx, 1));
};

const remove = async id => {
  let idx = -1;
  boardDB.forEach((board, index) => {
    if (board.id === id) {
      idx = index;
    }
  });
  if (idx !== -1) {
    boardDB.splice(idx, 1);
    removeTaskByBoardId(id);
    return 200;
  } else {
    return 404;
  }

};

module.exports = { getAll, create, getById, update, remove };
