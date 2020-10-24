const User = require('./user.model');


const getAll = async () => {
  return User.find();
};

const getById = async id => {
  const user = await User.findById(id);
  return {
    id: user._id,
    login: user.login,
    name: user.name
  };
};

const create = async user => {
  await user.save();
  return getById(user.id);
};


const update = async (id, user) => {
  return User.findByIdAndUpdate(id, user)
//   userDB.map(el => {
//     if (el.id === id) {
//       el.name = user.name;
//       el.login = user.login;
//       el.password = user.password;
//     }
//   });
//   return getById(id);
// };
//
// const nullTaskByUserId = async (userId) => {
//   taskDB.forEach((task) => {
//     if (task.userId === userId) {
//       task.userId = null;
//     }
//   });
};



const remove = async id => {
  return User.deleteOne({ _id: id });
};
module.exports = { getAll, getById, create, remove, update };
