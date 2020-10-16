const { PORT } = require('./common/config');
const app = require('./app');
const logger = require('./configs/logger')

app.listen(PORT, () =>
  logger.info(`App is running on http://localhost:${PORT}`)
);
