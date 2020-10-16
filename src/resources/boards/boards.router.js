const router = require('express').Router();
const Board = require('./boards.model');
const boardsService = require('./boards.service');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.json(boards.map(Board.toResponse));
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.create(new Board({ title: req.body.title, columns: [...req.body.columns] }));
  res.json(Board.toResponse(newBoard));
});

router.route('/:id').get(async (req, res) => {
  const result = await boardsService.getById(req.params.id);
  if (typeof result === 'number') {
    res.sendStatus(result);
  } else {
    res.json(Board.toResponse(result));
  }

});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.json(Board.toResponse(board));
});

router.route('/:id').delete(async (req, res) => {
  const status = await boardsService.remove(req.params.id);
  res.sendStatus(status);
});

module.exports = router;
