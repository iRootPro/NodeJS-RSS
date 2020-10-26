const { PORT, MONGO_CONNECTION_STRING } = require('./common/config');
const app = require('./app');
const mongoose = require('mongoose');

async function start() {
  try {
    const url = MONGO_CONNECTION_STRING;
    await mongoose.connect(url, {
      useNewUrlParser: true,
      useFindAndModify: false,
      useUnifiedTopology: true
    });
    app.listen(PORT, () =>
      console.log(`App is running on http://localhost:${PORT}`)
    );

  } catch (e) {
    console.error(e);
  }
}

start();


