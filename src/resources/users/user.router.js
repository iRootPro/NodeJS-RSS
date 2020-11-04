const router = require('express').Router();
const bcrypt = require('bcryptjs');
const User = require('./user.model');
const usersService = require('./user.service');

// passport.authenticate('jwt', {session: false})

router.route('/').get(async (req, res) => {
  const users = await usersService.getAll();
  res.status(200).json(users.map(user => user.toClient()));
});


router.route('/').post(async (req, res) => {
  const salt = bcrypt.genSaltSync(10);
  const password = req.body.password;
  const newUser = await usersService.create(new User({
    login: req.body.login,
    name: req.body.name,
    password: bcrypt.hashSync(password, salt)
  }));
  res.json(newUser);
});

router.route('/:id').get(async (req, res) => {
  const user = await usersService.getById(req.params.id);
  res.json(user);
});

router.route('/:id').put(async (req, res) => {
  const updateUser = await usersService.update(req.params.id, req.body);
  res.json(updateUser);
});

router.route('/:id').delete(async (req, res) => {

  const status = await usersService.remove(req.params.id);
  res.json(status);
});

module.exports = router;
