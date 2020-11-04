const router = require('express').Router({ mergeParams: true });
const tasksService = require('./task.service');
const Task = require('./task.model');
const passport = require('passport');

router.route('/').get(async (req, res) => {
  const tasks = await tasksService.getAll(req.params.boardId);
  res.status(200).json(tasks.map(task => task.toClient()));
});

router.route('/').post(async (req, res) => {
  const task = await tasksService.create(new Task({
    ...req.body,
    boardId: req.params.boardId
  }));
  res.status(200).json(task.toClient());

});

router.route('/:id').get(async (req, res) => {
  const result = await tasksService.getById(req.params.boardId, req.params.id);
  console.log('RESULT', result);
  if (typeof result === 'number') res.sendStatus(result);
  else {
    res.status(200).json(result.toClient());
  }

});

router.route('/:id').put(async (req, res) => {
  const updateTask = await tasksService.update(req.params.boardId, req.params.id, req.body);
  console.log(updateTask);
  res.status(200).json(updateTask.toClient());
});

router.route('/:id').delete(async (req, res) => {
  await tasksService.remove(req.params.boardId, req.params.id);
  res.sendStatus(200);
});

module.exports = router;
