const router = require('express').Router();
const Board = require('./boards.model');
const boardsService = require('./boards.service');
const passport = require('passport');

router.route('/').get(async (req, res) => {
  const boards = await boardsService.getAll();
  res.status(200).json(boards.map(board => board.toClient()));
});

router.route('/').post(async (req, res) => {
  const newBoard = await boardsService.create(new Board({ title: req.body.title, columns: [...req.body.columns] }));
  res.status(200).json(newBoard.toClient());
});

router.route('/:id').get(async (req, res) => {
  const board = await boardsService.getById(req.params.id);
  if (!board) res.sendStatus(404);
  else {
    res.status(200).json(board.toClient());
  }

});

router.route('/:id').put(async (req, res) => {
  const board = await boardsService.update(req.params.id, req.body);
  res.json(board);
});

router.route('/:id').delete(async (req, res) => {
  await boardsService.remove(req.params.id);
  res.sendStatus(200);
});

module.exports = router;
