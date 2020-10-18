const express = require('express');
const swaggerUI = require('swagger-ui-express');
const path = require('path');
const YAML = require('yamljs');
const userRouter = require('./resources/users/user.router');
const boardRouter = require('./resources/boards/boards.router');
const taskRouter = require('./resources/tasks/task.router');
const app = express();
const logger = require('./configs/logger');
const swaggerDocument = YAML.load(path.join(__dirname, '../doc/api.yaml'));

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

app.use('/users', userRouter);
app.use('/boards', boardRouter);
app.use('/boards', taskRouter);

app.use((err, req,res,next) => {
  console.error(err);
  res.status(500).json({status: 'error', message: 'Internal Server Error'})
})

app.use(logger.error);



// throw new Error('Error')
Promise.reject(Error('Oops!'));



module.exports = app;
