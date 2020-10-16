const userDB = require('../../common/MemoryDb');
const taskDB = require('../../common/MemoryDb');

const getAll = async () => {
  return userDB;
};

const getById = async id => {
  return userDB.filter(el => el.id === id)[0];
};

const create = async user => {
  userDB.push(user);
  return getById(user.id);
};


const update = async (id, user) => {
  userDB.map(el => {
    if (el.id === id) {
      el.name = user.name;
      el.login = user.login;
      el.password = user.password;
    }
  });
  return getById(id);
};

const nullTaskByUserId = async (userId) => {
  taskDB.forEach((task) => {
    if (task.userId === userId) {
      task.userId = null;
    }
  });
};

const remove = async id => {
  let idx = -1;
  userDB.forEach((user, index) => {
    if (user.id === id) {
      idx = index;
    }
  });
  if (idx !== -1) {
    userDB.splice(idx, 1);
    await nullTaskByUserId(id);
    return 200;
  } else {
    return 404;
  }
};
module.exports = { getAll, create, getById, update, remove };
