const User = require('../../src/resources/users/user.model');
const Board = require('../resources/boards/boards.model');
const Task = require('../resources/tasks/task.model');

const userDB = [];
const boardDB = [];
const taskDB = [];

userDB.push(new User(), new User(), new User());
boardDB.push(new Board(), new Board(), new Board());
taskDB.push(new Task(), new Task(), new Task())

module.exports = userDB;
module.exports = boardDB;
module.exports = taskDB;
