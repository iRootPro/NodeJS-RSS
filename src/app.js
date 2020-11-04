const express = require('express');
const passport = require('passport')
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const taskRouter = require('./resources/tasks/task.router');
const loginRouter = require('./resources/users/login')
const app = express();
const logger = require('./configs/logger');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));
const authMiddleware = require('./middleware/passport')

app.use(express.json());

app.use(logger.request);

app.use('/doc', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use('/', (req, res, next) => {
  if (req.originalUrl === '/') {
    res.send('Service is running!');
    return;
  }
  next();
});
app.use(authMiddleware)
// require('./middleware/passport')(passport)

app.use('/login', loginRouter)
app.use('/users', userRouter);
app.use('/boards', boardRouter);
boardRouter.use('/:boardId/tasks', taskRouter);

app.use((err, req,res,next) => {
  console.error(err);
  res.status(500).json({status: 'error', message: 'Internal Server Error'})
})

app.use(logger.error);

module.exports = app;
