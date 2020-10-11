const router = require('express').Router();
const tasksService = require('./task.service');
const Task = require('./task.model');

router.route('/:id/tasks').get(async (req, res) => {
  const result = await tasksService.getAll(req.params.id);
  res.json(result.map(Task.toResponse));
});

router.route('/:id/tasks').post(async (req, res) => {
  const result = await tasksService.create(new Task({
    title: req.body.title,
    order: req.body.order,
    description: req.body.description,
    userId: req.body.userId,
    boardId: req.params.id,
    columnId: req.body.columnId
  }));
  if (typeof result === 'number') {
    res.sendStatus(result);
  } else {
    console.log(result);
    res.json(result);
  }
});

router.route('/:boardId/tasks/:taskId').get(async (req, res) => {
  const result = await tasksService.getById(req.params.boardId, req.params.taskId);
  if (typeof result === 'number') {
    res.sendStatus(result);
  } else {
    res.json(Task.toResponse(result));
  }
});

router.route('/:boardId/:taskId').put(async (req, res) => {
  const updateTask = await tasksService.update(req.params.boardId, req.params.taskId, req.body);
  res.json(Task.toResponse(updateTask))
});

router.route('/:boardId/tasks/:taskId').delete(async (req, res) => {
  const result = await tasksService.remove(req.params.boardId, req.params.taskId);
  res.sendStatus(result);
});

module.exports = router;
